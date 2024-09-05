const express = require('express');
const { getUserName, getUsers, getSuppliers, getProducts } = require('../controllers/getController');

const router = express.Router();

router.get('/nome', getUserName);
router.get('/users', getUsers);
router.get('/suppliers', getSuppliers);
router.get('/products', getProducts);

module.exports = router;
