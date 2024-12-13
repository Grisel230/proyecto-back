const Ruta  = require('../models/rutasModelo');
const Ciudad  = require('../models/ciudadModel');

exports.getAllRutas = async (req, res) => {
    try {
        const rutas = await Ruta.findAll({
            include: [
                { model: Ciudad, as: 'OrigenCiudad', attributes: ['id', 'nombre'] },
                { model: Ciudad, as: 'DestinoCiudad', attributes: ['id', 'nombre'] }
            ]
        });
        res.status(200).json(rutas);
    } catch (error) {
        console.error('Error al obtener rutas:', error);
        res.status(500).json({ message: 'Error al obtener rutas.' });
    }
};

exports.createRuta = async (req, res) => {
    try {
        let { origen, destino, distancia } = req.body;
        origen = parseInt(origen);
        destino = parseInt(destino);
        console.log(origen, destino, distancia);

        if (!origen || !destino || !distancia) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
        }

        const ruta = await Ruta.create({ origen, destino, distancia });
        res.status(201).json(ruta);
    } catch (error) {
        console.error('Error al crear ruta:', error);
        res.status(500).json({ message: 'Error al crear ruta.' });
    }
};

exports.updateRuta = async (req, res) => {
    try {
        const { id } = req.params;
        const { origen, destino, distancia } = req.body;

        const ruta = await Ruta.findByPk(id);
        if (!ruta) {
            return res.status(404).json({ message: 'Ruta no encontrada.' });
        }

        ruta.origen = origen;
        ruta.destino = destino;
        ruta.distancia = distancia;
        await ruta.save();

        res.status(200).json(ruta);
    } catch (error) {
        console.error('Error al actualizar ruta:', error);
        res.status(500).json({ message: 'Error al actualizar ruta.' });
    }
};

exports.deleteRuta = async (req, res) => {
    try {
        const { id } = req.params;

        const ruta = await Ruta.findByPk(id);
        if (!ruta) {
            return res.status(404).json({ message: 'Ruta no encontrada.' });
        }

        await ruta.destroy();
        res.status(200).json({ message: 'Ruta eliminada correctamente.' });
    } catch (error) {
        console.error('Error al eliminar ruta:', error);
        res.status(500).json({ message: 'Error al eliminar ruta.' });
    }
};
