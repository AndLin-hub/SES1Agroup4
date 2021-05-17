require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const app = express();
const mongoose = require('mongoose');

var db = process.env.MONGO_URI;

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs')

//body-parser
app.use(express.urlencoded({extended: false}));


//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'))

app.listen(3000);