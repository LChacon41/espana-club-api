exports.getRivalidad = async (req, res) => {
  const { id1, id2 } = req.query;

  if (id1 && id2) {
    // Do something with id1 and id2
    res.json({ message: `Rivalry between Player ${id1} and Player ${id2}` });
    const query = "SELECT * FROM medida_versus_singles WHERE (id1=? AND id2=?) or (id1=? AND id2=?);";
    const isEmail = id.includes("@");

    result = await pool.query(query);

    if (results.length === 0) {
      res.status(404).json({ message: "Jugadores no encontrados" });
      return;
    }
    const jugador = results[0];
    res.json(jugador);
  } else {
    res.status(400).json({ error: "Both player IDs are required" });
  }
};
