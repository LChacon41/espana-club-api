const { getDb } = require("../app");

exports.getAllJugadores = (req, res) => {
  const db = getDb();
  const query = "SELECT * FROM medida_jugadores";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching jugadores:", err);
      res.status(500).json({ message: "Server Error" });
      return;
    }

    res.json(results);
  });
};

exports.getJugadorById = (req, res) => {
  const db = getDb();
  const query = "SELECT * FROM medida_jugadores WHERE id_jugador=?";
  const { id } = req.params;
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching jugador:", err);
      res.status(500).json({ message: "Server Error" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: "Jugador not found" });
      return;
    }
    const jugador = results[0];
    res.json(jugador);
  });
};

exports.createJugador = (req, res) => {
  const db = getDb();
  const { nombre_completo, rama } = req.body;
  const query =
    "INSERT INTO medida_jugadores (nombre_completo, rama) VALUES (?, ?)";

  db.query(query, [nombre_completo, rama], (err, result) => {
    if (err) {
      console.error("Error creating jugador:", err);
      res.status(500).json({ message: "Server Error" });
      return;
    }
    res.status(201).json({ id: result.insertId, nombre_completo, rama });
  });
};
