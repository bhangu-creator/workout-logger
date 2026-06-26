import {test,expect} from '@playwright/test';
import { AuthService } from '../../../api/services/auth.service';
import { validLoginUser,validLoginResponse,invalidPasswordLogin,invalidPasswordLoginUser,invalidEmailLoginUser,emptyLoginUserResponse,emptyLoginUser} from '../../../api/test-data/auth.data';

test.describe('Login API Test Cases',()=>
{

    test('To verify valid user can login successfully',async({request})=>
    {
        const auth= new AuthService(request);
        const response = await auth.login(validLoginUser);

        await expect(response.status()).toBe(200);

        const body= await response.json();

        validLoginResponse.token=body.token;

        await expect(body).toEqual(validLoginResponse);


    })

    test('To verify user cannot login with invalid password',async({request})=>
    {
        const auth= new AuthService(request);
        const response = await auth.login(invalidPasswordLoginUser);

        await expect(response.status()).toBe(400);

        const body= await response.json();

        await expect(body).toEqual(invalidPasswordLogin);


    })

    test('To verify user cannot login with invalid email',async({request})=>
    {
        const auth= new AuthService(request);
        const response = await auth.login(invalidEmailLoginUser);

        await expect(response.status()).toBe(400);

        const body= await response.json();

        await expect(body).toEqual(invalidPasswordLogin);

    })

    test('To verify user cannot login with empty email',async({request})=>
    {
        const auth= new AuthService(request);
        const response = await auth.login(emptyLoginUser);

        await expect(response.status()).toBe(400);

        const body= await response.json();

        await expect(body).toEqual(emptyLoginUserResponse);

    })

    test('To verify user cannot login with empty password',async({request})=>
    {
        const auth= new AuthService(request);
        const response = await auth.login(emptyLoginUser);

        await expect(response.status()).toBe(400);

        const body= await response.json();

        await expect(body).toEqual(emptyLoginUserResponse);

    })

});