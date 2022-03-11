const bcrypt = require("bcrypt")
const mongoose = require("mongoose");

const newSchema = mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true,
    },
    password: {
        type: String,
        required:true,
    },
    phoneNumber: {
        type: Number,
        required:true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

newSchema.pre('save', async function(next){
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 15)
    }
    next();
})

module.exports = mongoose.model("firstData" , newSchema);