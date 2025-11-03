/**
 * @file Auth User Route
 * @desc handles user authentication routes such as signup ,login and verification
 * @module routes/authUsersRoutes
 * @requires express
 * @requires ../controllers/authUsersController.js
 * @route /api/auth/
 */

//importing the required modules and controller functions
const express = require('express');
const { signup ,login ,forgotPassword,resetPassword} =require('../controllers/authUsersController.js');

//Creates an express router object
const router=express.Router()

// @route POST /api/auth/signup
// @desc  Register a new user
router.post("/signup",signup);

// @route POST /api/auth/login
// @desc  Login the user
router.post("/login",login);

// @route POST /api/auth/forgotpassword
// @desc   to be used for requesting to reset the forgot password 
router.post("/forgotpassword",forgotPassword);

// @route POST /api/auth/reset-password
// @desc   to be used to reset the user's password
router.post('/reset-password/:token', resetPassword)

//export the router to be used in other files
module.exports=router;