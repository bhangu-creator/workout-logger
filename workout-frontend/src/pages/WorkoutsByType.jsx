import LogoHeader from "../components/LogoHeader";
import TopRightUser from "../components/TopRightUser";
import DatePicker from "../components/DatePicker";
import { useState } from "react";
import authRequest from "../utils/authRequest";
import { API_BASE_URL, ENDPOINTS } from "../api/endpoints";
import { validateDateRanges } from "../utils/validators";
import WorkoutTypePie from "../components/WorkoutTypePie";
import { useNavigate } from "react-router-dom";

function WorkoutsByType() {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [period, setPeriod] = useState("this_week");
    const [customDates, setCustomDates] = useState({ from: "", to: "" });
    const [customDateErrors, setCustomDatesErrors] = useState("");
    const [serverError, setServerError] = useState("");
    const [loading, setLoading] = useState(true);
    const [breakdownData, setBreakdownData] = useState(null);
    const navigate= useNavigate();

    const handleCustomDates = (custom) => {
        setCustomDates(custom);
    };

    const validateCustomDates = () => {
        const error = validateDateRanges(customDates);
        if (!error) return true;
        setCustomDatesErrors(error);
        return false;
    };

    const handleViewData = async () => {
        setServerError(""); // Clear previous errors
        setCustomDatesErrors("");
        
        if (period !== "custom") {
            try {
                const params = { period: period };
                const response = await authRequest(
                    "get",
                    API_BASE_URL + ENDPOINTS.GET_WORKOUTS_STATS_BY_TYPE,
                    null,
                    params
                );
                setBreakdownData(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                if(error?.response?.request?.status===401)
                {
                    setServerError("Session Expired Logging you out!!");
                    localStorage.removeItem("token")
                    setTimeout(()=>{navigate("/login",{replace:true})},2000)
                }
                else
                { setServerError("Something Went Wrong!!");}
            }
        } else {
            try {
                if (!validateCustomDates()) return;
                const params = { from: customDates.from, to: customDates.to };
                const response = await authRequest(
                    "get",
                    API_BASE_URL + ENDPOINTS.GET_WORKOUTS_STATS_BY_TYPE,
                    null,
                    params
                );
                setBreakdownData(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setServerError("Something Went Wrong!!");
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 relative">
            {/* Header */}
            <div className="flex items-center justify-between px-6">
                <LogoHeader mode="inline" />
                <div className="ml-4"> {/* Increased margin for spacing */}
                    <TopRightUser />
                </div>
            </div>

            {/* Main Block */}
            <div className="bg-gray-300 max-w-8xl mx-auto min-h-[600px] ml-[50px] mt-[20px] mr-[50px] border border-gray-300 rounded-lg p-6 md:ml-[20px] md:mr-[20px] sm:ml-[10px] sm:mr-[10px]">
                <h2 className="w-full text-center text-red-500 text-[25px] font-semibold md:text-[20px] sm:text-[18px]">
                    Workouts By Type
                </h2>
                <div className="mt-4 font-semibold text-[20px] md:text-[16px] sm:text-[14px]">
                    <p>See how your Workouts are split by Type over Time</p>
                </div>

                {/* Main Flex Container - Stacked on mobile */}
                <div className="flex flex-col lg:flex-row gap-8 items-start mt-6">
                    
                    {/* ===== LEFT SIDE: Controls ===== */}
                    <div className="flex-shrink-0 w-full lg:w-[500px]">
                        <p className="text-[16px] font-semibold md:text-[14px]">Select Duration:</p>

                        {/* Radio Buttons */}
                        <div className="space-y-8 mt-4 pl-6 md:space-y-4">
                            {/* This Week */}
                            <div className="flex items-center gap-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="period"
                                        value="this_week"
                                        checked={period === "this_week"}
                                        onChange={() => {
                                            setShowDatePicker(false);
                                            setPeriod("this_week");
                                            setCustomDatesErrors("");
                                            setCustomDates({ from: "", to: "" });
                                            setLoading(true);
                                        }}
                                    />
                                    <span className="font-semibold text-gray-700 md:text-[14px]">This Week</span>
                                </label>
                            </div>

                            {/* This Month */}
                            <div className="flex items-center gap-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="period"
                                        value="this_month"
                                        checked={period === "this_month"}
                                        onChange={() => {
                                            setShowDatePicker(false);
                                            setPeriod("this_month");
                                            setCustomDatesErrors("");
                                            setCustomDates({ from: "", to: "" });
                                            setLoading(true);
                                        }}
                                    />
                                    <span className="font-semibold text-gray-700 md:text-[14px]">This Month</span>
                                </label>
                            </div>

                            {/* Last Month */}
                            <div className="flex items-center gap-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="period"
                                        value="last_month"
                                        checked={period === "last_month"}
                                        onChange={() => {
                                            setShowDatePicker(false);
                                            setPeriod("last_month");
                                            setCustomDatesErrors("");
                                            setCustomDates({ from: "", to: "" });
                                            setLoading(true);
                                        }}
                                    />
                                    <span className="font-semibold text-gray-700 md:text-[14px]">Last Month</span>
                                </label>
                            </div>

                            {/* Custom Date */}
                            <div className="flex flex-col items-start gap-2 relative">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="period"
                                        value="custom"
                                        checked={period === "custom"}
                                        onChange={() => {
                                            setPeriod("custom");
                                            setShowDatePicker(true);
                                            setLoading(true);
                                        }}
                                    />
                                    <span className="font-semibold text-gray-700 md:text-[14px]">Custom Date</span>
                                </label>

                                {/* Date Picker - Positioned relative to parent */}
                                {showDatePicker && (
                                    <div className="w-full lg:absolute lg:left-32 lg:ml-4 lg:top-0 lg:w-[360px] sm:w-[250px]">
                                        <DatePicker handleCustomDates={handleCustomDates} />
                                        {customDateErrors && (
                                            <p className="mt-2 text-sm text-red-500">
                                                {customDateErrors}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* View Data Button */}
                        <div className="mt-8 pl-6">
                            <button
                                type="button"
                                className="px-6 py-2 bg-red-500 border rounded-lg text-lg text-white font-medium hover:bg-red-700 transition-colors md:text-[16px] md:px-4 md:py-2"
                                onClick={handleViewData}
                            >
                                View Data
                            </button>

                            {/* Server Error */}
                            {serverError && (
                                <p className="mt-2 text-red-600 text-sm font-medium">
                                    {serverError}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* ===== RIGHT SIDE: Pie Chart - Increased size for mobile ===== */}
                    <div className="w-full lg:w-[700px] min-h-[500px] flex items-center justify-center bg-white rounded-lg shadow-md p-6">
                        {/*Showing the overall workouts data  */}
                        <div className="w-full">
                            {breakdownData && !(loading) && (
                                <div className="flex flex-col md:flex-row justify-center gap-8 mb-6 md:gap-4">
                                    <div className="bg-gray-100 px-6 py-3 rounded-lg text-center">
                                        <p className="text-sm text-gray-500 md:text-xs">Total Workouts</p>
                                        <p className="text-xl font-bold md:text-lg">{breakdownData.totalWorkouts}</p>
                                    </div>

                                    <div className="bg-gray-100 px-6 py-3 rounded-lg text-center">
                                        <p className="text-sm text-gray-500 md:text-xs">Total Kcal</p>
                                        <p className="text-xl font-bold md:text-lg">{breakdownData.totalKcal}</p>
                                    </div>
                                </div>
                            )}

                            <WorkoutTypePie
                                breakdownData={breakdownData}
                                loading={loading}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WorkoutsByType;