// ===== WorkoutTrend.jsx =====
import { useEffect, useState, memo } from "react";
import WorkoutsTrendChart from "../components/WorkoutsTrendChart";
import authRequest from "../utils/authRequest";
import { API_BASE_URL, ENDPOINTS } from "../api/endpoints";
import LogoHeader from "../components/LogoHeader";
import TopRightUser from "../components/TopRightUser";

function WorkoutTrend() {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);  

    useEffect(() => {
        async function fetchTrends() {
            try {
                setLoading(true);
                const response = await authRequest(
                    "get",
                    API_BASE_URL + ENDPOINTS.GET_WORKOUTS_TREND
                );
                setData(response?.data?.weeklyProgress || []); 
            } catch (error) {
                console.error("Trend fetch error:", error);
                setError("Unable to load Trends");
            } finally {
                setLoading(false);
            }
        }
        fetchTrends();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4">
                <LogoHeader mode="inline" />
                <TopRightUser />
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Workout Trends
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Your activity over the last 8 weeks
                    </p>

                    {/* Loading State */}
                    {loading && (
                        <div className="flex items-center justify-center h-[360px]">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
                                <p className="text-gray-600">Loading Trends...</p>
                            </div>
                        </div>
                    )}

                    {/* Error State */}
                    {error && !loading && (
                        <div className="flex items-center justify-center h-[360px]">
                            <div className="text-center">
                                <p className="text-red-500 text-lg font-semibold mb-2">{error}</p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                >
                                    Retry
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && !error && (!data || data.length === 0) && (  
                        <div className="flex items-center justify-center h-[360px]">
                            <div className="text-center text-gray-500">
                                <svg
                                    className="w-16 h-16 mx-auto mb-4 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                    />
                                </svg>
                                <p className="text-lg font-semibold mb-2">No workout data available</p>
                                <p className="text-sm">Start logging workouts to see your trends!</p>
                            </div>
                        </div>
                    )}

                    {/* Chart */}
                    {!loading && !error && data && data.length > 0 && (
                        <WorkoutsTrendChart weeklyProgress={data} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default memo(WorkoutTrend);