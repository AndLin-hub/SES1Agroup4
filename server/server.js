require('dotenv').config();
const { urlencoded } = require('express');
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose');
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const passport = require('passport');
const url = process.env.MONGO_URI;


//Passport MiddleWare
app.use(passport.initialize());
app.use(passport.session());
require('./controller/passport')(passport);

//setting up cookies, session and flash

app.use(cookieParser(process.env.secret_code));
app.use(expressSession({
    secret: process.env.secret_code,
    cookie: {
        maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
}))
app.use(flash());

//connect to database
mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true});

const AuthRoute = require('./routes/auth')


//set view engine
app.use(expressLayouts)
app.set('view engine','ejs');


//flash messages 
app.use((req, res, next) =>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});


//allows for the fields in the html to be grabbed/ body  parser
app.use(express.urlencoded({extended: false})); 

//css for the register page
app.use(express.static(__dirname +'/public'))

app.get('/',(req,res)=>{
    res.render('mainpage');
});

//redirect to login html
app.get('/users/login',(req,res)=>{
    res.render('login')
});

//redirect to register html
app.get('/users/register',(req,res)=>{
    res.render('register')
});

app.get('/users/booking',(req,res)=>{
    res.render('booking')
});

app.get('/users/menu',(req,res)=>{
    res.render('menu')
});


app.use('/users',AuthRoute);

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
}



function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
}
  
app.listen(2); 