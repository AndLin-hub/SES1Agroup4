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
            req.flash('error_msg', 'Email already exists')
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


const ensureAuthenticated = (req, res, next) => {
      if (req.isAuthenticated()) {
        return next();
      }
      req.flash('error_msg', 'Please log in to view that resource');
      res.redirect('/users/login');
    }

const forwardAuthenticated = (req, res, next) =>{
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect('/users/dashboard');      
    }



const isAdmin = (req,res,next) => {
        Customer.findOne({email: req.body.email})
        .then(user => {
            if (!user) {
                req.flash('error_msg',"Email doesn't exist")
                res.redirect('/users/adminLogin')
              }
            if(user){
                if(user.admin){
                    return next()
                }else{
                    req.flash('error_msg',"Please log in as admin to view")
                    res.redirect('/users/adminLogin')
                }
            }
            
        })
        .catch(error =>{
            res.json({message: error})
        })

    }

    const ensureAdminAuthenticated = (req, res, next) => {
        if (req.isAuthenticated()) {
            if(req.user.admin){
            return next();
            }
        }
        req.flash('error_msg', 'Please log in as Admin to view that resource');
        res.redirect('/users/adminLogin');
      }
  


module.exports =  { 
    register,
    ensureAuthenticated,
    forwardAuthenticated,
    isAdmin,
    ensureAdminAuthenticated
}

