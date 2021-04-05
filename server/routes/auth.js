const express = require('express');
const router = express.Router();

const AuthController = require('../controller/Authorization')

router.post('/register', AuthController.register)

module.exports = router;