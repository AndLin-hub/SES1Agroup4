const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bookingSchema = new Schema({
        firstName: {type: String, required:true},
        lastName: {type: String, required:true},
        email: {type: String, required:true},
        date: {type: Date, requried:true},
        time: {type: String, required:true},
        capacity: {type: Number, required:true}
});

const Booking = mongoose.model("Booking",bookingSchema);

module.exports = Booking;