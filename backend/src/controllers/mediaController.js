const mediaService = require('../services/mediaService');

const getMedia = async (req, res) => {
    try {
        const media = await mediaService.getMedia();
        res.status(200).json(media);
    } catch (error) {
        res.status(500).json({ msj: 'Error interno del servidor', error: error.message });
    }
};

const createMedia = async (req, res) => {
    try {
        const mediaCreada = await mediaService.createMedia(req.body);
        res.status(201).json(mediaCreada);
    } catch (error) {
        res.status(400).json({ msj: 'Error en la petición de registro', error: error.message });
    }
};

const updateMedia = async (req, res) => {
    try {
        const { id } = req.params;
        const mediaActualizada = await mediaService.updateMedia(id, req.body);
        if (!mediaActualizada) {
            return res.status(404).json({ msj: 'Media no encontrada' });
        }
        res.status(200).json(mediaActualizada);
    } catch (error) {
        res.status(500).json({ msj: 'Error interno del servidor', error: error.message });
    }
};

const deleteMedia = async (req, res) => {
    try {
        const { id } = req.params;
        const mediaEliminada = await mediaService.deleteMedia(id);
        if (!mediaEliminada) {
            return res.status(404).json({ msj: 'Media no encontrada' });
        }
        res.status(200).json({ msj: 'Media eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ msj: 'Error interno del servidor', error: error.message });
    }
};

module.exports = {
    getMedia,
    createMedia,
    updateMedia,
    deleteMedia
};
