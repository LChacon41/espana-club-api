const { pool } = require("../config/db");

exports.getRivalidad = (req, res) => {
  const { id1, id2 } = req.query;

  if (id1 && id2) {
    const query = "SELECT * FROM medida_versus_singles WHERE (id1 IN (?, ?) AND id2 IN (?, ?));";

    pool.query(query, [id1, id2, id2, id1], (err, results) => {
      if (err) {
        console.error("Error query:", err);
        res.status(500).json({ error: "Internal Server Error", msg: err });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ message: "Jugadores no encontrados" });
        return;
      }

      const jugador = results[0];
      res.json(jugador);
    });
  } else {
    res.status(400).json({ error: "Both player IDs are required" });
  }
};