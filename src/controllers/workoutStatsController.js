/**
 * @file Workout  Stats Controller
 * @desc Handles user's action of analyzing all the workout stats
 * @module controllers/workoutStatsController.js
 * @requires ../models/workout.js
 * @requires ../utils/date.js
 * @requires ../utils/trendHelper.js
 * @requires bcrypt
 * @requires jwt
 * @methods getWorkoutTypeBreakdown, getWeeklyTrends, getPersonalRecordsStats
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

/**
 * @desc get data of the Personal Records set by the user
 * @access Private
 * @param {Object} req -> Express request Object
 * @param {Object} res -> Express response Object
 */
const getPersonalRecordsStats= async (req,res)=>
{
    try{
        
        //extracting the userid sent by middleware
        const userId= req.user.id;
        const {ObjectId}= mongoose.Types;
        
        //extracing the workout details with the  longest duration
        const workoutWithLongestDuration = await Workout.aggregate(
        [
            {
            $match :
            {
                user: new ObjectId(userId)
            }
            },
            {
                $addFields: 
                {
                    longestDuration: { $ifNull : [ {$sum:"$exercises.duration"},0]},
                }
            },
            {
                $sort:{longestDuration:-1}
            },
            {
                $limit:1
            }
            
        ]);

        //extracing the workout details with the maximum kcal burned
        const workoutWithMaxKcalBurned = await Workout.aggregate(
            [
                {$match:
                    {
                        user: new ObjectId(userId)
                    }
                },
                {
                    $addFields:
                    {
                        maxKcalBurned : {  $ifNull:[ {$sum:"$exercises.kcalBurned"},0]}

                    }
                },
                {
                    $sort:{maxKcalBurned:-1}
                },
                {
                    $limit:1
                }
            ]);

        //extracting all the dates of the workouts logged by the user to compute longest/current streak
        const dates = await Workout.aggregate(
            [
                {$match:
                    {
                        user: new ObjectId(userId)
                    }
                },
                {
                    $project:
                    {
                        date:
                        {
                            $dateTrunc:
                            {
                                date:"$createdAt",
                                unit : "day"
                            }
                        }
                    }
                },
                {
                    $sort:{
                        date:-1
                    }
                }
            ]);

        //extracting all the workout,kcal,duration count and compute their averages
        const milestonesData = await Workout.aggregate(
            [
                {$match:
                    {
                        user:new ObjectId(userId)
                    }
                },
                {
                    $project:
                    {
                        duration : {$ifNull : [{ $sum:"$exercises.duration"},0]},
                        KcalBurned: {$ifNull : [{ $sum:"$exercises.kcalBurned"},0]},

                    }
                },
                {
                    $group:
                    {
                        _id: null,
                        totalWorkouts: {$sum:1},
                        totalduration : {$sum:"$duration"},
                        totalKcalBurned : {$sum:"$KcalBurned"},
                        avgDuration: {  $avg: "$duration" },
                        avgKcalBurned: {$avg: "$KcalBurned" },

                    }
                },
                {
                    $project:
                    {
                        _id: 0,
                        totalWorkouts:1,
                        totalduration: { $round: [{ $divide: ["$totalduration", 60] }, 2] },
                        totalKcalBurned:1,
                        avgDuration: {$round:["$avgDuration",0]},
                        avgKcalBurned:{$round:["$avgKcalBurned",0]}
                    }
                }
            ]
        )

        //extracting all the user data to compute the most active day
        const daysData = await Workout.aggregate(
            [
                {
                    $match:{
                        user: new ObjectId(userId)
                    }
                },
                {
                    $project:
                    {
                        workouts:{$size:{$ifNull:["$exercises",[]]}},
                        totalKcalBurned: {$sum:"$exercises.kcalBurned"},
                        totalDuration : {$sum:"$exercises.duration"},
                        date: { $dateTrunc:{
                            date:"$createdAt",
                            unit: "day"
                        }}
                    }
                },
                {
                    $group:
                    {
                        _id:"$date",
                        workouts:{$sum:"$workouts"},
                        totalKcalBurned:{$sum:"$totalKcalBurned"},
                        totalDuration:{$sum:"$totalDuration"}
                    }
                },
                {
                    $sort:
                    {
                        workouts:-1,
                        totalKcalBurned:-1,
                        totalDuration:-1
                    }
                },
                {
                    $limit:1
                },
                {
                    $project:
                    {
                        date: { $dateToString: { format: "%Y-%m-%d", date: "$_id" } },
                        _id:0,
                        workouts:1,
                        totalKcalBurned:1,
                        totalDuration:1
                    }
                }
            ]
        )

        //extracting all the user data to compute the most week
        const weekData= await Workout.aggregate(
            [
                {
                    $match:
                    {
                        user:new ObjectId(userId)
                    }
                },
                {
                    $project:
                    {
                        workouts:{$size:{$ifNull:["$exercises",[]]}},
                        totalKcalBurned: {$sum:"$exercises.kcalBurned"},
                        totalDuration : {$sum:"$exercises.duration"},
                        weekStart: { $dateTrunc:{
                            date:"$createdAt",
                            unit: "week"
                        }}
                    }
                },
                {
                    $group:
                    {
                        _id:"$weekStart",
                        workouts:{$sum:"$workouts"},
                        totalKcalBurned:{$sum:"$totalKcalBurned"},
                        totalDuration:{$sum:"$totalDuration"}
                    }
                },
                {
                    $sort:
                    {
                        workouts:-1,
                        totalKcalBurned:-1,
                        totalDuration:-1
                    }
                },
                {
                    $limit:1
                },
                {
                    $project:
                    {
                    week: { $concat: [
                        { $dateToString: { format: "%b %d %Y", date: "$_id" } },
                        " - ",
                        { $dateToString: { format: " %b %d %Y", date: { $dateAdd: { startDate: "$_id", unit: "day", amount: 6 } } } }
                    ] },
                    workouts: 1,
                    totalKcalBurned: 1,
                    totalDuration: 1,
                    _id:0
                }
                },

            ]
        )

        //verify if the workout exists
        if (!workoutWithLongestDuration.length || !workoutWithMaxKcalBurned.length || !dates.length ||!milestonesData.length||!daysData.length||!weekData.length) {
            return res.status(404).json({message: "No workout records found for this user"});
           }

        //making the dates object values unique
        const onlydates =dateQuery.getUniqueDateObjects(dates);
        //calculating the current streak and longest streak from date array
        const {currentStreak,longestStreak}= dateQuery.calculateTheLongestAndCurrentStreak(onlydates);

        //extracting the longestDuration value from workout doc
        const longestDuration=workoutWithLongestDuration[0].longestDuration;
        //formatting the rest of the array to send back to response json
        const longestDurationWorkoutFormatted= workoutWithLongestDuration.map(doc=>
        {
            const {_id,user,createdAt,__v,exercises,longestDuration, ...rest}= doc;
            return {
                ...rest,
                date:createdAt,
                exercises:exercises.map(ex=>
                {
                    const {_id, ...exRest}=ex;
                    return {...exRest};
                })
            };

        });

        //extracting the maxkcalburned value from workout doc
        const maxkcalburned=workoutWithMaxKcalBurned[0].maxKcalBurned;
        //formatting the rest of the array to send back to response json
        const maxkcalWorkoutFormated=workoutWithMaxKcalBurned.map(doc=>
        {
            const {_id,user,exercises,createdAt,__v,maxKcalBurned, ...rest}=doc;
            return {
                ...rest,
                date:createdAt,
                exercises:exercises.map(ex=>
                {
                    const {_id, ...exRest}= ex;
                    return { ...exRest};
                }
                )
            };
        });


        return res.status(200).json({
            achievements:
            {
                duration:
                {
                    durationRecord:longestDuration,
                    workout:longestDurationWorkoutFormatted
                },
                calories:
                {
                    kcalRecord:maxkcalburned,
                    workout : maxkcalWorkoutFormated

                },
                streaks:
                {
                    current : currentStreak,
                    longest : longestStreak
                }
            },
            milestones: milestonesData,
            records:
            {
                mostActiveDay:daysData,
                mostActiveWeek: weekData
            }
        });
    }catch(error)
    {
        return res.status(500).json({message:"Server error while fetching user's Personal Records",error})
    }

}

module.exports={getWorkoutTypeBreakdown,getWeeklyTrends,getPersonalRecordsStats};
