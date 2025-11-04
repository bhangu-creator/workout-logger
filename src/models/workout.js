/**
 * @file Workout Model
 * @desc Defines the Mongoose schema and model for user's workouts
 * @module models/workout
 * @requires mongoose
 * @model workout
 */

//importing required modules
const mongoose = require("mongoose");

//Define the User Scehema
const workoutSchema =new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : [true,"user info is required"]
        
    },
    title:
    {
        type: String,
        required : [true,"Workout title is required"],
        maxlength : [30,"Title cannot exceeds 30 characters"]
    },
    exercise:
    {
        type:String,
        required: [true,"Exercise name is required"],
        maxlength : [500 , " Exercise cannot exceeds 500 characters"]
    },
    duration:
    {
        type: Number,
        required: [true,"Workout duration is required"],
        maxlength : [1400, "Duration cannot exceeds 24 hours"]
    },
    kcalBurned:
    {
        type:Number,
        required: [true,"Kcal burned information is required"]
    },
    createdAt:
    {
        type:Date,
        default: Date.now

    }
})

//exporting the modules
const Workout=mongoose.model("Workout",workoutSchema)
module.exports=Workout;