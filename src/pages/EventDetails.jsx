import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import initialEvents from "../data/events";
import { Calendar, Clock, MapPin, Users, ArrowLeft, CheckCircle } from "lucide-react";

function EventDetails({ role }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Read role from prop or fallback to localStorage
  const currentRole = role || localStorage.getItem("eventSphere_role");

  // Simple state to track registration
  const [registered, setRegistered] = useState(false);

  // Find event by ID from url params
  const event = initialEvents.find((e) => e.id === parseInt(id)) || initialEvents[0];

  const handleRegister = () => {
    // If not logged in, redirect to login
    if (!currentRole) {
      navigate("/login");
      return;
    }

    // Only students can register
    if (currentRole !== "student") {
      return;
    }

    setRegistered(true);
  };

  const handleGoToTicket = () => {
    // Navigate to ticket page with selected event data
    navigate("/ticket", { state: { event } });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Back button */}
      <Link
        to="/events"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-indigo-600 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Events</span>
      </Link>

      <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
        
        {/* Category & Status */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold px-3 py-1 rounded bg-indigo-50 text-indigo-700">
            {event.category}
          </span>
          <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
            {event.seats - (event.registeredCount || 0)} seats remaining
          </span>
        </div>

        {/* Event Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          {event.name}
        </h1>

        {/* Quick Meta Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-4 my-4 border-y border-gray-100 text-sm text-gray-700">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-indigo-600" />
            <span><strong>Date:</strong> {event.date}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-indigo-600" />
            <span><strong>Time:</strong> {event.time}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-indigo-600" />
            <span><strong>Venue:</strong> {event.venue}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Users className="w-4 h-4 text-indigo-600" />
            <span><strong>Organizer:</strong> {event.organizer}</span>
          </div>
        </div>

        {/* Description */}
        <div className="my-6">
          <h2 className="text-base font-semibold text-gray-900 mb-2">About the Event</h2>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            {event.description}
          </p>
        </div>

        {/* Registration Section - ONLY visible and active for Students */}
        {currentRole === "student" && (
          <div className="pt-4 border-t border-gray-100">
            {!registered ? (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50 p-4 rounded-lg">
                <div>
                  <p className="text-sm font-semibold text-gray-800">Ready to participate?</p>
                  <p className="text-xs text-gray-500">Free entry for all registered university students.</p>
                </div>
                <button
                  onClick={handleRegister}
                  className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2.5 rounded-lg text-sm transition shadow-sm"
                >
                  Register
                </button>
              </div>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-5 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                  <div>
                    <h3 className="text-sm font-bold text-emerald-900">Registration Successful</h3>
                    <p className="text-xs text-emerald-700">You are registered for this event. Your seat is confirmed.</p>
                  </div>
                </div>
                <button
                  onClick={handleGoToTicket}
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2 rounded-lg text-sm transition"
                >
                  View Ticket
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default EventDetails;
