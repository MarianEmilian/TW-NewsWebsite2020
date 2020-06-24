const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    name:String,
    surname: String,
    password: String,
    phoneNumber: String,
    preferredDomains: [String],
    created: Date
})

module.exports = mongoose.model('User', userSchema);