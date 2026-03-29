const directorService = require('../services/directorService');

const getDirectores = async (req, res) => {
    try {
        const directores = await directorService.getDirectores();
        res.status(200).json(directores);
    } catch (error) {
        res.status(500).json({ msj: 'Error interno del servidor', error: error.message });
    }
};

const createDirector = async (req, res) => {
    try {
        const directorCreado = await directorService.createDirector(req.body);
        res.status(201).json(directorCreado);
    } catch (error) {
        res.status(400).json({ msj: 'Error en la petición de registro', error: error.message });
    }
};

const updateDirector = async (req, res) => {
    try {
        const { id } = req.params;
        const directorActualizado = await directorService.updateDirector(id, req.body);
        if (!directorActualizado) {
            return res.status(404).json({ msj: 'Director no encontrado' });
        }
        res.status(200).json(directorActualizado);
    } catch (error) {
        res.status(500).json({ msj: 'Error interno del servidor', error: error.message });
    }
};

module.exports = {
    getDirectores,
    createDirector,
    updateDirector
};
