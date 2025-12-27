// CustomTooltip is a reusable tooltip component for the pie chart
// It displays detailed information when the user hovers over a slice.
//
// Props (provided by the chart library):
// - active: boolean indicating whether the tooltip should be visible
// - payload: array containing data for the hovered chart segment
function CustomTooltip({ active, payload }) {
    
  // If tooltip is not active OR payload is missing/empty,
  // return null so nothing is rendered
  if (!active || !payload || !payload.length) return null;

  // Extract relevant data from the payload of the hovered slice
  // payload[0].payload contains the original data object for that slice
  const { name, count, kcal, value } = payload[0].payload;

  return (
    // Tooltip container
    // Styled as a small card with white background and shadow
    <div className="bg-white p-2 rounded shadow text-sm">
      
      {/* Workout type / category name */}
      <p className="font-semibold">{name}</p>

      {/* Total number of workouts for this category */}
      <p>Workouts: {count}</p>

      {/* Total calories burned for this category */}
      <p>Kcal Burned: {kcal}</p>

      {/* Percentage share of this category in the pie chart */}
      <p>Share: {value}%</p>
    </div>
  );
}

// Exporting the custom tooltip to be used in pie chart components
export default CustomTooltip;
