const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 3001;

app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Configura onde salvar as imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Conexão com MongoDB
const uri = "mongodb://localhost:27017/JuniorSite.database";
const client = new MongoClient(uri);
let db;

async function conectarMongo() {
  try {
    await client.connect();
    db = client.db("apartamentosDB");
    console.log("Conectado ao MongoDB!");

    // Inicia o servidor SOMENTE após conectar ao banco
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Erro ao conectar no MongoDB:", err);
  }
}

conectarMongo();

// Rota de cadastro
app.post("/api/apartamentos", upload.single("image"), async (req, res) => {
  try {
    const { type, address, rooms, bathrooms, garage, price } = req.body;
    const imageUrl = req.file
      ? `http://localhost:${PORT}/uploads/${req.file.filename}`
      : "";

    const novoApartamento = {
      type,
      address,
      rooms,
      bathrooms,
      garage,
      price,
      imageUrl,
    };

    const result = await db
      .collection("apartamentos")
      .insertOne(novoApartamento);
    res.status(201).json({ ...novoApartamento, _id: result.insertedId });
  } catch (err) {
    console.error("Erro ao salvar apartamento:", err);
    res.status(500).json({ error: "Erro ao salvar apartamento" });
  }
});

// Rota de listagem
app.get("/api/apartamentos", async (req, res) => {
  try {
    const apartamentos = await db.collection("apartamentos").find().toArray();
    res.json(apartamentos);
  } catch (err) {
    console.error("Erro ao buscar apartamentos:", err);
    res.status(500).json({ error: "Erro ao buscar apartamentos" });
  }
});
