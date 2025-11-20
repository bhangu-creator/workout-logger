/**
 * @file Workout Model
 * @desc Defines the Mongoose schema and model for user's workouts
 * @module models/workout
 * @requires mongoose
 * @model workout
 */

//importing required modules
const mongoose = require("mongoose");

//Define the Workout Scehema
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
    type: 
    {
    type: String,
    enum: ["strength", "Cardio", "HIT", "yoga", "other"],
    default: "other"
    },
    exercises: [
    {
        name: { type: String, required: true },
        sets: { type: Number, default: 0 },
        reps: { type: Number, default: 0 },
        weight: { type: Number, default: 0 },
        duration: { type: Number, default: 0 }, 
        kcalBurned: { type: Number, default: 0 }
    }
    ],
    createdAt:
    {
        type:Date,
        default: Date.now
    },
},
{    versionKey: false 
})

//exporting the modules
const Workout=mongoose.model("Workout",workoutSchema)
module.exports=Workout;