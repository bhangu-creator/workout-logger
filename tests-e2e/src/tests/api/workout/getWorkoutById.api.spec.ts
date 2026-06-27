import {test,expect} from '@playwright/test';
import { AuthService }  from '../../../api/services/auth.service';
import { WorkoutService }  from '../../../api/services/workout.service';
import { validLoginUserApi }  from '../../../api/test-data/auth.data';
import { createWorkoutData,expectedCreateWorkoutResponse ,deleteWorkoutResponse,invalidToken,invalidTokenResponse,getWorkoutByIdResponse,updateWorkoutId, invalidUpdateWorkoutId,getWorkoutInvalidResponse} from '../../../api/test-data/workout.data';

test.describe('Get Workout By Id API Test Cases',()=>
{

    test('To verify valid user can successfully get a workout by Id',async({request})=>
    {
        const auth= new AuthService(request);
        const workout= new WorkoutService(request);

        //create workout
        const token = await auth.getToken(validLoginUserApi);
        const response = await workout.createWorkout(token,createWorkoutData);

        expect(response.status()).toBe(201);

        const body = await response.json();
        expect(body).toMatchObject(expectedCreateWorkoutResponse);
        expect(body.newWorkout._id).toBeTruthy();
        expect(body.newWorkout.user).toBeTruthy();
        expect(body.newWorkout.createdAt).toBeTruthy();
        expect(body.newWorkout.exercises[0]._id).toBeTruthy();

        //get workout by id

        const getResponse= await workout.getWorkoutById(token,body.newWorkout._id);
        
        expect(getResponse.status()).toBe(200);
        const getBody= await getResponse.json();

        expect(getBody).toMatchObject(getWorkoutByIdResponse);
        expect(getBody.workout._id).toBeTruthy();
        expect(getBody.workout.user).toBeTruthy();
        expect(getBody.workout.createdAt).toBeTruthy();
        expect(getBody.workout.exercises[0]._id).toBeTruthy();



        //teardown
        const delResponse= await workout.deleteWorkoutById(token,body.newWorkout._id);
        expect(delResponse.status()).toBe(200);
        const delBody= await delResponse.json();
        expect(delBody).toMatchObject(deleteWorkoutResponse)


    })

    test('To verify if user cannot view the workout with invalid token', async ({request})=>
    {
        const workout= new WorkoutService(request);
        const response = await workout.getWorkoutById(invalidToken,updateWorkoutId);

        expect(response.status()).toBe(401);

        const body = await response.json();
        expect(body).toMatchObject(invalidTokenResponse);


    })


    test('To verify if user cannot get workout by invalid id', async ({request})=>
    {
        const auth= new AuthService(request);
        const workout= new WorkoutService(request);
        
        const token = await auth.getToken(validLoginUserApi);
        const response = await workout.getWorkoutById(token,invalidUpdateWorkoutId);

        expect(response.status()).toBe(500);

        const body = await response.json();
        expect(body).toMatchObject(getWorkoutInvalidResponse);

    })

})