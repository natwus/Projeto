const express = require('express');
const router = express.Router();
const { registerSupplier, deleteSupplier, getSuppliers, getFornecedores, getCategorias } = require('../controllers/supplierController');

router.post('/registerSupplier', registerSupplier );
router.get('/suppliers', getSuppliers);
router.delete('/deleteSupplier/:id', deleteSupplier);
router.get('/fornecedores', getFornecedores);
router.get('/categorias', getCategorias);

module.exports = router;