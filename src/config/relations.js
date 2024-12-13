const Ciudad = require('../models/Ciudad');
const Ruta = require('../models/Ruta');
const defineAssociations = () => {

    
    // Asociaciones
    Ruta.belongsTo(Ciudad, { as: 'origenCiudad', foreignKey: 'origen' });
    Ruta.belongsTo(Ciudad, { as: 'destinoCiudad', foreignKey: 'destino' });
    
    Ciudad.hasMany(Ruta, { as: 'rutasOrigen', foreignKey: 'origen' });
    Ciudad.hasMany(Ruta, { as: 'rutasDestino', foreignKey: 'destino' });
};

module.exports = defineAssociations;
