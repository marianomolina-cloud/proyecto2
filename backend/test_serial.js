const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const connectDB = require('./src/config/db');
const Media = require('./src/models/Media');

async function test() {
    try {
        await connectDB();
        
        console.log("Creando instancia de Media para prueba de serial...");
        
        const newMedia = new Media({
            titulo: `Película de Prueba ${Date.now()}`,
            sinopsis: "Sinopsis de prueba",
            urlPelicula: `https://test-${Date.now()}.com`,
            anioEstreno: 2024,
            generoPrincipal: new mongoose.Types.ObjectId(),
            directorPrincipal: new mongoose.Types.ObjectId(),
            productora: new mongoose.Types.ObjectId(),
            tipo: new mongoose.Types.ObjectId()
        });
        
        // El hook pre('validate') debería dispararse aquí
        await newMedia.validate();
        
        console.log("-----------------------------------------");
        console.log(`Serial generado automáticamente: ${newMedia.serial}`);
        console.log("-----------------------------------------");
        
        if (newMedia.serial && newMedia.serial.startsWith('PEL-')) {
            console.log("✅ Prueba exitosa: El serial cumple con el formato PEL-XXXX");
        } else {
            console.log("❌ Prueba fallida: El serial no tiene el formato esperado");
        }
        
        process.exit(0);
    } catch (error) {
        console.error("Error durante la prueba:", error);
        process.exit(1);
    }
}

test();
