const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./apartamentos.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS apartamentos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT,
      address TEXT,
      rooms INTEGER,
      bathrooms INTEGER,
      garage INTEGER,
      price TEXT
    )
  `);
});

module.exports = db;
