
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

/*************** Custom ToolTip ********************/
function WeeklyToolTip({ active, payload, label }) {
    if (!active || !payload || !payload.length) return null;
    
    const d = payload[0].payload;

    return (
        <div className="bg-white p-3 text-sm rounded shadow-lg border border-gray-200">
            <div className="font-semibold mb-2 text-gray-800">{label}</div>
            <div className="text-gray-600">Workouts: <span className="font-medium">{d.totalWorkout}</span></div>
            <div className="text-gray-600">Calories: <span className="font-medium">{d.totalKcalBurned}</span> kcal</div>
            <div className="text-gray-600">Duration: <span className="font-medium">{d.totalDuration}</span> min</div>
        </div>
    );
}

/************* Chart Component ********************** */
export default function WorkoutsTrendChart({ weeklyProgress }) {
    // Reverse to show oldest → newest (left to right)
    const data = [...weeklyProgress].reverse();

    return (
        <div className="w-full h-[360px]">  
            <ResponsiveContainer>
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 10, bottom: 60 }}
                >
                    {/*Added grid for better readability */}
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    
                    {/** X Axis - Weeks */}
                    <XAxis
                        dataKey="week"
                        interval={0}
                        tick={{ fontSize: 11, fill: "#4b5563" }}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                    />
                    
                    {/** Y Axis - Workout Count */}
                    <YAxis
                        label={{ value: "Workouts", angle: -90, position: "insideLeft", style: { fontSize: 12 } }}
                        allowDecimals={false}
                        tick={{ fontSize: 12, fill: "#4b5563" }}
                    />
                    
                    {/** Tooltip */}
                    <Tooltip content={<WeeklyToolTip />} cursor={{ fill: "rgba(239, 68, 68, 0.1)" }} />
                    
                    {/** Bars */}
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