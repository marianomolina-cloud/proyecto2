const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Media = require('./src/models/Media');

dotenv.config();

const updateCovers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('--- Conectado a MongoDB ---');

        const result = await Media.updateMany(
            { $or: [{ imagenPortada: { $exists: false } }, { imagenPortada: '' }, { imagenPortada: null }] },
            { $set: { imagenPortada: 'https://via.placeholder.com/300x450.png?text=Falta+Portada+O+Imagen' } }
        );

        console.log(`Operación finalizada. Portadas actualizadas: ${result.modifiedCount}`);
    } catch (error) {
        console.error('Error actualizando portadas:', error);
    } finally {
        await mongoose.disconnect();
    }
};

updateCovers();
