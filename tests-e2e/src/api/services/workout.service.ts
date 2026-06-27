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

    async getWorkoutById(token:string,id:string)
    {
       const response= await this.request.get(process.env.BACKEND_BASE_URL+API_ROUTES.workouts.getWorkout+'/'+id,
            {headers:
                {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return response;

    }

    async getAllWorkouts(token:string)
    {
       const response= await this.request.get(process.env.BACKEND_BASE_URL+API_ROUTES.workouts.getAllWorkouts,
            {headers:
                {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return response;

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
        return response;

    }
}

 