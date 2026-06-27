export const getByThisWeekData =
{
    period: "this_week",
    totalWorkouts: 1,
    totalKcal: 50,
    breakdown: [
        {
            type: "strength",
            count: 1,
            kcal: 50,
            percent: "100.0"
        }
    ]
}

export const getByThisMonthData =
{
    "period": "this_month",
    "totalWorkouts": 1,
    "totalKcal": 50,
    "breakdown": [
        {
            "type": "strength",
            "count": 1,
            "kcal": 50,
            "percent": "100.0"
        }
    ]
}

export const getDataByLastMonth = 
{
    "period": "last_month",
    "totalWorkouts": 0,
    "totalKcal": 0,
    "breakdown": []
}

export const getDataByCustomDate =
{
    "period": "custom",
    "totalWorkouts": 1,
    "totalKcal": 50,
    "breakdown": [
        {
            "type": "strength",
            "count": 1,
            "kcal": 50,
            "percent": "100.0"
        }
    ]
}

export const getTrendData=
{
    "success": true,
    "weeklyProgress": [
        {
            "totalWorkout": 1,
            "totalKcalBurned": 50,
            "totalDuration": 10
        },
        {
            "totalWorkout": 0,
            "totalKcalBurned": 0,
            "totalDuration": 0
        },
        {
            "totalWorkout": 0,
            "totalKcalBurned": 0,
            "totalDuration": 0
        },
        {
            "totalWorkout": 0,
            "totalKcalBurned": 0,
            "totalDuration": 0
        },
        {
            "totalWorkout": 0,
            "totalKcalBurned": 0,
            "totalDuration": 0
        },
        {
            "totalWorkout": 0,
            "totalKcalBurned": 0,
            "totalDuration": 0
        },
        {
            "totalWorkout": 0,
            "totalKcalBurned": 0,
            "totalDuration": 0
        },
        {
            "totalWorkout": 0,
            "totalKcalBurned": 0,
            "totalDuration": 0
        }
    ]
}

export const getRecordData =
{
    "achievements": {
        "duration": {
            "durationRecord": 10,
            "workout": [
                {
                    "title": "chest exercise",
                    "type": "strength",
                    "exercises": [
                        {
                            "name": "bench press",
                            "sets": 3,
                            "reps": 15,
                            "weight": 50,
                            "duration": 10,
                            "kcalBurned": 50
                        }
                    ]
                }
            ]
        },
        "calories": {
            "kcalRecord": 50,
            "workout": [
                {
                    "title": "chest exercise",
                    "type": "strength",
                    "exercises": [
                        {
                            "name": "bench press",
                            "sets": 3,
                            "reps": 15,
                            "weight": 50,
                            "duration": 10,
                            "kcalBurned": 50
                        }
                    ]
                }
            ]
        },
        "streaks": {
            "current": 1,
            "longest": 1
        }
    },
    "milestones": [
        {
            "totalWorkouts": 1,
            "totalduration": 10,
            "totalKcalBurned": 50,
            "avgDuration": 10,
            "avgKcalBurned": 50
        }
    ],
    "records": {
        "mostActiveDay": [
            {
                "workouts": 1,
                "totalKcalBurned": 50,
                "totalDuration": 10,
            }
        ],
        "mostActiveWeek": [
            {
                "workouts": 1,
                "totalKcalBurned": 50,
                "totalDuration": 10,
            }
        ]
    }
}
