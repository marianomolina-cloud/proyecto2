const { Router } = require('express');
const { getMedia, createMedia, updateMedia } = require('../controllers/mediaController');

const router = Router();

router.get('/', getMedia);
router.post('/', createMedia);
router.put('/:id', updateMedia);

module.exports = router;
