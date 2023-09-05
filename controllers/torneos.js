const { getDb } = require("../app");

exports.getAllTorneos = (req, res) => {
  const db = getDb();
  const query = "SELECT * FROM medida_datos_torneos";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching tournaments:", err);
      res.status(500).json({ message: "Server Error" });
      return;
    }

    res.json(results);
  });
};

exports.getTorneoById = (req, res) => {
  const db = getDb();
  const query = "SELECT * FROM medida_datos_torneos WHERE torneo=?";
  const { id } = req.params;
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching tournaments:", err);
      res.status(500).json({ message: "Server Error" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: "Tournament not found" });
      return;
    }
    const torneo = results[0];
    res.json(torneo);
  });
};

exports.createTorneo = (req, res) => {
  const db = getDb();
  const { nombre, fecha, status } = req.body;
  const query =
    "INSERT INTO tournaments (nombre, fecha, status) VALUES (?, ?, ?)";

  db.query(query, [nombre, fecha, status], (err, result) => {
    if (err) {
      console.error("Error creating tournament:", err);
      res.status(500).json({ message: "Server Error" });
      return;
    }
    res.status(201).json({ id: result.insertId, name, date, location });
  });
};
