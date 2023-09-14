const { getDb } = require("../app");

exports.getRivalidad = (req, res) => {
  const db = getDb();
  const { id1, id2 } = req.query;

  if (id1 && id2) {
    // Do something with id1 and id2
    res.json({ message: `Rivalry between Player ${id1} and Player ${id2}` });
  } else {
    res.status(400).json({ error: "Both player IDs are required" });
  }
};
