import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
const API = import.meta.env.VITE_API_URL
export default function Login() {
  console.log(API)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const res = await axios.post(`${API}/api/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setMessage("✅ Login successful! Redirecting...");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">

      <div className="bg-white/10 backdrop-blur-xl shadow-2xl 
        rounded-2xl p-8 w-full max-w-md border border-white/20">

        <h2 className="text-2xl font-bold text-center text-white mb-6 drop-shadow-lg">
          Welcome Back 💜
        </h2>

        {message && (
          <div className="bg-purple-600/20 text-purple-100 p-3 rounded mb-4 text-center font-medium">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-600/20 text-red-100 p-3 rounded mb-4 text-center font-medium">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            className="w-full border border-white/30 p-3 rounded-lg 
              bg-white/10 text-white placeholder-white/60
              focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full border border-white/30 p-3 rounded-lg 
              bg-white/10 text-white placeholder-white/60
              focus:outline-none focus:ring-2 focus:ring-purple-500"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            disabled={loading}
            onClick={login}
            className="w-full py-3 rounded-lg font-semibold text-white
              bg-gradient-to-r from-purple-500 to-pink-500
              hover:from-purple-600 hover:to-pink-600
              transition disabled:opacity-60 shadow-lg"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <p className="text-center text-sm mt-5 text-white/70">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-pink-400 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
