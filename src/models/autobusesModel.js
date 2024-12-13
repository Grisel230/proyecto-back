const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Autobus = sequelize.define('Autobus', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    placa: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    capacidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'autobuses',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = Autobus;
