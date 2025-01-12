const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const SeccionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    seccion: { type: String, required: true },
    description: { type: String, required: true}
});

module.exports = mongoose.model('Seccion', SeccionSchema);
//considerar añadir controlador y rutas para un panel de administrador con opciones como agregar seccion