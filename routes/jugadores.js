const express = require('express');
const router = express.Router();
const jugadoresController = require('../controllers/jugadores');

// GET all tournaments
router.get('/', jugadoresController.getAllJugadores);
router.get('/:id', jugadoresController.getJugadorById);
// POST create a new tournament
//router.post('/', jugadoresController.createTorneo);

module.exports = router;