import { APIRequestContext } from "@playwright/test";
import { SignupData } from "../test-data/auth.data";
import { API_ROUTES } from "../endpoints";

export class AuthService
{
    constructor(private request: APIRequestContext){}

    async signup(payload:SignupData)
    {
        return await this.request.post(process.env.BACKEND_BASE_URL+API_ROUTES.auth.signup,{data:payload})
    }
}