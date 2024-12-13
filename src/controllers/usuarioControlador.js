const User = require("../models/usuarioModel");
const bcrypt = require('bcrypt');


// Obtener a todos los usuarios
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener los usuarios',
            details: error
        });
    }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
    const { id } = req.params;
    // console.log(id);
    try {
        const user = await User.findByPk(id);
        if (user) res.status(200).json(user);
        else res.status(404).json({ error: 'Usuario no encontrado' });
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener el usuario',
            details: error
        });
    }
};

// Crear nuevo usuario
exports.createUser = async (req, res) => {    
    try {
        const { username, names, lastnames, age, email, phone, password, id_role, id_status } = req.body;
        console.log(req.body);

        // Verificar si el email ya existe
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ 
                error: 'Email already registered' 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            names,
            lastnames,
            age,
            email,
            phone,
            password: hashedPassword,
            id_role,
            id_status
        });

        res.status(201).json({
            message: 'Usuario creado exitosamente',
            user
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Error al crear el usuario', details: error });
    }
};

// Actualizar usuario
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, names, lastnames, age, email, phone, id_role, id_status } = req.body;

    try {
        const user = await User.findByPk(id);
        if (user) {
            await user.update({
                username,
                names,
                lastnames,
                age,
                email,
                phone,
                id_role,
                id_status
            });

            res.status(200).json({
                message: 'Usuario actualizado exitosamente',
                user
            });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar el usuario', details: error });
    }
};

exports.changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id; // ID del usuario desde el token de sesión

    try {
        // Buscar al usuario autenticado en la base de datos
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Comparar la contraseña actual
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Contraseña actual incorrecta' });
        }

        // Encriptar y actualizar la nueva contraseña
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();

        res.status(200).json({ message: 'Contraseña actualizada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al cambiar la contraseña', details: error });
    }
};


// // Actualizar nombre de usuario
// exports.updateUsername = async (req, res) => {
//     const { id } = req.params;
//     const { username } = req.body;
//     try {
//         const user = await User.findByPk(id);
//         if (user) {
//             await user.update({ username });
//             res.status(200).json({ message: 'Nombre de usuario actualizado', username });
//         } else {
//             res.status(404).json({ message: 'Usuario no encontrado' });
//         }
//     } catch (error) {
//         res.status(400).json({ error: 'Error al actualizar el nombre de usuario', details: error });
//     }
// };

// Eliminar usuario
exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if (user) {
            await user.destroy();
            res.status(200).json({ message: 'Usuario eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario', details: error });
    }

};

// Suspender usuario
exports.suspendUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if (user) {
            await user.update({ id_status: 3 });
            res.status(200).json({ message: 'Usuario desactivado exitosamente' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al desactivar el usuario', details: error });
    }

};
