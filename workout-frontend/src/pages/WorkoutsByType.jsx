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
                <TopRightUser />
            </div>

            {/* Main Block */}
            <div className="bg-gray-300 max-w-8xl mx-auto min-h-[500px] ml-[50px] mt-[20px] mr-[50px] border border-gray-300 rounded-lg p-6">
                <h2 className="w-full text-center text-red-500 text-[25px] font-semibold">
                    Workouts By Type
                </h2>
                <div className="mt-4 font-semibold text-[20px]">
                    <p>See how your Workouts are split by Type over Time</p>
                </div>

                {/* Main Flex Container - LEFT and RIGHT */}
                <div className="flex gap-8 items-start mt-6">
                    
                    {/* ===== LEFT SIDE: Controls ===== */}
                    <div className="flex-shrink-0 w-[500px]">
                        <p className="text-[16px] font-semibold">Select Duration:</p>

                        {/* Radio Buttons */}
                        <div className="space-y-8 mt-4 pl-6">
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
                                    <span className="font-semibold text-gray-700">This Week</span>
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
                                    <span className="font-semibold text-gray-700">This Month</span>
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
                                    <span className="font-semibold text-gray-700">Last Month</span>
                                </label>
                            </div>

                            {/* Custom Date */}
                            <div className="flex items-center gap-2 relative">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="period"
                                        value="custom"
                                        checked={period === "custom"}
                                        onChange={() => {
                                            setPeriod("custom");
                                            setShowDatePicker(true)
                                            setLoading(true);
                                        }}
                                    />
                                    <span className="font-semibold text-gray-700">Custom Date</span>
                                </label>

                                {/* Date Picker - Absolute positioned */}
                                {showDatePicker && (
                                    <div className="absolute left-32 ml-4 top-0">
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
                                className="px-6 py-2 bg-red-500 border rounded-lg text-lg text-white font-medium hover:bg-red-700 transition-colors"
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

                    {/* ===== RIGHT SIDE: Pie Chart ===== */}
                    <div className="w-[700px] min-h-[400px] flex items-center justify-center bg-white rounded-lg shadow-md p-6">
                        {/*Showing the overall workouts data  */}
                        <div className="ml-5">
                            {breakdownData && !(loading) && (
                                <div className="flex justify-center gap-8">
                                    <div className="bg-gray-100 px-6 py-3 rounded-lg text-center">
                                        <p className="text-sm text-gray-500">Total Workouts</p>
                                        <p className="text-xl font-bold">{breakdownData.totalWorkouts}</p>
                                    </div>

                                    <div className="bg-gray-100 px-6 py-3 rounded-lg text-center">
                                        <p className="text-sm text-gray-500">Total Kcal</p>
                                        <p className="text-xl font-bold">{breakdownData.totalKcal}</p>
                                    </div>
                                </div>
                                )}
                        </div>

                        <WorkoutTypePie
                            breakdownData={breakdownData}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WorkoutsByType;