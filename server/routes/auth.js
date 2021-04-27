const express = require('express');
const router = express.Router();

const BookingController = require('../controller/Booking')
const AuthController = require('../controller/Authorization')
//grabbing info from post of register html page to make database
router.post('/register', AuthController.register)

//
router.post('/login',AuthController.login)

router.post('/booking',BookingController.book)

//export router to other file to use
module.exports = router;