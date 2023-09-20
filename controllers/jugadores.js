const { pool } = require("../config/db");


exports.getAllJugadores = async (req, res) => {
  const query = "SELECT * FROM medida_jugadores";
  let results = await pool.query(query); // Added 'let'
  res.json(results);
};

exports.getJugadorById = async (req, res) => {
  const query = "SELECT * FROM medida_jugadores WHERE id_jugador=?";
  const { id } = req.params;
  const isEmail = id.includes("@");

  let results = await pool.query(query); // Added 'let'

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

  let result = await pool.query(query); // Added 'let'
  res.status(201).json({ id: result.insertId, nombre_completo, rama });
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