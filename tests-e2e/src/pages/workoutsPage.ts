//include playwright module
import {Locator,Page} from 'playwright';
import { expect } from '@playwright/test';
import { Exercise } from '../test-data/workout';

//create the base class 
export class Workouts {

    protected page: Page;
    readonly logOut : Locator;
    readonly logWorkout: Locator;
    readonly searchWorkouts : Locator;
    readonly viewStats : Locator;
    readonly workoutTitle: Locator;
    readonly workoutType: Locator;
    readonly workoutTotalDuration: Locator;
    readonly workoutTotalCalories: Locator;
    readonly workoutActions: Locator;
    readonly workoutInputTitle : Locator;
    readonly workoutTypeSelect : Locator;
    readonly addExerciseButton : Locator;
    readonly exerciseNameInput: Locator;
    readonly exerciseSetsInputL : Locator;
    readonly exerciseRepsInput  : Locator;
    readonly exerciseWeightInput : Locator;
    readonly exerciseDurationInput : Locator;
    readonly exerciseCalorieInput : Locator;
    readonly clearFieldsButton : Locator;
    readonly logExerciseButton: Locator;
    readonly closeExerciseButton : Locator;
    readonly deleteExerciseButton : Locator;
    readonly LogWorkoutButton : Locator;
    readonly workoutOkModalButton : Locator;
    readonly viewWorkoutButton : Locator;
    readonly closeWorkoutModalButton : Locator;

    constructor(page:Page)
    {
        this.page=page;
        this.logOut=this.page.getByText('Log out');
        this.logWorkout= this.page.getByRole('button', { name: 'Log Workout' });
        this.searchWorkouts= this.page.getByRole('textbox', { name: 'Search Workouts' });
        this.viewStats=this.page.getByRole('button', { name: 'View Stats' });
        this.workoutTitle=this.page.getByText('Title');
        this.workoutType=this.page.getByText('Type', { exact: true });
        this.workoutTotalDuration=this.page.getByText('Total Duration');
        this.workoutTotalCalories=this.page.getByText('Total Calories');
        this.workoutActions=this.page.getByRole('columnheader', { name: 'Actions' });
        this.workoutInputTitle = this.page.locator('form').getByRole('textbox');
        this.workoutTypeSelect= this.page.getByRole('combobox');
        this.addExerciseButton= this.page.getByRole('button', { name: 'Add Exercise' });
        this.exerciseNameInput= this.page.getByRole('textbox').nth(2);
        this.exerciseRepsInput= this.page.getByRole('textbox').nth(3)
        this.exerciseSetsInputL= this.page.getByRole('textbox').nth(4);
        this.exerciseWeightInput= this.page.getByRole('textbox', { name: 'in kgs' });
        this.exerciseDurationInput= this.page.getByRole('textbox', { name: 'in minutes' });
        this.exerciseCalorieInput= this.page.getByRole('textbox', { name: 'in kcal' });
        this.clearFieldsButton= this.page.getByRole('button', { name: 'Clear Feilds' });
        this.closeExerciseButton= this.page.getByRole('button', { name: 'Close' });
        this.logExerciseButton= this.page.getByRole('button', { name: 'Log Exercise' });
        this.deleteExerciseButton = this.page.getByRole('button', { name: 'Delete' });
        this.LogWorkoutButton= this.page.locator('form').getByRole('button', { name: 'Log Workout' });
        this.workoutOkModalButton = this.page.getByRole('button', { name: 'OK' });
        this.viewWorkoutButton = this.page.getByRole('button', { name: 'View', exact: true });
        this.closeWorkoutModalButton = this.page.getByRole('button', { name: '✕' });
        
    }

    async verifyLoaded()
    {
        await expect(this.page).toHaveURL(/\/workouts$/);
        await expect(this.logOut).toBeVisible();

    }

    async createWorkout(workoutTitle:string, workoutType:string,exerciseArray: Exercise[])
    {
        await this.logWorkout.click();
        await this.workoutInputTitle.fill(workoutTitle);
        await this.workoutTypeSelect.selectOption(workoutType);
        await this.addExerciseButton.click();
        for ( const exercise  of exerciseArray)
        {
            await this.exerciseNameInput.fill(exercise.Name)
            await this.exerciseRepsInput.fill(exercise.Reps);
            await this.exerciseSetsInputL.fill(exercise.Sets);
            await this.exerciseWeightInput.fill(exercise.Weight);
            await this.exerciseDurationInput.fill(exercise.Duration);
            await this.exerciseCalorieInput.fill(exercise.Calories);
            await this.logExerciseButton.click();
            await this.addExerciseButton.click();

        }        
    }

    async viewWorkout(workoutTitle:string, workoutType:string,exerciseArray: Exercise[])
    {
        await this.viewWorkoutButton.click();
        await expect(this.workoutInputTitle).toHaveText(workoutTitle);
        await expect(this.workoutTypeSelect).toHaveText(workoutType);
        for ( const exercise  of exerciseArray)
        {
            await expect(this.exerciseNameInput).toHaveText(exercise.Name);
            await expect(this.exerciseRepsInput).toHaveText(exercise.Reps);
            await expect(this.exerciseSetsInputL).toHaveText(exercise.Sets);
            await expect(this.exerciseWeightInput).toHaveText(exercise.Weight);
            await expect(this.exerciseDurationInput).toHaveText(exercise.Duration);
            await expect(this.exerciseCalorieInput).toHaveText(exercise.Calories);

        }  
        await this.closeWorkoutModalButton.click();      


    }


}