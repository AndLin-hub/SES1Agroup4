const express = require('express');
const router = express.Router();

const AuthController = require('../controller/Authorization')
//grabbing info from post of register html page to make database
router.post('/register', AuthController.register)

//
router.post('/login',AuthController.login)

//export router to other file to use
module.exports = router;