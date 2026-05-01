const Tipo = require('../models/Tipo');

const getTipos = async () => {
    return await Tipo.find();
};

const createTipo = async (data) => {
    const nuevoTipo = new Tipo(data);
    return await nuevoTipo.save();
};

const updateTipo = async (id, data) => {
    data.fechaActualizacion = new Date();
    return await Tipo.findByIdAndUpdate(id, data, { new: true });
};

module.exports = {
    getTipos,
    createTipo,
    updateTipo
};
