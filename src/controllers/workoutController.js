/**
 * @file Workout Controller
 * @desc Handles user's all workout actions like create,update,view,delete workouts
 * @module controllers/workoutController.js
 * @requires ../models/workout.js
 * @requires bcrypt
 * @requires jwt
 * @methods createWorkout,getWorkoutById,getAllWorkouts,updateWorkout,deleteWorkoutById
*/

//Importing required modules and models
const Workout =require('../models/workout.js');
const bcrypt= require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * @desc   Create a new workout.
 * @access Private
 * @param  {Object} req - Express request object containing user data.
 * @param  {Object} res - Express response object.
 */

const createWorkout = async (req,res)=>{

    try{

        //extracting  all the workout realted details from the req body
        const {title,type,exercises}= req.body;

        //extracting attached user's id sent by the middleware
        const userId= req.user.id;

        //verify if the required details are sent by the user
        if(!title||!exercises || exercises.length==0){
            return res.status(400).json({message:"Title and exercises are required"});

        }

        //create the new workout
        const newWorkout= await Workout.create({user:userId,title,type,exercises});

        if(!newWorkout)
        {
            return res.status(500).json({message:"Workout could not get created due to server issue"});
        }

        res.status(201).json({message:"New workout is created successfully",newWorkout}
    );
        }catch(error)
        {
            if (error.name=="ValidationError")
            {
                if (error.errors.type && error.errors.type.kind=="enum")
                {
                    return res.status(400).json({
                        success:false,
                        message : "Error while creating a new workout",
                        error: error.message,
                        note: "Please use only these options for 'type': [strength,Cardio,HIT,yoga,other]"
                    })
                }
            }
            console.error("Error while creating new workout",error);
            res.status(500).json({message:"Error while creating new workout",
                error: error.message})
        };
};

/**
 * @desc   View an existing workout
 * @access Private
 * @param  {Object} req - Express request object containing user data.
 * @param  {Object} res - Express response object.
 */

const getWorkoutById = async (req,res)=>{

    try{

        //extracting workout id from parameters and attached user sent by middleware
        const {id} = req.params;
        const userId= req.user.id;

        //verify if the workout id exists for the sent user's id
        const workout= await Workout.findOne(
            {_id:id,user:userId},  //match workout id with user's id
        );

        if(!workout)
        {
            return res.status(404).json({message:"Workout not found or unauthorized"});
        }

        res.status(200).json({workout});

        }catch(error)
        {
            console.error("Error fetching workout",error);
            res.status(500).json({message:"Server Error while fetching the workout",
                error: error.message})
        };
};

/**
 * @desc   View all existing workouts logged by the user
 * @access Private
 * @param  {Object} req - Express request object containing user data.
 * @param  {Object} res - Express response object.
 */

const getAllWorkouts = async (req,res)=>{

    try{

        //extracting attached user sent by middleware
        const userId= req.user.id;

        //get all the workouts logged in by the user
        const workouts= await Workout.find({user:userId}).sort({createdAt:-1});

        res.status(200).json({
            workouts,
            sucess:true,
            count: workouts.length
        });

        }catch(error)
        {
            console.error("Error fetching workout",error);
            res.status(500).json({message:"Server Error while fetching the workout",
                success:false,
                error: error.message})
        };
};


/**
 * @desc   Update an existing workout
 * @access Private
 * @param  {Object} req - Express request object containing user data.
 * @param  {Object} res - Express response object.
 */

const updateWorkout = async (req,res)=>{

    try{

        //extracting workout id from parameters and attached user sent by middleware
        const {id} = req.params;
        const userId= req.user.id;

        //extract new data from the request body
        const {title,type,exercises}=req.body;

        //verify if the sent data for update is valid
        if (!title && !type && (!exercises || exercises.length === 0)) {
            return res.status(400).json({ message: "No fields provided for update" });
        }
        
        //normalize the sent workout Types
        const normalizedType = type? type.toLowerCase():  undefined;

        //verify if the workout id exists for the sent user's id and update the workout details
        const updatedWorkout= await Workout.findOneAndUpdate(
            {_id:id,user:userId},  //match workout id with user's id
            {title,type:normalizedType,exercises},
            { new: true, runValidators: true }
        );

        if(!updatedWorkout)
        {
            return res.status(404).json({message:"Workout not found or unauthorized"});
        }

        res.status(200).json({message:"Workout has been updated successfully",updatedWorkout});

        }catch(error)
        {
            console.error("Error while updating the workout",error);
            res.status(500).json({message:"Error while updating the workout",
                error: error.message})
        };
};

/**
 * @desc   Delete an existing workout
 * @access Private
 * @param  {Object} req - Express request object containing user data.
 * @param  {Object} res - Express response object.
 */

const deleteWorkoutById = async (req,res)=>{

    try{

        //extracting workout id from parameters and attached user sent by middleware
        const {id} = req.params;
        const userId= req.user.id;

        //verify if the workout id exists for the sent user's id
        const workout= await Workout.findOneAndDelete(
            {_id:id,user:userId},  //match workout id with user's id
        );

        if(!workout)
        {
            return res.status(404).json({message:"Workout not found or unauthorized"});
        }

        res.status(200).json({message:"Workout has been delete successfully"});

        }catch(error)
        {
            console.error("Error deleting the workout",error);
            res.status(500).json({message:"Server Error while deleting the workout",
                error: error.message})
        };
};


//exporting required modules
module.exports={createWorkout,getWorkoutById,getAllWorkouts,updateWorkout,deleteWorkoutById};
