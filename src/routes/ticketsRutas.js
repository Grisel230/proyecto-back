const express = require('express');
const {
    getAvailableSeats,
    reserveSeat,
    confirmPayment,
    getTickets
} = require('../controllers/ticketsControlador');
const router = express.Router();

router.get('/', getTickets);
router.get('/seats/:tripId', getAvailableSeats);

router.post('/reserve', reserveSeat);
router.post('/pay', confirmPayment);

module.exports = router;