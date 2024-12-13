const jwt = require('jsonwebtoken');

const verifyRole = (allowedRoles) => {
    return (req, res, next) => {
        const { token } = req.cookies;
        // Asegúrate de que el usuario esté autenticado
        if (!token) return res.status(401).json({ message: "No token, authorization denied" });

        // Verifica el token y extrae el rol del usuario
        jwt.verify(token, process.env.SECRET, (err, user) => {
            if (err) return res.status(403).json({ message: "Invalid token" });

            /*
                Verificar si el rol del usuario está dentro de los roles permitidos (usando IDs numéricos)
                [1] Administrador del sistema
                [2] Fisioterapeuta
                [3] Cliente
            */
            if (!allowedRoles.includes(user.id_role)) {
                return res.status(403).json({ message: "Access denied: insufficient permissions" });
            }

            req.user = user;
            next();
        });
    };
};

module.exports = {verifyRole};