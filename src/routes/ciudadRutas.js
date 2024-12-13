const express = require('express');
const router = express.Router();
const ciudadesController = require('../controllers/ciudadControlador');

router.get('/', ciudadesController.getAllCiudades);
router.post('/', ciudadesController.createCiudad);
router.put('/:id', ciudadesController.updateCiudad);
router.delete('/:id', ciudadesController.deleteCiudad);

module.exports = router;
