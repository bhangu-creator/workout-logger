/**
 @file utils/date.js
 @desc Contains reusable date-related helper functions
 *@methods weekrange, formatDate
 */

    /**
     * @desc Get Monday-Sunday range for a given ISO week
     * @param {number} isoYear - ISO year
     * @param {number} isoWeek - ISO week number (1-53)
     * @returns {Object} - { weekStart: Date, weekEnd: Date }
     */

    const weekrange = (isoyear,isoweek) =>
    {
        //first iso week of year always contains 4jan so using it as reference point
        const jan4 = new Date(isoyear,0,4);
        //getting the day of the 4 jan , the value will be between (0-6)
        const dayOfWeek = jan4.getDay();
        //verifying how many days to subtract to get monday of this first iso week
        const dayToMonday = (dayOfWeek==0 ? -6 : 1-dayOfWeek);
        //initializing the first week monday
        const week1Monday=new Date(jan4);
        //subtracting the required days to get the date of first monday of iso week
        week1Monday.setDate(week1Monday.getDate()+dayToMonday);
        //initialzing the weekstart date object
        const  weekStart= new Date(week1Monday);
        //calculating the exact date of our current iso week (week has 7 days so offset the starting week as it's days are already counted)
        weekStart.setDate(weekStart.getDate()+(isoweek-1)*7);
        const weekEnd=new Date(weekStart);
        //add +6 to get the sunday of the weekStart week
        weekEnd.setDate(weekStart.getDate()+6);
        //return the monday and sunday of the current iso week
        return {weekStart,weekEnd}

    }

    /**
     * @desc Gets the start of the week and weekend date range and format it to Month startDate - Month endDate
     * @param {String} startDate 
     * @param {String} endDate 
     * @returns formated string  - Month startDate - Month endDate
     */

    const formatDate= (startDate,endDate) =>
    {
        startDate=new Date(startDate);
        endDate= new Date(endDate);
        const formatStart= startDate.toLocaleDateString("en-US",{month:"short",day:"numeric"});
        const formatEnd= endDate.toLocaleDateString("en-US",{month:"short",day:"numeric"});
        const returStr = `${formatStart}-${formatEnd}`
        return returStr

    }


    /**
     * @desc Gets the date as an arg and returns the corresponding iso week and year
     * @param {Object} date 
     * @returns Corresponding iso year and isoweek of the sent date
     */

    const getIsoWeekAndYear= (date) =>
    {
        //creates the copy of the date 
        const target= new Date(date.valueOf());
        //offset the day by 1 so that it starts from monday as 0 since ISO week start from monday
        const dayNumber = (date.getDay()+6)%7;
        //set the target date to thursday to fix the edge case if current iso week falls in the previous year
        target.setDate((target.getDate()-dayNumber+3))
        //get the current year's first week's 4 jan
        const jan4= new Date(target.getFullYear(),0,4);
        const jan4Day= (jan4.getDay()+6)%7;
        //set the date as thursday of the first iso week
        jan4.setDate((jan4.getDate()-jan4Day)+3); 
        //subtraction of target-jan4 gives miliseconds and we use round to round mid weeks to next week and add 1 to start first iso week of year from 1
        const week = 1 + Math.floor((target - jan4) / (7 * 24 * 3600 * 1000));
        return { year: target.getFullYear(), week };
    }

        
    /**
     * @desc Gets the year as arg and return the last ISO week of that year
     * @param {number} year 
     * @returns  last ISO week of the given year is returned
     */
    const getLastIsoOfYear = (year)=>
    {

        const dec28 = new Date(year,11,28);
        return getIsoWeekAndYear(dec28).week;
    }

    /**
     * @desc gets a dates array with date object and then make the array unique by deleting duplicate date objects
     * @param {Object} date 
     * @returns array with unique date objects
     */

    const getUniqueDateObjects = (dates)=>
    {
        const onlydates = dates.map(item=>item.date);
        const seen = new Set();
        const uniqueDates = [];
        for(let indx=0;indx<onlydates.length;indx+=1)
        {
            let dateString = onlydates[indx].toISOString();
            if(!seen.has(dateString))
            {
                seen.add(dateString)
                uniqueDates.push(onlydates[indx])
            }
        }   
        return uniqueDates;
    }

    /**
     * @desc calculates the longest/current streak of user logging in the workouts
     * @param {Object} date 
     * @returns current streak and longest streak
     */

const calculateTheLongestAndCurrentStreak = (onlydates) => {
  if (!onlydates || onlydates.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  // Normalize all dates to YYYY-MM-DD and remove duplicates
  const normalizeDate = (date) =>
    new Date(date).toISOString().split("T")[0];

  const uniqueDays = Array.from(
    new Set(onlydates.map(normalizeDate))
  ).sort((a, b) => new Date(b) - new Date(a)); // descending (latest first)

  const todayStr = normalizeDate(new Date());

  let longestStreak = 0;
  let currentStreak = 0;
  let streak = 0;

  let prevDate = null;

  for (let i = 0; i < uniqueDays.length; i++) {
    const currDate = new Date(uniqueDays[i]);

    if (!prevDate) {
      streak = 1;
    } else {
      const diff =
        (prevDate - currDate) / (1000 * 60 * 60 * 24);

      if (diff === 1) {
        streak += 1;
      } else {
        streak = 1;
      }
    }

    longestStreak = Math.max(longestStreak, streak);
    prevDate = currDate;
  }
    // current streak only counts if it starts today
    if (uniqueDays[0] === todayStr) {
      currentStreak = streak;
    }

  return { currentStreak, longestStreak };
};

module.exports={weekrange,formatDate,getIsoWeekAndYear,getUniqueDateObjects,calculateTheLongestAndCurrentStreak,getLastIsoOfYear};