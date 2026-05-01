const Productora = require('../models/Productora');

const getProductoras = async () => {
    return await Productora.find();
};

const createProductora = async (data) => {
    const nuevaProductora = new Productora(data);
    return await nuevaProductora.save();
};

const updateProductora = async (id, data) => {
    data.fechaActualizacion = new Date();
    return await Productora.findByIdAndUpdate(id, data, { new: true });
};

module.exports = {
    getProductoras,
    createProductora,
    updateProductora
};
