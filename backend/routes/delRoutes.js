const express = require('express');
const { deleteUser, deleteSupplier, deleteProduct } = require('../controllers/delController');

const router = express.Router();

router.delete('/deleteUser/:id', deleteUser);
router.delete('/deleteSupplier/:id', deleteSupplier);
router.delete('/deleteProduct/:id', deleteProduct);

module.exports = router;