const Seccion = require('../models/seccion');

const getSection = async (req, res) => {
    try {
        const { title, seccion, description } = req.body;
        const secciones = await Seccion.find({});
        res.status(200).json(secciones);
    } catch (err) {
        console.error('Error en getSection: ', err);
        res.status(500).json({ error: 'Error al obtener secciones: ', details: err.message });
    }
}

module.exports = { getSection };