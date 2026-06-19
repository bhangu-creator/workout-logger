// import playwright module
import {test,expect} from "@playwright/test";
import { LoginPage } from "../../pages/loginPage";
import {Workouts} from "../../pages/workoutsPage";

//defining the hooks before for the tests
test.beforeEach('Go To Base Url before every Test',async({page})=>
{
    await page.goto('/login')
})

//creating suite for the login page functionality
test.describe('Login Page Basic Validation Tests',()=>
{
    test('To Verify if valid user can login successfull',async({page})=>
    {
        const loginPage = new LoginPage(page);
        const workout = new Workouts(page);

        await loginPage.login(`${process.env.TEST_USER_EMAIL}`,`${process.env.TEST_USER_PASSWORD}`);
        await workout.verifyLoaded();

    })

    test('To verify user cannot login with invalid password',async({page})=>
    {
        const loginPage = new LoginPage(page);

        await loginPage.login(`${process.env.TEST_USER_EMAIL}`,`${process.env.TEST_INVALID_USER_PASSWORD}`);
        await expect(loginPage.invalidCredsError).toBeVisible();
        await expect(loginPage.invalidCredsError).toHaveText("Invalid Credentials");
        
    })

    test('To verify if all validation messages appears for empty login form',async({page})=>
    {
        const loginPage=new LoginPage(page);
    
        await loginPage.loginButton.click();
        await expect(loginPage.emptyEmailError).toBeVisible();
        await expect(loginPage.emptyEmailError).toHaveText("Email is required");
        await expect(loginPage.emptyPasswordError).toBeVisible();
        await expect(loginPage.emptyPasswordError).toHaveText("password is required");
    })


    test('To verify user cannot login with invalid email',async({page})=>
    {
        const loginPage = new LoginPage(page);

        await loginPage.login(`${process.env.TEST_INVALID_USER_EMAIL}`,`${process.env.TEST_USER_PASSWORD}`);
        await expect(loginPage.invalidCredsError).toBeVisible();
        await expect(loginPage.invalidCredsError).toHaveText("Invalid Credentials");
        
    })
})