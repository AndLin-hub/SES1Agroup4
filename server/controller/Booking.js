const Booking = require('../model/Booking');
const Customer = require('../model/Customer');


const book  = async (req,res,next) => {

Customer.findOne({email: req.body.email})
    .then(user => {
      if(user){
        Booking.findOne({email:  req.body.email,
                      date: req.body.date,
                      time: req.body.time})
        .then(booking => {
            if(booking){
                req.flash('error_msg','Booking already exists')
                res.redirect('/users/booking')
             }else{
                let book = new Booking({
                firstName: req.body.name.split(" ")[0],
                lastName: req.body.name.split(" ")[1],
                email: req.body.email,
                date: req.body.date,
                time: req.body.time,
                capacity: req.body.select
                })
            book.save()
                .then(booking => {
                    req.flash('success_msg','Booking added successfully')
                    res.redirect('/')
                })
                .catch(error => {
                    res.json({ message: "error at save"})
                })
             }
        
        })
        .catch(error =>{
            res.json({message: "error find"})
        })
        }
        else{
            req.flash('error_msg', "Email does not exist")
            res.redirect('/users/booking')
        }
    })
    .catch(error =>{
        res.json({message: error})
    })
}

module.exports = {book,
    fetchData:function(req, res){
        Booking.fetchData(function(data){
            res.render('changeBooking',{userData:data});
        })
      }}