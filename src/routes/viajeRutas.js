const express = require('express');
const router = express.Router();
const viajesController = require('../controllers/viajesControlador');
router.get('/', viajesController.getAllViajes);
router.post('/', viajesController.createViaje);
router.put('/:id', viajesController.updateViaje);
router.delete('/:id', viajesController.deleteViaje);
router.get('/search', viajesController.searchTrips);

module.exports = router;
