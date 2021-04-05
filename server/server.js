require('dotenv').config();
const { urlencoded } = require('express');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const url = process.env.MONGO_URI;

const AuthRoute = require('./routes/auth.js');


//connect to database
mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true});


//set view engine
app.set('view-engine','html');

app.use(express.urlencoded({extended: false})); 

//css for the register page
app.use("/",express.static(__dirname + "/css"));

//mainpage
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/view/mainpage.html');
});

//redirect to login html
app.get('/login',(req,res)=>{
    res.sendFile(__dirname+'/view/login.html')
});

//redirect to register html
app.get('/register',(req,res)=>{
    res.sendFile(__dirname+'/view/register.html')
});

app.post('/register',AuthRoute, (req, res)=>{
    console.log(req.body);
})



app.listen(2001)    
    