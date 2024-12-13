const express = require('express');
const router = express.Router();
const autobusesController = require('../controllers/autobusesControlador');

router.get('/', autobusesController.getAllAutobuses);
router.post('/', autobusesController.createAutobus);
router.put('/:id', autobusesController.updateAutobus);
router.delete('/:id', autobusesController.deleteAutobus);

module.exports = router;
