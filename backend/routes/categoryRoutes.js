const express = require('express');
const { getCategorias } = require('../controllers/categoryController');

const router = express.Router();

router.get('/categorias', getCategorias);

module.exports = router;
