const { Router } = require('express');
const { getDirectores, createDirector, updateDirector, deleteDirector } = require('../controllers/directorController');

const router = Router();

router.get('/', getDirectores);
router.post('/', createDirector);
router.put('/:id', updateDirector);

module.exports = router;
