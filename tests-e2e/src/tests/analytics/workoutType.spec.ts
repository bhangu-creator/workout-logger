// import playwright module
import { test, expect } from "@playwright/test";
import { Workouts } from "../../pages/workoutsPage";
import { WorkoutTypeAnalytic } from "../../pages/workoutTypeAnalyticPage";
import { LoginPage } from "../../pages/loginPage";
import { validUser } from "../../test-data/users";
import {thisWeekAnalyticsData,thisWeekTotalData,tooltipData,updatedThisWeekTotalData,updatedTooltipData,updatedThisWeekAnalyticsData,deleteWorkoutTitle,deletedThisWeekTotalData,deletedTooltipData} from "../../test-data/workout";

test.beforeEach(
    "Log in as valid user before crud operations on workouts",
    async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(validUser.email, validUser.password);
    }
);

test.describe("Workout Type Analytics Section Tests", () => {
    test("To verify workout type analytics for last week", async ({ page }) => {
        const workout = new Workouts(page);
        const analytic = new WorkoutTypeAnalytic(page);

        // create new workouts for testing
        for (const data of thisWeekAnalyticsData) {
            await workout.createWorkout(
                data.workoutTitle,
                data.workoutType,
                data.exercise
            );
        }


        // CREATE PHASE VALIDATION
        await workout.openViewWorkoutByType();
        await analytic.checkThisWeekBox();
        await analytic.verifyThisWeekTotalData(
            thisWeekTotalData.totalWorkouts,
            thisWeekTotalData.totalKcal
        );
        await analytic.waitForWorkoutTypePieToRender(5);

        // full stable validation using hidden breakdown rows
        await analytic.verifyBreakdownData(tooltipData);

        // optional tooltip smoke check - just prove tooltip works once
        await analytic.hoverSlice(0);
        await analytic.verifyToolTipDetails(tooltipData);
        await analytic.resetChartHover();

        // UPDATE PHASE VALIDATION
        await analytic.navigateToHomePage();
        await workout.searchWorkout(thisWeekAnalyticsData[0].workoutTitle);
        await workout.editWorkout(
            updatedThisWeekAnalyticsData.workoutTitle,
            updatedThisWeekAnalyticsData.workoutType,
            updatedThisWeekAnalyticsData.exercise
        );

        await workout.openViewWorkoutByType();
        await analytic.checkThisWeekBox();

        await analytic.verifyThisWeekTotalData(
            updatedThisWeekTotalData.totalWorkouts,
            updatedThisWeekTotalData.totalKcal
        );
        await analytic.waitForWorkoutTypePieToRender(5);

        // stable validation after update
        await analytic.verifyBreakdownData(updatedTooltipData);

        // DELETE PHASE VALIDATION
        await analytic.navigateToHomePage();
        await workout.deleteWorkout(deleteWorkoutTitle);

        await workout.openViewWorkoutByType();
        await analytic.checkThisWeekBox();

        await analytic.verifyThisWeekTotalData(
            deletedThisWeekTotalData.totalWorkouts,
            deletedThisWeekTotalData.totalKcal
        );
        await analytic.waitForWorkoutTypePieToRender(4);

        // stable validation after delete
        await analytic.verifyBreakdownData(deletedTooltipData);
        await analytic.navigateToHomePage();

        //verify that list is not empty
        await expect(workout.workoutRows.first()).toBeVisible();


        // TEARDOWN    
        for (let i = 0; i < thisWeekAnalyticsData.length; i++) {
            const title = thisWeekAnalyticsData[i].workoutTitle;
            if (title !== deleteWorkoutTitle) {
                await workout.deleteWorkout(title);
            }
        }

    });
});