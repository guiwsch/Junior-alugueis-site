const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

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

// Banco de dados em memória (exemplo)
let apartamentos = [];
let id = 1;

// Rota de cadastro
app.post("/api/apartamentos", upload.single("image"), (req, res) => {
  try {
    const { type, address, rooms, bathrooms, garage, price } = req.body;
    const imageUrl = req.file
      ? `http://localhost:3001/uploads/${req.file.filename}`
      : "";

    const novoApartamento = {
      id: id++,
      type,
      address,
      rooms,
      bathrooms,
      garage,
      price,
      imageUrl,
    };

    apartamentos.push(novoApartamento);
    res.status(201).json(novoApartamento);
  } catch (err) {
    console.error("Erro ao salvar apartamento:", err);
    res.status(500).json({ error: "Erro ao salvar apartamento" });
  }
});

// Rota de listagem
app.get("/api/apartamentos", (req, res) => {
  res.json(apartamentos);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
