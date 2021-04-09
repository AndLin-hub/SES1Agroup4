require('dotenv').config();
const { urlencoded } = require('express');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const url = process.env.MONGO_URI;


//connect to database
mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true});

const AuthRoute = require('./routes/auth')

const htmlRoute = require('./routes/index')

//set view engine
app.set('view-engine','html');

//allows for the fields in the html to be grabbed/ body  parser
app.use(express.urlencoded({extended: false})); 

//css for the register page
app.use("/",express.static(__dirname + "/css"));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + ('/views/mainpage.html'));
});

//redirect to login html
app.get('/users/login',(req,res)=>{
    res.sendFile(__dirname +'/views/login.html')
});

//redirect to register html
app.get('/users/register',(req,res)=>{
    res.sendFile(__dirname +'/views/register.html')
});

app.get('/users/booking',(req,res)=>{
    res.sendFile(__dirname +'/views/booking.html')
});

app.get('/users/menu',(req,res)=>{
    res.sendFile(__dirname +'/views/menu.html')
});


//app.use('/',htmlRoute) (doesn't work properly for now)
app.use('/users',AuthRoute);


app.listen(2); 