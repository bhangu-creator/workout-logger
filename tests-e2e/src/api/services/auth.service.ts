import { APIRequestContext } from "@playwright/test";
import { SignupData,LoginData } from "../test-data/auth.data";
import { API_ROUTES } from "../endpoints";

export class AuthService
{
    constructor(private request: APIRequestContext){}

    async signup(payload:SignupData)
    {
        return await this.request.post(process.env.BACKEND_BASE_URL+API_ROUTES.auth.signup,{data:payload})
    }

    async login(payload:LoginData)
    {
        return await this.request.post(process.env.BACKEND_BASE_URL+API_ROUTES.auth.login,{data:payload})
    }

    async getToken(payload:LoginData)
    {
        const response= await this.request.post(process.env.BACKEND_BASE_URL+API_ROUTES.auth.login,{data:payload})
        if (response.status() !== 200) throw new Error('Login failed, token not generated');

        const body=await response.json();
        return body.token;

    }
}