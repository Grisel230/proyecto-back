const User = require("../models/usuarioModel.js");
const {createAccessToken} = require("../utils/jwt.js");
const {validateToken} = require("../middlewares/validateToken.js")
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');


exports.signInUser = async (req, res) => {
    try {
        const { email, password: userPassword } = req.body;

        // Validación de datos de entrada
        if (!email) {
            return res.status(400).json({ message: 'El correo electrónico es obligatorio.' });
        }
        if (!userPassword) {
            return res.status(400).json({ message: 'La contraseña es obligatoria.' });
        }

        console.log('Datos de solicitud:', req.body);

        // Buscar usuario por correo electrónico
        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        // Validar contraseña
        const isMatch = await bcrypt.compare(userPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'La contraseña es incorrecta.' });
        }

        // Verificar el estado de la cuenta
        if (user.status === 2) {
            return res.status(403).json({ message: 'Por favor, activa tu cuenta a través del correo enviado.' });
        } else if (user.status === 3) {
            return res.status(403).json({ message: 'Tu cuenta está suspendida y no puede ser accedida en este momento.' });
        } else if (user.status !== 1) {
            console.log(user);
            return res.status(403).json({ message: 'El estado de tu cuenta no es válido para acceder.' });
        }

        // Crear token
        const token = await createAccessToken({
            id: user.id,
            email: user.email,
            username: user.username,
            id_role: user.id_role
        });

        console.log(token)

        // Guardar token en una cookie HTTP-only
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // En producción, solo sobre HTTPS
        }).json({
            id: user.id,
            email: user.email,
            username: user.name,
            id_role: user.role,
            id_status: user.status
        });

    } catch (error) {
        console.error('Error en signInUser:', error);
        res.status(500).json({ message: 'Error interno del servidor.', details: error.message });
    }
};



exports.logoutUser = async (req, res) => {
    res.cookie('token', '', {
        expires: new Date(0)
    });

    return res.status(200).json({ message: 'Cierre de sesión exitoso.' });
};
