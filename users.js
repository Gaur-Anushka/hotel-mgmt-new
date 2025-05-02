const mongoose = require('mongoose')
 const userSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:String,
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    phone:String,
    address:String
 })
 module.exports = mongoose.model("user",userSchema)