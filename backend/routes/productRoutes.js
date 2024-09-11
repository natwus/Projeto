const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { registerProduct, deleteProduct, getProducts, updateProduct, getLogs } = require('../controllers/productController');

const conditionalUpload = (req, res, next) => {
    upload.single('imagem')(req, res, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Erro no upload da imagem' });
        }
        next();
    });
};

router.post('/registerProduct', conditionalUpload, registerProduct);
router.get('/products', getProducts);
router.get('/logs', getLogs);
router.post('/updateProduct', conditionalUpload, updateProduct);
router.delete('/deleteProduct/:id', deleteProduct);

module.exports = router;
