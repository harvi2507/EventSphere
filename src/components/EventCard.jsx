import { Link } from "react-router-dom";
import { Calendar, MapPin, Users } from "lucide-react";

function EventCard({ event }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between">
      <div>
        {/* Category Badge & Seats */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-indigo-50 text-indigo-700">
            {event.category}
          </span>
          <span className="text-xs text-gray-500">
            {event.seats - (event.registeredCount || 0)} seats left
          </span>
        </div>

        {/* Event Name */}
        <h3 className="text-lg font-bold text-gray-800 mb-2">{event.name}</h3>

        {/* Event Details */}
        <div className="space-y-1.5 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>{event.date} • {event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span>{event.venue}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-400" />
            <span>Organized by: {event.organizer}</span>
          </div>
        </div>
      </div>

      {/* View Details Button */}
      <Link
        to={`/events/${event.id}`}
        className="block text-center w-full bg-gray-50 hover:bg-indigo-50 text-indigo-600 hover:text-indigo-700 font-medium py-2 rounded-lg border border-indigo-200 text-sm transition"
      >
        View Details
      </Link>
    </div>
  );
}

export default EventCard;
