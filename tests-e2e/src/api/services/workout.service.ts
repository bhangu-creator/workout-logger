import { APIRequestContext } from "@playwright/test";
import { CreateWorkout } from "../test-data/workout.data";
import { API_ROUTES } from "../endpoints";

export class WorkoutService
{
    constructor(private request: APIRequestContext){}

    async createWorkout(token:string,payload:CreateWorkout)
    {
        return await this.request.post(process.env.BACKEND_BASE_URL+API_ROUTES.workouts.createWorkout,{
            headers :
            {
                Authorization: `Bearer ${token}`
            },
            data:payload})
    }

    async updateWorkout(token:string,id:string,payload:CreateWorkout)
    {
        return await this.request.put(process.env.BACKEND_BASE_URL+API_ROUTES.workouts.updateWorkout+'/'+id,{
            headers :
            {
                Authorization: `Bearer ${token}`
            },
            data:payload})
    }

    async deleteWorkoutById(token:string,id:string)
    {
       const response= await this.request.delete(process.env.BACKEND_BASE_URL+API_ROUTES.workouts.createWorkout+'/'+id,
            {headers:
                {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        if (response.status() !== 200) throw new Error('Workout Id Invalid');
        return response;

    }
}

 