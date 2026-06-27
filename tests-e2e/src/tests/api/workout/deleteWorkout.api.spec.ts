import {test,expect} from '@playwright/test';
import { AuthService }  from '../../../api/services/auth.service';
import { WorkoutService }  from '../../../api/services/workout.service';
import { validLoginUserApi }  from '../../../api/test-data/auth.data';
import { createWorkoutData,expectedCreateWorkoutResponse ,deleteWorkoutResponse,invalidToken,invalidTokenResponse,updateWorkoutId, invalidUpdateWorkoutId,duplicateDeleteWorkoutResponse,invalidUpdateWorkoutIdResponse} from '../../../api/test-data/workout.data';

test.describe('Delete Workout API Test Cases',()=>
{

    test('To verify valid user can successfully delete a workout',async({request})=>
    {
        const auth= new AuthService(request);
        const workout= new WorkoutService(request);

        const token = await auth.getToken(validLoginUserApi);
        const response = await workout.createWorkout(token,createWorkoutData);

        expect(response.status()).toBe(201);

        const body = await response.json();
        expect(body).toMatchObject(expectedCreateWorkoutResponse);
        expect(body.newWorkout._id).toBeTruthy();
        expect(body.newWorkout.user).toBeTruthy();
        expect(body.newWorkout.createdAt).toBeTruthy();
        expect(body.newWorkout.exercises[0]._id).toBeTruthy();

        const delResponse= await workout.deleteWorkoutById(token,body.newWorkout._id);
        expect(delResponse.status()).toBe(200);
        const delBody= await delResponse.json();
        expect(delBody).toMatchObject(deleteWorkoutResponse)
        
    })


    test('To verify if user cannot delete workout by invalid id', async ({request})=>
    {
        const auth= new AuthService(request);
        const workout= new WorkoutService(request);
        
        const token = await auth.getToken(validLoginUserApi);
        const response = await workout.deleteWorkoutById(token,invalidUpdateWorkoutId);

        expect(response.status()).toBe(400);

        const body = await response.json();
        expect(body).toMatchObject(invalidUpdateWorkoutIdResponse);

    })


    test('To verify if user cannot delete the workout with invalid token', async ({request})=>
    {
        const workout= new WorkoutService(request);
        const response = await workout.deleteWorkoutById(invalidToken,updateWorkoutId);

        expect(response.status()).toBe(401);

        const body = await response.json();
        expect(body).toMatchObject(invalidTokenResponse);
    })

    test('To verify response when user tries to delete the same workout again',async({request})=>
    {
        const auth= new AuthService(request);
        const workout= new WorkoutService(request);

        const token = await auth.getToken(validLoginUserApi);
        const response = await workout.createWorkout(token,createWorkoutData);

        expect(response.status()).toBe(201);

        const body = await response.json();
        expect(body).toMatchObject(expectedCreateWorkoutResponse);
        expect(body.newWorkout._id).toBeTruthy();
        expect(body.newWorkout.user).toBeTruthy();
        expect(body.newWorkout.createdAt).toBeTruthy();
        expect(body.newWorkout.exercises[0]._id).toBeTruthy();

        const delResponse= await workout.deleteWorkoutById(token,body.newWorkout._id);
        expect(delResponse.status()).toBe(200);
        const delBody= await delResponse.json();
        expect(delBody).toMatchObject(deleteWorkoutResponse)

        //delete again

        const dupResponse= await workout.deleteWorkoutById(token,body.newWorkout._id);
        expect(dupResponse.status()).toBe(404);
        const dupBody= await dupResponse.json();
        expect(dupBody).toMatchObject(duplicateDeleteWorkoutResponse)
        
    })

})