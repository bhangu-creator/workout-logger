import { expect } from '@playwright/test';
import { Locator, Page } from 'playwright';
import { TooltipMap } from '../test-data/workout';

export class WorkoutTypeAnalytic {
    protected page: Page;

    readonly workoutTypeHeading: Locator;
    readonly workoutTypeLabelLine: Locator;
    readonly workoutTypeSelectDurationLabel: Locator;
    readonly workoutTypeThisWeekLabel: Locator;
    readonly workoutTypeThisWeekRadioButton: Locator;
    readonly workoutTypeThisMonthLabel: Locator;
    readonly workoutTypeThisMonthRadioButton: Locator;
    readonly workoutTypeLastMonthLabel: Locator;
    readonly workoutTypeLastMonthRadioButton: Locator;
    readonly workoutTypeCustomDateLabel: Locator;
    readonly workoutTypeCustomDateRadioButton: Locator;
    readonly viewDataButton: Locator;
    readonly workoutTypeTotalWorkoutsLabel: Locator;
    readonly workoutTypeTotalWorkouts: Locator;
    readonly workoutTypeTotalKcalLabel: Locator;
    readonly workoutTypeTotalKcal: Locator;

    readonly workoutTypePieChartContainer: Locator;
    readonly workoutTypePieChart: Locator;
    readonly workoutTypeSlices: Locator;

    readonly tooltip: Locator;
    readonly tooltipName: Locator;
    readonly tooltipCount: Locator;
    readonly tooltipKcal: Locator;
    readonly tooltipShare: Locator;

    readonly loadingState: Locator;
    readonly emptyState: Locator;

    readonly workoutLogoLabel: Locator;

    // NEW: hidden breakdown list
    readonly workoutTypeBreakdownList: Locator;

    constructor(page: Page) {
        this.page = page;

        this.workoutTypeHeading = this.page.getByTestId('workouts-by-type-heading');
        this.workoutTypeLabelLine = this.page.getByText('See how your Workouts are');
        this.workoutTypeSelectDurationLabel = this.page.getByTestId('workouts-by-type-select-duration-label');
        this.workoutTypeThisWeekLabel = this.page.getByTestId('workouts-by-type-period-this-week-label');
        this.workoutTypeThisWeekRadioButton = this.page.getByTestId('workouts-by-type-period-this-week-radio');
        this.workoutTypeThisMonthLabel = this.page.getByTestId('workouts-by-type-period-this-month-label');
        this.workoutTypeThisMonthRadioButton = this.page.getByTestId('workouts-by-type-period-this-month-radio');
        this.workoutTypeLastMonthLabel = this.page.getByTestId('workouts-by-type-period-last-month-label');
        this.workoutTypeLastMonthRadioButton = this.page.getByTestId('workouts-by-type-period-last-month-radio');
        this.workoutTypeCustomDateLabel = this.page.getByTestId('workouts-by-type-period-custom-label');
        this.workoutTypeCustomDateRadioButton = this.page.getByTestId('workouts-by-type-period-custom-radio');
        this.viewDataButton = this.page.getByTestId('workouts-by-type-view-data-button');
        this.workoutTypeTotalWorkoutsLabel = this.page.getByTestId('workouts-by-type-total-workouts-label');
        this.workoutTypeTotalWorkouts = this.page.getByTestId('workouts-by-type-total-workouts-value');
        this.workoutTypeTotalKcalLabel = this.page.getByTestId('workouts-by-type-total-kcal-label');
        this.workoutTypeTotalKcal = this.page.getByTestId('workouts-by-type-total-kcal-value');
        this.workoutLogoLabel = this.page.getByTestId('logo-header-title');

        this.workoutTypePieChartContainer = page.getByTestId('workout-type-pie-chart-container');
        this.workoutTypePieChart = page.getByTestId('workout-type-pie-chart');
        this.workoutTypeSlices = this.workoutTypePieChartContainer.locator('.recharts-sector');

        this.tooltip = page.getByTestId('workout-type-tooltip');
        this.tooltipName = page.getByTestId('workout-type-tooltip-name');
        this.tooltipCount = page.getByTestId('workout-type-tooltip-count');
        this.tooltipKcal = page.getByTestId('workout-type-tooltip-kcal');
        this.tooltipShare = page.getByTestId('workout-type-tooltip-share');

        this.loadingState = page.getByTestId('workout-type-pie-loading-state');
        this.emptyState = page.getByTestId('workout-type-pie-empty-state');

        // NEW
        this.workoutTypeBreakdownList = page.getByTestId('workout-type-breakdown-list');
    }

    async waitForWorkoutTypePieToRender(expectedSliceCount: number) {
        await expect(this.workoutTypePieChartContainer).toBeVisible();
        await expect(this.workoutTypeSlices).toHaveCount(expectedSliceCount, {
            timeout: 10000
        });
       await expect(this.workoutTypeBreakdownList).toHaveCount(1);
    }

    async hoverSlice(indx: number) {
        await expect(this.workoutTypeSlices.nth(indx)).toBeVisible();
        await this.workoutTypeSlices.nth(indx).hover();
        await expect(this.tooltip).toBeVisible();
    }

    async resetChartHover() {
        await this.workoutTypePieChartContainer.hover({ position: { x: 5, y: 5 } });
    }

    async checkThisWeekBox() {
        await this.workoutTypeThisWeekRadioButton.check();
        await this.viewDataButton.click({ force: true });
    }

    async verifyThisWeekTotalData(totalWorkouts: string, totalKcal: string) {
        await expect(this.workoutTypeTotalWorkouts).toBeVisible();
        await expect(this.workoutTypeTotalKcal).toBeVisible();
        await expect(this.workoutTypeTotalWorkouts).toHaveText(totalWorkouts);
        await expect(this.workoutTypeTotalKcal).toHaveText(totalKcal);
    }

    async verifyToolTipDetails(tooltipsDetails: TooltipMap) {
        const tooltipname = (await this.tooltipName.textContent())?.trim();
        expect(tooltipname).toBeDefined();
        expect(Object.prototype.hasOwnProperty.call(tooltipsDetails, tooltipname!)).toBeTruthy();

        const expectedTooltip = tooltipsDetails[tooltipname!];

        await expect(this.tooltipCount).toHaveText(expectedTooltip.WorkoutCount);
        await expect(this.tooltipKcal).toHaveText(expectedTooltip.KcalCount);
        await expect(this.tooltipShare).toHaveText(expectedTooltip.ShareCount);
    }

    // NEW: stable validation using hidden breakdown rows
async verifyBreakdownData(tooltipsDetails: TooltipMap) {
    await expect(this.workoutTypeBreakdownList).toBeAttached();

    for (const workoutType of Object.keys(tooltipsDetails)) {
        const expected = tooltipsDetails[workoutType];

        const row = this.page.getByTestId(`workout-type-row-${workoutType}`);
        await expect(row).toBeAttached();

        const name = row.getByTestId(`workout-type-name-${workoutType}`);
        const count = row.getByTestId(`workout-type-count-${workoutType}`);
        const kcal = row.getByTestId(`workout-type-kcal-${workoutType}`);
        const share = row.getByTestId(`workout-type-share-${workoutType}`);

        await expect(name).toHaveText(workoutType);
        await expect(count).toHaveText(expected.WorkoutCount);
        await expect(kcal).toHaveText(expected.KcalCount);
        await expect(share).toHaveText(expected.ShareCount);
    }
}

    async navigateToHomePage() {
        await this.workoutLogoLabel.click({ force: true });
    }
}