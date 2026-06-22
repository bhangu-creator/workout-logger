
export interface TooltipStats {
  WorkoutCount: string;
  KcalCount: string;
  ShareCount: string;
}

export interface TooltipMap {
  [name: string]: TooltipStats;
}

export interface ThisWeekTotal
{
  totalWorkouts: string,
  totalKcal : string
}

export interface workout{
    workoutTitle: string,
    workoutType: string
} 


export interface Exercise
{
    Name: string,
    Sets: string,
    Reps: string,
    Weight : string,
    Duration : string,
    Calories : string

}

export interface ThisWeekAnalyticData
{
  workoutTitle : string,
  workoutType: string,
  exercise : Exercise[]
}

export const validWorkout : workout = {
    workoutTitle: "Chest Workout",
    workoutType : "strength"
}

export const validChestWorkoutExercises : Exercise[] = [
  {
    Name: 'Bench Press',
    Sets: "4",
    Reps: "10",
    Weight: "60",
    Duration : "10",
    Calories : "20"
  },
  {
    Name: 'Incline Dumbbell Press',
    Sets: "3",
    Reps: "10",
    Weight: "40",
    Duration : "8",
    Calories : "10"
  },
  {
    Name: 'Chest Fly',
    Sets: "3",
    Reps: "10",
    Weight: "20",
    Duration : "15",
    Calories : "15"
  },
];

export const deleteWorkoutTitle: string = "sport";

export const updateWorkout : workout ={

    workoutTitle: "Chest and Back Workout",
    workoutType : "other"

}

export const updateWorkoutExercises : Exercise[] = [
  {
    Name: 'Back Extension',
    Sets: "3",
    Reps: "8",
    Weight: "40",
    Duration : "8",
    Calories : "15"
  }
];

export const tooltipData : TooltipMap ={
  "strength":{
    
    WorkoutCount : "Workouts: 1",
    KcalCount : "Kcal Burned: 10",
    ShareCount : "Share: 20%"

  },
  "Cardio":
  {
  WorkoutCount : "Workouts: 1",
  KcalCount : "Kcal Burned: 100",
  ShareCount : "Share: 20%"
  },
  "yoga":
  {
  WorkoutCount : "Workouts: 1",
  KcalCount : "Kcal Burned: 20",
  ShareCount : "Share: 20%"
  },
  "other":
  {
  WorkoutCount : "Workouts: 1",
  KcalCount : "Kcal Burned: 300",
  ShareCount : "Share: 20%"
  },
  "HIT":
  {
  WorkoutCount : "Workouts: 1",
  KcalCount : "Kcal Burned: 50",
  ShareCount : "Share: 20%"
  },

}

export const thisWeekTotalData : ThisWeekTotal =
  {
    totalWorkouts: '5',
    totalKcal :  '480'
  }


export const thisWeekAnalyticsData : ThisWeekAnalyticData[] =[
  {
    workoutTitle:"Chest Workout",
    workoutType : "strength",
    exercise: 
    [
      {
      Name :  "pushup",
      Sets : "3",
      Reps : "15",
      Weight : "10",
      Duration : "10",
      Calories : "10"
      }
    ]
  },
  {
    workoutTitle:"run",
    workoutType : "Cardio",
    exercise:
    [
      {
        Name :  "jog",
        Sets : "0",
        Reps : "0",
        Weight : "0",
        Duration : "15",
        Calories : "100"
      }
    ]
  },
  {
    workoutTitle:"jump",
    workoutType : "HIT",
    exercise:
    [
      {
        Name :  "rop jump",
        Sets : "3",
        Reps : "15",
        Weight : "0",
        Duration : "10",
        Calories : "50"
      }
    ]
  },
  {
    workoutTitle:"yoga session",
    workoutType : "yoga",
    exercise:
    [
      {
        Name :  "rest",
        Sets : "0",
        Reps : "0",
        Weight : "0",
        Duration : "20",
        Calories : "20"
      }
    ]
  },
  {
    workoutTitle:"sport",
    workoutType : "other",
    exercise:
    [
      {
        Name :  "football",
        Sets : "0",
        Reps : "0",
        Weight : "0",
        Duration : "60",
        Calories : "300"
      }
    ]
  }
]

export const backWorkout : ThisWeekAnalyticData =
{
  workoutTitle: "back workout",
  workoutType: "strength",
  exercise : 
  [
  {
    Name : "back extension",
    Sets : "3",
    Reps : "15",
    Weight : "20",
    Duration : "10",
    Calories : "20"
  }
]
  

}

export const updatedTooltipData : TooltipMap ={

"strength":
  {
    WorkoutCount : "Workouts: 1",
    KcalCount : "Kcal Burned: 30",
    ShareCount : "Share: 20%"

  },
  "Cardio":
  {
  WorkoutCount : "Workouts: 1",
  KcalCount : "Kcal Burned: 100",
  ShareCount : "Share: 20%"
  },
  "yoga":
  {
  WorkoutCount : "Workouts: 1",
  KcalCount : "Kcal Burned: 20",
  ShareCount : "Share: 20%"
  },
  "other":
  {
  WorkoutCount : "Workouts: 1",
  KcalCount : "Kcal Burned: 300",
  ShareCount : "Share: 20%"
  },
  "HIT":
  {
  WorkoutCount : "Workouts: 1",
  KcalCount : "Kcal Burned: 50",
  ShareCount : "Share: 20%"
  },

}

export const updatedThisWeekTotalData : ThisWeekTotal =
  {
    totalWorkouts: '5',
    totalKcal :  '500'
  }

  export const updatedThisWeekAnalyticsData : ThisWeekAnalyticData =
  {
    workoutTitle:"Chest Workout",
    workoutType : "strength",
    exercise: 
    [
      {
      Name :  "pushup",
      Sets : "3",
      Reps : "15",
      Weight : "10",
      Duration : "10",
      Calories : "30"
      }
    ]
  }

export const deletedThisWeekTotalData : ThisWeekTotal =
  {
    totalWorkouts: '4',
    totalKcal :  '200'
  }
export const deletedTooltipData : TooltipMap ={

"strength":
  {
    WorkoutCount : "Workouts: 1",
    KcalCount : "Kcal Burned: 30",
    ShareCount : "Share: 25%"

  },
  "Cardio":
  {
  WorkoutCount : "Workouts: 1",
  KcalCount : "Kcal Burned: 100",
  ShareCount : "Share: 25%"
  },
  "yoga":
  {
  WorkoutCount : "Workouts: 1",
  KcalCount : "Kcal Burned: 20",
  ShareCount : "Share: 25%"
  },
  "HIT":
  {
  WorkoutCount : "Workouts: 1",
  KcalCount : "Kcal Burned: 50",
  ShareCount : "Share: 25%"
  },

}
