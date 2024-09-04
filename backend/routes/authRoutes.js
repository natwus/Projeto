const express = require('express');
const { register, registerSupplier, login } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/registerSupplier', registerSupplier )

module.exports = router;
