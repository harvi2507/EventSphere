import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import initialEvents from "../data/events";
import {
  QrCode,
  CheckCircle2
} from "lucide-react";

function AdminOrganizerDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromUrl = searchParams.get("tab") || "events";

  // Tab state: "events", "create", "participants", "attendance", "approvals"
  const [activeTab, setActiveTab] = useState(tabFromUrl);

  // Sync tab with URL search parameter
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setActiveTab(tab);
    } else {
      setActiveTab("events");
    }
  }, [searchParams]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  // State for all managed events
  const [eventsList, setEventsList] = useState([
    ...initialEvents,
    {
      id: 7,
      name: "Flutter App Bootcamp",
      category: "Technical",
      date: "15 Nov 2026",
      time: "10:00 AM",
      venue: "Lab 201, Computer Block",
      organizer: "Mobile Dev Club",
      seats: 60,
      registeredCount: 0,
      status: "Pending"
    }
  ]);

  // Create event form state
  const [formData, setFormData] = useState({
    name: "",
    category: "Technical",
    date: "",
    time: "",
    venue: "",
    capacity: "60"
  });
  const [createSuccess, setCreateSuccess] = useState(false);

  // Mock registered participants list
  const [participants, setParticipants] = useState([
    { id: 1, name: "Harvi Patel", roll: "23BCE1024", event: "AI/ML Workshop", date: "12 Oct", status: "Confirmed" },
    { id: 2, name: "Rahul Shah", roll: "23BCE1042", event: "AI/ML Workshop", date: "12 Oct", status: "Confirmed" },
    { id: 3, name: "Aditi Patel", roll: "23BCE1088", event: "Hackamined 2026", date: "18 Oct", status: "Confirmed" },
    { id: 4, name: "Meet Joshi", roll: "23BCE1015", event: "Hackamined 2026", date: "18 Oct", status: "Confirmed" },
    { id: 5, name: "Priya Sharma", roll: "23BCE1120", event: "Cultural Night", date: "24 Oct", status: "Confirmed" },
    { id: 6, name: "Aarav Desai", roll: "23BCE1055", event: "Agent Verse", date: "28 Oct", status: "Confirmed" }
  ]);

  // Attendance simulation state
  const [attendedCount, setAttendedCount] = useState(37);
  const [recentAttendees, setRecentAttendees] = useState([
    { name: "Rahul Shah", roll: "23BCE1042", time: "09:58 AM", status: "Present" },
    { name: "Aditi Patel", roll: "23BCE1088", time: "09:55 AM", status: "Present" },
    { name: "Meet Joshi", roll: "23BCE1015", time: "09:50 AM", status: "Present" }
  ]);
  const [scanMessage, setScanMessage] = useState("");

  // Handler for creating a new event
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
    if (!formData.name) return;

    const newEvent = {
      id: Date.now(),
      name: formData.name,
      category: formData.category,
      date: formData.date || "20 Nov 2026",
      time: formData.time || "10:00 AM",
      venue: formData.venue || "Seminar Hall",
      organizer: "Admin / CSI Nirma",
      seats: parseInt(formData.capacity) || 60,
      registeredCount: 0,
      status: "Approved"
    };

    setEventsList([newEvent, ...eventsList]);
    setCreateSuccess(true);
    setFormData({
      name: "",
      category: "Technical",
      date: "",
      time: "",
      venue: "",
      capacity: "60"
    });

    setTimeout(() => {
      setCreateSuccess(false);
    }, 4000);
  };

  // Handler to approve pending event
  const handleApprove = (id) => {
    setEventsList(
      eventsList.map((item) =>
        item.id === id ? { ...item, status: "Approved" } : item
      )
    );
  };

  // Handler to reject pending event
  const handleReject = (id) => {
    setEventsList(
      eventsList.map((item) =>
        item.id === id ? { ...item, status: "Rejected" } : item
      )
    );
  };

  // Simulates scanning a student's QR ticket
  const handleSimulateScan = () => {
    const isAlreadyPresent = recentAttendees.some((a) => a.name === "Harvi Patel");
    if (!isAlreadyPresent) {
      setAttendedCount((prev) => prev + 1);
      setRecentAttendees([
        { name: "Harvi Patel", roll: "23BCE1024", time: "Just now", status: "Present" },
        ...recentAttendees
      ]);
      setScanMessage("Ticket EVT1024 (Harvi Patel) verified and marked Present.");
    } else {
      setScanMessage("Ticket EVT1024 (Harvi Patel) is already marked Present.");
    }
  };

  // Metrics calculations
  const pendingEvents = eventsList.filter((e) => e.status === "Pending");
  const totalRegistrations = eventsList.reduce((acc, curr) => acc + (curr.registeredCount || 0), 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin / Organizer Dashboard</h1>
        <p className="text-sm text-gray-500">Event management, attendance scanning, and participant control</p>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div
          onClick={() => handleTabChange("events")}
          className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm cursor-pointer hover:border-indigo-300 transition"
        >
          <span className="text-xs font-semibold text-gray-500 uppercase">Total Events</span>
          <p className="text-2xl font-bold text-gray-900 mt-1">{eventsList.length}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <span className="text-xs font-semibold text-gray-500 uppercase">Total Users</span>
          <p className="text-2xl font-bold text-gray-900 mt-1">450+</p>
        </div>

        <div
          onClick={() => handleTabChange("participants")}
          className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm cursor-pointer hover:border-indigo-300 transition"
        >
          <span className="text-xs font-semibold text-gray-500 uppercase">Registrations</span>
          <p className="text-2xl font-bold text-indigo-600 mt-1">{totalRegistrations}</p>
        </div>

        <div
          onClick={() => handleTabChange("approvals")}
          className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm cursor-pointer hover:border-amber-400 transition"
        >
          <span className="text-xs font-semibold text-gray-500 uppercase">Pending Events</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">{pendingEvents.length}</p>
        </div>

      </div>

      {/* Main Full-Width Dashboard Content (No Left Sidebar) */}
      <div className="space-y-6">

        {/* TAB 1: MANAGE EVENTS */}
        {activeTab === "events" && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Manage Events</h2>
                <p className="text-xs text-gray-500">Overview of all active and proposed campus events</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleTabChange("approvals")}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium px-3.5 py-1.5 rounded-lg transition"
                >
                  Pending Approvals ({pendingEvents.length})
                </button>
                <button
                  onClick={() => handleTabChange("create")}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium px-3.5 py-1.5 rounded-lg transition"
                >
                  + Add Event
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-700 border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-xs text-gray-400 uppercase bg-gray-50/50">
                    <th className="py-2.5 px-3">Event Name</th>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Venue</th>
                    <th className="py-2.5 px-3">Seats</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {eventsList.map((evt) => (
                    <tr key={evt.id} className="hover:bg-gray-50">
                      <td className="py-3 px-3">
                        <strong className="text-gray-900 block">{evt.name}</strong>
                        <span className="text-xs text-gray-400">{evt.category}</span>
                      </td>
                      <td className="py-3 px-3 text-gray-600">{evt.date}</td>
                      <td className="py-3 px-3 text-gray-600">{evt.venue}</td>
                      <td className="py-3 px-3 font-mono text-xs">
                        {evt.registeredCount || 0}/{evt.seats}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`text-xs px-2 py-0.5 rounded font-medium ${
                            evt.status === "Approved" || evt.status === "Upcoming"
                              ? "bg-emerald-50 text-emerald-700"
                              : evt.status === "Rejected"
                              ? "bg-rose-50 text-rose-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {evt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: CREATE / ADD EVENT */}
        {activeTab === "create" && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Create / Add Event</h2>
            <p className="text-xs text-gray-500 mb-6">Fill in details to add a new event to the college schedule</p>

            {createSuccess && (
              <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-lg text-sm flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Event created successfully and added to the college schedule.</span>
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
                  placeholder="e.g. Flutter Mobile App Bootcamp"
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
                  placeholder="e.g. Seminar Hall B"
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

        {/* TAB 3: PARTICIPANTS */}
        {activeTab === "participants" && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-900">Registered Participants</h2>
              <p className="text-xs text-gray-500">View and manage students registered for college events</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-700 border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-xs text-gray-400 uppercase bg-gray-50/50">
                    <th className="py-2.5 px-3">Student Name</th>
                    <th className="py-2.5 px-3">Roll Number</th>
                    <th className="py-2.5 px-3">Registered Event</th>
                    <th className="py-2.5 px-3">Event Date</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {participants.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="py-3 px-3 font-semibold text-gray-900">{p.name}</td>
                      <td className="py-3 px-3 font-mono text-xs text-gray-600">{p.roll}</td>
                      <td className="py-3 px-3 text-indigo-600">{p.event}</td>
                      <td className="py-3 px-3 text-gray-600">{p.date}</td>
                      <td className="py-3 px-3">
                        <span className="text-xs px-2 py-0.5 rounded font-medium bg-emerald-50 text-emerald-700">
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: ATTENDANCE & QR SCANNER */}
        {activeTab === "attendance" && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Attendance and QR Verification</h2>
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
              <h3 className="text-sm font-bold text-gray-900 mb-3">Recent Attendance Records</h3>
              <div className="divide-y divide-gray-100 border border-gray-200 rounded-lg overflow-hidden">
                {recentAttendees.map((attendee, index) => (
                  <div
                    key={index}
                    className="p-3 bg-white flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span className="font-semibold text-gray-800">{attendee.name}</span>
                      <span className="text-gray-400 font-mono">({attendee.roll})</span>
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

        {/* TAB 5: APPROVE / REJECT EVENTS */}
        {activeTab === "approvals" && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Approve or Reject Events</h2>
                <p className="text-xs text-gray-500">Review event proposals submitted by student clubs</p>
              </div>
              <button
                onClick={() => handleTabChange("events")}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Back to All Events
              </button>
            </div>

            <div className="space-y-4">
              {eventsList
                .filter((e) => e.status === "Pending" || e.status === "Approved" || e.status === "Rejected")
                .map((event) => (
                  <div
                    key={event.id}
                    className="p-4 border border-gray-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900 text-sm">{event.name}</h3>
                        <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-semibold">
                          {event.category}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">
                        Organizer: <strong>{event.organizer}</strong> | Date: {event.date} | Venue: {event.venue}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {event.status === "Pending" ? (
                        <>
                          <button
                            onClick={() => handleApprove(event.id)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium px-3.5 py-1.5 rounded-lg transition shadow-sm"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(event.id)}
                            className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium px-3.5 py-1.5 rounded-lg transition shadow-sm"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span
                          className={`text-xs px-2.5 py-1 rounded font-medium ${
                            event.status === "Approved"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-rose-100 text-rose-800"
                          }`}
                        >
                          Status: {event.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default AdminOrganizerDashboard;
