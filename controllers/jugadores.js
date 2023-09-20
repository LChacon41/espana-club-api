const { pool } = require("../config/db");

exports.getAllJugadores = async (req, res) => {
  const query = "SELECT * FROM medida_jugadores";
  try {
    const [results, fields] = await pool.execute(query); // Using pool.execute() for promise-based API
    console.log(results);
    //res.json(results[0]);
  } catch (error) {
    console.error('Error fetching jugadores:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getJugadorById = async (req, res) => {
  const query = "SELECT * FROM medida_jugadores WHERE id_jugador=?";
  const { id } = req.params;
  const isEmail = id.includes("@");

  try {
    const [results, fields] = await pool.execute(query, [id]); // Pass values as an array
    if (results.length === 0) {
      res.status(404).json({ message: "Jugador no encontrado" });
      return;
    }
    const jugador = results[0];
    res.json(jugador);
  } catch (error) {
    console.error('Error fetching jugadores:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createJugador = async (req, res) => {
  const { nombre_completo, rama } = req.body;
  const query = "INSERT INTO medida_jugadores (nombre_completo, rama) VALUES (?, ?)";

  try {
    const [result, fields] = await pool.execute(query, [nombre_completo, rama]); // Pass values as an array
    res.status(201).json({ id: result.insertId, nombre_completo, rama });
  } catch (error) {
    console.error('Error creating jugador:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
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