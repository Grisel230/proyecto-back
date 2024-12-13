const Conductor  = require('../models/conductoresModel');

exports.getAllConductores = async (req, res) => {
    try {
        const conductores = await Conductor.findAll();
        res.status(200).json(conductores);
    } catch (error) {
        console.error('Error al obtener conductores:', error);
        res.status(500).json({ message: 'Error al obtener conductores.' });
    }
};

exports.createConductor = async (req, res) => {
    try {
        const { nombre, telefono } = req.body;

        if (!nombre || !telefono) {
            return res.status(400).json({ message: 'Nombre y teléfono son obligatorios.' });
        }

        const conductor = await Conductor.create({ nombre, telefono });
        res.status(201).json(conductor);
    } catch (error) {
        console.error('Error al crear conductor:', error);
        res.status(500).json({ message: 'Error al crear conductor.' });
    }
};

exports.updateConductor = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, telefono } = req.body;

        const conductor = await Conductor.findByPk(id);
        if (!conductor) {
            return res.status(404).json({ message: 'Conductor no encontrado.' });
        }

        conductor.nombre = nombre;
        conductor.telefono = telefono;
        await conductor.save();

        res.status(200).json(conductor);
    } catch (error) {
        console.error('Error al actualizar conductor:', error);
        res.status(500).json({ message: 'Error al actualizar conductor.' });
    }
};

exports.deleteConductor = async (req, res) => {
    try {
        const { id } = req.params;

        const conductor = await Conductor.findByPk(id);
        if (!conductor) {
            return res.status(404).json({ message: 'Conductor no encontrado.' });
        }

        await conductor.destroy();
        res.status(200).json({ message: 'Conductor eliminado correctamente.' });
    } catch (error) {
        console.error('Error al eliminar conductor:', error);
        res.status(500).json({ message: 'Error al eliminar conductor.' });
    }
};
