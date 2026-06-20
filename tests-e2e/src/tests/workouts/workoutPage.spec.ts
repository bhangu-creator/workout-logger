// import playwright module
import {test,expect} from "@playwright/test";
import { Workouts } from "../../pages/workoutsPage";
import { LoginPage } from "../../pages/loginPage";
import { validUser } from "../../test-data/users";
import { validWorkout,validChestWorkoutExercises } from "../../test-data/workout";

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
        await workout.LogWorkoutButton.click();
        await workout.workoutOkModalButton.click();
        await workout.viewWorkout(validWorkout.workoutTitle,validWorkout.workoutType,validChestWorkoutExercises);

    })
})