// StatsDrawer is a right-side sliding drawer used to navigate to stats pages
// Props:
// - isOpen: boolean that controls whether the drawer is visible
// - onclose: function to close the drawer (usually sets isOpen to false)
function StatsDrawer({ onclose, isOpen }) {
  const DRAWER_CLOSES_MS= 500;
  return (
    <>
      {/* 
        Backdrop overlay
        - Rendered only when the drawer is open
        - Covers the entire screen with a semi-transparent black layer
        - Clicking anywhere on it closes the drawer
      */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={onclose}
        ></div>
      )}

      {/*
        Drawer container
        - Fixed to the right side of the screen
        - Slides in and out using CSS transform
        - translate-x-0   → visible
        - translate-x-full → hidden (off-screen)
      */}
      <div
        className={`fixed top-0 right-0 h-screen w-80 bg-gray-300 border-l border-gray-300 shadow-lg shadow-xl bg-opacity-80 z-50 shadow-lg
          transform transition-transform duration-300 ease-out
           ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/*
          Drawer content
          - Vertically centered using margin-top
          - divide-y adds separators between menu items
        */}
        <div className="items-center mt-[200px] divide-y divide-gray-200">
          
          {/* Navigate to Workouts by Type page in a new tab */}
          <div
            className="bg-red-400 px-8 py-8 text-lg text-center cursor-pointer hover:bg-red-500 font-medium"
            onClick={() => {
              onclose(); // close the drawer after navigation
              setTimeout(()=>{window.open("/workoutsByType", "_blank");},DRAWER_CLOSES_MS)
            }}
          >
            View Workouts by Type
          </div>

          {/* Navigate to Workouts Trend page in a new tab */}
          <div
            className="bg-red-400 px-8 py-8 text-lg text-center cursor-pointer hover:bg-red-500 font-medium"
            onClick={() => {
              onclose(); // close the drawer after navigation
              setTimeout(()=>{window.open("/workoutsTrends", "_blank");},DRAWER_CLOSES_MS)
            }}
          >
            View Workouts Trend
          </div>

          {/* Navigate to Personal Records page in a new tab */}
          <div
            className="bg-red-400 px-8 py-8 text-lg text-center cursor-pointer hover:bg-red-500 font-medium"
            onClick={() => {
              onclose(); // close the drawer after navigation
              setTimeout(()=>{window.open("/workoutRecords", "_blank");},DRAWER_CLOSES_MS)
            }}
          >
            View Personal Records
          </div>
        </div>
      </div>
    </>
  );
}

// Exporting the drawer component for use in other parts of the app
export default StatsDrawer;
