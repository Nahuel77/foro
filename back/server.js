const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Conexión a la BD
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/foro', {
    useNewUrlParser: true,
    useUnifiedTopology: true,    
})
.then(()=>{
    console.log('Conexión a la base de datos exitosa');
})
.catch((error)=>{
    console.error('Error al intentar conectar con la base de datos: ', error);
});

// Middlewares
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(morgan('dev'));
app.use(express.json());

// Rutas
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/postRoutes');
const seccionesRoutes = require('./routes/seccionesRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/secciones', seccionesRoutes);

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});