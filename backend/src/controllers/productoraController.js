const productoraService = require('../services/productoraService');

const getProductoras = async (req, res) => {
    try {
        const productoras = await productoraService.getProductoras();
        res.status(200).json(productoras);
    } catch (error) {
        res.status(500).json({ msj: 'Error interno del servidor', error: error.message });
    }
};

const createProductora = async (req, res) => {
    try {
        const productoraCreada = await productoraService.createProductora(req.body);
        res.status(201).json(productoraCreada);
    } catch (error) {
        res.status(400).json({ msj: 'Error en la petición de registro', error: error.message });
    }
};

const updateProductora = async (req, res) => {
    try {
        const { id } = req.params;
        const productoraActualizada = await productoraService.updateProductora(id, req.body);
        if (!productoraActualizada) {
            return res.status(404).json({ msj: 'Productora no encontrada' });
        }
        res.status(200).json(productoraActualizada);
    } catch (error) {
        res.status(500).json({ msj: 'Error interno del servidor', error: error.message });
    }
};

module.exports = {
    getProductoras,
    createProductora,
    updateProductora
};
