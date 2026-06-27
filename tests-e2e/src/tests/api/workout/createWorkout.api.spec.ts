import {test,expect} from '@playwright/test';
import { AuthService }  from '../../../api/services/auth.service';
import { WorkoutService }  from '../../../api/services/workout.service';
import { validLoginUserApi }  from '../../../api/test-data/auth.data';
import { createWorkoutData,expectedCreateWorkoutResponse ,deleteWorkoutResponse,invalidToken,invalidTokenResponse,missingTitleResponse,missingTypeResponse,missingExercises} from '../../../api/test-data/workout.data';

test.describe('Create Workout API Test Cases',()=>
{

    test('To verify valid user can successfully create a workout',async({request})=>
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

        //teardown
        const delResponse= await workout.deleteWorkoutById(token,body.newWorkout._id);
        expect(delResponse.status()).toBe(200);
        const delBody= await delResponse.json();
        expect(delBody).toMatchObject(deleteWorkoutResponse)
    })

    test('To verify workout should not get created without valid auth token',async({request})=>
    {
        const workout= new WorkoutService(request);
        const response = await workout.createWorkout(invalidToken,createWorkoutData);

        expect(response.status()).toBe(401);

        const body = await response.json();
        expect(body).toMatchObject(invalidTokenResponse);

    })


    test('To verify workout cannot get created with  missing title',async({request})=>
    {
        const auth= new AuthService(request);
        const workout= new WorkoutService(request);

        const token = await auth.getToken(validLoginUserApi);
        const dataToBeSent = JSON.parse(JSON.stringify(createWorkoutData));
        dataToBeSent.title="";
        const response = await workout.createWorkout(token,dataToBeSent);

        expect(response.status()).toBe(400);

        const body = await response.json();
        expect(body).toMatchObject(missingTitleResponse);

    })


    test('To verify workout cannot get created with missing type',async({request})=>
    {
        const auth= new AuthService(request);
        const workout= new WorkoutService(request);

        const token = await auth.getToken(validLoginUserApi);
        const dataToBeSent = JSON.parse(JSON.stringify(createWorkoutData));
        dataToBeSent.type="";
        const response = await workout.createWorkout(token,dataToBeSent);

        expect(response.status()).toBe(400);

        const body = await response.json();
        expect(body).toMatchObject(missingTypeResponse);

    })

      test('To verify workout cannot get created with missing exercises',async({request})=>
    {
        const auth= new AuthService(request);
        const workout= new WorkoutService(request);

        const token = await auth.getToken(validLoginUserApi);
        const dataToBeSent = JSON.parse(JSON.stringify(createWorkoutData));
        dataToBeSent.exercises=[];
        const response = await workout.createWorkout(token,dataToBeSent);

        expect(response.status()).toBe(400);

        const body = await response.json();
        expect(body).toMatchObject(missingExercises);

    })


})