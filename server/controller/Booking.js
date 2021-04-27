const Booking = require('../model/Booking');

const book  = (req,res,next) => {
    let book = new Booking({
        firstName: req.body.name.split(" ")[0],
        lastName: req.body.name.split(" ")[1],
        email: req.body.email,
        date: req.body.date,
        time: req.body.time,
        capacity: req.body.select
    })
    console.log(req.body)
    book.save()
        .then(user => {
            res.json({
                message: 'Booking Added Successfully'
            })
        })
        .catch(error => {
            res.json({
                message: error
            })
        })
    
}

module.exports = {book}