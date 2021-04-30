const express = require('express');
const router = express.Router();

const BookingController = require('../controller/Booking')
const AuthController = require('../controller/Authorization')
const Passport = require('../controller/passport')
//grabbing info from post of register html page to make database
router.post('/register', AuthController.register)

//
router.post('/login',Passport)

router.post('/booking',BookingController.book)

//export router to other file to use
module.exports = router;