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

//importing functions
const auth = require('./controller/Authorization')
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

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

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
app.use(express.static(__dirname +'/css'))


app.get('/',(req,res)=>{
    res.render('homepage');
});
app.use('/users',AuthRoute);

  
app.listen(2); 