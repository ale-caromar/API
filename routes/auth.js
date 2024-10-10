// Importa Express para crear rutas y el modelo de usuario
const express = require('express');
const router = express.Router(); // Crea un enrutador de Express para definir rutas de autenticación
const User = require('../models/User'); // Importa el modelo de usuario que interactúa con la base de datos
const bcrypt = require('bcryptjs'); // Librería para encriptar y comparar contraseñas de manera segura

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario', error });
    }
});

// Ruta para el inicio de sesión
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Error de autenticación: Usuario o contraseña incorrectos' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Error de autenticación: Usuario o contraseña incorrectos' });
        }

        res.json({ message: 'Autenticación satisfactoria' });
    } catch (error) {
        res.status(500).json({ message: 'Error en la autenticación', error });
    }
});

// Exporta el enrutador para que pueda ser utilizado en otros archivos de la aplicación
module.exports = router;
