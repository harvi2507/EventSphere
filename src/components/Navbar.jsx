import { Link, useLocation } from "react-router-dom";
import { Calendar, User } from "lucide-react";

function Navbar() {
  const location = useLocation();

  // Helper function to highlight active navigation link
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
          <Calendar className="w-6 h-6" />
          <span>EventSphere</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link
            to="/"
            className={isActive("/") ? "text-indigo-600 font-semibold" : "text-gray-600 hover:text-indigo-600"}
          >
            Home
          </Link>
          <Link
            to="/events"
            className={isActive("/events") ? "text-indigo-600 font-semibold" : "text-gray-600 hover:text-indigo-600"}
          >
            Events
          </Link>

          {/* Quick Dashboards for college presentation */}
          <Link
            to="/student"
            className={isActive("/student") ? "text-indigo-600 font-semibold" : "text-gray-600 hover:text-indigo-600"}
          >
            Student
          </Link>
          <Link
            to="/organizer"
            className={isActive("/organizer") ? "text-indigo-600 font-semibold" : "text-gray-600 hover:text-indigo-600"}
          >
            Organizer
          </Link>
          <Link
            to="/admin"
            className={isActive("/admin") ? "text-indigo-600 font-semibold" : "text-gray-600 hover:text-indigo-600"}
          >
            Admin
          </Link>

          {/* Login Button */}
          <Link
            to="/login"
            className="flex items-center gap-1.5 bg-indigo-600 text-white px-3.5 py-1.5 rounded-lg hover:bg-indigo-700 transition"
          >
            <User className="w-4 h-4" />
            <span>Login</span>
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
