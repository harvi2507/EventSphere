import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";
import initialEvents from "../data/events";
import { ArrowRight, Search, Ticket, QrCode, CheckCircle2 } from "lucide-react";

function Home() {
  // Take first 3 events for upcoming section
  const upcomingEvents = initialEvents.slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      
      {/* Hero Section */}
      <section className="bg-white border border-gray-200 rounded-xl p-8 md:p-12 text-center shadow-sm">
        <span className="inline-block bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
          College Event Management Portal
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
          College Events, All in One Place
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto mb-6 text-base md:text-lg">
          Discover events, register easily and keep your event tickets in one place.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2.5 rounded-lg transition shadow-sm"
          >
            <span>Explore Events</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-medium px-5 py-2.5 rounded-lg border border-gray-300 transition"
          >
            Portal Login
          </Link>
        </div>
      </section>

      {/* Upcoming Events */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
            <p className="text-sm text-gray-500">Popular upcoming club and university activities</p>
          </div>
          <Link
            to="/events"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 text-center mb-2">How It Works</h2>
        <p className="text-sm text-gray-500 text-center mb-8">Simple 4-step event lifecycle for students</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-center">
            <div className="w-10 h-10 mx-auto bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold mb-3">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-gray-800 text-sm mb-1">1. Find an event</h3>
            <p className="text-xs text-gray-500">Browse technical, cultural, or sports events on campus.</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-center">
            <div className="w-10 h-10 mx-auto bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold mb-3">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-gray-800 text-sm mb-1">2. Register</h3>
            <p className="text-xs text-gray-500">Single-click registration with instant seat confirmation.</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-center">
            <div className="w-10 h-10 mx-auto bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold mb-3">
              <Ticket className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-gray-800 text-sm mb-1">3. Get your QR ticket</h3>
            <p className="text-xs text-gray-500">Receive a digital ticket pass with a verifiable QR code.</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-center">
            <div className="w-10 h-10 mx-auto bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold mb-3">
              <QrCode className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-gray-800 text-sm mb-1">4. Attend</h3>
            <p className="text-xs text-gray-500">Get scanned at the venue entrance and mark attendance.</p>
          </div>

        </div>
      </section>

      {/* Innovation Highlight Banner (Useful for faculty presentation) */}
      <section className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 text-sm">
        <h3 className="font-bold text-indigo-900 mb-2">💡 Project Innovation: The Modern Event Workflow</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-white p-3 rounded border border-indigo-100">
            <span className="font-semibold text-red-600">Traditional Campus Method:</span>
            <p className="text-gray-600 mt-1">WhatsApp broadcast ➔ Clunky Google Form ➔ Messy Excel spreadsheet ➔ Manual paper attendance ➔ Separate feedback link</p>
          </div>
          <div className="bg-white p-3 rounded border border-indigo-100">
            <span className="font-semibold text-green-700">With EventSphere:</span>
            <p className="text-gray-600 mt-1">Central discovery ➔ 1-click registration ➔ Automated QR ticket pass ➔ Instant gate attendance scan ➔ Seamless feedback</p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
