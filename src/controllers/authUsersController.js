/**
 * @file Auth Controller
 * @desc Handles user signup/login  authentication logic.
 * @module controllers/authUsersController
 * @requires ../models/user.js
 * @requires bcrypt
 * @requires jwt
 * @requires nodemailer
 * @methods signup,login,forgotPassword,resetPassword
 * @class AppError
*/

//Importing required modules and models
const User =require('../models/user.js');
const bcrypt= require("bcryptjs");
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const passwordRegex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,15}$/;
const gmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const sgMail = require('@sendgrid/mail');
const AppError = require("../utils/centeralizedError.js");

/**
 * @desc   Registers a new user.
 * @access Public
 * @param  {Object} req - Express request object containing user data.
 * @param  {Object} res - Express response object.
 */

const signup= async (req,res,next)=>
{
    try {

        const {name,email,password}=req.body

        //check if user already exists
        const existingUser=await User.findOne({email});
        if (existingUser){
            throw new AppError(400,"User already exists");
        }

        ///validating password length
        if (!passwordRegex.test(password))
        {
            throw new AppError(400,"Password must have at least 1 uppercase, 1 lowercase, 1 number, 1 special character, and be 8+ characters long.");
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
        //if the error originates from the AppError
        if (error instanceof AppError)
        {
            return next(error)
        }

        //internal Error
        next(new AppError(500,"Signup Failed"));
    }
};

/**
 * @desc   Login an existing user.
 * @access Public
 * @param  {Object} req - Express request object containing user data.
 * @param  {Object} res - Express response object.
 */

const login = async (req,res,next)=>{
    try{
        const {email,password}=req.body;

        //check if both fields are provided
        if(!email||!password)
        {
            throw new AppError(400,"Email and Password are required");
        }

        //check if the user exist
        const user= await User.findOne({email});
        if (!user)
        {
            throw new AppError(400,"Invalid Credentials");
        }
        

        //compare the provided pasword with the stored hashed password in DB
        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch)
        {
            throw new AppError(400,"Invalid Credentials");

        }

        //Generate an access JWT token
        const accesToken= jwt.sign(
            {id: user._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRES_IN}
        );

        //Generate a refresh JWT token
        const refreshToken= jwt.sign(
            {id: user._id},process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRES_IN}
        );

        //set acces token cookie
        res.cookie('accessToken',accessToken,{
            httpOnly : true,
            secure: process.env.NODE_ENV === "production",
            sameSite :"strict",
            maxAge : 15 * 60 * 1000
        })

        //set refresh token cookie
        res.cookie('refreshToken',refreshToken,{
            httpOnly : true,
            secure: process.env.NODE_ENV === "production",
            sameSite : "strict",
            maxAge : 7* 24 * 60 * 60 * 1000
        })

        //save refresh token in db
        user.refreshToken=refreshToken;
        await user.save();

        
        //send success response
        res.status(200).json({
            message:"Login Successful",
            user : {id:user._id,name:user.name,email:user.email},
        });
    }catch(error){
        console.error("Login Error",error);
        //if the error originates from the AppError
        if (error instanceof AppError)
        {
            return next(error)
        }

        //internal Error
        next(new AppError(500,"Login Failed"));
    }

};


/**
 * @desc   Sends a password reset link to the user's registered email.
 * @access Public
 * @param  {Object} req - Express request object containing user data.
 * @param  {Object} res - Express response object.
 */



const forgotPassword = async (req, res) => {
    try {
        //initializing the sendgrid API KEY for email communication
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        if (!gmailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(200).json({ message: "if that email exists, a reset link has been sent!" });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
        await user.save();

        const resetLink = `${process.env.VITE_FRONTEND_URL}/resetpassword/${resetToken}`;

        const msg = {
        to: user.email,
        from: process.env.SENDGRID_VERIFIED_SENDER,
        subject: "Password Reset Request",
        html: `
            <p>You requested a password reset.</p>
            <p>This link will expire in 15 minutes.</p>
            <a href="${resetLink}" target="_blank">Reset Password</a>
            <p>If you didn't request this, please ignore this email.</p>
        `,
        };


        await sgMail.send(msg);
        console.log("Email sent");

        res.status(200).json({ message: "if that email exists, a reset link has been sent!" });

    } catch (error) {
        console.error("Forgot mail error:", error);
        res.status(500).json({ error: "Error sending reset link", details: error.message });
    }
};

/**
 * @desc   Resets the user's password after user forgot the password
 * @access Public
 * @param  {Object} req - Express request object containing user data.
 * @param  {Object} res - Express response object.
 */

const resetPassword = async (req,res)=>
{
    try{
        //get token from url pa  rams and new password from body
        const {token} = req.params;
        const {newPassword}= req.body;
    
        //validate inputs
        if(!token){
            return res.status(400).json({error:"Reset token is required"});
        }
 
        if (!newPassword) {
            return res.status(400).json({ error: "New password is required" });
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
            return res.status(400).json({error:"Invalid or expired token"});
        }

        //verify if the new password is same as old password
        isSamePassword=await bcrypt.compare(newPassword,user.password);
        if (isSamePassword)
        {
            return res.status(400).json({error:"New Password cannot be same as Old Password"});
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password and clear reset token fields
        user.password = hashedPassword;
        user.resetPasswordToken = undefined; 
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ 
            message: "Password reset successfull! You can now login."});
    } catch (error) {
        console.error("Reset password error:", error);
        res.status(500).json({ 
            error: "Error resetting password", 
            error: error.message 
        });
        }
};

/**
 * @desc   Generate a new Access Token 
 * @access Public
 * @param  {Object} req - Express request object containing user data.
 * @param  {Object} res - Express response object.
 */

const refreshAccessToken = async (req,res)=>
{
    try{

        //extract the refresh Token
        const refreshToken = req.cookies.refreshToken;

        //verify if the token exists
        if(!refreshToken){
            return res.status(401).json({error:"No refresh token is available"});
        }

        //validate the refresh Token
        const refreshTokenDecode = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);

        //validate the refresh token in db 
        const user = await User.findById(refreshTokenDecode.id);
        if(!user || user.refreshToken!==refreshToken)
        {
            return res.status(403).json({error:"Invalid Refresh Token"})
        }

        //Generate an access JWT token
        const accessToken= jwt.sign(
            {id: refreshTokenDecode.id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRES_IN}
        );

        //set access token cookie
        res.cookie('accessToken',accessToken,{
            httpOnly : true,
            secure: process.env.NODE_ENV === "production",
            sameSite : "strict",
            maxAge : 15 * 60 * 1000
        })

        //send the OK response
        return res.status(200).json({message:"Access Token Generated Successfully"})

    }catch(err)
    {
        return res.status(403).json({error:"Refresh token expired or invalid"})

    }
}

/**
 * @desc   Logout the User
 * @access Public
 * @param  {Object} req - Express request object containing user data.
 * @param  {Object} res - Express response object.
 */

const logout = async (req,res)=>
{
    try{
        //extract the refresh token
        const refreshToken= req.cookies.refreshToken;

        //verify if refresh token exists
        if(!refreshToken){
            return res.status(200).json({ message: "Already logged out" });
        }

        //decode the refresh the token
        const refreshTokenDecode=jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(refreshTokenDecode.id);
        if(user)
        {
            user.refreshToken=null;
            await user.save();
        }
    
        //clear the cookies
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');

        //send the Ok response
        res.status(200).json({message:"Logout Successful"});



    }catch(err)
    {
        res.status(500).json({error:"Something went wrong"})

    }
}




//export the modules
module.exports={signup,login,forgotPassword,resetPassword,refreshAccessToken,logout};