import {test,expect} from '@playwright/test';
import { AuthService } from '../../../api/services/auth.service';
import { WorkoutService } from '../../../api/services/workout.service';
import { validLoginUserApi } from '../../../api/test-data/auth.data';
import { createWorkoutData,expectedCreateWorkoutResponse ,deleteWorkoutResponse,updateWorkout,expectedUpdateWorkoutResponse,invalidToken,updateWorkoutId,invalidTokenResponse,invalidUpdateWorkoutId,invalidUpdateWorkoutIdResponse,updateMissingFields} from '../../../api/test-data/workout.data';

test.describe('Update Workout API Test Cases',()=>
{

    test('To verify valid user can successfully update a workout',async({request})=>
    {
        const auth= new AuthService(request);
        const workout= new WorkoutService(request);

        const token = await auth.getToken(validLoginUserApi);

        //create a workout
        const response = await workout.createWorkout(token,createWorkoutData);

        expect(response.status()).toBe(201);

        const body = await response.json();
        expect(body).toMatchObject(expectedCreateWorkoutResponse);
        expect(body.newWorkout._id).toBeTruthy();
        expect(body.newWorkout.user).toBeTruthy();
        expect(body.newWorkout.createdAt).toBeTruthy();
        expect(body.newWorkout.exercises[0]._id).toBeTruthy();
        console.log(body.newWorkout._id,"saa")

        //update a workout
        const updateResponse = await workout.updateWorkout(token,body.newWorkout._id,updateWorkout);

        expect(updateResponse.status()).toBe(200);

        const updateBody = await updateResponse.json();
        expect(updateBody).toMatchObject(expectedUpdateWorkoutResponse);
        expect(updateBody.updatedWorkout._id).toBeTruthy();
        expect(updateBody.updatedWorkout.user).toBeTruthy();
        expect(updateBody.updatedWorkout.createdAt).toBeTruthy();
        expect(updateBody.updatedWorkout.exercises[0]._id).toBeTruthy();




        //teardown
        const delResponse= await workout.deleteWorkoutById(token,body.newWorkout._id);
        expect(delResponse.status()).toBe(200);
        const delBody= await delResponse.json();
        expect(delBody).toMatchObject(deleteWorkoutResponse)
    })

    test('To verify workout should not get updated without valid auth token',async({request})=>
    {
        const workout= new WorkoutService(request);
        const response = await workout.updateWorkout(invalidToken,updateWorkoutId,updateWorkout);

        expect(response.status()).toBe(401);

        const body = await response.json();
        expect(body).toMatchObject(invalidTokenResponse);

    })


    test('To verify workout cannot get updated with invalid workout id',async({request})=>
    {
        const workout= new WorkoutService(request);
        const auth = new AuthService(request);

        const token = await auth.getToken(validLoginUserApi);
        const response = await workout.updateWorkout(token,invalidUpdateWorkoutId,updateWorkout);

        expect(response.status()).toBe(400);

        const body = await response.json();
        expect(body).toMatchObject(invalidUpdateWorkoutIdResponse);

    })

    test('To verify workout cannot get upated with  missing title',async({request})=>
    {
        const auth= new AuthService(request);
        const workout= new WorkoutService(request);

        const token = await auth.getToken(validLoginUserApi);
        const dataToBeSent = JSON.parse(JSON.stringify(updateWorkout));
        dataToBeSent.title="";
        const response = await workout.updateWorkout(token,updateWorkoutId,dataToBeSent);

        expect(response.status()).toBe(400);

        const body = await response.json();
        expect(body).toMatchObject(updateMissingFields);

    })
    
    
    test('To verify workout cannot get updated with missing type',async({request})=>
    {
        const auth= new AuthService(request);
        const workout= new WorkoutService(request);

        const token = await auth.getToken(validLoginUserApi);
        const dataToBeSent = JSON.parse(JSON.stringify(updateWorkout));
        dataToBeSent.type="";
        const response = await workout.updateWorkout(token,updateWorkoutId,dataToBeSent);

        expect(response.status()).toBe(400);

        const body = await response.json();
        expect(body).toMatchObject(updateMissingFields);

    })

      test('To verify workout cannot get updated with missing exercises',async({request})=>
    {
        const auth= new AuthService(request);
        const workout= new WorkoutService(request);

        const token = await auth.getToken(validLoginUserApi);
        const dataToBeSent = JSON.parse(JSON.stringify(updateWorkout));
        dataToBeSent.exercises=[];
        const response = await workout.updateWorkout(token,updateWorkoutId,dataToBeSent);

        expect(response.status()).toBe(400);

        const body = await response.json();
        expect(body).toMatchObject(updateMissingFields);

    })

})