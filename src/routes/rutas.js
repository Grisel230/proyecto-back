const express = require('express');
const router = express.Router();
const rutasController = require('../controllers/rutasControlador');

router.get('/', rutasController.getAllRutas);
router.post('/', rutasController.createRuta);
router.put('/:id', rutasController.updateRuta);
router.delete('/:id', rutasController.deleteRuta);

module.exports = router;