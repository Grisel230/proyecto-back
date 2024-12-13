
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Usuario = require('./usuarioModel');
const Trip = require('./viajeModelo');

const Ticket = sequelize.define('Ticket', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    trip_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'viajes', key: 'id' }, // Relación con la tabla trips
    },
    seat_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' }, // Relación con la tabla users
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 2,
    },
    
});


Ticket.belongsTo(Trip, { foreignKey: 'trip_id', as: 'Viaje' });
Ticket.belongsTo(Usuario, { foreignKey: 'user_id', as: 'Usuario' });
module.exports = Ticket;
