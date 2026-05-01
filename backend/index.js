require('dotenv').config();
const app = require('./app');
const connectDB = require('./src/config/db');
const { PORT } = require('./src/config/index');

// Inicializar conexión a la base de datos
connectDB();

// Levantar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor iniciado y escuchando en el puerto ${PORT}`);
});