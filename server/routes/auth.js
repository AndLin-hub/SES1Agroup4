const express = require('express');
const router = express.Router();
const passport = require('passport')

//import functions 
const BookingController = require('../controller/Booking')
const AuthController = require('../controller/Authorization')
const initializePassport = require('../controller/passport')
const Booking = require('../model/Booking');
const { ReplSet } = require('mongodb');

initializePassport(
    passport,
    email => users.find(user => user.email == email),
    id => users.find(user=> user.id ==id)
)

//grabbing info from post of register html page to make database
router.post('/register', AuthController.register)

router.get('/login',(req,res)=>{
  res.render('login')
});

//redirect to register 
router.get('/register',(req,res)=>{
  res.render('register')
});

router.get('/booking',AuthController.ensureAuthenticated,(req,res)=>{
  res.render('booking')
});

router.get('/menu',(req,res)=>{
  res.render('menu')
});

router.get('/changeBooking',(req,res,next) =>{
  //Here fetch data using mongoose query like
  Booking.find({}, function(err, data) {
  if (err) throw err;
  // object of all the users
  res.render('changeBooking',{Booking:data});
}).sort({"date":1})
});

router.get('/userBooking', AuthController.ensureAuthenticated, (req,res,next) =>{
  //Here fetch data using mongoose query like
  Booking.find({email: req.user.email}, function(err, data) {
  if (err) throw err;
  // object of all the users
  res.render('changeBooking',{Booking:data});
}).sort({"date":1})
});

router.get('/edit/:id', (req,res) =>{
  var editId = req.params.id
  userData = Booking.findById(editId)
  userData.exec(function(err,data){
    if(err) throw err
    res.render('editBooking',{userData:data})
  })
}
)


router.get('/delete/:id', (req,res,next) => {
  var deleteId = req.params.id
  userData = Booking.findByIdAndDelete(deleteId)
  userData.exec(function(err,data){
    if(err) throw err
  })
  next()
},(req,res)=>{
  req.flash("success_msg", "Booking deleted successfully")
  res.redirect('/users/userBooking')
}
)

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});
//

router.post('/edit/:id',(req,res) => {
  var inputData = req.body
  var editId = req.params.id
  userData = Booking.findByIdAndUpdate(editId, inputData)
  userData.exec(function(err,data){
    if(err) throw err;
    req.flash("success_msg","Booking successfully editted")
    res.redirect('/users/userBooking')
  })
}
)



router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/users/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
});

router.get('/dashboard', AuthController.ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

router.get('/adminLogin', (req, res) =>
  res.render('adminLogin')
);


router.post('/booking', BookingController.book)


//export router to other file to use
module.exports = router;