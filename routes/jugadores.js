const express = require('express');
const router = express.Router();
const jugadoresController = require('../controllers/jugadores');
const rivalidadController = require('../controllers/rivalidad');

// GET all tournaments
router.get('/', jugadoresController.getAllJugadores);
router.get('/:id', jugadoresController.getJugadorById);
router.get('/rivalidad', rivalidadController.getRivalidad);
// POST create a new tournament
//router.post('/', jugadoresController.createTorneo);

module.exports = router;