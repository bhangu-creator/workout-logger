import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

/*************** Custom ToolTip ********************/
function WeeklyToolTip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;

  const d = payload[0].payload;

  return (
    <div
      className="bg-white p-3 text-sm rounded shadow-lg border border-gray-200"
      data-testid="weekly-trend-tooltip"
    >
      <div
        className="font-semibold mb-2 text-gray-800"
        data-testid="weekly-trend-tooltip-week"
      >
        {label}
      </div>

      <div
        className="text-gray-600"
        data-testid="weekly-trend-tooltip-workouts"
      >
        Workouts: <span className="font-medium">{d.totalWorkout}</span>
      </div>

      <div
        className="text-gray-600"
        data-testid="weekly-trend-tooltip-calories"
      >
        Calories: <span className="font-medium">{d.totalKcalBurned}</span> kcal
      </div>

      <div
        className="text-gray-600"
        data-testid="weekly-trend-tooltip-duration"
      >
        Duration: <span className="font-medium">{d.totalDuration}</span> min
      </div>
    </div>
  );
}

/*************** Custom Bar Shape ********************/
function WeeklyBarShape(props) {
  const { x, y, width, height, fill, payload, index } = props;

  // Use week label if available, otherwise fallback to index
  const safeWeek = payload?.week
    ? payload.week.replace(/\s+/g, "-").toLowerCase()
    : `index-${index}`;

  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
      rx={6}
      ry={6}
      data-testid={`weekly-trend-bar-${safeWeek}`}
    />
  );
}

/************* Chart Component **********************/
export default function WorkoutsTrendChart({ weeklyProgress }) {
  const data = [...weeklyProgress].reverse();

  return (
    <div
      className="w-full h-[360px]"
      data-testid="workouts-trend-chart-container"
    >
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 10, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          <XAxis
            dataKey="week"
            interval={0}
            tick={{ fontSize: 11, fill: "#4b5563" }}
            angle={-45}
            textAnchor="end"
            height={80}
          />

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

          <Tooltip
            content={<WeeklyToolTip />}
            cursor={{ fill: "rgba(239, 68, 68, 0.1)" }}
          />

          <Bar
            dataKey="totalWorkout"
            fill="#ef4444"
            radius={[6, 6, 0, 0]}
            shape={<WeeklyBarShape />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}