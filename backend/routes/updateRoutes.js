const express = require('express');
const router = express.Router();
const { updateUser } = require('../controllers/updateController');
const authenticateToken = require('../middleware/authMiddleware');

router.put('/updateUsers/:id', authenticateToken, updateUser);

module.exports = router;