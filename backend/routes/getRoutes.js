const express = require('express');
const { getUserName, getUsers } = require('../controllers/getController');

const router = express.Router();

router.get('/nome', getUserName);
router.get('/users', getUsers);

module.exports = router;
