const express = require('express');
const router = express.Router();
const { registerUser, loginUser, deleteUser, getUsers, getUserName, updateUser } = require('../controllers/userController');

router.post('/registerUser', registerUser);
router.post('/loginUser', loginUser);
router.get('/nome', getUserName);
router.get('/users', getUsers);
router.post('/updateUser', updateUser)
router.delete('/deleteUser/:id', deleteUser);

module.exports = router;