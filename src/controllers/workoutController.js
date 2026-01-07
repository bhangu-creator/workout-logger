/**
 * @file Workout Controller
 * @desc Handles user's all workout actions like create,update,view,delete workouts
 * @module controllers/workoutController.js
 * @requires ../models/workout.js
 * @requires bcrypt
 * @requires jwt
 * @methods createWorkout,getWorkoutById,getAllWorkouts,updateWorkout,deleteWorkoutById
 * @class  AppError
*/

//Importing required modules and models
const Workout =require('../models/workout.js');
const bcrypt= require("bcryptjs");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/centeralizedError.js");

/**
 * @desc   Create a new workout.
 * @access Private
 * @param  {Object} req - Express request object containing user data.
 * @param  {Object} res - Express response object.
 */

const createWorkout = async (req,res,next)=>{

    try{

        //extracting  all the workout realted details from the req body
        const {title,type,exercises}= req.body;

        //extracting attached user's id sent by the middleware
        const userId= req.user.id;

        //verify if the required details are sent by the user
        if(!title||!exercises ||exercises.length===0){
            throw new AppError(400,"Title or exercises are required");

        }

        //create the new workout
        const newWorkout= await Workout.create({user:userId,title,type,exercises});
        

        if(!newWorkout)
        {
            throw new AppError(500,"Workout could not get created due to server issue");
        }

        res.status(201).json({message:"New workout is created successfully",newWorkout}
    );
        }catch(error)
        {
            console.error("Error while creating new workout",error);
            if (error instanceof AppError) {return next(error)}
            if (error.name==="ValidationError")
            {
                if (error.errors.type && error.errors.type.kind=="enum")
                {

                    return next(new AppError(400,"Error while creating a new workout: Please use only these options for 'type': [strength,Cardio,HIT,yoga,other]"))
                }
            }
            next(new AppError(500,"Failed to create the workout"));
        };
};

/**
 * @desc   View an existing workout
 * @access Private
 * @param  {Object} req - Express request object containing user data.
 * @param  {Object} res - Express response object.
 */

const getWorkoutById = async (req,res,next)=>{

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
            throw new AppError(404,"Workout not found");
        }

        res.status(200).json({workout});

        }catch(error)
        {
            console.error("Error fetching workout",error);
            //application error
            if (error instanceof AppError){return next(error);}
            //invalid id error
            if (error.name=="castError"){ return next(400,"Invalid WorkoutId");}
            //server error
            next(new AppError(500,"Server Error while fetching the workout"));

        };
};

/**
 * @desc   View all existing workouts logged by the user
 * @access Private
 * @param  {Object} req - Express request object containing user data.
 * @param  {Object} res - Express response object.
 */

const getAllWorkouts = async (req,res,next)=>{

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
            if (error instanceof AppError){return next(error);}
            next(new AppError(500,"Server Error while fetching the workouts"));
        };
};


/**
 * @desc   Update an existing workout
 * @access Private
 * @param  {Object} req - Express request object containing user data.
 * @param  {Object} res - Express response object.
 */

const updateWorkout = async (req,res,next)=>{

    try{

        //extracting workout id from parameters and attached user sent by middleware
        const {id} = req.params;
        const userId= req.user.id;

        //extract new data from the request body
        const {title,type,exercises}=req.body;

        //verify if the sent data for update is valid
        if (!title || !type || (!exercises || exercises.length === 0)) {
            
            throw new AppError(400,"Required fields are not provided for update");
        }
        
        //verify if the workout id exists for the sent user's id and update the workout details
        const updatedWorkout= await Workout.findOneAndUpdate(
            {_id:id,user:userId},  //match workout id with user's id
            {title,type,exercises},
            { new: true, runValidators: true }
        );

        if(!updatedWorkout)
        {
            throw new AppError(404,"Workout not found");
        }

        res.status(200).json({message:"Workout has been updated successfully",updatedWorkout});

        }catch(error)
        {
            console.error("Error while updating the workout",error);

            if (error instanceof AppError){ return next(error);}

            if (error.name==="CastError"){return next(new AppError(400,"Invalid Workout Id"));}

            if (error.name==="ValidationError"){ return next(new AppError(400,"Please verify all required fields are not empty! Also please use only these options for 'type': [strength,Cardio,HIT,yoga,other]"))}
            
            next(new AppError(500,"Error while updating the workout"));
        };
};

/**
 * @desc   Delete an existing workout
 * @access Private
 * @param  {Object} req - Express request object containing user data.
 * @param  {Object} res - Express response object.
 */

const deleteWorkoutById = async (req,res,next)=>{

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
            throw new AppError(404,"Workout not Found")
        }

        res.status(200).json({message:"Workout has been deleted successfully"});

        }catch(error)
        {
            console.error("Error deleting the workout",error);

            if (error instanceof AppError){ return next(error)}

            if(error.name==="CastError"){return next(new AppError(400,"Invalid Workout Id"))}

            next(new AppError(500,"Server Error while deleting the workout"))
        };
};


//exporting required modules
module.exports={createWorkout,getWorkoutById,getAllWorkouts,updateWorkout,deleteWorkoutById};
