// import playwright module
import { test, expect } from "@playwright/test";
import { Workouts } from "../../pages/workoutsPage";
import { LoginPage } from "../../pages/loginPage";
import { validUser } from "../../test-data/users";

test.beforeEach(
    "Log in as valid user before crud operations on workouts",
    async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(validUser.email, validUser.password);
    }
);

test.describe("Workout Type Analytics Section Tests",()=>
{
    test("To verify workout trend analytics for last week",({page})=>
    {
        
    })
})