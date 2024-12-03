import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();  // Cargar las variables de entorno desde el archivo .env

// Función para crear un token de verificación
const generateVerificationToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.SECRET,
        { expiresIn: '24h' }
    );
};

module.exports = { generateVerificationToken };