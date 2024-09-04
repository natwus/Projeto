const express = require('express');
const { getCategorias, getFornecedores } = require('../controllers/infoController');

const router = express.Router();

router.get('/categorias', getCategorias);
router.get('/fornecedores', getFornecedores);

module.exports = router;
