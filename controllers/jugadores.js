const { pool } = require("../config/db");

exports.getAllJugadores = async (req, res) => {
  const query = "SELECT * FROM medida_jugadores";
  try {
    pool.query(query, (err, results) => {
      console.log(results);
      if (err) {
        console.error("Error query:", err);
      } else {
        res.json(results);
      }
    });
  } catch (error) {
    console.error("Error fetching jugadores:", error);
    res.status(500).json({ error: "Internal Server Error", msg: error });
  }
};

exports.getJugadorById = (req, res) => {
  const { id } = req.params;
  const isEmail = id.includes("@");
  let query = "";
  if (isEmail) {
    query =
      "SELECT * FROM medida_jugadores WHERE id_jugador=(SELECT id_jugador FROM dimension_usuarios WHERE correo=?)";
  } else {
    query = "SELECT * FROM medida_jugadores WHERE id_jugador=?";
  }

  pool.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error query:", err);
      res.status(500).json({ error: "Internal Server Error", msg: err });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: "Jugador no encontrado" });
      return;
    }

    const jugador = results[0];
    res.json(jugador);
  });
};

exports.createJugador = (req, res) => {
  const { nombre_completo, rama } = req.body;
  const query =
    "INSERT INTO medida_jugadores (nombre_completo, rama) VALUES (?, ?)";

  pool.query(query, [nombre_completo, rama], (err, result) => {
    if (err) {
      console.error("Error query:", err);
      res.status(500).json({ error: "Internal Server Error", msg: err });
      return;
    }

    res.status(201).json({ id: result.insertId, nombre_completo, rama });
  });
};

/*
exports.getAllJugadores = async (req, res) => {
  const query = "SELECT * FROM medida_jugadores";
  result = await pool.query(query);
  res.json(results);

};

exports.getJugadorById = async (req, res) => {
  const query = "SELECT * FROM medida_jugadores WHERE id_jugador=?";
  const { id } = req.params;
  const isEmail = id.includes("@");

  result = await pool.query(query);

  if (results.length === 0) {
    res.status(404).json({ message: "Jugador no encontrado" });
    return;
  }
  const jugador = results[0];
  res.json(jugador);

};

exports.createJugador = async (req, res) => {
  const { nombre_completo, rama } = req.body;
  const query =
    "INSERT INTO medida_jugadores (nombre_completo, rama) VALUES (?, ?)";

  result = await pool.query(query);
  res.status(201).json({ id: result.insertId, nombre_completo, rama });
};
*/
