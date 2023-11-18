const mongoose = require('mongoose')

const userScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    postalCost:{
        type:String,
        required:true
    }    
})

module.exports = mongoose.model('User',userScheme)