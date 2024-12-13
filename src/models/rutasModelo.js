const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Ciudad = require('./ciudadModel');

class Ruta extends Model {}

Ruta.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    origen: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    destino: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    distancia: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Ruta',
    tableName: 'rutas',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});
Ruta.belongsTo(Ciudad, { foreignKey: 'origen', as: 'OrigenCiudad' });
Ruta.belongsTo(Ciudad, { foreignKey: 'destino', as: 'DestinoCiudad' });

module.exports = Ruta;