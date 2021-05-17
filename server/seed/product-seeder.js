var  Product = require('../models/Product');

var mongoose = require('mongoose');
const { exists } = require('../model/Booking');

mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true});


var product = [
    new Product({
        imagePath: '../Menu/images/dandanmian.png',
        title: 'Baked Chicken and Potato',
        price: 10
    }),
    new Product({
        imagePath: '../Menu/images/dandanmian.png',
        title: 'Beef bourguignon',
        price: 14
    }),
    new Product({
        imagePath: '../Menu/images/huiguochaocai.png',
        title: 'Piperade',
        price: 7
    }),
    new Product({
        imagePath: '../Menu/images/jiachang.png',
        title: 'French Omelette with bread',
        price: 8
    }),
    new Product({
        imagePath: '../Menu/images/shuijiao.png',
        title: 'Clam and Crab stew',
        price: 16
    }),
    new Product({
        imagePath: '../Menu/images/yuxiangrousi.png',
        title: 'Coq au vin',
        price: 14
    }),
    new Product({
        imagePath: '../Menu/images/qingjiaoyumi.png',
        title: 'Foie gras',
        price: 12
    })
];

var done = 0;
for (var i = 0; i < products.length; i++) {
    products[i].save(function(err, result) {
       done++;
       if (done === product.length) {
            exist();
        }
    });
}

function exit() {
    mongoose.disconnect();
}



