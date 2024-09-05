const express = require('express');
const { getCategorias, getFornecedores, getUserName } = require('../controllers/infoController');

const router = express.Router();

router.get('/nome', getUserName);
router.get('/categorias', getCategorias);
router.get('/fornecedores', getFornecedores);

module.exports = router;
