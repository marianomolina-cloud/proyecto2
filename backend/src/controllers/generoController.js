const generoService = require('../services/generoService');

// Manejar solicitud GET
const getGeneros = async (req, res) => {
    try {
        const generos = await generoService.getGeneros();
        res.status(200).json(generos);
    } catch (error) {
        res.status(500).json({ msj: 'Error interno del servidor', error: error.message });
    }
};

// Manejar solicitud POST
const createGenero = async (req, res) => {
    try {
        const generoCreado = await generoService.createGenero(req.body);
        res.status(201).json(generoCreado);
    } catch (error) {
        res.status(400).json({ msj: 'Error en la petición de registro', error: error.message });
    }
};

// Manejar solicitud PUT
const updateGenero = async (req, res) => {
    try {
        const { id } = req.params;
        const generoActualizado = await generoService.updateGenero(id, req.body);
        
        if (!generoActualizado) {
            return res.status(404).json({ msj: 'Género no encontrado' });
        }
        res.status(200).json(generoActualizado);
    } catch (error) {
        res.status(500).json({ msj: 'Error interno del servidor', error: error.message });
    }
};

// Manejar solicitud DELETE
const deleteGenero = async (req, res) => {
    try {
        const { id } = req.params;
        const generoEliminado = await generoService.deleteGenero(id);
        if (!generoEliminado) {
            return res.status(404).json({ msj: 'Género no encontrado' });
        }
        res.status(200).json({ msj: 'Género eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ msj: 'Error interno del servidor', error: error.message });
    }
};

module.exports = {
    getGeneros,
    createGenero,
    updateGenero,
    deleteGenero
};
