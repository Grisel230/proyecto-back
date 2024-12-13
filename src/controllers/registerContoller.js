const User = require("../models/usuarioModel.js");
const emailService = require("../services/emailService.js");
const { generateVerificationToken } = require("../middlewares/verificationToken.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registerNewUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Validación de datos de entrada
        if (!name || !email || !password) {
            return res.status(400).json({
                error: 'Name, email, and password are required',
            });
        }

        console.log('Request Body:', req.body);

        // Verificar si el email ya existe
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                error: 'Email already registered',
            });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear nuevo usuario
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 1, // Asignar un rol predeterminado si no se proporciona
            status: 2
        });

        // Crear Token de Verificación
        const verificationToken = generateVerificationToken(user.id);

        // Enviar email de verificación
        try {
            await emailService.sendAccountVerification(email, verificationToken);
        } catch (emailError) {
            console.error('Error sending verification email:', emailError);
            return res.status(500).json({
                error: 'User created, but there was an issue sending the verification email. Please contact support.',
            });
        }

        // Respuesta exitosa
        res.status(201).json({
            message: 'User created successfully. Please check your email to verify your account.',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                created_at: user.created_at,
                updated_at: user.updated_at,
            },
        });
    } catch (error) {
        console.error('Error in registerNewUser:', error);
        res.status(500).json({
            error: 'Error creating new user',
            details: error.message,
        });
    }
};


exports.verifyAccount = async (req, res) => {
    try {
        const { token } = req.params;

        // Verificar el token
        const decoded = jwt.verify(token, process.env.SECRET);

        // Buscar y actualizar el usuario
        const user = await User.findByPk(decoded.id);

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        // Actualizar el estado del usuario a activo
        await user.update({ status: 1 });

        res.json({
            message: 'Account verified successfully'
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            error: 'Error verifying account',
            details: error.message
        });
    }
}
