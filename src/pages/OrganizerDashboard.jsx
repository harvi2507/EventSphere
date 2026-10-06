import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { LayoutDashboard, PlusCircle, QrCode, CheckCircle2, Users, Calendar } from "lucide-react";

function OrganizerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // State for events managed by organizer
  const [eventsList, setEventsList] = useState([
    {
      id: 1,
      name: "AI/ML Workshop",
      date: "12 Oct 2026",
      registrations: "42/50",
      status: "Upcoming"
    },
    {
      id: 2,
      name: "Hackamined 2026",
      date: "18 Oct 2026",
      registrations: "88/100",
      status: "Upcoming"
    },
    {
      id: 3,
      name: "Cultural Night",
      date: "24 Oct 2026",
      registrations: "190/250",
      status: "Upcoming"
    }
  ]);

  // Create event form state
  const [formData, setFormData] = useState({
    name: "",
    category: "Technical",
    date: "",
    time: "",
    venue: "",
    capacity: ""
  });
  const [createSuccess, setCreateSuccess] = useState(false);

  // Attendance simulation state
  const [attendedCount, setAttendedCount] = useState(37);
  const [recentAttendees, setRecentAttendees] = useState([
    { name: "Rahul Shah", time: "09:58 AM", status: "Present" },
    { name: "Aditi Patel", time: "09:55 AM", status: "Present" },
    { name: "Meet Joshi", time: "09:50 AM", status: "Present" }
  ]);
  const [scanMessage, setScanMessage] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
    if (!formData.name) return;

    const newEvent = {
      id: Date.now(),
      name: formData.name,
      date: formData.date || "15 Nov 2026",
      registrations: `0/${formData.capacity || 50}`,
      status: "Pending Approval"
    };

    setEventsList([newEvent, ...eventsList]);
    setCreateSuccess(true);
    setFormData({
      name: "",
      category: "Technical",
      date: "",
      time: "",
      venue: "",
      capacity: ""
    });

    setTimeout(() => {
      setCreateSuccess(false);
    }, 4000);
  };

  // Simulates scanning a student's QR code
  const handleSimulateScan = () => {
    const isAlreadyPresent = recentAttendees.some((a) => a.name === "Harvi Patel");
    if (!isAlreadyPresent) {
      setAttendedCount((prev) => prev + 1);
      setRecentAttendees([
        { name: "Harvi Patel", time: "Just now", status: "Present" },
        ...recentAttendees
      ]);
      setScanMessage("Ticket EVT1024 (Harvi Patel) verified & marked Present!");
    } else {
      setScanMessage("Ticket EVT1024 is already marked Present!");
    }
  };

  const sidebarItems = [
    { id: "overview", label: "My Events", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "create", label: "Create Event", icon: <PlusCircle className="w-4 h-4" /> },
    { id: "attendance", label: "Attendance Scanner", icon: <QrCode className="w-4 h-4" /> }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Organizer Dashboard</h1>
        <p className="text-sm text-gray-500">CSI Nirma Student Chapter • Event Coordination</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Simple Sidebar */}
        <Sidebar
          title="Organizer Menu"
          items={sidebarItems}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Main Content Area */}
        <div className="flex-1 space-y-6">
          
          {/* 3 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <span className="text-xs font-semibold text-gray-500 uppercase">Total Events</span>
              <p className="text-2xl font-bold text-gray-900 mt-1">{eventsList.length}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <span className="text-xs font-semibold text-gray-500 uppercase">Registrations</span>
              <p className="text-2xl font-bold text-gray-900 mt-1">320</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <span className="text-xs font-semibold text-gray-500 uppercase">Attendees</span>
              <p className="text-2xl font-bold text-gray-900 mt-1">{attendedCount}</p>
            </div>
          </div>

          {/* TAB 1: OVERVIEW & MY EVENTS TABLE */}
          {activeTab === "overview" && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">My Events</h2>
                <button
                  onClick={() => setActiveTab("create")}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium px-3.5 py-1.5 rounded-lg transition"
                >
                  + Create Event
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-700 border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 text-xs text-gray-400 uppercase bg-gray-50/50">
                      <th className="py-2.5 px-3">Event Name</th>
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3">Registrations</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {eventsList.map((evt) => (
                      <tr key={evt.id} className="hover:bg-gray-50">
                        <td className="py-3 px-3 font-semibold text-gray-900">{evt.name}</td>
                        <td className="py-3 px-3 text-gray-600">{evt.date}</td>
                        <td className="py-3 px-3">
                          <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded">
                            {evt.registrations}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`text-xs px-2 py-0.5 rounded font-medium ${
                              evt.status === "Approved" || evt.status === "Upcoming"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {evt.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => setActiveTab("attendance")}
                            className="text-xs text-indigo-600 hover:text-indigo-800 font-medium underline"
                          >
                            Attendance
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: CREATE EVENT */}
          {activeTab === "create" && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-1">Create New Event</h2>
              <p className="text-xs text-gray-500 mb-6">Fill in basic details to publish a new college event</p>

              {createSuccess && (
                <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-lg text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Event created successfully! Sent for Admin approval.</span>
                </div>
              )}

              <form onSubmit={handleCreateEvent} className="space-y-4 max-w-xl">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Event Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Flutter Mobile App BootCamp"
                    className="w-full text-sm p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full text-sm p-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Technical">Technical</option>
                      <option value="Hackathon">Hackathon</option>
                      <option value="Cultural">Cultural</option>
                      <option value="Sports">Sports</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Capacity (Seats)</label>
                    <input
                      type="number"
                      name="capacity"
                      placeholder="e.g. 60"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      className="w-full text-sm p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Date</label>
                    <input
                      type="text"
                      name="date"
                      placeholder="e.g. 15 Nov 2026"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full text-sm p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Time</label>
                    <input
                      type="text"
                      name="time"
                      placeholder="e.g. 10:00 AM"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full text-sm p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Venue</label>
                  <input
                    type="text"
                    name="venue"
                    placeholder="e.g. Lab 201, Computer Block"
                    value={formData.venue}
                    onChange={handleInputChange}
                    className="w-full text-sm p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition"
                >
                  Create Event
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: ATTENDANCE & QR SCANNER */}
          {activeTab === "attendance" && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Event Attendance Management</h2>
                <p className="text-xs text-gray-500">Live attendance for: AI/ML Workshop</p>
              </div>

              {/* Attendance metrics */}
              <div className="flex gap-6 p-4 bg-gray-50 border border-gray-100 rounded-lg text-sm">
                <div>
                  <span className="text-xs text-gray-500 block">Total Registered</span>
                  <span className="text-lg font-bold text-gray-900">50</span>
                </div>
                <div className="border-r border-gray-200" />
                <div>
                  <span className="text-xs text-gray-500 block">Attended</span>
                  <span className="text-lg font-bold text-emerald-700">{attendedCount}</span>
                </div>
                <div className="border-r border-gray-200" />
                <div>
                  <span className="text-xs text-gray-500 block">Turnout Rate</span>
                  <span className="text-lg font-bold text-indigo-700">
                    {Math.round((attendedCount / 50) * 100)}%
                  </span>
                </div>
              </div>

              {/* QR Scanner Simulation Box */}
              <div className="border-2 border-dashed border-indigo-200 bg-indigo-50/40 rounded-xl p-6 text-center">
                <div className="w-12 h-12 mx-auto bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-3">
                  <QrCode className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">[ QR SCANNER ]</h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto mb-4">
                  Camera ready. Scan student's ticket QR code at the seminar hall gate to register attendance.
                </p>

                <button
                  onClick={handleSimulateScan}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition shadow-sm"
                >
                  Simulate QR Scan (EVT1024 - Harvi Patel)
                </button>

                {scanMessage && (
                  <p className="mt-3 text-xs font-medium text-emerald-700 bg-emerald-50 py-1.5 px-3 rounded-lg inline-block border border-emerald-200">
                    {scanMessage}
                  </p>
                )}
              </div>

              {/* Recent Attendance List */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3">Recent Attendance</h3>
                <div className="divide-y divide-gray-100 border border-gray-200 rounded-lg overflow-hidden">
                  {recentAttendees.map((attendee, index) => (
                    <div
                      key={index}
                      className="p-3 bg-white flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span className="font-semibold text-gray-800">{attendee.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-400">{attendee.time}</span>
                        <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">
                          {attendee.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default OrganizerDashboard;
