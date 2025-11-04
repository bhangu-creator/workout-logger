/**
 * @file Auth Controller
 * @desc Handles user signup/login  authentication logic.
 * @module controllers/authUsersController
 * @requires ../models/user.js
 * @requires bcrypt
 * @requires jwt
 * @requires nodemailer
 * @methods signup,login,forgotPassword,resetPassword
*/

//Importing required modules and models
const User =require('../models/user.js');
const bcrypt= require("bcryptjs");
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const passwordRegex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,15}$/;
const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;


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

        ///validating password length
        if (!passwordRegex.test(password))
        {
            return res.status(400).json({error:"Password must have at least 1 uppercase, 1 lowercase, 1 number, 1 special character, and be 8+ characters long."});
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

/**
 * @desc   Login an existing user.
 * @access Public
 * @param  {Object} req - Express request object containing user data.
 * @param  {Object} res - Express response object.
 */

const login = async (req,res)=>{
    try{
        const {email,password}=req.body;

        //check if both fields are provided
        if(!email||!password)
        {
            return res.status(400).json({message:"Email and Password are required"});
        }

        //check if the user exist
        const user= await User.findOne({email});
        if (!user)
        {
            return res.status(400).json({message:"Invalid Credentials"});
        }
        

        //compare the provided pasword with the stored hashed password in DB
        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch)
        {
            return res.status(400).json({message:"Invalid Credentials"});
        }

        //Generate a JWT token
        const token= jwt.sign(
            {id: user._id,email:user.email},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN}
        );
        
        //send success response
        res.status(200).json({
            message:"Login Successfull",
            user : {id:user._id,name:user.name,email:user.email},
            token
        });
    }catch(error){
        console.error("Login Error",error);
        res.status(500).json({message:"Login Failed",error:error.message});
    }

};


/**
 * @desc   Sends a password reset link to the user's registered email.
 * @access Public
 * @param  {Object} req - Express request object containing user data.
 * @param  {Object} res - Express response object.
 */

const forgotPassword = async (req,res)=>{
    try{
        const {email}=req.body;

        //check if email was provided
        if(!email)
        {
            return res.status(400).json({message:"Email is required"});
        }

        //check if the email entered in valid
        if (!gmailRegex.test(email))
        {
            return res.status(400).json({message:"Invalid email"});
        }

        //check if the user exist
        const user= await User.findOne({email});
        if (!user)
        {
            return res.status(200).json({message:"if that email exists, a reset link has been sent!"});
        }

        // Creates a random token
        const resetToken = crypto.randomBytes(32).toString('hex');
        
        //hashed the token before storing it in db
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        //store the Hashed token in the database
        user.resetPasswordToken=hashedToken;
        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
        await user.save();

        //create a small transporter
        const transporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS
            }
        });
        //resetlink with token
        const resetLink=`http://localhost:3000/api/auth/reset-password/${resetToken}`;

        //email options
        const mailOptions={
            from:process.env.EMAIL_USER,
            to:user.email,
            subject:"Password Reset Request",
            html:`<p>Click below link to reset your password</p>
            <a href="${resetLink}">${resetLink}</a>`
        };


        //sent the mail
        await transporter.sendMail(mailOptions);

        res.status(200).json({message:"Password Reset email sent to your email address!"});

    }catch(error){
        console.error("Forgot mail",error);
        res.status(500).json({message:"Error sending reset link",error:error.message});
    
}};

const resetPassword = async (req,res)=>
{
    try{
        //get token from url params and new password from body
        const {token} = req.params;
        const {newPassword}= req.body;

        //validate inputs
        if(!token){
            return res.status(400).json({message:"Reset token is required"});
        }

        if (!newPassword) {
            return res.status(400).json({ message: "New password is required" });
        }
        
        //validating password 
        if (!passwordRegex.test(newPassword))
        {
            return res.status(400).json({error:"Password must have at least 1 uppercase, 1 lowercase, 1 number, 1 special character, and be 8+ characters long."});
        }

        //hash the token to search in db
        const hashedToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');
        
        //find user with matching hashed token and not expired
        const user= await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if(!user){
            return res.status(400).json({message:"Invalid or expired token"});
        }

        //verify if the new password is same as old password
        isSamePassword=await bcrypt.compare(newPassword,user.password);
        if (isSamePassword)
        {
            return res.status(400).json({message:"New Password cannot be same as Old Password"});
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password and clear reset token fields
        user.password = hashedPassword;
        user.resetPasswordToken = undefined; 
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ 
            message: "Password reset successful! You can now login."});
    } catch (error) {
        console.error("Reset password error:", error);
        res.status(500).json({ 
            message: "Error resetting password", 
            error: error.message 
        });
        }
};

//export the modules
module.exports={signup,login,forgotPassword,resetPassword};