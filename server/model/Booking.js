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

function fetchData(callback){
        var userData=Booking.find({}).sort({"date":1})
        userData.exec(function(err,data){
                if(err) throw err;
                return callback(data);
        })
}

module.exports = {Booking,
                fetchData
        }