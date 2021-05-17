const express = require('express')
const router = express.Router();

router.get('/login',(req,res)=>{
    res.render("login.ejs");
})


router.get('/register',(req,res)=>{
    res.render("register.ejs");
})

router.get('/booking',(req,res)=>{
    res.render("booking.ejs");
})

router.get('/menu',(req,res)=>{
    res.render("menu.ejs");
})

//Register Handle
router.post('/register', require('../controller/User.js').register)


//login handle
router.post('/login',require('../controller/User.js').login)







module.exports = router;