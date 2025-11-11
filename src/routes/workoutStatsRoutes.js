/**
 * @file Workout Stats Routes
 * @desc handles routes used by user to view different stats of all the logged workouts
 * @module routes/workoutRoutes
 * @requires express
 * @requires ../controllers/workoutStatsController
 * @requires ../middleware/authUserMiddleware.js
 * @route /api/workouts/stats
 */

//importing the required modules and controller functions
const express = require('express');
const {getWorkoutTypeBreakdown } =require('../controllers/workoutStatsController.js');
const {authMiddleware} = require('../middleware/authUserMiddleware.js');

//creates an express route object
const router= express.Router();

// @route GET /api/workouts/stats/type-breakdown?period=this_week
// @desc  gets all the workout data logged by user in current week/months/custom date basis
router.get("/type-breakdown",authMiddleware,getWorkoutTypeBreakdown);

//export the required module
module.exports=router;