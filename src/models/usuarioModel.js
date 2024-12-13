const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); // Conexión a la base de datos

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
        field: 'email'
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    role: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 2,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'usuarios',
    timestamps: false, // Ya estamos manejando created_at y updated_at manualmente
});

module.exports = User;