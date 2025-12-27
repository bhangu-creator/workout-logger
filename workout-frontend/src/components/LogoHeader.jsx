// Importing the logo image used in the header
import logo from "../assets/logo.png";

// useNavigate is used for programmatic navigation on logo click
import { useNavigate } from "react-router-dom";

// LogoHeader renders the app logo and title
// Props:
// - mode: controls positioning and layout ("absolute" or inline layout)
function LogoHeader({ mode = "absolute" }) {

  // Hook to navigate between routes
  const navigate = useNavigate();

  return (
    // Wrapper div
    // - Positioning and layout change based on the mode prop
    // - Entire header is clickable and navigates to workouts page
    <div
      className={
        mode === "absolute"
          ? "absolute top-4 left-4 flex items-center gap-2 hover:cursor-pointer"
          : "w-full flex items-center px-6 py-4 gap-3 hover:cursor-pointer"
      }
      onClick={() => navigate("/workouts")}
    >
      {/* App logo image */}
      <img
        src={logo}
        alt="Workout Logger Logo"
        className="w-14 h-14 rounded-full object-cover hover:cursor-pointer"
      />

      {/* App name / branding */}
      <span className="text-red-600 font-bold text-2xl">
        Workout Logger
      </span>
    </div>
  );
}

export default LogoHeader;
