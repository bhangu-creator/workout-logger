/**
 * @file Workout Stats Routes
 * @desc handles routes used by user to view different stats of all the logged workouts
 * @module routes/workoutRoutes
 * @requires express
 * @requires ../controllers/workoutController.js
 * @requires ../middleware/authUserMiddleware.js
 * @route /api/workouts
 */

//importing the required modules and controller functions
const express = require('express');
const { createWorkout,updateWorkout,getWorkoutById,getAllWorkouts,deleteWorkoutById} =require('../controllers/workoutController.js');
const {authMiddleware} = require('../middleware/authUserMiddleware.js');