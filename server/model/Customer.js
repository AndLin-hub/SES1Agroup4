//template for customer field for database
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var customerSchema = new Schema({
    firstName: {type: String, required: true},
    lastName:  {type: String, required: true},
    password:  {type: String, required: true},
    DateOfBirth: {type: Date, required: true},
    phone:{type: String, required: true},
    email: {type: String, required: true}
});

const Customer = mongoose.model("Customer",customerSchema);

module.exports = Customer;