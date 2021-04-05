const express = require('express');
const router = express.Router();

const AuthController = require('../controller/Authorization')
//grabbing info from post of register html page to make database
router.post('/', AuthController.register)

//export router to other file to use
module.exports = router;