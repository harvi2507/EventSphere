import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Ticket from "./pages/Ticket";
import StudentDashboard from "./pages/StudentDashboard";
import AdminOrganizerDashboard from "./pages/AdminOrganizerDashboard";
import Login from "./pages/Login";

function App() {
  // Simple role state: null (not logged in), "student", or "admin" (Admin / Organizer)
  const [role, setRole] = useState(() => {
    return localStorage.getItem("eventSphere_role") || null;
  });

  const handleLogin = (selectedRole) => {
    setRole(selectedRole);
    localStorage.setItem("eventSphere_role", selectedRole);
  };

  const handleLogout = () => {
    setRole(null);
    localStorage.removeItem("eventSphere_role");
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
        
        {/* Navigation Bar with active role */}
        <Navbar role={role} onLogout={handleLogout} />

        {/* Main Content Area */}
        <main className="flex-1">
          <Routes>
            {/* Public Home Page */}
            <Route path="/" element={<Home />} />

            {/* Login Route */}
            <Route path="/login" element={<Login onLogin={handleLogin} />} />

            {/* Events routes: Protected - must be logged in */}
            <Route
              path="/events"
              element={
                !role ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Events />
                )
              }
            />
            <Route
              path="/events/:id"
              element={
                !role ? (
                  <Navigate to="/login" replace />
                ) : (
                  <EventDetails role={role} />
                )
              }
            />

            {/* Student routes: Protected - Student only */}
            <Route
              path="/student"
              element={
                !role ? (
                  <Navigate to="/login" replace />
                ) : role === "admin" ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <StudentDashboard />
                )
              }
            />
            <Route
              path="/ticket"
              element={
                !role ? (
                  <Navigate to="/login" replace />
                ) : role === "admin" ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <Ticket />
                )
              }
            />

            {/* Admin / Organizer route: Protected - Admin only */}
            <Route
              path="/admin"
              element={
                !role ? (
                  <Navigate to="/login" replace />
                ) : role === "student" ? (
                  <Navigate to="/student" replace />
                ) : (
                  <AdminOrganizerDashboard />
                )
              }
            />

            {/* Clean redirection for /organizer to /admin */}
            <Route path="/organizer" element={<Navigate to="/admin" replace />} />
          </Routes>
        </main>

        {/* Minimal Footer */}
        <footer className="border-t border-gray-200 bg-white py-4 text-center text-xs text-gray-500">
          <p>EventSphere - College Event Management System</p>
        </footer>

      </div>
    </BrowserRouter>
  );
}

export default App;
