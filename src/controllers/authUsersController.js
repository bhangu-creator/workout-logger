/**
 * @file Auth Controller
 * @desc Handles user signup/login  authentication logic.
 * @module controllers/authUsersController
 * @requires ../models/user.js
 * @requires bcrypt
 * @methods signup
*/

//Importing required modules and models
const User =require('../models/user.js');
const bcrypt= require("bcryptjs");

/**
 * @desc   Registers a new user.
 * @access Public
 * @param  {Object} req - Express request object containing user data.
 * @param  {Object} res - Express response object.
 */

const signup= async (req,res)=>
{
    try {

        const {name,email,password}=req.body

        //check if user already exists
        const existingUser=await User.findOne({email});
        if (existingUser){
            return res.status(400).json({message:"User already exists"});
        }

        //hash password for security before saving in the database
        const hashPassword= await bcrypt.hash(password,10); 

        //creates a new user document
        const newUser= await User.create({
            name,email,password:hashPassword
        });

        //send success response
        res.status(201).json({
            message:"User registered Successfully",
            user:{id:newUser.id,name:newUser.name,email:newUser.email}
        });

    } catch(error){
        console.error("Signup Error",error);
        res.status(500).json({message:"Signup Failed, Server Error",error:error.message});
    }
};

//export the module
module.exports={signup};