import { expect } from '@playwright/test';
import { Locator, Page } from 'playwright';
import { BarChart } from '../test-data/workout';

export class WorkoutTypeAnalytic {

    protected page: Page;
    readonly workoutTrendContainer : Locator;
    readonly workoutTrendHeading : Locator;
    readonly workoutTrendSubHeading : Locator;
    readonly workoutTrendChart: Locator;
    readonly workoutTrendToolTipWeek : Locator;
    readonly workoutTrendToolTipWorkout : Locator;
    readonly workoutTrendToolTipCalorie : Locator;
    readonly workoutTrendToolTipDuration : Locator;
    readonly workoutTrendToolTip : Locator;
    readonly workoutTrendBars : Locator;


    constructor(page:Page)
    {
        this.page=page;
        this.workoutTrendContainer=this.page.getByTestId('workout-trend-container');
        this.workoutTrendHeading=this.page.getByTestId('workout-trend-heading');
        this.workoutTrendSubHeading=this.page.getByTestId('workout-trend-subheading');
        this.workoutTrendChart= this.page.getByTestId('workouts-trend-chart');
        this.workoutTrendToolTip=this.page.getByTestId('weekly-trend-tooltip');
        this.workoutTrendToolTipWeek=this.page.getByTestId('weekly-trend-tooltip-week');
        this.workoutTrendToolTipWorkout=this.page.getByTestId('weekly-trend-tooltip-workouts');
        this.workoutTrendToolTipCalorie=this.page.getByTestId('weekly-trend-tooltip-calories');
        this.workoutTrendToolTipDuration=this.page.getByTestId('weekly-trend-tooltip-duration');
        this.workoutTrendBars = this.page.locator('[data-testid^="weekly-trend-bar-"]');
    }

    getWorkoutTrendBar(week: string) {
        const safeWeek = week.replace(/\s+/g, "-").toLowerCase();
        return this.page.getByTestId(`weekly-trend-bar-${safeWeek}`);
    }

    async hoverOverTheLastTrendBar ()
    {
        await expect(this.workoutTrendBars.last()).toBeVisible();
        return this.workoutTrendBars.last().hover();
    }

    async verifyToolTipDetails(barChartData:BarChart)
    {
        await expect(this.workoutTrendToolTip).toBeVisible();
        await expect(this.workoutTrendToolTipWorkout).toHaveText(barChartData.Workouts);
        await expect(this.workoutTrendToolTipCalorie).toHaveText(barChartData.Calories);
        await expect(this.workoutTrendToolTipDuration).toHaveText(barChartData.Duration);

    }
}
    