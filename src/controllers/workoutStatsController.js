/**
 * @file Workout  Stats Controller
 * @desc Handles user's action of analyzing all the workout stats
 * @module controllers/workoutStatsController.js
 * @requires ../models/workout.js
 * @requires ../utils/date.js
 * @requires ../utils/trendHelper.js
 * @requires bcrypt
 * @requires jwt
 * @methods getWorkoutTypeBreakdown
*/

/**
 * @desc Get all the workout data logged by user in the weekly/monthly or custom dates basis grouped by Workout Types 
 * @acess Private
 * @param {Object} req -> Express request object containing user's data
 * @param {Object} res -> Express response object
 */

//importing the required modules
const mongoose = require("mongoose");
const Workout = require("../models/workout.js");
const dateQuery = require("../utils/date.js");
const trendHelp= require("../utils/trendHelper.js");

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


/**
 * @desc get the last 8 weeks of user's workout data to see the workout trend
 * @access Private
 * @param {Object} req -> Express request Object
 * @param {Object} res -> Express response Object
 */

const getWeeklyTrends = async (req,res) =>
{
    try{
        
        //extracting the user details
        const userId = req.user.id;
        //initialzing the startDate as 8 weeks ago
        const now= new Date();
        let startDate = new Date(now);
        startDate.setDate(startDate.getDate()-7*8);
        //initiazing ObjectId as object of mongoose
        const {ObjectId} = mongoose.Types;

        const breakdown = await Workout.aggregate(
            [
                {
                    $match:
                    {
                    user : new ObjectId(userId),
                    createdAt:{$gte:startDate}
                    }
                },
                {
                    $project:
                    {
                        totalKcalBurned : {$sum:"$exercises.kcalBurned"},
                        totalDuration : {$sum:"$exercises.duration"},
                        totalWorkout : {$literal:1},
                        createdAt : 1
                    }
                },
                {
                    $group:
                    {
                        _id: {
                            year: {$isoWeekYear:"$createdAt"},
                            week : {$isoWeek : "$createdAt"} 
                        },
                        totalWorkout : {$sum:1},
                        totalKcalBurned : {$sum:"$totalKcalBurned"},
                        totalDuration  :{$sum:"$totalDuration"},
                    }
                },
                {
                    $sort: {"_id.year":1, "_id.week":1}
                }
            ]
        )

        //using isoweek and isoyear to get the data by week range 
        const formatted = breakdown.map( w =>
        {
            const {weekStart,weekEnd}=dateQuery.weekrange(w._id.year,w._id.week);
            return {
                week : dateQuery.formatDate(weekStart,weekEnd),
                totalWorkout: w.totalWorkout,
                totalKcalBurned: w.totalKcalBurned,
                totalDuration : w.totalDuration,
                
            };
        });

        //calling the method fillMissingWeeks to fill the workout data as 0 for the weeks the user has not logged any
        const finalData = trendHelp.fillMissingWeeks(formatted);
        return res.status(200).json({ success : true,
            weeklyProgress : finalData
        });

    }catch(error)
    {
        return res.status(500).json({message:"Server error while extracting the data",error});
    }
}

module.exports={getWorkoutTypeBreakdown,getWeeklyTrends};
