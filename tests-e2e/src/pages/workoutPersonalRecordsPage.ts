import { expect } from '@playwright/test';
import { Locator, Page } from 'playwright';
import { PersonalRecords } from '../test-data/workout';


export class WorkoutPersonalRecords{

    protected page: Page;

    readonly workoutPersonalRecordsHeading : Locator
    readonly workoutAchievementsTitle : Locator;
    readonly maxDurationTitle: Locator;
    readonly maxDurationValue: Locator;
    readonly maxDurationOpenModal : Locator;
    readonly maxKcalTitle:  Locator;
    readonly maxKcalValue: Locator;
    readonly maxKcalOpenModal : Locator;
    readonly streakTitle : Locator;
    readonly currentStreakTitle: Locator;
    readonly currentStreakValue: Locator;
    readonly longestStreakTitle: Locator;
    readonly longestStreakValue: Locator;
    readonly milestoneSectionTitle: Locator;
    readonly totalWorkoutLoggedLabel : Locator;
    readonly totalWorkoutLoggeValue : Locator;
    readonly totalKcalBurnedLabel : Locator;
    readonly totalKcalBurnedValue : Locator;
    readonly totalDurationLabel : Locator;
    readonly totalDurationValue: Locator;
    readonly averageDurationLabel: Locator;
    readonly averageDurationValue: Locator;
    readonly averageKcalBurnedLabel : Locator;
    readonly averageKcalBurnedValue: Locator;
    readonly recordsLabel : Locator;
    readonly mostActiveDayLabel : Locator;
    readonly mostActiveDayDateLabel : Locator;
    readonly mostActiveDayDateValue: Locator;
    readonly mostActiveDayExerciseLoggedLabel: Locator;
    readonly mostActiveDayExericseLoggedValue: Locator;
    readonly mostActiveDayTotalKcalLabel : Locator;
    readonly mostActiveDayTotalKcalValue: Locator;
    readonly mostActiveDayTotalDurationLabel :Locator;
    readonly mostActiveDayTotalDurationValue: Locator;
    readonly mostActiveWeekTitle :Locator;
    readonly mostActiveWeekLabel : Locator;
    readonly mostActiveWeekValue: Locator;
    readonly mostActiveWeekExerciseLoggedLabel : Locator;
    readonly mostActiveWeekExerciseLoggedValue : Locator;
    readonly mostActiveWeekTotalKcalLabel : Locator;
    readonly mostActiveWeekTotalKcalValue: Locator;
    readonly mostActiveWeekTotalDurationLabel : Locator;
    readonly mostActiveWeekTotalDurationValue: Locator;



    constructor(page:Page)
    {
        this.page=page;
        this.workoutPersonalRecordsHeading=this.page.getByTestId('workout-records-heading');
        this.workoutAchievementsTitle = this.page.getByTestId('workout-records-achievements-section-title');
        this.maxDurationTitle = this.page.getByTestId('max-duration-title');
        this.maxDurationValue= this.page.getByTestId('max-duration-value');
        this.maxDurationOpenModal= this.page.getByTestId('max-duration-helper-text');
        this.maxKcalTitle = this.page.getByTestId('max-calories-title');
        this.maxKcalValue= this.page.getByTestId('max-calories-value');
        this.maxKcalOpenModal = this.page.getByTestId('max-calories-helper-text');
        this.streakTitle = this.page.getByTestId('workout-records-streaks-section-title');
        this.currentStreakTitle = this.page.getByTestId('current-streak-title');
        this.currentStreakValue = this.page.getByTestId('current-streak-value');
        this.longestStreakTitle= this.page.getByTestId('longest-streak-title');
        this.longestStreakValue = this.page.getByTestId('longest-streak-value');
        this.milestoneSectionTitle = this.page.getByTestId('workout-records-milestones-section-title');
        this.totalWorkoutLoggedLabel = this.page.getByTestId('milestone-label-total-workouts-logged');
        this.totalWorkoutLoggeValue= this.page.getByTestId('milestone-value-total-workouts-logged');
        this.totalKcalBurnedLabel = this.page.getByTestId('milestone-label-total-calories-burned');
        this.totalKcalBurnedValue = this.page.getByTestId('milestone-value-total-calories-burned');
        this.totalDurationLabel = this.page.getByTestId('milestone-label-total-duration');
        this.totalDurationValue = this.page.getByTestId('milestone-value-total-duration');
        this.averageDurationLabel= this.page.getByTestId('milestone-label-average-duration');
        this.averageDurationValue = this.page.getByTestId('milestone-value-average-duration');
        this.averageKcalBurnedLabel = this.page.getByTestId('milestone-label-average-calories-burned');
        this.averageKcalBurnedValue = this.page.getByTestId('milestone-value-average-calories-burned')
        this.recordsLabel = this.page.getByTestId('workout-records-records-section-title');
        this.mostActiveDayLabel = this.page.getByTestId('most-active-day-title');
        this.mostActiveDayDateLabel = this.page.getByTestId('most-active-day-label-date');
        this.mostActiveDayDateValue = this.page.getByTestId('most-active-day-value-date');
        this.mostActiveDayExerciseLoggedLabel = this.page.getByTestId('most-active-day-label-exercises-logged');
        this.mostActiveDayExericseLoggedValue = this.page.getByTestId('most-active-day-value-exercises-logged');
        this.mostActiveDayTotalKcalLabel= this.page.getByTestId('most-active-day-label-total-calories');
        this.mostActiveDayTotalKcalValue = this.page.getByTestId('most-active-day-value-total-calories');
        this.mostActiveDayTotalDurationLabel = this.page.getByTestId('most-active-day-label-total-duration');
        this.mostActiveDayTotalDurationValue = this.page.getByTestId('most-active-day-value-total-duration');
        this.mostActiveWeekTitle= this.page.getByTestId('most-active-week-title');
        this.mostActiveWeekLabel=this.page.getByTestId('most-active-week-label-week');
        this.mostActiveWeekValue = this.page.getByTestId('most-active-week-value-week');
        this.mostActiveWeekExerciseLoggedLabel= this.page.getByTestId('most-active-week-label-exercises-logged');
        this.mostActiveWeekExerciseLoggedValue = this.page.getByTestId('most-active-week-value-exercises-logged');
        this.mostActiveWeekTotalKcalLabel = this.page.getByTestId('most-active-week-label-total-calories');
        this.mostActiveWeekTotalKcalValue = this.page.getByTestId('most-active-week-value-total-calories');
        this.mostActiveWeekTotalDurationLabel = this.page.getByTestId('most-active-week-label-total-duration');
        this.mostActiveWeekTotalDurationValue = this.page.getByTestId('most-active-week-value-total-duration');
}

    async verifyPersonalRecords(personalRecord : PersonalRecords)
    {
        await expect(this.workoutPersonalRecordsHeading).toBeVisible();

        await expect(this.maxDurationValue).toHaveText(personalRecord.MaxDurationWorkoutValue);
        await expect(this.maxKcalValue).toHaveText(personalRecord.MaxKcalBurnedValue);

        await expect(this.currentStreakValue).toHaveText(personalRecord.CurrentStreakValue);
        await expect(this.longestStreakValue).toHaveText(personalRecord.LongestStreakValue);

        await expect(this.totalWorkoutLoggeValue).toHaveText(personalRecord.TotalWorkoutLogged);
        await expect(this.totalKcalBurnedValue).toHaveText(personalRecord.TotalKcalBurned);
        await expect(this.totalDurationValue).toHaveText(personalRecord.TotalDuration);
        await expect(this.averageDurationValue).toHaveText(personalRecord.AverageDuration);
        await expect(this.averageKcalBurnedValue).toHaveText(personalRecord.AverageKcalBurned);

        await expect(this.mostActiveDayExericseLoggedValue).toHaveText(personalRecord.MostActiveDayExercise);
        await expect(this.mostActiveDayTotalKcalValue).toHaveText(personalRecord.MostActiveDayTotalKcal);
        await expect(this.mostActiveDayTotalDurationValue).toHaveText(personalRecord.MostActiveDayTotalDuration);
        await expect(this.mostActiveWeekExerciseLoggedValue).toHaveText(personalRecord.MostActiveWeekExercise);
        await expect(this.mostActiveWeekTotalKcalValue).toHaveText(personalRecord.MostActiveWeekTotalKcal);
        await expect(this.mostActiveWeekTotalDurationValue).toHaveText(personalRecord.MostActiveWeekTotalDuration);
        

    }
}