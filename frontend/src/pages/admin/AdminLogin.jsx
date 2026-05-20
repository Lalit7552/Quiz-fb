import axios from "axios";
import { useState } from "react";
const API = import.meta.env.VITE_API_URL
export default function AdminLogin() {
  const [username, setU] = useState("");
  const [password, setP] = useState("");

  const login = async () => {
    console.log(API)
    try {
      const response = await axios.post(`${API}/api/admin/login`, { username, password });
      localStorage.setItem("adminToken", response.data.token);
      localStorage.setItem("admin", "true");
      window.location.href = "/admin/dashboard";
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="p-10 max-w-md mx-auto mt-20 bg-gradient-to-b from-purple-700 via-purple-500 to-purple-400 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">Admin Login</h2>

      <input
        className="border border-purple-300 rounded-md p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-purple-300"
        placeholder="Username"
        onChange={(e) => setU(e.target.value)}
      />

      <input
        className="border border-purple-300 rounded-md p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-purple-300"
        type="password"
        placeholder="Password"
        onChange={(e) => setP(e.target.value)}
      />

      <button
        className="bg-purple-900 hover:bg-purple-800 text-white w-full py-3 rounded-md font-semibold transition-colors duration-300"
        onClick={login}
      >
        Login
      </button>
    </div>
  );
}
