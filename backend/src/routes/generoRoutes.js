const { Router } = require('express');
const { getGeneros, createGenero, updateGenero, deleteGenero } = require('../controllers/generoController');

const router = Router();

// GET /api/generos
router.get('/', getGeneros);

// POST /api/generos
router.post('/', createGenero);

// PUT /api/generos/:id
router.put('/:id', updateGenero);

// DELETE /api/generos/:id
router.delete('/:id', deleteGenero);

module.exports = router;
