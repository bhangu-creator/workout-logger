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
const { createWorkout,updateWorkout,getWorkoutById,getAllWorkouts,deleteWorkoutById} =require('../controllers/workoutController.js');
const {authMiddleware} = require('../middleware/authUserMiddleware.js');

//Creates an express router object
const router=express.Router()

// @route POST /api/workouts/
// @desc  Creates a new workout for the user
router.post("/",authMiddleware,createWorkout);

// @route Put /api/workouts/:id
// @desc  Update an existing workout by it's ID for the logged-in user
router.put("/:id",authMiddleware,updateWorkout);

// @route GET /api/workouts/:id
// @desc  Get a specific workout by its ID for the logged-in user
router.get("/:id", authMiddleware, getWorkoutById);

// @route GET /api/workouts/
// @desc  Get all the workouts created by the logged-in user
router.get("/", authMiddleware, getAllWorkouts);

// @route Delete /api/workouts/:id
// @desc  Delete a specific workout by its ID for the logged-in user
router.delete("/:id", authMiddleware, deleteWorkoutById);


//exporting the require module
module.exports=router;