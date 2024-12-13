const Autobus  = require('../models/autobusesModel');

exports.getAllAutobuses = async (req, res) => {
    try {
        const autobuses = await Autobus.findAll();
        res.status(200).json(autobuses);
    } catch (error) {
        console.error('Error al obtener autobuses:', error);
        res.status(500).json({ message: 'Error al obtener autobuses.' });
    }
};

exports.createAutobus = async (req, res) => {
    try {
        const { placa, capacidad } = req.body;
        const autobus = await Autobus.create({ placa, capacidad });
        res.status(201).json(autobus);
    } catch (error) {
        console.error('Error al crear autobús:', error);
        res.status(500).json({ message: 'Error al crear autobús.' });
    }
};

exports.updateAutobus = async (req, res) => {
    try {
        const { id } = req.params;
        const { placa, capacidad } = req.body;
        const autobus = await Autobus.findByPk(id);

        if (!autobus) {
            return res.status(404).json({ message: 'Autobús no encontrado.' });
        }

        autobus.placa = placa;
        autobus.capacidad = capacidad;
        await autobus.save();

        res.status(200).json(autobus);
    } catch (error) {
        console.error('Error al actualizar autobús:', error);
        res.status(500).json({ message: 'Error al actualizar autobús.' });
    }
};

exports.deleteAutobus = async (req, res) => {
    try {
        const { id } = req.params;
        const autobus = await Autobus.findByPk(id);

        if (!autobus) {
            return res.status(404).json({ message: 'Autobús no encontrado.' });
        }

        await autobus.destroy();
        res.status(200).json({ message: 'Autobús eliminado correctamente.' });
    } catch (error) {
        console.error('Error al eliminar autobús:', error);
        res.status(500).json({ message: 'Error al eliminar autobús.' });
    }
};
