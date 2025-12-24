import { PieChart, Pie, Cell, Tooltip ,Legend } from "recharts";
import { ResponsiveContainer } from "recharts";
import CustomTooltip from "../components/CustomToolTip";

function WorkoutTypePie({ breakdownData, loading }) {

    //if loading state and no data is provided
    if (loading) {
        return (
            <div className="text-center text-gray-500">
                <p className="text-lg font-semibold">
                    Select a Duration and click "View Data"
                </p>
            </div>
        );
    }

    //if no data is provided
    if (!breakdownData || !breakdownData.breakdown ||breakdownData.breakdown.length === 0) 
    {
        return <div className="text-center text-lg font-semibold text-gray-500">No data available</div>;
    }

    //data is provided
    if(!loading && breakdownData)
    {

    //colors of the pie chart
    const COLORS = {
    Cardio: "#ef4444",
    strength: "#3b82f6",
    yoga: "#22c55e",
    HIT: "#f59e0b",
    other: "#6b7280"
    };

    //transforming the bakend data to chart date
    const chartData= breakdownData.breakdown.map((item)=>(
    {
        name:item.type,
        value : Number(item.percent),
        count : item.count,
        kcal : item.kcal

    }))
    console.log(chartData)
    

    // Render the pie chart here
    return (
    <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={390}>
            <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={140}
                label={({value})=>`${value}%`}
                >
                    {chartData.map(entry=>(
                        <Cell
                        key={entry.name}
                        fill={COLORS[entry.name] || "#8884d8"}
                        />
                    ))}
            </Pie>
            <Tooltip content={<CustomTooltip></CustomTooltip>}/>
            <Legend 
                        formatter={(value) => {
                            // Capitalize first letter for display
                            return value.charAt(0).toUpperCase() + value.slice(1);
                        }}
            />
            </PieChart>
        </ResponsiveContainer>


    </div>) 
    }
}

export default WorkoutTypePie;