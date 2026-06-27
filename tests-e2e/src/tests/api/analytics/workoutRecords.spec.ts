import {test,expect} from '@playwright/test';
import { AuthService }  from '../../../api/services/auth.service';
import { WorkoutService }  from '../../../api/services/workout.service';
import { validLoginUserApi }  from '../../../api/test-data/auth.data';
import { createWorkoutData,expectedCreateWorkoutResponse ,deleteWorkoutResponse,invalidToken,invalidTokenResponse} from '../../../api/test-data/workout.data';
import {getRecordData } from '../../../api/test-data/analytics.data';
import { AnalyticService } from '../../../api/services/analytics.service';

test.describe('Get Workout Trend API Test Cases',()=>
{

    test('To verify valid user can successfully get workout trend',async({request})=>
    {
        const auth= new AuthService(request);
        const workout= new WorkoutService(request);
        const analytic = new AnalyticService(request);

        const token = await auth.getToken(validLoginUserApi);
        const response = await workout.createWorkout(token,createWorkoutData);

        expect(response.status()).toBe(201);

        const body = await response.json();
        expect(body).toMatchObject(expectedCreateWorkoutResponse);
        expect(body.newWorkout._id).toBeTruthy();
        expect(body.newWorkout.user).toBeTruthy();
        expect(body.newWorkout.createdAt).toBeTruthy();
        expect(body.newWorkout.exercises[0]._id).toBeTruthy();

        //get workout by this week
        const analyticResponse= await analytic.getPersonalRecords(token);

        expect(analyticResponse.status()).toBe(200);
        const analyticBody= await analyticResponse.json();

        expect(analyticBody).toMatchObject(getRecordData);

        //teardown
        const delResponse= await workout.deleteWorkoutById(token,body.newWorkout._id);
        expect(delResponse.status()).toBe(200);
        const delBody= await delResponse.json();
        expect(delBody).toMatchObject(deleteWorkoutResponse)
    })

      test('To verify user cannot get the data if token is invalid',async({request})=>
    {
        const analytic = new AnalyticService(request);

        //get workout by this week
        const analyticResponse= await analytic.getPersonalRecords(invalidToken);

        expect(analyticResponse.status()).toBe(401);
        const analyticBody= await analyticResponse.json();

        expect(analyticBody).toMatchObject(invalidTokenResponse);
    });

   
});