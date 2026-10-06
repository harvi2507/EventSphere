import { useState } from "react";
import { Link } from "react-router-dom";
import { Ticket, Calendar, CheckCircle2, Star } from "lucide-react";

function StudentDashboard() {
  // Simple state for feedback demonstration
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(5);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  // Simple static list of student's registered events
  const registeredEvents = [
    {
      id: 1,
      name: "AI/ML Workshop",
      date: "12 Oct 2026",
      venue: "Seminar Hall",
      time: "10:00 AM",
      status: "Upcoming"
    },
    {
      id: 2,
      name: "Hackamined 2026",
      date: "18 Oct 2026",
      venue: "Main Auditorium",
      time: "9:00 AM",
      status: "Upcoming"
    },
    {
      id: 6,
      name: "Web Development Bootcamp",
      date: "25 Sep 2026",
      venue: "Seminar Hall B",
      time: "11:00 AM",
      status: "Attended"
    }
  ];

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    setFeedbackSubmitted(true);
    setShowFeedbackModal(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome, Harvi Patel (Roll: 23BCE1024)</p>
        </div>
        <Link
          to="/events"
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition self-start"
        >
          Browse More Events
        </Link>
      </div>

      {/* 3 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase">Registered Events</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">3</p>
          </div>
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg">
            <Ticket className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase">Upcoming</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">2</p>
          </div>
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase">Attended</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">1</p>
          </div>
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* My Events Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">My Events</h2>
        
        <div className="space-y-4">
          {registeredEvents.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-gray-100 rounded-lg bg-gray-50/50 hover:bg-gray-50 transition"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-800 text-base">{item.name}</h3>
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                      item.status === "Attended"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-indigo-100 text-indigo-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  {item.date} • {item.venue}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {item.status === "Upcoming" ? (
                  <Link
                    to="/ticket"
                    state={{ event: item }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium px-4 py-2 rounded-lg transition"
                  >
                    View Ticket
                  </Link>
                ) : (
                  <div>
                    {!feedbackSubmitted ? (
                      <button
                        onClick={() => setShowFeedbackModal(true)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium px-4 py-2 rounded-lg transition"
                      >
                        Give Feedback
                      </button>
                    ) : (
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                        Feedback Recorded (5★)
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simple Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-lg border border-gray-200">
            <h3 className="text-base font-bold text-gray-900 mb-2">Event Feedback</h3>
            <p className="text-xs text-gray-500 mb-4">Web Development Bootcamp</p>

            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setRating(num)}
                      className={`p-1.5 rounded ${rating >= num ? "text-amber-500" : "text-gray-300"}`}
                    >
                      <Star className="w-5 h-5 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Your Comments</label>
                <textarea
                  rows="3"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="The workshop was very hands-on and informative..."
                  className="w-full text-xs p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowFeedbackModal(false)}
                  className="px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg"
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default StudentDashboard;
