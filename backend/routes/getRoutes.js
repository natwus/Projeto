const express = require('express');
const { getUsers, getSuppliers, getProducts } = require('../controllers/getController');

const router = express.Router();

router.get('/users', getUsers);
router.get('/suppliers', getSuppliers);
router.get('/products', getProducts);

module.exports = router;
