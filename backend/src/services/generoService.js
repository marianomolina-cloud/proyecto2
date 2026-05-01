const Genero = require('../models/Genero');

// Obtener todos los géneros
const getGeneros = async () => {
    return await Genero.find();
};

// Crear un género
const createGenero = async (data) => {
    const nuevoGenero = new Genero(data);
    return await nuevoGenero.save();
};

// Actualizar un género
const updateGenero = async (id, data) => {
    data.fechaActualizacion = new Date();
    return await Genero.findByIdAndUpdate(id, data, { new: true });
};

// Borrar un género
const deleteGenero = async (id) => {
    return await Genero.findByIdAndDelete(id);
};

module.exports = {
    getGeneros,
    createGenero,
    updateGenero,
    deleteGenero
};
