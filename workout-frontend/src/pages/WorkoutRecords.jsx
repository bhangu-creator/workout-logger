import LogoHeader from "../components/LogoHeader";
import TopRightUser from "../components/TopRightUser";
import { useState, useEffect } from "react";
import authRequest from "../utils/authRequest";
import { API_BASE_URL, ENDPOINTS } from "../api/endpoints";
import { formatEveryDuration, formatDate } from "../utils/validators";
import WorkoutViewModal from "../components/WorkoutViewModal";

function WorkoutRecords() {
    //states to store the backend respone
    const [achievementsData, setAchievementsData] = useState([]);
    const [milestonesData, setMilestonesData] = useState([]);
    const [recordsData, setRecordsData] = useState([]);
    const [durationWorkout, setDurationWorkout] = useState([]);
    const [caloriesWorkout, setCaloriesWorkout] = useState([]);
    const [modalData, setModalData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    //state to store the backend errors
    const [serverError, setServerError] = useState("");

    useEffect(() => {
        async function getRecordsData() {
            try {
                setServerError("");
                const response = await authRequest(
                    "get",
                    API_BASE_URL + ENDPOINTS.GET_WORKOUTS_RECORDS
                );
                setAchievementsData(response?.data?.achievements ?? null);
                setMilestonesData(response?.data?.milestones ?? []);
                setRecordsData(response?.data?.records ?? null);
                setDurationWorkout(response?.data?.achievements?.duration?.workout ?? []);
                setCaloriesWorkout(response?.data?.achievements?.calories?.workout ?? []);
            } catch (error) {
                console.error(error);
                setServerError("Something Went Wrong!!");
            } finally {
                setLoading(false);
            }
        }

        getRecordsData();
    }, []);

    //loading the records
    if (loading) {
        return (
            <div
                className="text-lg text-gray-800 format-semibold"
                data-testid="workout-records-loading"
            >
                Loading Records....
            </div>
        );
    }

    //No records Found
    if (serverError) {
        return (
            <div
                className="text-xl text-red-500 format-semibold ml-2 mt-4"
                data-testid="workout-records-server-error"
            >
                {serverError}
            </div>
        );
    }

    //formatting all the dates used in this page
    const allDurations = {
        maxDuration: achievementsData?.duration?.durationRecord ?? 0,
        totalDuration: milestonesData[0]?.totalduration ?? 0,
        averageDuration: milestonesData[0]?.avgDuration ?? 0,
        activeDayDuration: recordsData?.mostActiveDay[0]?.totalDuration ?? 0,
        activeWeekDuration: recordsData?.mostActiveWeek[0]?.totalDuration ?? 0
    };

    const allDurationsFormatted = formatEveryDuration(allDurations);

    //formating the date to str value
    const activeDay = recordsData?.mostActiveDay[0]?.date ?? 0;
    const activeDayStrs = formatDate(activeDay);

    //workout modal open function
    const openWorkoutModal = (data) => {
        setShowModal(true);
        setModalData(data);
    };

    return (
        <div className="min-h-screen bg-gray-100" data-testid="workout-records-page">
            {/* Header */}
            <div
                className="flex items-center justify-between px-4 md:px-6"
                data-testid="workout-records-header"
            >
                <LogoHeader mode="inline" />
                <TopRightUser />
            </div>

            {/* View Workout Modal */}
            {showModal && (
                <WorkoutViewModal
                    data={modalData}
                    onClose={() => setShowModal(false)}
                />
            )}

            {/* Page Container */}
            <div
                className="max-w-7xl mx-auto px-4 md:px-6 py-8"
                data-testid="workout-records-container"
            >
                <div
                    className="bg-white rounded-lg shadow-md p-4 md:p-6"
                    data-testid="workout-records-card"
                >
                    {/* Title */}
                    <div
                        className="flex justify-center mt-4"
                        data-testid="workout-records-title-section"
                    >
                        <h2
                            className="text-3xl md:text-4xl font-bold text-gray-800"
                            data-testid="workout-records-heading"
                        >
                            Personal Records
                        </h2>
                    </div>

                    {/* ========== ACHIEVEMENTS ========== */}
                    <div
                        className="mt-10 border-l-4 border-red-400 bg-red-50 px-3 py-2 font-semibold text-gray-800"
                        data-testid="workout-records-achievements-section-title"
                    >
                        Workout Achievements
                    </div>

                    <div
                        className="flex flex-col md:flex-row justify-center gap-4 mt-12"
                        data-testid="workout-records-achievements-section"
                    >
                        {/* Max Duration */}
                        <div
                            className="bg-gray-100 min-h-[250px] flex-1 rounded-xl cursor-pointer transition-all duration-150 hover:shadow-lg active:scale-[0.98]"
                            data-testid="max-duration-card"
                            onClick={() => openWorkoutModal(durationWorkout)}
                        >
                            <div className="flex flex-col">
                                <div
                                    className="text-lg font-semibold text-center mt-6"
                                    data-testid="max-duration-title"
                                >
                                    Max Duration of Workout
                                </div>
                                <div
                                    className="text-4xl md:text-5xl font-semibold text-center mt-6 text-red-500"
                                    data-testid="max-duration-value"
                                >
                                    {allDurationsFormatted.maxDuration}
                                </div>
                                <div
                                    className="text-sm text-gray-500 text-center mt-6 hover:text-gray-800"
                                    data-testid="max-duration-helper-text"
                                >
                                    Click to view workout details
                                </div>
                            </div>
                        </div>

                        {/* Max Calories */}
                        <div
                            className="bg-gray-100 min-h-[250px] flex-1 rounded-xl cursor-pointer transition-all duration-150 hover:shadow-lg active:scale-[0.98]"
                            data-testid="max-calories-card"
                            onClick={() => openWorkoutModal(caloriesWorkout)}
                        >
                            <div className="flex flex-col">
                                <div
                                    className="text-lg font-semibold text-center mt-6"
                                    data-testid="max-calories-title"
                                >
                                    Max Calories Burned in Workout
                                </div>
                                <div
                                    className="text-4xl md:text-5xl font-semibold text-center mt-6 text-red-500"
                                    data-testid="max-calories-value"
                                >
                                    {achievementsData?.calories?.kcalRecord ?? 0} kcal
                                </div>
                                <div
                                    className="text-sm text-gray-500 text-center mt-6 hover:text-gray-800"
                                    data-testid="max-calories-helper-text"
                                >
                                    Click to view workout details
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ========== STREAKS ========== */}
                    <div
                        className="mt-16 border-l-4 border-red-400 bg-red-50 px-3 py-2 font-semibold text-gray-800"
                        data-testid="workout-records-streaks-section-title"
                    >
                        Streaks
                    </div>

                    <div
                        className="flex flex-col md:flex-row justify-center gap-4 mt-12"
                        data-testid="workout-records-streaks-section"
                    >
                        <div
                            className="bg-gray-100 min-h-[250px] flex-1 rounded-xl cursor-pointer transition-all duration-150 hover:shadow-lg active:scale-[0.98]"
                            data-testid="current-streak-card"
                        >
                            <div className="flex flex-col">
                                <div
                                    className="text-lg font-semibold text-center mt-6"
                                    data-testid="current-streak-title"
                                >
                                    Current Streak
                                </div>
                                <div
                                    className="text-4xl md:text-5xl font-semibold text-center mt-6 text-red-500"
                                    data-testid="current-streak-value"
                                >
                                    {achievementsData?.streaks?.current ?? 0} days
                                </div>
                            </div>
                        </div>

                        <div
                            className="bg-gray-100 min-h-[250px] flex-1 rounded-xl cursor-pointer transition-all duration-150 hover:shadow-lg active:scale-[0.98]"
                            data-testid="longest-streak-card"
                        >
                            <div className="flex flex-col">
                                <div
                                    className="text-lg font-semibold text-center mt-6"
                                    data-testid="longest-streak-title"
                                >
                                    Longest Streak
                                </div>
                                <div
                                    className="text-4xl md:text-5xl font-semibold text-center mt-6 text-red-500"
                                    data-testid="longest-streak-value"
                                >
                                    {achievementsData?.streaks?.longest ?? 0} days
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ========== MILESTONES ========== */}
                    <div
                        className="mt-16 border-l-4 border-red-400 bg-red-50 px-3 py-2 font-semibold text-gray-800"
                        data-testid="workout-records-milestones-section-title"
                    >
                        Milestones
                    </div>

                    <div
                        className="flex flex-wrap gap-4 mt-8"
                        data-testid="workout-records-milestones-section"
                    >
                        {[
                            ["Total Workouts Logged", milestonesData[0]?.totalWorkouts ?? 0],
                            ["Total Calories Burned", milestonesData[0]?.totalKcalBurned ?? 0],
                            ["Total Duration", allDurationsFormatted.totalDuration],
                            ["Average Duration", allDurationsFormatted.averageDuration],
                            ["Average Calories Burned", milestonesData[0]?.avgKcalBurned ?? 0]
                        ].map(([label, value]) => {
                            const testIdBase = label
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, "-")
                                .replace(/^-|-$/g, "");

                            return (
                                <div
                                    key={label}
                                    className="bg-gray-100 px-4 py-3 rounded-xl cursor-pointer transition-all duration-150 hover:shadow-lg active:scale-[0.98] flex-1"
                                    data-testid={`milestone-card-${testIdBase}`}
                                >
                                    <div className="flex gap-2">
                                        <div
                                            className="font-semibold text-gray-700"
                                            data-testid={`milestone-label-${testIdBase}`}
                                        >
                                            {label}:
                                        </div>
                                        <div
                                            className="font-semibold text-red-500"
                                            data-testid={`milestone-value-${testIdBase}`}
                                        >
                                            {value}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* ========== RECORDS ========== */}
                    <div
                        className="mt-16 border-l-4 border-red-400 bg-red-50 px-3 py-2 font-semibold text-gray-800"
                        data-testid="workout-records-records-section-title"
                    >
                        Records
                    </div>

                    <div
                        className="flex flex-col md:flex-row justify-center gap-4 mt-12"
                        data-testid="workout-records-records-section"
                    >
                        {/* Most Active Day */}
                        <div
                            className="bg-gray-100 min-h-[260px] flex-1 rounded-xl cursor-pointer transition-all duration-150 hover:shadow-lg active:scale-[0.98]"
                            data-testid="most-active-day-card"
                        >
                            <div className="flex flex-col">
                                <div
                                    className="text-xl font-semibold text-center mt-6"
                                    data-testid="most-active-day-title"
                                >
                                    Most Active Day
                                </div>

                                {[
                                    ["Date", activeDayStrs ?? "----"],
                                    [
                                        "Exercises Logged",
                                        recordsData?.mostActiveDay[0]?.workouts ?? 0
                                    ],
                                    [
                                        "Total Calories",
                                        recordsData?.mostActiveDay[0]?.totalKcalBurned ?? 0
                                    ],
                                    [
                                        "Total Duration",
                                        allDurationsFormatted.activeDayDuration
                                    ]
                                ].map(([label, value]) => {
                                    const testIdBase = label
                                        .toLowerCase()
                                        .replace(/[^a-z0-9]+/g, "-")
                                        .replace(/^-|-$/g, "");

                                    return (
                                        <div
                                            key={label}
                                            className="flex justify-center gap-2 mt-4"
                                            data-testid={`most-active-day-row-${testIdBase}`}
                                        >
                                            <span
                                                className="font-semibold text-gray-700"
                                                data-testid={`most-active-day-label-${testIdBase}`}
                                            >
                                                {label}:
                                            </span>
                                            <span
                                                className="font-semibold text-red-500"
                                                data-testid={`most-active-day-value-${testIdBase}`}
                                            >
                                                {value}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Most Active Week */}
                        <div
                            className="bg-gray-100 min-h-[260px] flex-1 rounded-xl cursor-pointer transition-all duration-150 hover:shadow-lg active:scale-[0.98]"
                            data-testid="most-active-week-card"
                        >
                            <div className="flex flex-col">
                                <div
                                    className="text-xl font-semibold text-center mt-6"
                                    data-testid="most-active-week-title"
                                >
                                    Most Active Week
                                </div>

                                {[
                                    ["Week", recordsData?.mostActiveWeek[0]?.week ?? "----"],
                                    [
                                        "Exercises Logged",
                                        recordsData?.mostActiveWeek[0]?.workouts ?? 0
                                    ],
                                    [
                                        "Total Calories",
                                        recordsData?.mostActiveWeek[0]?.totalKcalBurned ?? 0
                                    ],
                                    [
                                        "Total Duration",
                                        allDurationsFormatted.activeWeekDuration
                                    ]
                                ].map(([label, value]) => {
                                    const testIdBase = label
                                        .toLowerCase()
                                        .replace(/[^a-z0-9]+/g, "-")
                                        .replace(/^-|-$/g, "");

                                    return (
                                        <div
                                            key={label}
                                            className="flex justify-center gap-2 mt-4"
                                            data-testid={`most-active-week-row-${testIdBase}`}
                                        >
                                            <span
                                                className="font-semibold text-gray-700"
                                                data-testid={`most-active-week-label-${testIdBase}`}
                                            >
                                                {label}:
                                            </span>
                                            <span
                                                className="font-semibold text-red-500"
                                                data-testid={`most-active-week-value-${testIdBase}`}
                                            >
                                                {value}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WorkoutRecords;