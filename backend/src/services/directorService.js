const Director = require('../models/Director');

const getDirectores = async () => {
    return await Director.find();
};

const createDirector = async (data) => {
    const nuevoDirector = new Director(data);
    return await nuevoDirector.save();
};

const updateDirector = async (id, data) => {
    data.fechaActualizacion = new Date();
    return await Director.findByIdAndUpdate(id, data, { new: true });
};

const deleteDirector = async (id) => {
    return await Director.findByIdAndDelete(id);
};

module.exports = {
    getDirectores,
    createDirector,
    updateDirector,
    deleteDirector
};
