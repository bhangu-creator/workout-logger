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
const { signup } =require('../controllers/authUsersController.js');

//Creates an express router object
const router=express.Router()

// @route POST /api/auth/signup
// @desc  Register a new user
router.post("/signup",signup);

//export the router to be used in other files
module.exports=router;