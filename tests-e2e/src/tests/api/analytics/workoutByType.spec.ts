import {test,expect} from '@playwright/test';
import { AuthService }  from '../../../api/services/auth.service';
import { WorkoutService }  from '../../../api/services/workout.service';
import { validLoginUserApi }  from '../../../api/test-data/auth.data';
import { createWorkoutData,expectedCreateWorkoutResponse ,deleteWorkoutResponse,invalidToken,invalidTokenResponse} from '../../../api/test-data/workout.data';
import { getByThisWeekData,getByThisMonthData,getDataByLastMonth,getDataByCustomDate } from '../../../api/test-data/analytics.data';
import { AnalyticService } from '../../../api/services/analytics.service';
import { getYesterdayAndToday } from '../../../utils/date.util';

test.describe('Get Workout By Type API Test Cases',()=>
{

    test('To verify valid user can successfully get workout types using this week filter',async({request})=>
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
        const analyticResponse= await analytic.getWorkoutByTypeFilter(token,'this_week');

        expect(analyticResponse.status()).toBe(200);
        const analyticBody= await analyticResponse.json();

        expect(analyticBody).toMatchObject(getByThisWeekData);

        //teardown
        const delResponse= await workout.deleteWorkoutById(token,body.newWorkout._id);
        expect(delResponse.status()).toBe(200);
        const delBody= await delResponse.json();
        expect(delBody).toMatchObject(deleteWorkoutResponse)
    })

    test('To verify valid user can successfully get workout types using this month filter',async({request})=>
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

        //get workout by this month
        const analyticResponse= await analytic.getWorkoutByTypeFilter(token,'this_month');

        expect(analyticResponse.status()).toBe(200);
        const analyticBody= await analyticResponse.json();

        expect(analyticBody).toMatchObject(getByThisMonthData);

        //teardown
        const delResponse= await workout.deleteWorkoutById(token,body.newWorkout._id);
        expect(delResponse.status()).toBe(200);
        const delBody= await delResponse.json();
        expect(delBody).toMatchObject(deleteWorkoutResponse)
    })

    test('To verify valid user can successfully get workout types using last month filter',async({request})=>
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

        //get workout by last month
        const analyticResponse= await analytic.getWorkoutByTypeFilter(token,'last_month');

        expect(analyticResponse.status()).toBe(200);
        const analyticBody= await analyticResponse.json();

        expect(analyticBody).toMatchObject(getDataByLastMonth);

        //teardown
        const delResponse= await workout.deleteWorkoutById(token,body.newWorkout._id);
        expect(delResponse.status()).toBe(200);
        const delBody= await delResponse.json();
        expect(delBody).toMatchObject(deleteWorkoutResponse)
    })

    test('To verify valid user can successfully get workout types using custom date filter',async({request})=>
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

        //get workout by custom date
        const {from,to}= getYesterdayAndToday();
        const analyticResponse= await analytic.getWorkoutByCustomRange(token,from,to);

        expect(analyticResponse.status()).toBe(200);
        const analyticBody= await analyticResponse.json();

        expect(analyticBody).toMatchObject(getDataByCustomDate);

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
        const analyticResponse= await analytic.getWorkoutByTypeFilter(invalidToken,"this_month");

        expect(analyticResponse.status()).toBe(401);
        const analyticBody= await analyticResponse.json();

        expect(analyticBody).toMatchObject(invalidTokenResponse);

    })
});