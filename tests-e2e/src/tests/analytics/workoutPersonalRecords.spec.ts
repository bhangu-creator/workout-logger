// import playwright module
import { test, expect } from "@playwright/test";
import { Workouts } from "../../pages/workoutsPage";
import { LoginPage } from "../../pages/loginPage";
import { validUser } from "../../test-data/users";
import { WorkoutPersonalRecords } from "../../pages/workoutPersonalRecordsPage";
import { personalRecordsData,updatedPersonalRecordsData,deletedPersonalRecordsData,thisWeekAnalyticsData,updatedThisWeekAnalyticsData,deleteWorkoutTitle} from "../../test-data/workout";

test.beforeEach(
    "Log in as valid user before crud operations on workouts",
    async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(validUser.email, validUser.password);
    }
);

test.describe('Workout Personal Records Tests',()=>
{
    test('To verify if Personal Records Data is showing correctly ',async({page})=>
    {
        const workout = new Workouts(page);
        const personalRecord= new WorkoutPersonalRecords(page);

        //create data for personal records
        for (const data of thisWeekAnalyticsData) 
        {
            await workout.createWorkout(data.workoutTitle,data.workoutType,data.exercise);
        }

        //validate the created data in personal records
        await workout.openViewWorkoutByPersonalRecords();
        await personalRecord.verifyPersonalRecords(personalRecordsData);


        //update the data for Personal Records
        await workout.navigateToHomePage();
        await workout.searchWorkout(thisWeekAnalyticsData[0].workoutTitle);
        await workout.editWorkout(updatedThisWeekAnalyticsData.workoutTitle,updatedThisWeekAnalyticsData.workoutType,updatedThisWeekAnalyticsData.exercise);

        //validate the data for Personal Records
        await workout.openViewWorkoutByPersonalRecords();
        await personalRecord.verifyPersonalRecords(updatedPersonalRecordsData);

        //delete the workout 
        await workout.navigateToHomePage();
        await workout.deleteWorkout(deleteWorkoutTitle);

        //verify the deleted data in Personal Records
        await workout.openViewWorkoutByPersonalRecords();
        await personalRecord.verifyPersonalRecords(deletedPersonalRecordsData);
        await workout.navigateToHomePage();

        //verify that list is not empty
        await expect(workout.workoutRows.first()).toBeVisible();

        //teardown
        for (let i = 0; i < thisWeekAnalyticsData.length; i++) 
        {
            const title = thisWeekAnalyticsData[i].workoutTitle;
            if (title !== deleteWorkoutTitle) {
                await workout.deleteWorkout(title);
            }
        }

    })
})
