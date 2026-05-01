const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Cargar variables de entorno del archivo .env que está en la misma carpeta que este script
dotenv.config();

async function testConnection() {
    console.log('--- Iniciando prueba de conexión ---');
    console.log('URI de prueba:', process.env.MONGO_URI ? 'Presente' : 'AUSENTE');
    
    if (!process.env.MONGO_URI) {
        console.error('❌ Error: No se encontró MONGO_URI en el archivo .env');
        process.exit(1);
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Conexión establecida con éxito a MongoDB Atlas');
        
        // Listar colecciones para verificar que realmente estamos dentro
        console.log('Buscando colecciones existentes...');
        const collections = await mongoose.connection.db.listCollections().toArray();
        if (collections.length > 0) {
            console.log('Colecciones encontradas:', collections.map(c => c.name).join(', '));
        } else {
            console.log('No hay colecciones aún en esta base de datos, ¡esto es normal si es nueva!');
        }
        
        await mongoose.connection.close();
        console.log('--- Prueba finalizada exitosamente ---');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error fatal de conexión:', err.message);
        if (err.message.includes('ECONNREFUSED')) {
            console.error('Sugerencia: Revisa tu conexión a internet o si el cluster de Atlas está activo.');
        } else if (err.message.includes('Authentication failed')) {
            console.error('Sugerencia: Tus credenciales (usuario/password) en el .env podrían estar incorrectas.');
        }
        process.exit(1);
    }
}

testConnection();
