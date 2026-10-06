import { useLocation, Link } from "react-router-dom";
import { Calendar, MapPin, Clock, ArrowLeft, Printer } from "lucide-react";

function Ticket() {
  const location = useLocation();

  // Pick event from navigation state or default to AI/ML Workshop
  const event = location.state?.event || {
    name: "AI/ML Workshop",
    date: "12 Oct 2026",
    time: "10:00 AM",
    venue: "Seminar Hall",
    organizer: "CSI Nirma"
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      {/* Top action links */}
      <div className="flex items-center justify-between mb-4">
        <Link
          to="/student"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-indigo-600"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Student Dashboard</span>
        </Link>
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-2.5 py-1.5 rounded"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Ticket</span>
        </button>
      </div>

      {/* Ticket Card Container */}
      <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl overflow-hidden shadow-sm">
        
        {/* Ticket Header */}
        <div className="bg-indigo-600 text-white p-5 text-center">
          <p className="text-xs uppercase tracking-widest text-indigo-200 font-semibold mb-1">
            EventSphere Digital Pass
          </p>
          <h1 className="text-xl font-bold">{event.name}</h1>
          <p className="text-xs text-indigo-100 mt-1">Organized by {event.organizer || "CSI Nirma"}</p>
        </div>

        {/* Ticket Body */}
        <div className="p-6 space-y-4 text-sm text-gray-700">
          
          {/* Student Info */}
          <div className="flex justify-between border-b border-gray-100 pb-3">
            <div>
              <span className="text-xs text-gray-400 block">Student Name</span>
              <strong className="text-gray-900">Harvi Patel</strong>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-400 block">Registration ID</span>
              <strong className="text-indigo-600 font-mono">EVT1024</strong>
            </div>
          </div>

          {/* Event Details Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-start gap-2">
              <Calendar className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-gray-400 block">Date</span>
                <span className="font-semibold text-gray-800">{event.date}</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-gray-400 block">Time</span>
                <span className="font-semibold text-gray-800">{event.time}</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2 text-xs border-b border-gray-100 pb-3">
            <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-gray-400 block">Venue</span>
              <span className="font-semibold text-gray-800">{event.venue}</span>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="text-center pt-2">
            <div className="inline-block p-3 bg-white border border-gray-200 rounded-lg shadow-inner">
              {/* Clean SVG visual QR code pattern */}
              <svg
                className="w-36 h-36 mx-auto text-gray-900"
                viewBox="0 0 100 100"
                fill="currentColor"
              >
                {/* Outer corner 1 */}
                <rect x="5" y="5" width="26" height="26" rx="3" fill="none" stroke="currentColor" strokeWidth="5" />
                <rect x="12" y="12" width="12" height="12" rx="1" />
                {/* Outer corner 2 */}
                <rect x="69" y="5" width="26" height="26" rx="3" fill="none" stroke="currentColor" strokeWidth="5" />
                <rect x="76" y="12" width="12" height="12" rx="1" />
                {/* Outer corner 3 */}
                <rect x="5" y="69" width="26" height="26" rx="3" fill="none" stroke="currentColor" strokeWidth="5" />
                <rect x="12" y="76" width="12" height="12" rx="1" />
                
                {/* Inner simulated data matrix blocks */}
                <rect x="36" y="8" width="6" height="6" />
                <rect x="46" y="8" width="6" height="6" />
                <rect x="56" y="8" width="6" height="6" />
                <rect x="36" y="18" width="6" height="6" />
                <rect x="46" y="24" width="6" height="6" />
                <rect x="8" y="38" width="6" height="6" />
                <rect x="18" y="44" width="6" height="6" />
                <rect x="28" y="38" width="6" height="6" />
                <rect x="38" y="38" width="10" height="10" />
                <rect x="52" y="38" width="8" height="8" />
                <rect x="64" y="44" width="6" height="6" />
                <rect x="76" y="38" width="6" height="6" />
                <rect x="86" y="44" width="6" height="6" />
                <rect x="38" y="54" width="6" height="6" />
                <rect x="48" y="54" width="8" height="8" />
                <rect x="60" y="54" width="6" height="6" />
                <rect x="38" y="68" width="6" height="6" />
                <rect x="48" y="74" width="6" height="6" />
                <rect x="64" y="68" width="8" height="8" />
                <rect x="78" y="68" width="6" height="6" />
                <rect x="78" y="80" width="8" height="8" />
                <rect x="52" y="84" width="6" height="6" />
              </svg>
            </div>
            
            <p className="text-xs text-gray-500 font-medium mt-3">
              Show this QR at the venue entrance.
            </p>
            <p className="text-[10px] text-gray-400 font-mono mt-0.5">
              Hash: 8f3a9e2-2026-Nirma
            </p>
          </div>

        </div>

        {/* Ticket Footer */}
        <div className="bg-gray-50 p-3 text-center border-t border-gray-100 text-[11px] text-gray-500">
          Non-transferable | Valid for student admission only
        </div>

      </div>
    </div>
  );
}

export default Ticket;
