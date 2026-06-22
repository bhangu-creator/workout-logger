import { expect } from '@playwright/test';
import { Locator, Page } from 'playwright';

export class WorkoutTypeAnalytic {

    protected page: Page;
    readonly workoutTrendContainer : Locator;
    readonly workoutTrendHeading : Locator;
    readonly workoutTrendSubHeading : Locator;
    readonly workoutTrendChart: Locator;


    constructor(page:Page)
    {
        this.page=page;
        this.workoutTrendContainer=this.page.getByTestId('workout-trend-container');
        this.workoutTrendHeading=this.page.getByTestId('workout-trend-heading');
        this.workoutTrendSubHeading=this.page.getByTestId('workout-trend-subheading');
        this.workoutTrendChart= this.page.getByTestId('workouts-trend-chart');
    }
    




}