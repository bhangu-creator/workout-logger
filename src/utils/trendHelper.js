/**
 @file utils/trendHelper.js
 @desc Contains method related to help the workout stats trend API
 *@methods fillMissingWeeks
 @requires ../utils/date.js
 */


//Importing the required modules
const dateQuery = require("../utils/date.js");

/**
 * @desc Fills missing weekly entries (if user skipped workouts) with zeroed stats.
 *       Always returns last 8 weeks (Monday–Sunday), handling cross-year weeks.
 * @param {Array} formatted - Array of week objects from the stats controller.
 * @returns {Array} - Array of 8 consecutive week objects (latest → oldest or vice versa).
 */


const fillMissingWeeks= (formatted) =>
{
    let {year,week}=dateQuery.getIsoWeekAndYear(new Date());
    let result=[];
    const tempObj =   {
        week: 'dummy',
        totalWorkout: 0,
        totalKcalBurned: 0,
        totalDuration: 0
    };
    //creating a map of brekdown objects for O(1) lookup
    const lookup = Object.fromEntries(formatted.map(w => [w.week, w]));

    for(let i=0;i<8;i++)
    {
        let {weekStart,weekEnd} = dateQuery.weekrange(year,week);
        let weekRange=dateQuery.formatDate(weekStart,weekEnd);
        let exists = lookup[weekRange];
        result.push(exists || { ...tempObj, week: weekRange });
        week-=1
        if (week<=0)
        {
            year-=1;
            week=dateQuery.getLastIsoOfYear(year);
        }
    }
    return result;
}

//exporting the module
module.exports={fillMissingWeeks};