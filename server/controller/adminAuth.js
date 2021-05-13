const adminEnsureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please log in as a admin to view that resource');
    res.redirect('/users/login');
  }

const adminForwardAuthenticated = (req, res, next) =>{
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/users/adminLogin');      
  }
