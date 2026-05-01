const tipoService = require('../services/tipoService');

const getTipos = async (req, res) => {
    try {
        const tipos = await tipoService.getTipos();
        res.status(200).json(tipos);
    } catch (error) {
        res.status(500).json({ msj: 'Error interno del servidor', error: error.message });
    }
};

const createTipo = async (req, res) => {
    try {
        const tipoCreado = await tipoService.createTipo(req.body);
        res.status(201).json(tipoCreado);
    } catch (error) {
        res.status(400).json({ msj: 'Error en la petición de registro', error: error.message });
    }
};

const updateTipo = async (req, res) => {
    try {
        const { id } = req.params;
        const tipoActualizado = await tipoService.updateTipo(id, req.body);
        if (!tipoActualizado) {
            return res.status(404).json({ msj: 'Tipo no encontrado' });
        }
        res.status(200).json(tipoActualizado);
    } catch (error) {
        res.status(500).json({ msj: 'Error interno del servidor', error: error.message });
    }
};

module.exports = {
    getTipos,
    createTipo,
    updateTipo
};
