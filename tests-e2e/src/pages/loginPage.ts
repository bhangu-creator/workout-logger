//include playwright module
import { expect } from '@playwright/test';
import {Locator,Page} from 'playwright';

//create the base class 
export class LoginPage {

    //define page object
    protected page : Page;

    //define this page locators
    readonly logoName : Locator;
    readonly logoImg : Locator;
    readonly formHeading : Locator;
    readonly emailLabel : Locator;
    readonly emailInput : Locator;
    readonly passwordLabel : Locator;
    readonly passwordInput : Locator;
    readonly signUpLink : Locator;
    readonly forgotPassword : Locator;
    readonly loginButton : Locator;
    readonly signUpLinkTest: Locator;
    readonly invalidCredsError : Locator;
    readonly emptyEmailError: Locator;
    readonly emptyPasswordError: Locator


    //define constructor 
    constructor(page:Page)
    {
        //assigning the page reference
        this.page=page;
        //initialzing the locators
        this.logoName=this.page.getByText("Workout Logger")
        this.logoImg= this.page.getByRole('img',{name:'Workout Logger Logo'});
        this.formHeading= this.page.getByRole('heading',{name:"Create Account"});
        this.emailLabel = this.page.getByText('Email')
        this.emailInput=this.page.getByRole('textbox',{name:'email'});
        this.passwordLabel = this.page.getByText('Enter Password')
        this.passwordInput=this.page.getByRole('textbox',{name:'Enter Password'});
        this.signUpLink=this.page.getByRole('link',{name:'Sign up'});
        this.signUpLinkTest=this.page.getByText("Don't have an account?");
        this.loginButton = this.page.getByRole('button',{name:'Log In'});
        this.forgotPassword=this.page.getByRole('link',{name:'Forgot password'});
        this.invalidCredsError=this.page.getByText("Invalid Credentials");
        this.emptyEmailError=this.page.getByText("Email is required");
        this.emptyPasswordError=this.page.getByText("password is required");

    }

    async login(email : string,password: string)
    {
        await this.page.goto('/login');
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async verifyLoaded()
    {
        await expect(this.page).toHaveURL('/login');
        await expect(this.loginButton).toBeVisible();
    }

}

