const express = require('express');
const router = express.Router();
const torneosController = require('../controllers/torneos');

// GET all tournaments
router.get('/', torneosController.getAllTorneos);
router.get('/:id', torneosController.getTorneoById);
// POST create a new tournament
//router.post('/', torneosController.createTorneo);

module.exports = router;