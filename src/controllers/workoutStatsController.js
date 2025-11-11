/**
 * @file Workout  Stats Controller
 * @desc Handles user's action of analyzing all the workout stats
 * @module controllers/workoutStatsController.js
 * @requires ../models/workout.js
 * @requires bcrypt
 * @requires jwt
 * @methods getWorkoutTypeBreakdown
*/

/**
 * @desc Get all the workout data logged by user in the weekly/monthly or custom dates basis 
 * @acess Private
 * @param {Object} req -> Express request object containing user's data
 * @param {Object} res -> Express response object
 */

//importing the required modules
const mongoose = require("mongoose");
const Workout = require("../models/workout.js");

const getWorkoutTypeBreakdown = async (req,res) =>
{
    try
    {
        //extract the user id from body
        const userId = req.user.id;
        //extract parameters from request query
        const {period,from,to} = req.query;

        //initialize the current date object
        const now= new Date();
        let startDate,endDate;

        if(period)
        {
            console.log("first");
            if(period=="this_week")
            {
                const day= now.getDay();
                startDate = new Date(now);
                startDate.setDate(now.getDate()-day);
                startDate.setHours(0,0,0,0);
                endDate=new Date(startDate);
                endDate.setDate(startDate.getDate()+7);                
            }
            else if (period=="this_month")
            {
                startDate = new Date(now.getFullYear(),now.getMonth(),1);
                endDate= new Date(now.getFullYear(),now.getMonth()+1,1);

            }
            else if(period=="last_month")
            {
                startDate = new Date(now.getFullYear(),now.getMonth()-1,1);
                endDate = new Date(now.getFullYear(),now.getMonth()-1,1);
            }
 
        }
        else if (from && to)
            {
                startDate= new Date(from);
                endDate= new Date(to);
                endDate.setDate(endDate.getDate()+1);
            }
        else{
                return res.status(400).json({message : "Provide period or from/to"});
            }

        const {ObjectId}= mongoose.Types;
        const breakdown = await Workout.aggregate(
            [
                {$match:{user: new ObjectId(userId),createdAt:{$gte:startDate,$lt:endDate}}},
                {$project:{type:1,totalKcal:{$sum:"$exercises.kcalBurned"}}},
                {$group:{
                    _id:"$type",
                    totalWorkouts: {$sum:1},
                    totalKcal: {$sum:"$totalKcal"}
                }},
                {$sort:{totalWorkouts:-1}}
            ]);
        
        const totalWorkouts=breakdown.reduce((acc,w)=>acc+w.totalWorkouts,0);
        const totalKcal= breakdown.reduce((acc,w)=>acc+w.totalKcal,0);

        const formatted= breakdown.map(b=>({
            type:b._id,
            count:b.totalWorkouts,
            kcal:b.totalKcal,
            percent:  totalWorkouts? ((b.totalWorkouts/totalWorkouts)*100).toFixed(1) : 0.0

        }));

        res.json({period:period || "custom",totalWorkouts,totalKcal,breakdown:formatted});


    }catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching stats", error: err.message });
  }

};

module.exports={getWorkoutTypeBreakdown};
