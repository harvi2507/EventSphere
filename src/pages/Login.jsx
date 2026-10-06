import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, UserCheck } from "lucide-react";

function Login({ onLogin }) {
  const navigate = useNavigate();

  // Simple state for login credentials & role selection (Student or Admin / Organizer)
  const [email, setEmail] = useState("student@nirmauni.ac.in");
  const [password, setPassword] = useState("password123");
  const [role, setRole] = useState("student");

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === "student") {
      setEmail("student@nirmauni.ac.in");
    } else {
      setEmail("admin@nirmauni.ac.in");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Call onLogin if passed from App
    if (onLogin) {
      onLogin(role);
    }

    // Role redirection
    if (role === "student") {
      navigate("/");
    } else {
      navigate("/admin");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-10 h-10 mx-auto bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-2">
            <UserCheck className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Sign in to EventSphere</h1>
          <p className="text-xs text-gray-500 mt-1">Select your role to access your portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email field */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@nirmauni.ac.in"
                className="w-full text-sm pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Password field */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full text-sm pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Role selector: exactly two options */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Select Role
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleRoleChange("student")}
                className={`py-2.5 text-xs font-medium rounded-lg border transition ${
                  role === "student"
                    ? "bg-indigo-50 border-indigo-500 text-indigo-700 font-semibold"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => handleRoleChange("admin")}
                className={`py-2.5 text-xs font-medium rounded-lg border transition ${
                  role === "admin"
                    ? "bg-indigo-50 border-indigo-500 text-indigo-700 font-semibold"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                Admin / Organizer
              </button>
            </div>
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg text-sm transition shadow-sm mt-2"
          >
            Login as {role === "student" ? "Student" : "Admin / Organizer"}
          </button>

          {/* Demo helper note */}
          <div className="bg-gray-50 border border-gray-200 p-3 rounded-lg text-[11px] text-gray-500 text-center">
            <strong>Demo Note:</strong> Choose Student or Admin / Organizer to test the dashboard.
          </div>

        </form>

      </div>
    </div>
  );
}

export default Login;
