import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { CheckSquare, ShieldCheck, ListFilter, Users, Calendar } from "lucide-react";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("pending");

  // State for pending events submitted by clubs
  const [pendingList, setPendingList] = useState([
    {
      id: 101,
      name: "Hackamined 2026",
      organizer: "CSI Nirma",
      category: "Hackathon",
      date: "18 Oct 2026",
      venue: "Main Auditorium",
      status: "Pending"
    },
    {
      id: 102,
      name: "Agent Verse AI Summit",
      organizer: "IEEE Student Branch",
      category: "Technical",
      date: "28 Oct 2026",
      venue: "Lab 304, Tech Building",
      status: "Pending"
    },
    {
      id: 103,
      name: "Annual College Drama Fest",
      organizer: "Cultural Club",
      category: "Cultural",
      date: "02 Nov 2026",
      venue: "Open Air Theatre",
      status: "Pending"
    }
  ]);

  // Handler to approve event using simple useState
  const handleApprove = (id) => {
    setPendingList(
      pendingList.map((item) =>
        item.id === id ? { ...item, status: "Approved" } : item
      )
    );
  };

  // Handler to reject event
  const handleReject = (id) => {
    setPendingList(
      pendingList.map((item) =>
        item.id === id ? { ...item, status: "Rejected" } : item
      )
    );
  };

  const pendingCount = pendingList.filter((e) => e.status === "Pending").length;

  const sidebarItems = [
    { id: "pending", label: "Pending Approvals", icon: <CheckSquare className="w-4 h-4" /> },
    { id: "all", label: "All Campus Events", icon: <ListFilter className="w-4 h-4" /> }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-sm text-gray-500">Student Affairs & Faculty Event Approval Portal</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Simple Sidebar */}
        <Sidebar
          title="Admin Menu"
          items={sidebarItems}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Main Content Area */}
        <div className="flex-1 space-y-6">
          
          {/* 3 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <span className="text-xs font-semibold text-gray-500 uppercase">Users</span>
              <p className="text-2xl font-bold text-gray-900 mt-1">450+</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <span className="text-xs font-semibold text-gray-500 uppercase">Total Events</span>
              <p className="text-2xl font-bold text-gray-900 mt-1">14</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <span className="text-xs font-semibold text-gray-500 uppercase">Pending Events</span>
              <p className="text-2xl font-bold text-amber-600 mt-1">{pendingCount}</p>
            </div>
          </div>

          {/* TAB 1: PENDING EVENTS */}
          {activeTab === "pending" && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="mb-4">
                <h2 className="text-lg font-bold text-gray-900">Pending Events for Approval</h2>
                <p className="text-xs text-gray-500">Review events submitted by student clubs and faculty advisors</p>
              </div>

              <div className="space-y-4">
                {pendingList.map((event) => (
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
                        Organizer: <strong>{event.organizer}</strong> • Date: {event.date} • Venue: {event.venue}
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

          {/* TAB 2: ALL CAMPUS EVENTS */}
          {activeTab === "all" && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Approved Campus Events</h2>
              <div className="text-xs text-gray-600 divide-y divide-gray-100 border border-gray-100 rounded-lg">
                <div className="p-3 flex justify-between items-center bg-gray-50/50">
                  <span className="font-semibold text-gray-900">AI/ML Workshop</span>
                  <span className="text-emerald-700 font-medium">Approved by Dean Student Affairs</span>
                </div>
                <div className="p-3 flex justify-between items-center">
                  <span className="font-semibold text-gray-900">Inter-College Sports Meet</span>
                  <span className="text-emerald-700 font-medium">Approved by Sports Committee</span>
                </div>
                <div className="p-3 flex justify-between items-center bg-gray-50/50">
                  <span className="font-semibold text-gray-900">Web Development Bootcamp</span>
                  <span className="text-emerald-700 font-medium">Approved by HOD Computer Engg.</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
