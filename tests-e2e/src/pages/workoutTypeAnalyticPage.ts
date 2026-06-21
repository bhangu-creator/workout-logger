//include playwright module
import { expect } from '@playwright/test';
import {Locator,Page} from 'playwright';

export class WorkoutTypeAnalytic
{

    protected page : Page;
    
    readonly workoutTypeHeading : Locator;
    readonly workoutTypeLabelLine : Locator;
    readonly workoutTypeSelectDurationLabel : Locator;
    readonly workoutTypeThisWeekLabel : Locator;
    readonly workoutTypeThisWeekRadioButton : Locator;
    readonly workoutTypeThisMonthLabel : Locator;
    readonly workoutTypeThisMonthRadioButton : Locator;
    readonly workoutTypeLastMonthLabel : Locator;
    readonly workoutTypeLastMonthRadioButton : Locator;
    readonly workoutTypeCustomDateLabel : Locator;
    readonly workoutTypeCustomDateRadioButton : Locator;
    readonly viewDataButton : Locator;
    readonly workoutTypeTotalWorkoutsLabel : Locator;
    readonly workoutTypeTotalWorkouts: Locator;
    readonly workoutTypeTotalKcalLabel : Locator;
    readonly workoutTypeTotalKcal : Locator;
    readonly workoutPieChart : Locator;
    readonly workoutTypeSlices : Locator;
    readonly activeWorkoutTypeSlice : Locator;


    constructor(page:Page)
    {
        this.page=page;
        this.workoutTypeHeading=this.page.getByTestId('workouts-by-type-heading');
        this.workoutTypeLabelLine=this.page.getByText('See how your Workouts are');
        this.workoutTypeSelectDurationLabel = this.page.getByTestId('workouts-by-type-select-duration-label');
        this.workoutTypeThisWeekLabel = this.page.getByTestId('workouts-by-type-period-this-week-label')
        this.workoutTypeThisWeekRadioButton= this.page.getByTestId('workouts-by-type-period-this-week-radio');
        this.workoutTypeThisMonthLabel = this.page.getByTestId('workouts-by-type-period-this-month-label');
        this.workoutTypeThisMonthRadioButton = this.page.getByTestId('workouts-by-type-period-this-month-radio');
        this.workoutTypeLastMonthLabel= this.page.getByTestId('workouts-by-type-period-last-month-label');
        this.workoutTypeLastMonthRadioButton=this.page.getByTestId('workouts-by-type-period-last-month-radio');
        this.workoutTypeCustomDateLabel=this.page.getByTestId('workouts-by-type-period-custom-label');
        this.workoutTypeCustomDateRadioButton = this.page.getByTestId('workouts-by-type-period-custom-radio');
        this.viewDataButton = this.page.getByTestId('workouts-by-type-view-data-button');
        this.workoutTypeTotalWorkoutsLabel= this.page.getByTestId('workouts-by-type-total-workouts-label');
        this.workoutTypeTotalWorkouts= this.page.getByTestId('workouts-by-type-total-workouts-value');
        this.workoutTypeTotalKcalLabel = this.page.getByTestId('workouts-by-type-total-kcal-label');
        this.workoutTypeTotalKcal = this.page.getByTestId('workouts-by-type-total-kcal-value');
        this.workoutPieChart = this.page.getByTestId('workout-type-pie-chart');
        this.workoutTypeSlices = this.workoutPieChart.locator('.recharts-sector');
        this.activeWorkoutTypeSlice = this.workoutPieChart.locator('.recharts-layer.recharts-active-shape > .recharts-sector'
);

    }

    async getThisWeekData()
    {
        await this.workoutTypeThisWeekRadioButton.check();
        
    }
    
}