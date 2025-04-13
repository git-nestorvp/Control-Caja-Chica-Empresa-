const User = require('../models/User');
const jwt = require('jsonwebtoken');

const registrarUsuario = async (req, res) => {
    try {
        const { nombre, correo, contraseña } = req.body;

        const existe = await User.findOne({ correo });
        if (existe) {
            return res.status(400).json({ mensaje: 'El correo ya está registrado' });
        }

        const nuevoUsuario = new User({ nombre, correo, contraseña });
        await nuevoUsuario.save();

        res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};

const loginUsuario = async (req, res) => {
    try {
        const { correo, contraseña } = req.body;

        const usuario = await User.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({ mensaje: 'Correo no registrado' });
        }

        const esValido = await usuario.compararContraseña(contraseña);
        if (!esValido) {
            return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
        }

        const token = jwt.sign(
            { id: usuario._id, nombre: usuario.nombre },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.json({ token, usuario: { id: usuario._id, nombre: usuario.nombre } });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};

module.exports = { registrarUsuario, loginUsuario };