require('dotenv').config();
const { urlencoded } = require('express');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const url = process.env.MONGO_URI;
mongoose.connect(url,{useNewUrlParser: true});

//template for customer field for database
const Schema = mongoose.Schema;
var customerSchema = new Schema({
    firstName: {type: String, required: true},
    lastName:  {type: String, required: true},
    password:  {type: String, required: true},
    DateOfBirth: {type: Date},
    phoneNumber:{type: String},
    email: {type: String, required: true}
});

const Customer = mongoose.model("Person",customerSchema);

//create empty array for customer database for schema
Customer.create([]);

//set view engine
app.set('view-engine','html');

//css for the register page
app.use("/register",express.static(__dirname + "/css/register.css"));

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



app.listen(3001)    
