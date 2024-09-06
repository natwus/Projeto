const express = require('express');
const upload = require('../middleware/uploadMiddleware');
const { register, registerSupplier, registerProduct, login } = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/registerSupplier', registerSupplier );
router.post('/registerProduct', upload.single('imagem'), registerProduct);

// router.get('/dadosProtegidos', verifyToken, (req, res) => {
//     res.json({ message: `Dados protegidos acessados pelo usuário ${req.userId}` });
// }); EXEMPLO PARA ROTA PROTEGIDA

module.exports = router;
