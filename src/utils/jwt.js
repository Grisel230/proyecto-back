import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();  // Cargar las variables de entorno desde el archivo .env


async function createAccessToken(payload) {
    return new Promise((resolve, rejected) => {
        jwt.sign(payload, process.env.SECRET, { expiresIn: '1d' }, (err, token) => {
            if (err) rejected(err);
            resolve(token);
        });
    });
}

export { createAccessToken };
