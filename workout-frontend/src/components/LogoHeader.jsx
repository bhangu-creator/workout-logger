//importing the logo image
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

function LogoHeader({ mode = "absolute" }) {
  const navigate = useNavigate();
  return (
    <div
      className={
        mode === "absolute"
          ? "absolute top-4 left-4 flex items-center gap-2 hover:cursor-pointer"
          : "w-full flex items-center px-6 py-4 gap-3 hover:cursor-pointer"
      }
      onClick={()=>navigate("/workouts")}
    >
      <img
        src={logo}
        alt="Workout Logger Logo"
        className="w-14 h-14 rounded-full object-cover hover:cursor-pointer"
      />
      <span className="text-red-600 font-bold text-2xl">Workout Logger</span>
    </div>
  );
}

export default LogoHeader;
