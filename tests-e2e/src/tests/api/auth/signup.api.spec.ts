import {test,expect} from '@playwright/test';
import { AuthService } from '../../../api/services/auth.service';
import { validUser,expectedResponseSignup,duplicateUser,duplicateEmailSignupResponse,passwordMissingUser ,missingPasswordSignupResponse,invalidEmailSignupResponse,invalidEmailUser} from '../../../api/test-data/auth.data';

test.describe('Signup API Test Cases',()=>
{

    test('To verify valid user can signup successfully',async({request})=>
    {

        const auth= new AuthService(request);
        const response = await auth.signup(validUser)

        
        //validating the returned response
        await expect(response.status()).toBe(201);

        //returned body
        const body= await response.json();

        //expected json body
        const finalExpected= JSON.parse(JSON.stringify(expectedResponseSignup));

        //updating dynamic fields
        finalExpected.user.email=validUser.email;
        finalExpected.user.id=body.user.id;

        //final assertion
        await expect(body).toEqual(finalExpected);
    })

    test('To verify duplicate email id cannot get registered',async({request})=>
    {

        const auth= new AuthService(request);
        const response = await auth.signup(duplicateUser)
        
        //valiating the returned response
        await expect(response.status()).toBe(400);

        //returned body
        const body= await response.json();

        //final assertion
        await expect(body).toEqual(duplicateEmailSignupResponse);
    })

    test('To verify user cannot signup when passsword is missing',async({request})=>
    {

        const auth= new AuthService(request);
        const response = await auth.signup(passwordMissingUser)
        
        //valiating the returned response
        await expect(response.status()).toBe(400);

        //returned body
        const body= await response.json();
        
        //final assertion
        await expect(body).toEqual(missingPasswordSignupResponse);
    })

    test('To verify user cannot signup with invalid email format',async({request})=>
    {

        const auth= new AuthService(request);
        const response = await auth.signup(invalidEmailUser)
        
        //valiating the returned response
        await expect(response.status()).toBe(400);

        //returned body
        const body= await response.json();
        
        //final assertion
        await expect(body).toEqual(invalidEmailSignupResponse);
    })

})