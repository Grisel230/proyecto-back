const Autobus = require("../models/autobusesModel.js");
const Ticket = require("../models/ticket.js");
const Trip = require("../models/viajeModelo.js");
const Ruta = require("../models/rutasModelo.js");
const Ciudad = require("../models/ciudadModel.js");

exports.getAvailableSeats = async (req, res) => {
    try {
        const { tripId } = req.params;

        // Obtener el viaje con el vehículo asociado
        const trip = await Trip.findByPk(tripId, {
            include: {
                model: Autobus,
                as: 'Vehiculo', // Alias debe coincidir con el definido en las asociaciones
                attributes: ['id', 'capacidad'], // Asegúrate de que el campo "capacidad" existe
            },
        });

        if (!trip) {
            return res.status(404).json({ message: 'Viaje no encontrado.' });
        }

        // Verificar que el campo "capacidad" esté definido y sea válido
        const totalSeats = trip.Vehiculo.capacidad;
        if (!totalSeats || typeof totalSeats !== 'number' || totalSeats <= 0) {
            return res.status(400).json({ message: 'El vehículo no tiene una capacidad válida.' });
        }

        // Generar la lista de todos los asientos posibles
        const allSeats = Array.from({ length: totalSeats }, (_, i) => (i + 1).toString());

        // Obtener los asientos reservados para este viaje
        const reservedSeats = await Ticket.findAll({
            where: { trip_id: tripId },
            attributes: ['seat_number'],
        });

        // Filtrar los asientos reservados
        const reservedSeatNumbers = reservedSeats.map(ticket => ticket.seat_number);
        const availableSeats = allSeats.filter(seat => !reservedSeatNumbers.includes(seat));

        // Retornar los asientos disponibles
        res.status(200).json(availableSeats);
    } catch (error) {
        console.error('Error al obtener asientos disponibles:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};


const Usuario = require('../models/usuarioModel');


exports.reserveSeat = async (req, res) => {
    const { tripId, seatNumber, userId } = req.body;

    try {
        // Validar que el usuario exista
        const user = await Usuario.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        // Validar que el viaje exista
        const trip = await Trip.findByPk(tripId, {
            attributes: ['id', 'price'], // Obtener el precio directamente del viaje
        });

        if (!trip) {
            return res.status(404).json({ message: 'Viaje no encontrado.' });
        }

        // Verificar si el asiento ya está reservado
        const seatExists = await Ticket.findOne({
            where: { trip_id: tripId, seat_number: seatNumber },
        });

        if (seatExists) {
            return res.status(400).json({ message: 'Este asiento ya está reservado.' });
        }

        // Crear la reservación
        const ticket = await Ticket.create({
            trip_id: tripId,
            seat_number: seatNumber,
            user_id: userId,
            price: trip.price, // Usar el precio del viaje
            status: 2, // Estado de reservación
        });

        res.status(201).json({ message: 'Asiento reservado exitosamente.', ticket });
    } catch (error) {
        console.error('Error al reservar asiento:', error);
        res.status(500).json({ message: 'Error al reservar asiento.', details: error.message });
    }
};


exports.confirmPayment = async (req, res) => {
    try {
        const { ticketId } = req.body;

        const ticket = await Ticket.findByPk(ticketId);
        console.log(ticket)
        if (!ticket) {
            return res.status(404).json({ message: 'Boleto no encontrado.' });
        }

        // check if the status is already in the status 2
        if (ticket.status == 2) {
            return res.status(200).json({ message: 'Ticket ya ha sido pagado', ticket });
        }

        ticket.status = 2;
        await ticket.save();

        res.status(200).json({ message: 'Pago confirmado.', ticket });
    } catch (error) {
        console.error('Error al confirmar pago:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};


exports.getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.findAll({
            include: [
                {
                    model: Trip,
                    as: 'Viaje',
                    include: {
                        model: Ruta,
                        as: 'Ruta',
                        include: [
                            { model: Ciudad, as: 'OrigenCiudad', attributes: ['id', 'nombre'] },
                            { model: Ciudad, as: 'DestinoCiudad', attributes: ['id', 'nombre'] },
                        ],
                    },
                },
                {
                    model: Usuario,
                    as: 'Usuario',
                    attributes: ['id', 'name', 'email'],
                },
            ],
        });
        res.status(200).json(tickets);
    } catch (error) {
        console.error('Error al obtener tickets:', error);
        res.status(500).json({ message: 'Error al obtener tickets.' });
    }
};

