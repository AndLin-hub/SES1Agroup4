const  User = require('../models/User')
const  bcrypt = require('bcryptjs');

const register = (req,res,next) => {
    bcrypt.hash(req.body.password,10 , function(err,hashedPass){
        if(err){
            res.json({
                error: err
            })
        }
        //collecting all the data on new customer
        let user = new User ({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPass,
            DateOfBirth: req.body.dob
        })
        //saving data into database
        user.save()
        .then(user => {
            res.json({
                message: 'User Added Successfully'
            })
        })
        .catch(error => {
            res.json({message: error})
        })
    })
};


const login = (req,res,next) => {
    User.findOne({email: req.body.email})
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

    .catch(err =>res.json({message: "User does not exist"}))

}










module.exports =  { 
    register,
    login
}
