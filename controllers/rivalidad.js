const { getDb } = require("../app");

exports.getRivalidad = (req, res) => {
  const db = getDb();
  const { id1, id2 } = req.params;

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
