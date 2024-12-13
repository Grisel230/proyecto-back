const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

class Ciudad extends Model {}

Ciudad.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    sequelize,
    modelName: 'Ciudad',
    tableName: 'ciudades',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = Ciudad;
