import { useState } from "react";

function DatePicker({handleCustomDates}) {
    
    const [selectedDates,setSelectedDates] =useState(
        {
            from : "",
            to : ""
        }
    ) 
    return (
        <div className="flex items-center gap-4 bg-white p-3 rounded-lg shadow-md border border-gray-300">
            <div className="flex items-center gap-2">
                <label className="text-gray-700 font-semibold text-sm">From:</label>
                <input 
                    type="date" 
                    value={selectedDates.from}
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                    max={new Date().toISOString().split("T")[0]}
                    onChange={(e)=>{ const newDates ={ ...selectedDates, from:e.target.value}
                                      setSelectedDates(newDates)
                                      handleCustomDates(newDates)}}
                />
            </div>
            
            <div className="flex items-center gap-2">
                <label className="text-gray-700 font-semibold text-sm">To:</label>
                <input 
                    type="date" 
                    value={selectedDates.to}
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                    max={new Date().toISOString().split("T")[0]}
                    onChange={(e)=>{ const newDates ={ ...selectedDates, to:e.target.value}
                                      setSelectedDates(newDates)
                                      handleCustomDates(newDates)}}
                />
            </div>
        </div>
    );
}

export default DatePicker;