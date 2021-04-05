const Customer = require('../model/Customer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const register = (req,res,next) => {
    bcrypt.hash(req.body.password,10 , function(err,hashedPass){
        if(err){
            res.json({
                error: err
            })
        }
        //collecting all the data on new customer
        let customer = new Customer ({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPass,
            DateOfBirth: req.body.dob
        })
        //saving data into database
        customer.save()
        .then(user => {
            res.json({
                message: 'User Added Successfully'
            })
        })
        .catch(error => {
            res.json({
                message: error
            })
        })
    })
};

module.exports =  { 
    register
}

