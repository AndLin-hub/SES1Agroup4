require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const url = process.env.MONGO_URI;
mongoose.connect(url,{useNewUrlParser: true});

const Schema = mongoose.Schema;
var customerSchema = new Schema({
    firstName: {type: String, required: true},
    lastName:  {type: String, required: true},
    password:  {type: String, required: true}
});

const Customer = mongoose.model("Person",customerSchema);

app.set('view-engine','html');
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/view/mainpage.html');
});

app.listen(3000)