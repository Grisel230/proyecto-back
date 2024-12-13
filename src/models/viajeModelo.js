const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Ruta = require('./rutasModelo');
const Vehiculo = require('./autobusesModel'); // Asegúrate de que la ruta sea correcta
const Conductor = require('./conductoresModel'); // Asegúrate de que la ruta sea correcta

const Viaje = sequelize.define('Viaje', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_ruta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Ruta,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    id_vehiculo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Vehiculo,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    id_conductor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Conductor,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    fecha_salida: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: true,
    }
}, {
    tableName: 'viajes',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

// Definir las asociaciones
Viaje.belongsTo(Ruta, {
    foreignKey: 'id_ruta',
    targetKey: 'id',
    as: 'Ruta',
});
Viaje.belongsTo(Vehiculo, {
    foreignKey: 'id_vehiculo',
    targetKey: 'id',
    as: 'Vehiculo',
});
Viaje.belongsTo(Conductor, {
    foreignKey: 'id_conductor',
    targetKey: 'id',
    as: 'Conductor',
});

module.exports = Viaje;