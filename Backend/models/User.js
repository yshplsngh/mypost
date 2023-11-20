const mongoose = require('mongoose')

const userScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim:true
    },
    password: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true,
        trim: true
    },
    phoneNumber:{
        type:String,
        required:true,
        trim: true
    },
    city:{
        type:String,
        required:true,
        trim: true
    },
    address:{
        type:String,
        required:true,
        trim: true
    },
    postalCost:{
        type:String,
        required:true,
        trim: true
    }    
})

module.exports = mongoose.model('User',userScheme)