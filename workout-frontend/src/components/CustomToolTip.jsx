
function CustomTooltip({ active, payload }) {
    
  if (!active || !payload || !payload.length) return null;

  const { name, count, kcal, value } = payload[0].payload;

  return (
    <div className="bg-white p-2 rounded shadow text-sm">
      <p className="font-semibold">{name}</p>
      <p>Workouts: {count}</p>
      <p>Kcal Burned: {kcal}</p>
      <p>Share: {value}%</p>
    </div>
  );
}

export default CustomTooltip;