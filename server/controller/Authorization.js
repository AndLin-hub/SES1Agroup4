const Customer = require('../model/Customer');
const bcrypt = require('bcryptjs');


const register = (req,res,next) => {
    bcrypt.hash(req.body.password,10 , function(err,hashedPass){
        if(err){
            res.json({
                error: err
            })
        }
        //collecting all the data on new customer
        Customer.findOne({email: req.body.email}).then(user =>{
        if(user){
            req.flash('error_msg', 'User already exists')
            res.redirect('/users/register')
        }else{
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
            req.flash(
                'success_msg',
                'You are now registered and can log in'
            )
            res.redirect('/users/login')
        })
        .catch(error => {
           res.json(error)          
        })
        }
        })
    })
};


const login = (req,res,next) => {
     Customer.findOne({email: req.body.email})
    .then(user =>{
       bcrypt.compare(req.body.password, user.password, (err, result)=>{
        if(result){
            res.json({message: "Welcome " + user.firstName})
       }
       else{
           res.json({message: "Incorrect Password"})
        }
    }
       )

       
    })
    .catch( err => res.json({message: "User does not exist"}))
}




module.exports =  { 
    register,
    login
}

