//include playwright module
import {Locator,Page} from 'playwright';

//create the base class 
export class SignupPage {

    //define page object
    protected page : Page;

    //define this page locators
    readonly logoName : Locator;
    readonly logoImg : Locator;
    readonly formHeading : Locator;
    readonly userNameLabel : Locator;
    readonly userNameInput : Locator;
    readonly emailLabel : Locator;
    readonly emailInput : Locator;
    readonly passwordLabel : Locator;
    readonly passwordInput : Locator;
    readonly logInLink : Locator;
    readonly signupButton : Locator;
    readonly logInLinkText: Locator;


    //define constructor 
    constructor(page:Page)
    {
        //assigning the page reference
        this.page=page;
        //initialzing the locators
        this.logoName=this.page.getByText("Workout Logger")
        this.logoImg= this.page.getByRole('img',{name:'Workout Logger Logo'});
        this.formHeading= this.page.getByRole('heading',{name:"Create Account"});
        this.userNameLabel = this.page.getByText('Username');
        this.userNameInput = this.page.getByRole('textbox',{name:"name"})
        this.emailLabel = this.page.getByText('Email')
        this.emailInput=this.page.getByRole('textbox',{name:'email'});
        this.passwordLabel = this.page.getByText('Password')
        this.passwordInput=this.page.getByRole('textbox',{name:'password'});
        this.logInLink=this.page.getByRole('link',{name:'Log in'});
        this.logInLinkText=this.page.getByText("Already have an account?");
        this.signupButton = this.page.getByRole('button',{name:'Signup'});

    }

}

