const { Router } = require('express');
const { getTipos, createTipo, updateTipo } = require('../controllers/tipoController');

const router = Router();

router.get('/', getTipos);
router.post('/', createTipo);
router.put('/:id', updateTipo);

module.exports = router;
