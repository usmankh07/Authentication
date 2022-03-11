const mongoose = require('mongoose')
const userAuthentication = mongoose.Schema({
    uid: String,
    name: String,
    pic: String,
    gender: String,
})

module.exports = mongoose.model('Authentication', userAuthentication);