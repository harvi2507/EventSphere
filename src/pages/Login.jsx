import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, UserCheck } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  // Simple state for login credentials & role selection
  const [email, setEmail] = useState("student@nirmauni.ac.in");
  const [password, setPassword] = useState("password123");
  const [role, setRole] = useState("student");

  const handleLogin = (e) => {
    e.preventDefault();

    // Frontend role redirection demonstration
    if (role === "student") {
      navigate("/student");
    } else if (role === "organizer") {
      navigate("/organizer");
    } else if (role === "admin") {
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
          <p className="text-xs text-gray-500 mt-1">Select your college portal role below</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          
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
                placeholder="••••••••"
                className="w-full text-sm pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Role selector */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Select Role
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "student", label: "Student" },
                { id: "organizer", label: "Organizer" },
                { id: "admin", label: "Admin" }
              ].map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setRole(item.id)}
                  className={`py-2 text-xs font-medium rounded-lg border transition ${
                    role === item.id
                      ? "bg-indigo-50 border-indigo-500 text-indigo-700 font-semibold"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg text-sm transition shadow-sm mt-2"
          >
            Login as {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>

          {/* Demo helper note */}
          <div className="bg-gray-50 border border-gray-200 p-3 rounded-lg text-[11px] text-gray-500 text-center">
            💡 <strong>Demo Presentation:</strong> Choose any role above to test that specific dashboard.
          </div>

        </form>

      </div>
    </div>
  );
}

export default Login;
