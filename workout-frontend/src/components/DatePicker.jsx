import { useState } from "react";

// DatePicker allows users to select a custom date range
// and sends the selected values back to the parent component
function DatePicker({ handleCustomDates }) {
    // Local state to track selected "from" and "to" dates
    const [selectedDates, setSelectedDates] = useState({
        from: "",
        to: ""
    });

    return (
        // Container for the date picker inputs
        <div
            className="flex flex-col sm:flex-row items-center gap-4 bg-white p-3 rounded-lg shadow-md border border-gray-300"
            data-testid="date-picker"
        >
            {/* From date input */}
            <div
                className="flex items-center gap-2 w-full sm:w-auto"
                data-testid="date-picker-from-field"
            >
                <label
                    className="text-gray-700 font-semibold text-sm"
                    htmlFor="date-picker-from-input"
                    data-testid="date-picker-from-label"
                >
                    From:
                </label>
                <input
                    id="date-picker-from-input"
                    data-testid="date-picker-from-input"
                    type="date"
                    value={selectedDates.from}
                    className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
                    // Prevent selecting future dates
                    max={new Date().toISOString().split("T")[0]}
                    onChange={(e) => {
                        const newDates = { ...selectedDates, from: e.target.value };
                        setSelectedDates(newDates);
                        handleCustomDates(newDates); // notify parent of change
                    }}
                />
            </div>

            {/* To date input */}
            <div
                className="flex items-center gap-2 w-full sm:w-auto"
                data-testid="date-picker-to-field"
            >
                <label
                    className="text-gray-700 font-semibold text-sm"
                    htmlFor="date-picker-to-input"
                    data-testid="date-picker-to-label"
                >
                    To:
                </label>
                <input
                    id="date-picker-to-input"
                    data-testid="date-picker-to-input"
                    type="date"
                    value={selectedDates.to}
                    className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
                    // Prevent selecting future dates
                    max={new Date().toISOString().split("T")[0]}
                    onChange={(e) => {
                        const newDates = { ...selectedDates, to: e.target.value };
                        setSelectedDates(newDates);
                        handleCustomDates(newDates); // notify parent of change
                    }}
                />
            </div>
        </div>
    );
}

export default DatePicker;