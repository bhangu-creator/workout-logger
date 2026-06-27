import { APIRequestContext } from "@playwright/test";
import { CreateWorkout } from "../test-data/workout.data";
import { API_ROUTES } from "../endpoints";

export class AnalyticService
{
    constructor(private request: APIRequestContext){}

    async getWorkoutByTypeFilter(token:string,period:string)
    {
        return await this.request.get(process.env.BACKEND_BASE_URL+API_ROUTES.analytics.type,{
            headers:{
                Authorization: `Bearer ${token}`
            },
            params:
            {
                period: period
            }
        })
    }

    async getWorkoutByCustomRange(token:string,from:string,to:string)
    {
        return await this.request.get(process.env.BACKEND_BASE_URL+API_ROUTES.analytics.type,{
            headers:{
                Authorization: `Bearer ${token}`
            },
            params:
            {
                from : from,
                to: to
            }
        })
    }

    async getWorkoutByTrend(token:string)
    {
        return await this.request.get(process.env.BACKEND_BASE_URL+API_ROUTES.analytics.trend,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
    }

    async getPersonalRecords(token:string)
    {
        return await this.request.get(process.env.BACKEND_BASE_URL+API_ROUTES.analytics.records,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
    }
}