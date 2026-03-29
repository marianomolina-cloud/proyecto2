const express = require('express');
const cors = require('cors');

// Archivo concentrador de rutas
const rutasPrincipales = require('./src/routes/index');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de entrada de prueba
app.get('/', (req, res) => {
    res.json({ message: 'Bienvenido a la API REST de Películas - Administrador' });
});

// Enlazando los archivos de rutas
app.use('/api', rutasPrincipales);

module.exports = app;
