const express = require('express');
const router = express.Router();
const { registerUser, loginUser, deleteUser, getUsers, getUserName, updateUser, getPermitions } = require('../controllers/userController');

router.post('/registerUser', registerUser);
router.post('/loginUser', loginUser);
router.get('/nome', getUserName);
router.get('/users', getUsers);
router.get('/permitions', getPermitions);
router.post('/updateUser', updateUser)
router.delete('/deleteUser/:id', deleteUser);

module.exports = router;