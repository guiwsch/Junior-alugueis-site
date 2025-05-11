const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/apartamentos", (req, res) => {
  const { type, address, rooms, bathrooms, garage, price } = req.body;

  db.run(
    `INSERT INTO apartamentos (type, address, rooms, bathrooms, garage, price) VALUES (?, ?, ?, ?, ?, ?)`,
    [type, address, rooms, bathrooms, garage, price],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

app.get("/api/apartamentos", (req, res) => {
  db.all(`SELECT * FROM apartamentos`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.listen(3001, () => {
  console.log("Backend rodando em http://localhost:3001");
});
