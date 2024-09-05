const express = require('express');
const upload = require('../middleware/uploadMiddleware');
const { register, registerSupplier, registerProduct, login } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/registerSupplier', registerSupplier );
router.post('/registerProduct', upload.single('imagem'), registerProduct);

module.exports = router;
