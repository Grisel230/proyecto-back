const jwt = require('jsonwebtoken');
require('dotenv').config();

// Función para crear un token de verificación
const generateVerificationToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.SECRET,
        { expiresIn: '24h' }
    );
};

module.exports = { generateVerificationToken };