const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');

const app = express();
const PORT = 10000;

// Middleware para parsear JSON
app.use(express.json());

// Conectar a MongoDB Atlas
mongoose.connect('mongodb+srv://alecaromartinez:root123@actividadapi.6ytg6.mongodb.net/tu_db?retryWrites=true&w=majority')
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch(err => console.error('No se pudo conectar a la base de datos:', err));

// Usar rutas
app.use('/auth', authRoute);
app.use('/posts', postRoute);

// Definir una ruta por defecto
app.get('/', (req, res) => {
    res.send('Prueba 1: Respuesta en el servidor.');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
