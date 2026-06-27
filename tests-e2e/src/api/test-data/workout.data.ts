import { Exercise } from "../../test-data/workout"

export interface CreateWorkout
{
    title:string,
    type:string,
    exercises: ExercisePayload[]
}

export interface ExercisePayload
{
    name: string,
    sets: string,
    reps: string,
    weight:string,
    duration: string, 
    kcalBurned: string
}

export const createWorkoutData : CreateWorkout =
{
    title :"chest exercise",
    type : "strength",
    exercises: [
        {
            name: "bench press",
            sets: "3",
            reps: "15",
            weight:"50",
            duration: "10", 
            kcalBurned: "50"
        }
    ]
}

export const updateWorkout : CreateWorkout =
{
    title :"back exercise",
    type : "strength",
    exercises: [
        {
            name: "back extension",
            sets: "2",
            reps: "10",
            weight:"70",
            duration: "20", 
            kcalBurned: "80"
        }
    ]
}

export const expectedCreateWorkoutResponse = {
  message: "New workout is created successfully",
  newWorkout: {
    title: "chest exercise",
    type: "strength",
    exercises: [
      {
        name: "bench press",
        sets: 3,
        reps: 15,
        weight: 50,
        duration: 10,
        kcalBurned: 50,
      },
    ],
  },
};

export const expectedUpdateWorkoutResponse = 
{
    message: "Workout has been updated successfully",
    updatedWorkout: {
        title: "back exercise",
        type: "strength",
        exercises: [
            {
                name: "back extension",
                sets: 2,
                reps: 10,
                weight: 70,
                duration: 20,
                kcalBurned: 80,
            }
        ],
    }
}

export const deleteWorkoutResponse =
{
    "message": "Workout has been deleted successfully"
}

export const duplicateDeleteWorkoutResponse =
{
    "success": false,
    "error": "Workout not Found"
}

export const invalidToken = "ssa"

export const invalidTokenResponse =
{
    "message": "Invalid or expired token. Please login again"
}

export const missingTitleResponse =
{
    "success": false,
    "error": "Title or exercises are required"
}

export const updateMissingFields =
{
    "success": false,
    "error": "Required fields are not provided for update"
}

export const missingTypeResponse =
{
    "success": false,
    "error": "Error while creating a new workout: Please use only these options for 'type': [strength,Cardio,HIT,yoga,other]"
}

export const missingExercises =
{
    "success": false,
    "error": "Title or exercises are required"
}

export const updateWorkoutId = "6a3e44df58ac61b33c384022";
export const invalidUpdateWorkoutId = "sa5";

export const invalidUpdateWorkoutIdResponse =
{
    "success": false,
    "error": "Invalid Workout Id"
}

export const getWorkoutInvalidResponse =
{
    "success": false,
    "error": "Server Error while fetching the workout"
}

export const getEmptyWorkoutResponse =
{ workouts: [], sucess: true, count: 0 }


export const getWorkoutByIdResponse =
{
    workout: {
        title: "chest exercise",
        type: "strength",
        exercises: [
            {
                name: "bench press",
                sets: 3,
                reps: 15,
                weight: 50,
                duration: 10,
                kcalBurned: 50,
            }
        ],
    }

}

export const getAllWorkoutsData =
{
    workouts: [
        {
            title: "HIT",
            type: "HIT",
            exercises: [
                {
                    name: "jumping jacks",
                    sets: 3,
                    reps: 15,
                    weight: 0,
                    duration: 10,
                    kcalBurned: 50,
                },
                {
                    name: "rop skip",
                    sets: 3,
                    reps: 15,
                    weight: 0,
                    duration: 10,
                    kcalBurned: 100,
                }
            ],
        },
        {
            title: "run",
            type: "Cardio",
            exercises: [
                {
                    name: "jog",
                    sets: 0,
                    reps: 0,
                    weight: 0,
                    duration: 15,
                    kcalBurned: 100,
                }
            ],
        },
        {
            title: "Chest Workout",
            type: "strength",
            exercises: [
                {
                    name: "bench press",
                    sets: 3,
                    reps: 15,
                    weight: 20,
                    duration: 10,
                    kcalBurned: 50,
                }
            ],
        }
    ],
    sucess: true,
    count: 3
}