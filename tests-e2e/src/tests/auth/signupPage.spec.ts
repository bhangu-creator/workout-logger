//Import Playwright Modules
import {test,expect} from "@playwright/test";
import { SignupPage } from "../../pages/signupPage";
import { uiText } from "../../constants/uiText";
import { LoginPage } from "../../pages/loginPage";
import { Workouts } from "../../pages/workoutsPage";


//defining the hooks for test file
test.beforeEach('Go to Base Url before each Test',async({page})=>
{
    await page.goto('/signup');
})

//creating suite for the Signup Page UI test cases
test.describe('Signup Page UI Test Cases',()=>
{
    test('To verify if all -+ page UI elements are displayed correctly',async({page})=>
    {
        //creating the signup page object
        const signupPage=new SignupPage(page);

        //adding assertions for app logo
        await expect(signupPage.logoImg).toBeVisible();
        await expect(signupPage.logoName).toHaveText(uiText.signupPage.logoText);

        //adding assertion for form heading
        await expect(signupPage.formHeading).toBeVisible();
        await expect(signupPage.formHeading).toHaveText(uiText.signupPage.formheading);

        //assertion for form username label and input
        await expect(signupPage.userNameLabel).toBeVisible();
        await expect(signupPage.userNameLabel).toHaveText(uiText.signupPage.usernameLabel);
        await expect(signupPage.userNameInput).toBeVisible();
        await expect(signupPage.userNameInput).toHaveAttribute('placeholder',uiText.signupPage.usernamePlaceholder)

        //assertion for form email label and input
        await expect(signupPage.emailLabel).toBeVisible();
        await expect(signupPage.emailLabel).toHaveText(uiText.signupPage.emailLabel);
        await expect(signupPage.emailInput).toBeVisible();
        await expect(signupPage.emailInput).toHaveAttribute('placeholder',uiText.signupPage.emailPlaceholder)

        //assertion for form password label and input
        await expect(signupPage.passwordLabel).toBeVisible();
        await expect(signupPage.passwordLabel).toHaveText(uiText.signupPage.passwordLabel);
        await expect(signupPage.passwordInput).toBeVisible();
        await expect(signupPage.passwordInput).toHaveAttribute('placeholder',uiText.signupPage.passwordPlaceholder);
        await expect(signupPage.passwordInput).toHaveAttribute('type','password');

        //assertion for the login link and login link text
        await expect(signupPage.logInLinkText).toBeVisible();
        await expect(signupPage.logInLinkText).toHaveText(uiText.signupPage.logInText);
        await expect(signupPage.logInLink).toBeVisible();

        //assertion for the signup button
        await expect(signupPage.signupButton).toBeVisible();
        await expect(signupPage.signupButton).toHaveAttribute('type','submit');
        await expect(signupPage.signupButton).toHaveText(uiText.signupPage.signupButtonText);
        await expect(signupPage.signupButton).toBeEnabled();

    })
})

test.describe('Signup Validation Tests',()=>
{
    test('To Verify if a new user is registered successfully',async({page})=>
    {
        const signupPage= new SignupPage(page);
        const loginpage= new LoginPage(page);

        const username=`${process.env.TEST_VALID_USERNAME}`;
        const email=`user${Date.now()}@test.com`;
        const password=`${process.env.TEST_USER_PASSWORD}`;
        
        await signupPage.signup(username,email,password);
        await loginpage.verifyLoaded();

    })

    test('To Verify if already existed user should not get registered again',async({page})=>
    {
        const signupPage= new SignupPage(page);

        const username=`${process.env.TEST_VALID_USERNAME}`;
        const email=`${process.env.TEST_USER_EMAIL}`;
        const password=`${process.env.TEST_USER_PASSWORD}`;
        
        await signupPage.signup(username,email,password);
        await expect(signupPage.userExistsError).toBeVisible();
        await expect(signupPage.userExistsError).toHaveText("User already exists");

    })

    test('To Verify e2e workflow to register new user and login successfully',async({page})=>
    {
        const signupPage= new SignupPage(page);
        const loginpage= new LoginPage(page);
        const workout = new Workouts(page);

        const username=`${process.env.TEST_VALID_USERNAME}`;
        const email=`user${Date.now()}@test.com`;
        const password=`${process.env.TEST_USER_PASSWORD}`;
        
        await signupPage.signup(username,email,password);
        await loginpage.verifyLoaded();
        await loginpage.login(email,password);
        await workout.verifyLoaded();

    })

    
})

