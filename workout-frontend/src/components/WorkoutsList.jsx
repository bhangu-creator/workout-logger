import { useState, useEffect } from "react";

// WorkoutsList displays a paginated, sortable list of workouts
// Props:
// - onView: handler to view workout details
// - onEdit: handler to edit a workout
// - onDelete: handler to delete a workout
// - searchText: text used to filter workouts
// - WorkoutsData: array of workout objects
function WorkoutsList({ onView, onEdit, searchText, WorkoutsData, onDelete }) {

  // Number of records shown per page
  const ITEMS_PER_PAGE = 10;

  // State to manage sorting (column key and direction)
  const [sortState, setSortState] = useState({
    key: null,
    direction: null
  });

  // State to track the current page number
  const [curretPage, setCurrentPage] = useState(1);

  // Add derived fields (totalDuration and totalCalories) to each workout
  const transformed = WorkoutsData.map(w => {
    const totalDuration = w.exercises.reduce((sum, ex) => sum + ex.duration, 0);
    const totalCalories = w.exercises.reduce((sum, ex) => sum + ex.kcalBurned, 0);

    return { ...w, totalDuration, totalCalories };
  });

  // Filter workouts based on search text
  const text = searchText.toLowerCase();
  const filteredWorkouts = transformed.filter(w => {
    return (
      w.title.toLowerCase().includes(text) ||
      w.type.toLowerCase().includes(text) ||
      w.totalDuration.toString().includes(text) ||
      w.totalCalories.toString().includes(text)
    );
  });

  // Updates sort state when a column header is clicked
  function handleSort(columnKey) {
    setSortState(prev => {
      if (prev.key == columnKey) {
        if (prev.direction == "asc") {
          return { key: columnKey, direction: "desc" };
        } else if (prev.direction == "desc") {
          return { key: null, direction: null };
        }
      }
      return { key: columnKey, direction: "asc" };
    });
  }

  // Create a copy of filtered data to avoid mutating original array
  const sortedData = [...filteredWorkouts];

  // Sort data based on selected column and direction
  if (sortState.key != null) {
    sortedData.sort((a, b) => {
      const key = sortState.key;

      let valA = a[key];
      let valB = b[key];

      // Normalize string values for case-insensitive comparison
      if (typeof valA == "string") {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (sortState.direction == "asc") {
        return valA > valB ? 1 : -1;
      } else {
        return valB > valA ? 1 : -1;
      }
    });
  }

  // Calculate total number of pages
  const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);

  // Reset page to 1 if search/filter reduces total pages
  useEffect(() => {
    const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);
    if (curretPage > totalPages) {
      setCurrentPage(1);
    }
  }, [filteredWorkouts.length]);

  // Determine slice of data for the current page
  const start = (curretPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const paginationWorkouts = sortedData.slice(start, end);

  return (
    <div className="w-full max-w-5xl mx-auto">

      {/* Header row with sortable column labels */}
      <div className="bg-gray-200 rounded-t-lg grid grid-cols-5 font-semibold text-gray-700 px-4 py-3">
        <div className="cursor-pointer select-none flex items-center gap-1" onClick={() => handleSort("title")}>
          {sortState.key == "title" && (
            <span>{sortState.direction == "asc" ? "▲" : "▼"}</span>
          )}
          Title
        </div>

        <div className="cursor-pointer select-none flex items-center gap-1" onClick={() => handleSort("type")}>
          Type
          {sortState.key == "type" && (
            <span>{sortState.direction == "asc" ? "▲" : "▼"}</span>
          )}
        </div>

        <div className="cursor-pointer select-none flex items-center gap-1" onClick={() => handleSort("totalDuration")}>
          {sortState.key == "totalDuration" && (
            <span>{sortState.direction == "asc" ? "▲" : "▼"}</span>
          )}
          Total Duration
        </div>

        <div className="cursor-pointer select-none flex items-center gap-1" onClick={() => handleSort("totalCalories")}>
          {sortState.key == "totalCalories" && (
            <span>{sortState.direction == "asc" ? "▲" : "▼"}</span>
          )}
          Total Calories
        </div>

        <div className="text-center select-none">Actions</div>
      </div>

      {/* Workout list rows */}
      <ul className="flex flex-col gap-2 mt-2">
        {WorkoutsData.length == 0 ? (
          // Empty state when no workouts exist
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <p className="text-lg font-medium">No workouts yet</p>
            <p className="text-sm mt-2">
              Start logging workouts to build your history.
            </p>
          </div>
        ) : (
          paginationWorkouts.map(w => (
            <li
              key={w._id}
              className="grid grid-cols-5 gap-6 items-center bg-white px-4 py-3 rounded-lg shadow"
            >
              <div className="font-medium">{w.title}</div>
              <div className="text-gray-600">{w.type}</div>
              <div className="text-gray-500">{w.totalDuration} min</div>
              <div className="text-gray-500">{w.totalCalories} kcal</div>

              {/* Action buttons */}
              <div className="flex justify-end gap-3">
                <button
                  className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-all duration-200 hover:scale-105"
                  onClick={() => onView(w)}
                >
                  View
                </button>

                <button
                  className="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded-md text-gray-600 hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200"
                  onClick={() => onEdit(w)}
                >
                  Edit
                </button>

                <button
                  className="flex items-center gap-1 px-2 py-1 border border-red-400 rounded-md text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200"
                  onClick={() => onDelete(w._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>

      {/* Pagination controls */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded ${curretPage == page ? "bg-red-500 text-gray" : "bg-gray-500"}`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}

export default WorkoutsList;
