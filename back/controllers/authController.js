import User from '../models/users.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import fs from 'fs-extra';

export const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'El email ya está registrado' });
        }

        const user = new User({ userName, email, password: password });

        await user.save();

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al intentar registrar usuario', error);
        res.status(500).json({ error: 'Error al registrar usuario', details: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Credenciales inválidas' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, userName: user.userName, userId: user._id, avatar: user.image });
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }

};

export const passwordChange = async (req, res) => {
    const { pass, newpass } = req.body;
    const userId = req.userId;

    if (!userId) return res.status(404).json({ error: 'Error de autentificación' });

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

        const isMatch = await bcrypt.compare(pass, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Credenciales inválidas' });

        user.password = newpass;
        await user.save();

        res.status(200).json({ message: 'Contraseña actualizada' });
    } catch (err) {
        console.error('Error al cambiar contraseña: ', err);
        res.status(500).json({ error: 'Error al cambiar contraseña', details: err.message });
    }
}

export const picUpload = async (req, res) => {
    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({ error: 'Error de autenticación: Usuario no identificado.' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

        if (!req.cloudinaryUrl) {
            return res.status(400).json({ error: 'No se recibió la URL de la imagen.' });
        }

        user.image = req.cloudinaryUrl;
        await user.save();

        const tempFilePath = req.files?.file?.tempFilePath;
        if (tempFilePath) {
            await fs.unlink(tempFilePath);
        }

        res.status(200).json({
            message: 'Imagen subida y guardada con éxito.',
            imageUrl: req.cloudinaryUrl,
        });
    } catch (err) {
        console.error('Error al subir la imagen a MongoDB:', err);
        res.status(500).json({
            error: 'Error interno al guardar la imagen en la base de datos.',
            details: err.message,
        });
    }
}