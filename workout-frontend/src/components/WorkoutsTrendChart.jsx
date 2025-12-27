import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

/*************** Custom ToolTip ********************/
// WeeklyToolTip renders a custom tooltip for each bar in the weekly trend chart
// It displays aggregated workout data for the hovered week
function WeeklyToolTip({ active, payload, label }) {

    // Do not render tooltip if it is inactive or has no data
    if (!active || !payload || !payload.length) return null;
    
    // Extract the data payload for the hovered bar
    const d = payload[0].payload;

    return (
        // Tooltip container
        <div className="bg-white p-3 text-sm rounded shadow-lg border border-gray-200">
            
            {/* Week label */}
            <div className="font-semibold mb-2 text-gray-800">{label}</div>

            {/* Total workouts in the week */}
            <div className="text-gray-600">
                Workouts: <span className="font-medium">{d.totalWorkout}</span>
            </div>

            {/* Total calories burned in the week */}
            <div className="text-gray-600">
                Calories: <span className="font-medium">{d.totalKcalBurned}</span> kcal
            </div>

            {/* Total workout duration for the week */}
            <div className="text-gray-600">
                Duration: <span className="font-medium">{d.totalDuration}</span> min
            </div>
        </div>
    );
}

/************* Chart Component ********************** */
// WorkoutsTrendChart visualizes weekly workout trends using a bar chart
// Props:
// - weeklyProgress: array containing weekly aggregated workout data
export default function WorkoutsTrendChart({ weeklyProgress }) {

    // Reverse the data to display oldest weeks on the left and newest on the right
    const data = [...weeklyProgress].reverse();

    return (
        // Chart container with fixed height
        <div className="w-full h-[360px]">  
            <ResponsiveContainer>
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 10, bottom: 60 }}
                >
                    {/* Grid lines to improve chart readability */}
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    
                    {/* X Axis representing weeks */}
                    <XAxis
                        dataKey="week"
                        interval={0}
                        tick={{ fontSize: 11, fill: "#4b5563" }}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                    />
                    
                    {/* Y Axis representing workout count */}
                    <YAxis
                        label={{
                            value: "Workouts",
                            angle: -90,
                            position: "insideLeft",
                            style: { fontSize: 12 }
                        }}
                        allowDecimals={false}
                        tick={{ fontSize: 12, fill: "#4b5563" }}
                    />
                    
                    {/* Custom tooltip for hover interaction */}
                    <Tooltip
                        content={<WeeklyToolTip />}
                        cursor={{ fill: "rgba(239, 68, 68, 0.1)" }}
                    />
                    
                    {/* Bar representing total workouts per week */}
                    <Bar
                        dataKey="totalWorkout"
                        fill="#ef4444"
                        radius={[6, 6, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
