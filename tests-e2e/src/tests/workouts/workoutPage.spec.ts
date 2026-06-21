// import playwright module
import {test,expect} from "@playwright/test";
import { Workouts } from "../../pages/workoutsPage";
import { LoginPage } from "../../pages/loginPage";
import { validUser } from "../../test-data/users";
import { validWorkout,validChestWorkoutExercises,updateWorkout,updateWorkoutExercises } from "../../test-data/workout";

test.beforeEach('Log in as valid user before crud operations on workouts',async({page})=>
{
    const loginPage= new LoginPage(page);
    loginPage.login(validUser.email,validUser.password);

})

test.describe('workout crud tests',()=>
{
    test('To verify if user can create a valid Workout',async ({page})=>
    {
        const workout = new Workouts(page);

        await workout.createWorkout(validWorkout.workoutTitle,validWorkout.workoutType,validChestWorkoutExercises);
        await workout.searchWorkout(validWorkout.workoutTitle);
        await workout.viewWorkout(validWorkout.workoutTitle,validWorkout.workoutType,validChestWorkoutExercises);

        //cleanup
        await workout.deleteWorkout(validWorkout.workoutTitle);

    })

    test('To verify if user can update a valid Workout',async ({page})=>
    {
        const workout = new Workouts(page);

        await workout.createWorkout(validWorkout.workoutTitle,validWorkout.workoutType,validChestWorkoutExercises);
        await workout.editWorkout(updateWorkout.workoutTitle,updateWorkout.workoutType,updateWorkoutExercises);
        await workout.searchWorkout(updateWorkout.workoutTitle);
        await workout.viewWorkout(updateWorkout.workoutTitle,updateWorkout.workoutType,updateWorkoutExercises);

        //cleanup
        await workout.deleteWorkout(updateWorkout.workoutTitle);

    })

    test('To verify if user can delete the workout successfully',async({page})=>
    {

        const workout = new Workouts(page);

        await workout.createWorkout(validWorkout.workoutTitle,validWorkout.workoutType,validChestWorkoutExercises);
        await workout.LogWorkoutButton.click();
        await workout.workoutOkModalButton.click();
        await workout.deleteWorkout(validWorkout.workoutTitle);

    })
})