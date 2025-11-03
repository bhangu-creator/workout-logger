/**
 * @file User Model
 * @desc Defines the Mongoose schema and model for user accounts.
 * @module models/user
 * @requires mongoose
 * @model User
 */

//importing required modules
const mongoose = require("mongoose");

//Define the User Scehema
const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"], 
        trim : true,
    },
    email:{
        type:String,
        required:true,
        unique:true, 
        lowercase:true,
    },
    password:{
        type:String,
        required:[true,"password is required"],
        minlength: 8,
    },
    resetPasswordToken: String,
    resetPasswordExpires : Date,
    createdAt:{
        type:Date,
        default:Date.now, 
    }
});

//exporting the modules
const User=mongoose.model("User",userSchema)
module.exports=User;    
