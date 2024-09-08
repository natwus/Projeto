const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { registerProduct, deleteProduct, getProducts, updateProduct } = require('../controllers/productController');

router.post('/registerProduct', upload.single('imagem'), registerProduct);
router.get('/products', getProducts);
router.post('/updateProduct', upload.single('imagem'),  updateProduct);
router.delete('/deleteProduct/:id', deleteProduct);

module.exports = router;