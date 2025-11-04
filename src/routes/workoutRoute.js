/**
 * @file Workout Route
 * @desc handles routes used by user to create,update,view or delete the workouts
 * @module routes/workoutRoutes
 * @requires express
 * @requires ../controllers/workoutController.js
 * @requires ../middleware/authUserMiddleware.js
 * @route /api/workouts
 */

//importing the required modules and controller functions
const express = require('express');
const { createWorkout } =require('../controllers/workoutController.js');
const {authMiddleware} = require('../middleware/authUserMiddleware.js');

//Creates an express router object
const router=express.Router()

// @route POST /api/workouts/
// @desc  Creates a new workout for the user
router.post("/",authMiddleware,createWorkout);

//exporting the require module
module.exports=router;