const Ciudad  = require('../models/ciudadModel');

exports.getAllCiudades = async (req, res) => {
    try {
        const ciudades = await Ciudad.findAll();
        res.status(200).json(ciudades);
    } catch (error) {
        console.error('Error al obtener ciudades:', error);
        res.status(500).json({ message: 'Error al obtener ciudades.' });
    }
};

exports.createCiudad = async (req, res) => {
    try {
        const { nombre } = req.body;

        if (!nombre) {
            return res.status(400).json({ message: 'El nombre de la ciudad es obligatorio.' });
        }

        const ciudad = await Ciudad.create({ nombre });
        res.status(201).json(ciudad);
    } catch (error) {
        console.error('Error al crear ciudad:', error);
        res.status(500).json({ message: 'Error al crear ciudad.' });
    }
};

exports.updateCiudad = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;

        const ciudad = await Ciudad.findByPk(id);
        if (!ciudad) {
            return res.status(404).json({ message: 'Ciudad no encontrada.' });
        }

        ciudad.nombre = nombre;
        await ciudad.save();

        res.status(200).json(ciudad);
    } catch (error) {
        console.error('Error al actualizar ciudad:', error);
        res.status(500).json({ message: 'Error al actualizar ciudad.' });
    }
};

exports.deleteCiudad = async (req, res) => {
    try {
        const { id } = req.params;

        const ciudad = await Ciudad.findByPk(id);
        if (!ciudad) {
            return res.status(404).json({ message: 'Ciudad no encontrada.' });
        }

        await ciudad.destroy();
        res.status(200).json({ message: 'Ciudad eliminada correctamente.' });
    } catch (error) {
        console.error('Error al eliminar ciudad:', error);
        res.status(500).json({ message: 'Error al eliminar ciudad.' });
    }
};
