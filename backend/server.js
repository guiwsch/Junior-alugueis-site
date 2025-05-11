const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json()); // Para parsing de JSON no body
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
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
let db;

async function conectarMongo() {
  try {
    await client.connect();
    db = client.db("apartamentosDB");
    console.log("Conectado ao MongoDB!");
  } catch (err) {
    console.error("Erro ao conectar no MongoDB:", err);
    process.exit(1); // Encerra o servidor se não conectar
  }
}

conectarMongo().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
});

// Usuários válidos
const validUsers = [
  { username: "admin", password: "123456" },
  { username: "guiwsch", password: "12345" }, // Novo usuário adicionado
];

// Rota de login
app.post("/api/login", (req, res) => {
  console.log("Requisição de login recebida:", req.body); // Log para depuração
  const { username, password } = req.body;
  const user = validUsers.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    console.log("Login bem-sucedido para:", username);
    res.json({ success: true });
  } else {
    console.log("Falha no login para:", username);
    res.status(401).json({ success: false });
  }
});

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

// Rota de exclusão
app.delete("/api/apartamentos/:id", async (req, res) => {
  try {
    const result = await db.collection("apartamentos").deleteOne({
      _id: new ObjectId(req.params.id),
    });
    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Apartamento excluído com sucesso" });
    } else {
      res.status(404).json({ error: "Apartamento não encontrado" });
    }
  } catch (err) {
    console.error("Erro ao excluir apartamento:", err);
    res.status(500).json({ error: "Erro ao excluir apartamento" });
  }
});
