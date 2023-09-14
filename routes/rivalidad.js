const express = require('express');
const router = express.Router();
const rivalidadController = require('../controllers/rivalidad');

router.get('/rivalry', (req, res) => {
  const { id1, id2 } = req.query;

  // Check if both id1 and id2 are provided
  if (id1 && id2) {
    // Do something with id1 and id2
    res.json({ message: `Rivalry between Player ${id1} and Player ${id2}` });
  } else {
    res.status(400).json({ error: 'Both player IDs are required' });
  }
});

module.exports = router;