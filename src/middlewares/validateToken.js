import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();  // Cargar las variables de entorno desde el archivo .env


const authRequired = (req, res, next) => {
    try {
        // Verificar si hay cookies
        if (!req.cookies) {
            return res.status(401).json({
                message: "No cookies present in request"
            });
        }

        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "No token, authorization denied"
            });
        }

        // Verificar el token
        jwt.verify(token, process.env.SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({
                    message: "Invalid token"
                });
            }

            req.user = user;
            next();
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error during authentication",
            error: error.message
        });
    }
}

export { authRequired };