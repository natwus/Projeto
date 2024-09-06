const express = require('express');
const { getUsers, getSuppliers, getProducts, getUserById } = require('../controllers/getController');

const router = express.Router();

router.get('/userById/:id', getUserById);
router.get('/users', getUsers);
router.get('/suppliers', getSuppliers);
router.get('/products', getProducts);

module.exports = router;
