import { Link, useLocation, useNavigate } from "react-router-dom";
import { Calendar, LogOut, User } from "lucide-react";

function Navbar({ role, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
    }
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
          <Calendar className="w-6 h-6" />
          <span>EventSphere</span>
          {role && (
            <span className="hidden sm:inline-block ml-2 text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 uppercase tracking-wider">
              {role === "student" ? "Student" : "Admin / Organizer"}
            </span>
          )}
        </Link>

        {/* Navigation Links based on role */}
        <div className="flex items-center gap-4 md:gap-6 text-sm font-medium">
          
          {/* STUDENT ROLE NAVIGATION */}
          {role === "student" && (
            <>
              <Link
                to="/"
                className={location.pathname === "/" ? "text-indigo-600 font-semibold" : "text-gray-600 hover:text-indigo-600"}
              >
                Home
              </Link>
              <Link
                to="/events"
                className={location.pathname === "/events" ? "text-indigo-600 font-semibold" : "text-gray-600 hover:text-indigo-600"}
              >
                Events
              </Link>
              <Link
                to="/student"
                className={location.pathname === "/student" ? "text-indigo-600 font-semibold" : "text-gray-600 hover:text-indigo-600"}
              >
                My Events
              </Link>
              <Link
                to="/ticket"
                className={location.pathname === "/ticket" ? "text-indigo-600 font-semibold" : "text-gray-600 hover:text-indigo-600"}
              >
                Ticket
              </Link>
              <button
                onClick={handleLogoutClick}
                className="flex items-center gap-1 text-gray-500 hover:text-rose-600 transition ml-2 text-xs font-semibold"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </>
          )}

          {/* ADMIN / ORGANIZER ROLE NAVIGATION */}
          {role === "admin" && (
            <>
              <Link
                to="/admin"
                className={location.pathname === "/admin" && !location.search ? "text-indigo-600 font-semibold" : "text-gray-600 hover:text-indigo-600"}
              >
                Dashboard
              </Link>
              <Link
                to="/events"
                className={location.pathname === "/events" ? "text-indigo-600 font-semibold" : "text-gray-600 hover:text-indigo-600"}
              >
                Events
              </Link>
              <Link
                to="/admin?tab=create"
                className={location.search.includes("tab=create") ? "text-indigo-600 font-semibold" : "text-gray-600 hover:text-indigo-600"}
              >
                Create Event
              </Link>
              <Link
                to="/admin?tab=participants"
                className={location.search.includes("tab=participants") ? "text-indigo-600 font-semibold" : "text-gray-600 hover:text-indigo-600"}
              >
                Participants
              </Link>
              <Link
                to="/admin?tab=attendance"
                className={location.search.includes("tab=attendance") ? "text-indigo-600 font-semibold" : "text-gray-600 hover:text-indigo-600"}
              >
                Attendance
              </Link>
              <button
                onClick={handleLogoutClick}
                className="flex items-center gap-1 text-gray-500 hover:text-rose-600 transition ml-2 text-xs font-semibold"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </>
          )}

          {/* GUEST (NOT LOGGED IN) */}
          {!role && (
            <>
              <Link
                to="/"
                className={location.pathname === "/" ? "text-indigo-600 font-semibold" : "text-gray-600 hover:text-indigo-600"}
              >
                Home
              </Link>
              <Link
                to="/events"
                className={location.pathname === "/events" ? "text-indigo-600 font-semibold" : "text-gray-600 hover:text-indigo-600"}
              >
                Events
              </Link>
              <Link
                to="/login"
                className="flex items-center gap-1.5 bg-indigo-600 text-white px-3.5 py-1.5 rounded-lg hover:bg-indigo-700 transition"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;
