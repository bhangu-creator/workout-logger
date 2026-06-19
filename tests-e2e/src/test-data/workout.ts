import { NumberExpression } from "mongoose";


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