const { Router } = require('express');

const generoRoutes = require('./generoRoutes');
const directorRoutes = require('./directorRoutes');
const productoraRoutes = require('./productoraRoutes');
const tipoRoutes = require('./tipoRoutes');
const mediaRoutes = require('./mediaRoutes');

const router = Router();

// Enlazando todos los archivos de rutas
router.use('/generos', generoRoutes);
router.use('/directores', directorRoutes);
router.use('/productoras', productoraRoutes);
router.use('/tipos', tipoRoutes);
router.use('/media', mediaRoutes);

module.exports = router;
