//importing the logo image
import logo from "../assets/logo.png";

function LogoHeader({ mode = "absolute" }) {
  return (
    <div
      className={
        mode === "absolute"
          ? "absolute top-4 left-4 flex items-center gap-2"
          : "w-full flex items-center px-6 py-4 gap-3"
      }
    >
      <img
        src={logo}
        alt="Workout Logger Logo"
        className="w-14 h-14 rounded-full object-cover"
      />
      <span className="text-red-600 font-bold text-2xl">Workout Logger</span>
    </div>
  );
}

export default LogoHeader;
