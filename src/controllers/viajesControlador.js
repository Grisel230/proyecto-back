
const Viaje = require('../models/viajeModelo');
const Ruta = require('../models/rutasModelo');
const Ciudad = require('../models/ciudadModel');
const Autobus = require('../models/autobusesModel');
const Conductor = require('../models/conductoresModel');
const {Op} = require('sequelize');


exports.getAllViajes = async (req, res) => {
    try {
        const viajes = await Viaje.findAll({
            include: [
                {
                    model: Ruta,
                    as: 'Ruta',
                    include: [
                        { model: Ciudad, as: 'OrigenCiudad', attributes: ['id', 'nombre'] },
                        { model: Ciudad, as: 'DestinoCiudad', attributes: ['id', 'nombre'] },
                    ],
                },
                {
                    model: Autobus,
                    as: 'Vehiculo', // Alias para la relación
                    attributes: ['id', 'placa', 'capacidad'],
                },
                {
                    model: Conductor,
                    as: 'Conductor', // Alias para la relación
                    attributes: ['id', 'nombre'],
                },
            ],
        });
        res.status(200).json(viajes);
    } catch (error) {
        console.error('Error al obtener viajes:', error);
        res.status(500).json({ message: 'Error al obtener viajes.' });
    }
};


exports.createViaje = async (req, res) => {
    try {
        const { id_ruta, fecha_salida, hora_salida, precio, id_conductor, id_vehiculo} = req.body;
        console.log(req.body)

        if (!id_ruta) {
            return res.status(400).json({ message: 'El campo id_ruta es obligatorio.' });
        }
        if (!fecha_salida) {
            return res.status(400).json({ message: 'El campo fecha_salida es obligatorio.' });
        }
        if (!hora_salida) {
            return res.status(400).json({ message: 'El campo hora_salida es obligatorio.' });
        }
        if (!precio) {
            return res.status(400).json({ message: 'El campo precio es obligatorio.' });
        }
    


        if (!id_ruta || !fecha_salida || !hora_salida || !precio ) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
        }

        const viaje = await Viaje.create({ id_ruta, fecha_salida, hora_salida, precio, id_conductor, id_vehiculo });
        res.status(201).json(viaje);
    } catch (error) {
        console.error('Error al crear viaje:', error);
        res.status(500).json({ message: 'Error al crear viaje.' });
    }
};

exports.updateViaje = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_ruta, fecha_salida, hora_salida, precio, asientos_disponibles } = req.body;

        const viaje = await Viaje.findByPk(id);
        if (!viaje) {
            return res.status(404).json({ message: 'Viaje no encontrado.' });
        }

        viaje.id_ruta = id_ruta;
        viaje.fecha_salida = fecha_salida;
        viaje.hora_salida = hora_salida;
        viaje.precio = precio;
        viaje.asientos_disponibles = asientos_disponibles;

        await viaje.save();
        res.status(200).json(viaje);
    } catch (error) {
        console.error('Error al actualizar viaje:', error);
        res.status(500).json({ message: 'Error al actualizar viaje.' });
    }
};

exports.deleteViaje = async (req, res) => {
    try {
        const { id } = req.params;

        const viaje = await Viaje.findByPk(id);
        if (!viaje) {
            return res.status(404).json({ message: 'Viaje no encontrado.' });
        }

        await viaje.destroy();
        res.status(200).json({ message: 'Viaje eliminado correctamente.' });
    } catch (error) {
        console.error('Error al eliminar viaje:', error);
        res.status(500).json({ message: 'Error al eliminar viaje.' });
    }
};


exports.searchTrips = async (req, res) => {
    const { routeId, startDate, endDate } = req.query;

    try {
        // Construir el filtro de fechas
        const dateFilter = startDate
            ? endDate
                ? { [Op.between]: [new Date(startDate), new Date(endDate)] }
                : { [Op.gte]: new Date(startDate) }
            : undefined;

        // Filtro principal para la ruta
        const trips = await Viaje.findAll({
            include: [
                {
                    model: Ruta,
                    as: 'Ruta',
                    attributes: ['id', 'origen', 'destino', 'distancia'],
                    include: [
                        { model: Ciudad, as: 'OrigenCiudad', attributes: ['id', 'nombre'] },
                        { model: Ciudad, as: 'DestinoCiudad', attributes: ['id', 'nombre'] },
                    ],
                    where: routeId ? { id: routeId } : undefined, // Filtrar por ruta si se proporciona
                },
                {
                    model: Autobus,
                    as: 'Vehiculo',
                    attributes: ['id', 'placa', 'capacidad'],
                },
                {
                    model: Conductor,
                    as: 'Conductor',
                    attributes: ['id', 'nombre'],
                },
            ],
            where: {
                ...(dateFilter && { fecha_salida: dateFilter }), // Aplicar filtro de fechas si está presente
            },
        });

        res.status(200).json(trips);
    } catch (error) {
        console.error('Error al buscar viajes:', error);
        res.status(500).json({ message: 'Error al buscar viajes.' });
    }
};

