//importing the logo image
import logo from "../assets/logo.png";

function LogoHeader()
{
    return(
    <div className="absolute top-4 left-4 flex items-center gap-2">
        <img src={logo} alt="Workout Logger Logo" className="w-14 h-14 rounded-full object-cover" />
        <span className="text-red-600 font-bold text-2xl">Workout Logger</span>
    </div>
    )
}

export default LogoHeader;