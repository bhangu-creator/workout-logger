/**
 * @file Workout Controller
 * @desc Handles user's all workout actions like create,update,view,delete workouts
 * @module controllers/workoutController.js
 * @requires ../models/workout.js
 * @requires bcrypt
 * @requires jwt
 * @methods createWorkout
*/

//Importing required modules and models
const Workout =require('../models/workout.js');
const bcrypt= require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * @desc   Create a new user.
 * @access Private
 * @param  {Object} req - Express request object containing user data.
 * @param  {Object} res - Express response object.
 */

const createWorkout = async (req,res)=>{

    try{

        //extracting  all the workout realted details from the req body
        const {title,exercise,duration,kcalBurned}=req.body;

        //extracting attached user's id sent by the middleware
        const userId= req.user.id;

        //create the new workout
        const newWorkout= await Workout.create({user:userId,title,exercise,duration,kcalBurned});
        await newWorkout.save()

        res.status(201).json({message:"New workout is created successfully",
            workout:{
                workout:newWorkout.title,
                exercise:newWorkout.exercise,
                duration:newWorkout.duration,
                kcalBurned: newWorkout.kcalBurned
            }
        }
    );
        }catch(error)
        {
            console.error("Error while creating new workout",error);
            res.status(500).json({message:"Error while creating new workout",
                error: error.message})
        };
};

//exporting required modules
module.exports={createWorkout};
