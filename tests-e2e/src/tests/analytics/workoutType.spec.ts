// import playwright module
import {test,expect} from "@playwright/test";
import { Workouts } from "../../pages/workoutsPage";
import { WorkoutTypeAnalytic } from "../../pages/workoutTypeAnalyticPage";
import { LoginPage } from "../../pages/loginPage";
import { validUser } from "../../test-data/users";
import { thisWeekAnalyticsData,thisWeekTotalData,tooltipData,updatedThisWeekTotalData,updatedTooltipData,updatedThisWeekAnalyticsData,deleteWorkoutTitle,deletedThisWeekTotalData,deletedTooltipData} from "../../test-data/workout";

test.beforeEach('Log in as valid user before crud operations on workouts',async({page})=>
{
    const loginPage= new LoginPage(page);
    loginPage.login(validUser.email,validUser.password);

})

test.describe('Workout Type Analytics Section Tests',()=>
{
    test('To verify workout type analytics for last week',async ({page})=>
    {
        
        const workout = new Workouts(page);
        const analytic= new WorkoutTypeAnalytic(page);

        //create new workouts for testing
        for(const data of thisWeekAnalyticsData)
        {
            await workout.createWorkout(data.workoutTitle,data.workoutType,data.exercise);
        }

        await workout.openViewWorkoutByType();
        await analytic.checkThisWeekBox();
        await analytic.verifyThisWeekTotalData(thisWeekTotalData.totalWorkouts,thisWeekTotalData.totalKcal);
        await expect(analytic.workoutTypeSlices).toHaveCount(5);
        console.log("slice count =", await analytic.workoutTypeSlices.count());
        //verify tooltips data
        for(let i=0;i<Object.keys(tooltipData).length;i++)
        {
            await analytic.hoverSlice(i);
            await analytic.verifyToolTipDetails(tooltipData);

        }

        //update the workouts
        await analytic.navigateToHomePage();
        await workout.searchWorkout(thisWeekAnalyticsData[0].workoutTitle);
        await workout.editWorkout(updatedThisWeekAnalyticsData.workoutTitle,updatedThisWeekAnalyticsData.workoutType,updatedThisWeekAnalyticsData.exercise);


        await workout.openViewWorkoutByType();
        await analytic.checkThisWeekBox();


        await analytic.verifyThisWeekTotalData(updatedThisWeekTotalData.totalWorkouts,updatedThisWeekTotalData.totalKcal);
        await analytic.waitForWorkoutTypePieToRender(5);
        //verify tooltips data
        console.log("slice count =", await analytic.workoutTypeSlices.count());
        for(let i=0;i<Object.keys(updatedTooltipData).length;i++)
        {
            await analytic.hoverSlice(i);
            await analytic.verifyToolTipDetails(updatedTooltipData);
            await analytic.resetChartHover();

        }

        // //delete the workout
        // await analytic.navigateToHomePage();
        // await workout.deleteWorkout(deleteWorkoutTitle)


        // await workout.openViewWorkoutByType();
        // await analytic.checkThisWeekBox();   


        // await analytic.verifyThisWeekTotalData(deletedThisWeekTotalData.totalWorkouts,deletedThisWeekTotalData.totalKcal);
        // await expect(analytic.workoutTypeSlices).toHaveCount(4);
        // //verify tooltips data
        // for(let i=0;i<Object.keys(deletedTooltipData).length;i++)
        // {
        //     await analytic.hoverSlice(i);
        //     await analytic.verifyToolTipDetails(deletedTooltipData);

        // }
        // await analytic.navigateToHomePage();


        // //teardown
        // for(let i=0;i<Object.keys(thisWeekAnalyticsData).length;i++)
        // {
        //     const title=thisWeekAnalyticsData[i].workoutTitle
        //     if(title!=deleteWorkoutTitle)
        //     {
        //     await workout.deleteWorkout(title);

        //     }

        // }
    })
})