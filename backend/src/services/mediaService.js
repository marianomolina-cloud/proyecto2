const Media = require('../models/Media');

const getMedia = async () => {
    // Populate to join with related reference collections
    return await Media.find()
        .populate('generoPrincipal')
        .populate('directorPrincipal')
        .populate('productora')
        .populate('tipo');
};

const createMedia = async (data) => {
    const nuevaMedia = new Media(data);
    return await nuevaMedia.save();
};

const updateMedia = async (id, data) => {
    data.fechaActualizacion = new Date();
    return await Media.findByIdAndUpdate(id, data, { new: true });
};

const deleteMedia = async (id) => {
    return await Media.findByIdAndDelete(id);
};

module.exports = {
    getMedia,
    createMedia,
    updateMedia,
    deleteMedia
};
