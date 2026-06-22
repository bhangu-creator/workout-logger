//include playwright module
import {Locator,Page} from 'playwright';
import { expect } from '@playwright/test';
import { Exercise } from '../test-data/workout';

//create the base class 
export class Workouts {

    protected page: Page;
    readonly logOut : Locator;
    readonly logWorkout: Locator;
    readonly workoutSearchBar : Locator;
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
    readonly deleteWorkoutButton : Locator;
    readonly deleteWorkoutCancelButton : Locator;
    readonly deleteWorkoutModalButton : Locator;
    readonly delereWorkoutModalOkButton : Locator;
    readonly editWorkoutButton : Locator;
    readonly viewWorkoutByType : Locator;


    constructor(page:Page)
    {
        this.page=page;
        this.logOut=this.page.getByText('Log out');
        this.logWorkout= this.page.getByRole('button', { name: 'Log Workout' });
        this.workoutSearchBar= this.page.getByTestId('workouts-search-input');
        this.viewStats=this.page.getByTestId('workouts-view-stats-button');
        this.workoutTitle=this.page.getByText('Title');
        this.workoutType=this.page.getByText('Type', { exact: true });
        this.workoutTotalDuration=this.page.getByText('Total Duration');
        this.workoutTotalCalories=this.page.getByText('Total Calories');
        this.workoutActions=this.page.getByRole('columnheader', { name: 'Actions' });
        this.workoutInputTitle = this.page.getByTestId('workout-title-input');
        this.workoutTypeSelect= this.page.getByTestId('workout-type-select');
        this.addExerciseButton= this.page.getByTestId('add-exercise-button');
        this.exerciseNameInput= this.page.getByTestId('add-exercise-name');
        this.exerciseSetsInputL= this.page.getByTestId('add-exercise-sets');
        this.exerciseRepsInput= this.page.getByTestId('add-exercise-reps');
        this.exerciseWeightInput= this.page.getByTestId('add-exercise-weight');
        this.exerciseDurationInput= this.page.getByTestId('add-exercise-duration');
        this.exerciseCalorieInput= this.page.getByTestId('add-exercise-calories');
        this.clearFieldsButton= this.page.getByTestId('clear-exercise-button');
        this.closeExerciseButton= this.page.getByTestId('close-exercise-button');
        this.logExerciseButton= this.page.getByTestId('log-exercise-button');
        this.deleteExerciseButton = this.page.getByRole('button', { name: 'Delete' });
        this.LogWorkoutButton= this.page.getByTestId('workout-submit-button');
        this.workoutOkModalButton = this.page.getByRole('button', { name: 'OK' });
        this.viewWorkoutButton = this.page.getByRole('button', { name: 'View', exact: true });
        this.closeWorkoutModalButton = this.page.getByRole('button', { name: '✕' });
        this.deleteWorkoutButton = this.page.getByTestId('delete-workout');
        this.deleteWorkoutCancelButton= this.page.getByTestId('delete-workout-cancel-button');
        this.deleteWorkoutModalButton = this.page.getByTestId('delete-workout-confirm-button');
        this.delereWorkoutModalOkButton = this.page.getByTestId('workout-feedback-modal-ok-button');
        this.editWorkoutButton = this.page.getByTestId('edit-workout');
        this.viewWorkoutByType = this.page.getByTestId('stats-drawer-workouts-by-type');

        
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
        await this.LogWorkoutButton.click();
        await this.workoutOkModalButton.click();     
    }

    async viewWorkout(workoutTitle:string, workoutType:string,exerciseArray: Exercise[])
    {
        await this.viewWorkoutButton.click();
        await expect(this.workoutInputTitle).toHaveValue(workoutTitle);
        await expect(this.workoutTypeSelect).toHaveValue(workoutType);
        for(let i=0;i<exerciseArray.length;i++)     
        {
            const exercise=exerciseArray[i];
            const row=this.page.getByTestId(`exercise-row-${i}`)
        
            await expect(row.getByTestId('exercise-name')).toHaveValue(exercise.Name);
            await expect(row.getByTestId('exercise-reps')).toHaveValue(exercise.Reps);
            await expect(row.getByTestId('exercise-sets')).toHaveValue(exercise.Sets);
            await expect(row.getByTestId('exercise-weight')).toHaveValue(exercise.Weight);
            await expect(row.getByTestId('exercise-duration')).toHaveValue(exercise.Duration);
            await expect(row.getByTestId('exercise-calories')).toHaveValue(exercise.Calories);

        }  
        await this.closeWorkoutModalButton.click();      
    }

    async searchWorkout(searchKeyword : string)
    {

        await this.workoutSearchBar.fill(searchKeyword);
    }

    async editWorkout(updateWorkoutTitle:string, updateWorkoutType:string,updateExerciseArray: Exercise[])
    {
        await this.editWorkoutButton.click();
        await this.workoutInputTitle.fill(updateWorkoutTitle);
        await this.workoutTypeSelect.selectOption(updateWorkoutType);
        for(let i=0;i<updateExerciseArray.length;i++)     
        {
            const exercise=updateExerciseArray[i];
            const row=this.page.getByTestId(`exercise-row-${i}`)
        
            await row.getByTestId('exercise-name').fill(exercise.Name);
            await row.getByTestId('exercise-reps').fill(exercise.Reps);
            await row.getByTestId('exercise-sets').fill(exercise.Sets);
            await row.getByTestId('exercise-weight').fill(exercise.Weight);
            await row.getByTestId('exercise-duration').fill(exercise.Duration);
            await row.getByTestId('exercise-calories').fill(exercise.Calories);

        }    
        await this.LogWorkoutButton.click();  
        await this.workoutOkModalButton.click(); 

    }

    async deleteWorkout(searchKeyword : string)
    {
        await this.workoutSearchBar.fill(searchKeyword);
        await this.deleteWorkoutButton.waitFor({state:'visible'});
        await this.deleteWorkoutButton.click();
        await this.deleteWorkoutModalButton.waitFor({state:'visible'});
        await this.deleteWorkoutModalButton.click();
        await expect(this.delereWorkoutModalOkButton).toBeVisible();
        await this.delereWorkoutModalOkButton.click();
    }

    async openViewWorkoutByType()
    {
        await this.viewStats.click();
        await this.viewWorkoutByType.click();
    }

}