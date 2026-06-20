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
    const transformed = WorkoutsData.map((w) => {
        const totalDuration = w.exercises.reduce(
            (sum, ex) => sum + ex.duration,
            0
        );
        const totalCalories = w.exercises.reduce(
            (sum, ex) => sum + ex.kcalBurned,
            0
        );

        return { ...w, totalDuration, totalCalories };
    });

    // Filter workouts based on search text
    const text = searchText.toLowerCase();
    const filteredWorkouts = transformed.filter((w) => {
        return (
            w.title.toLowerCase().includes(text) ||
            w.type.toLowerCase().includes(text) ||
            w.totalDuration.toString().includes(text) ||
            w.totalCalories.toString().includes(text)
        );
    });

    // Updates sort state when a column header is clicked
    function handleSort(columnKey) {
        setSortState((prev) => {
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
        <div
            className="w-full max-w-5xl mx-auto"
            data-testid="workouts-list-container"
        >
            {/* Horizontal scroll table container */}
            <div
                className="overflow-x-auto rounded-lg shadow"
                data-testid="workouts-list-table-wrapper"
            >
                <table
                    className="w-full border-collapse"
                    data-testid="workouts-list-table"
                >
                    <thead data-testid="workouts-list-table-head">
                        <tr
                            className="bg-gray-200"
                            data-testid="workouts-list-header-row"
                        >
                            <th
                                data-testid="sort-title"
                                className="px-4 py-3 text-left font-semibold text-gray-700 cursor-pointer select-none"
                                onClick={() => handleSort("title")}
                            >
                                <div className="flex items-center gap-1">
                                    <span data-testid="sort-title-label">Title</span>
                                    {sortState.key === "title" && (
                                        <span data-testid="sort-title-direction">
                                            {sortState.direction === "asc" ? "▲" : "▼"}
                                        </span>
                                    )}
                                </div>
                            </th>

                            <th
                                data-testid="sort-type"
                                className="px-4 py-3 text-left font-semibold text-gray-700 cursor-pointer select-none"
                                onClick={() => handleSort("type")}
                            >
                                <div className="flex items-center gap-1">
                                    <span data-testid="sort-type-label">Type</span>
                                    {sortState.key === "type" && (
                                        <span data-testid="sort-type-direction">
                                            {sortState.direction === "asc" ? "▲" : "▼"}
                                        </span>
                                    )}
                                </div>
                            </th>

                            <th
                                data-testid="sort-total-duration"
                                className="px-4 py-3 text-left font-semibold text-gray-700 cursor-pointer select-none"
                                onClick={() => handleSort("totalDuration")}
                            >
                                <div className="flex items-center gap-1">
                                    <span data-testid="sort-total-duration-label">
                                        Total Duration
                                    </span>
                                    {sortState.key === "totalDuration" && (
                                        <span data-testid="sort-total-duration-direction">
                                            {sortState.direction === "asc" ? "▲" : "▼"}
                                        </span>
                                    )}
                                </div>
                            </th>

                            <th
                                data-testid="sort-total-calories"
                                className="px-4 py-3 text-left font-semibold text-gray-700 cursor-pointer select-none"
                                onClick={() => handleSort("totalCalories")}
                            >
                                <div className="flex items-center gap-1">
                                    <span data-testid="sort-total-calories-label">
                                        Total Calories
                                    </span>
                                    {sortState.key === "totalCalories" && (
                                        <span data-testid="sort-total-calories-direction">
                                            {sortState.direction === "asc" ? "▲" : "▼"}
                                        </span>
                                    )}
                                </div>
                            </th>

                            <th
                                className="px-4 py-3 text-center font-semibold text-gray-700"
                                data-testid="workouts-list-actions-header"
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody data-testid="workouts-list-table-body">
                        {WorkoutsData.length === 0 ? (
                            <tr data-testid="workouts-list-empty-row">
                                <td
                                    colSpan="5"
                                    className="px-4 py-16 text-center"
                                    data-testid="workouts-list-empty-state"
                                >
                                    <div className="flex flex-col items-center justify-center text-gray-500">
                                        <p
                                            className="text-lg font-medium"
                                            data-testid="workouts-list-empty-title"
                                        >
                                            No workouts yet
                                        </p>
                                        <p
                                            className="text-sm mt-2"
                                            data-testid="workouts-list-empty-description"
                                        >
                                            Start logging workouts to build your history.
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            paginationWorkouts.map((w, index) => (
                                <tr
                                    key={w._id}
                                    className="border-b hover:bg-gray-50"
                                    data-testid={`workout-row-${index}`}
                                >
                                    <td
                                        className="px-4 py-3 font-medium"
                                        data-testid="workout-title"
                                    >
                                        {w.title}
                                    </td>
                                    <td
                                        className="px-4 py-3 text-gray-600"
                                        data-testid="workout-type"
                                    >
                                        {w.type}
                                    </td>
                                    <td
                                        className="px-4 py-3 text-gray-500"
                                        data-testid="workout-total-duration"
                                    >
                                        {w.totalDuration} min
                                    </td>
                                    <td
                                        className="px-4 py-3 text-gray-500"
                                        data-testid="workout-total-calories"
                                    >
                                        {w.totalCalories} kcal
                                    </td>
                                    <td
                                        className="px-4 py-3"
                                        data-testid="workout-actions"
                                    >
                                        <div className="flex justify-center gap-2">
                                            <button
                                                data-testid="view-workout"
                                                className="text-gray-500 hover:text-blue-600 transition-all"
                                                onClick={() => onView(w)}
                                            >
                                                View
                                            </button>
                                            <button
                                                data-testid="edit-workout"
                                                className="px-2 py-1 border border-gray-300 rounded text-gray-600 hover:border-orange-500 hover:text-orange-600 transition-all"
                                                onClick={() => onEdit(w)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                data-testid="delete-workout"
                                                className="px-2 py-1 border border-red-400 rounded text-red-500 hover:bg-red-500 hover:text-white transition-all"
                                                onClick={() => onDelete(w._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination controls */}
            <div
                className="flex justify-center mt-6 gap-2"
                data-testid="workouts-pagination"
            >
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        data-testid={`workouts-page-${page}`}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 rounded ${
                            curretPage === page
                                ? "bg-red-500 text-white"
                                : "bg-gray-500 text-white"
                        }`}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default WorkoutsList;