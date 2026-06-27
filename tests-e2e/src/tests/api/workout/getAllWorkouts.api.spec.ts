import {test,expect} from '@playwright/test';
import { AuthService }  from '../../../api/services/auth.service';
import { WorkoutService }  from '../../../api/services/workout.service';
import { workoutsUserApi,noWorkoutUserApi }  from '../../../api/test-data/auth.data';
import { invalidToken,invalidTokenResponse,getEmptyWorkoutResponse,getAllWorkoutsData} from '../../../api/test-data/workout.data';

test.describe('Get Workout By Id API Test Cases',()=>
{

    test('To verify valid user can successfully get all the logged workouts',async({request})=>
    {
        const auth= new AuthService(request);
        const workout= new WorkoutService(request);

        //create workout
        const token = await auth.getToken(workoutsUserApi);

        //get all workouts 

        const getResponse= await workout.getAllWorkouts(token);
        
        expect(getResponse.status()).toBe(200);
        const getBody= await getResponse.json();

        expect(getBody).toMatchObject(getAllWorkoutsData);
        for(let i=0;i<3;i++)
        {
        expect(getBody.workouts[i]._id).toBeTruthy();
        expect(getBody.workouts[i].user).toBeTruthy();
        expect(getBody.workouts[i].createdAt).toBeTruthy();
        expect(getBody.workouts[i].exercises[0]._id).toBeTruthy();
        }

    })

    test('To verify if user cannot view the workout with invalid token', async ({request})=>
    {
        const workout= new WorkoutService(request);
        const response = await workout.getAllWorkouts(invalidToken);

        expect(response.status()).toBe(401);

        const body = await response.json();
        expect(body).toMatchObject(invalidTokenResponse);


    })


    test('To verifyif user will return empty array if no workouts exists', async ({request})=>
    {
        const auth= new AuthService(request);
        const workout= new WorkoutService(request);
        
        const token = await auth.getToken(noWorkoutUserApi);
        const response = await workout.getAllWorkouts(token);

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body).toMatchObject(getEmptyWorkoutResponse);

    })

})