const mongoose = require('mongoose');
const { MONGO_URI } = require('./index');

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('--- Conexión exitosa a MongoDB Atlas ---');
    } catch (error) {
        console.error('--- Error conectando a MongoDB ---', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
