const mongoose = require('mongoose')
const Schema = mongoose.Schema
var adminSchema = new Schema({
    userName:{type: String,required: true },
    password:{type: String, required: true}
})

module.exports = mongoose.model("admin",adminSchema);