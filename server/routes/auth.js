const express = require('express');
const router = express.Router();
const passport = require('passport')

//import functions 
const BookingController = require('../controller/Booking')
const AuthController = require('../controller/Authorization')
const initializePassport = require('../controller/passport')
const Booking = require('../model/Booking');
const Customer = require('../model/Customer')
const { ReplSet } = require('mongodb');

initializePassport(
    passport,
    email => users.find(user => user.email == email),
    id => users.find(user=> user.id ==id)
)

//grabbing info from post of register html page to make database
router.post('/register', (req,res,next) =>{
 const { firstName, lastName, email, password, password2 } = req.body;
let errors = [];

if (!firstName || !lastName || !email || !password || !password2) {
  errors.push({ msg: 'Please enter all fields' });
}

if (password != password2) {
  errors.push({ msg: 'Passwords do not match' });
}

if (password.length < 8) {
  errors.push({ msg: 'Password must be at least 8 characters' });
}

if (errors.length > 0) {
  res.render('register', {
    errors,
    firstName,
    lastName,
    email,
    password,
    password2
  });
}
next()},AuthController.register)

router.get('/login',(req,res)=>{
  res.render('login')
});

//redirect to register 
router.get('/register', 
  (req,res)=>{
  res.render('register')
});

router.get('/adminBooking',AuthController.ensureAdminAuthenticated,(req,res)=>{
  res.render('booking')
});

router.get('/booking',AuthController.ensureAuthenticated,(req,res)=>{
  Customer.find({email: req.user.email}, function(err, data) {
    if (err) throw err;
    // object of all the users
    res.render('customerBooking',{Customer:data});
});
})

router.get('/menu',(req,res)=>{
  res.render('menu')
});

router.get('/changeBooking',AuthController.ensureAdminAuthenticated,(req,res,next) =>{
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
  res.render('userBooking',{Booking:data});
}).sort({"date":1})
});

router.get('/changeUser', AuthController.ensureAdminAuthenticated, (req,res,next) =>{
  //Here fetch data using mongoose query like
  Customer.find({}, function(err, data) {
  if (err) throw err;
  // object of all the users
  res.render('adminUserInfo',{Customer:data});
}).sort({"date":1})
});


router.get('/userInfo', AuthController.ensureAuthenticated, (req,res,next) =>{
  //Here fetch data using mongoose query like
  Customer.find({email: req.user.email}, function(err, data) {
  if (err) throw err;
  // object of all the users
  res.render('userInfo',{Customer:data});
}).sort({"date":1})
});

router.get('/edit/:id',AuthController.ensureAuthenticated, (req,res) =>{
  var editId = req.params.id
  userData = Booking.findById(editId)
  userData.exec(function(err,data){
    if(err) throw err
    res.render('editBooking',{userData:data})
  })
}
)

router.get('/profileEdit/:id',AuthController.ensureAuthenticated, (req,res) =>{
  var editId = req.params.id
  userData = Customer.findById(editId)
  userData.exec(function(err,data){
    if(err) throw err
    res.render('editUserInfo',{userData:data})
  })
}
)

router.post('/profileEdit/:id',AuthController.ensureAuthenticated,(req,res) => {
  var inputData = req.body
  var editId = req.params.id
  userData = Customer.findByIdAndUpdate(editId, inputData)
  userData.exec(function(err,data){
    if(err) throw err;
    req.flash("success_msg","User profile successfully updated")
    res.redirect('/users/userInfo')
  })
}
)

router.get('/userEdit/:id',AuthController.ensureAdminAuthenticated, (req,res) =>{
  var editId = req.params.id
  userData = Customer.findById(editId)
  userData.exec(function(err,data){
    if(err) throw err
    res.render('editAdminUserInfo',{userData:data})
  })
}
)

router.post('/userEdit/:id',AuthController.ensureAdminAuthenticated,(req,res) => {
  var inputData = req.body
  var editId = req.params.id
  userData = Customer.findByIdAndUpdate(editId, inputData)
  userData.exec(function(err,data){
    if(err) throw err;
    req.flash("success_msg","User profile successfully updated")
    res.redirect('/users/changeUser')
  })
}
)

router.get('/userDelete/:id', AuthController.ensureAdminAuthenticated, (req,res,next) => {
  var deleteId = req.params.id
  userData = Customer.findByIdAndDelete(deleteId)
  userData.exec(function(err,data){
    if(err) throw err
  })
  next()
},(req,res)=>{
  req.flash("success_msg", "User deleted successfully")
  res.redirect('/users/changeUser')
}
)


router.get('/adminEdit/:id',AuthController.ensureAdminAuthenticated, (req,res) =>{
  var editId = req.params.id
  userData = Booking.findById(editId)
  userData.exec(function(err,data){
    if(err) throw err
    res.render('editAdminBooking',{userData:data})
  })
}
)



router.get('/delete/:id', AuthController.ensureAuthenticated, (req,res,next) => {
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
  res.redirect('/');
});
//

router.post('/edit/:id',AuthController.ensureAuthenticated,(req,res) => {
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

router.post('/adminEdit/:id',AuthController.ensureAdminAuthenticated,(req,res) => {
  var inputData = req.body
  var editId = req.params.id
  userData = Booking.findByIdAndUpdate(editId, inputData)
  userData.exec(function(err,data){
    if(err) throw err;
    req.flash("success_msg","Booking successfully editted")
    res.redirect('/users/changeBooking')
  })
}
)

router.get('/adminDelete/:id', AuthController.ensureAdminAuthenticated, (req,res,next) => {
  var deleteId = req.params.id
  userData = Booking.findByIdAndDelete(deleteId)
  userData.exec(function(err,data){
    if(err) throw err
  })
  next()
},(req,res)=>{
  req.flash("success_msg", "Booking deleted successfully")
  res.redirect('/users/changeBooking')
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

router.get('/adminLogin',(req,res) => {
  res.render('adminLogin')
})

router.post('/adminLogin' ,AuthController.isAdmin, (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/users/adminDashboard',
    failureRedirect: '/users/adminLogin',
    failureFlash: true
  })(req, res, next);
});

router.get('/adminDashboard', AuthController.ensureAdminAuthenticated, (req,res) => {
  res.render('adminDashboard',{user:req.user})
})

router.post('/booking', BookingController.book)

router.post('/adminBooking', BookingController.book)
//export router to other file to use
module.exports = router;