import React, { useEffect, useState } from "react";
import axios from "axios";
const API = import.meta.env.VITE_API_URL
const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getToken = () => localStorage.getItem("adminToken");

  const fetchUsers = async () => {
    try {
      const token = getToken();
      const res = await axios.get(`${API}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <UsersSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-50">
        <div className="bg-white p-6 rounded-xl shadow-lg text-red-500 text-lg font-semibold">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200">

      <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-10 transition-all">

        <h1 className="text-3xl md:text-4xl font-extrabold text-purple-800 mb-10 text-center">
          👥 All Registered Users
        </h1>

        <div className="overflow-x-auto rounded-2xl shadow-lg">
          <table className="min-w-full bg-white rounded-2xl overflow-hidden">

            <thead className="bg-gradient-to-r from-purple-200 to-purple-300 text-purple-900">
              <tr>
                <th className="py-4 px-6 text-left">#</th>
                <th className="py-4 px-6 text-left">Name</th>
                <th className="py-4 px-6 text-left">Email</th>
                <th className="py-4 px-6 text-left">Quizzes</th>
                <th className="py-4 px-6 text-left">Score</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-purple-200">
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className="group hover:bg-purple-50 transition-all duration-300 hover:scale-[1.01]"
                >
                  <td className="py-4 px-6 font-medium text-purple-700">
                    {index + 1}
                  </td>

                  <td className="py-4 px-6 font-semibold flex items-center gap-3">
                    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-white font-bold shadow-md">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    {user.name}
                  </td>

                  <td className="py-4 px-6 text-purple-700">
                    {user.email}
                  </td>

                  <td className="py-4 px-6 text-center">
                    <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 font-semibold text-sm">
                      {user.totalQuizzes || 0}
                    </span>
                  </td>

                  <td className="py-4 px-6 text-center">
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold text-sm">
                      {user.totalScore || 0}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>

    </div>
  );
};

export default Users;

/* ================= Skeleton Loader ================= */

const UsersSkeleton = () => {
  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 animate-pulse">

      <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-10">

        {/* Title */}
        <div className="h-10 w-72 bg-purple-200 rounded-lg mx-auto mb-10"></div>

        {/* Table Skeleton */}
        <div className="overflow-hidden rounded-2xl shadow-lg">
          <div className="min-w-full bg-white">

            {/* Header Skeleton */}
            <div className="grid grid-cols-5 gap-4 bg-purple-200 p-4">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="h-4 bg-purple-300 rounded"></div>
              ))}
            </div>

            {/* Rows Skeleton */}
            <div className="divide-y divide-purple-200">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="grid grid-cols-5 gap-4 p-4">
                  <div className="h-4 bg-purple-200 rounded w-8"></div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-purple-300 rounded-full"></div>
                    <div className="h-4 bg-purple-200 rounded w-28"></div>
                  </div>

                  <div className="h-4 bg-purple-200 rounded w-48"></div>
                  <div className="h-4 bg-purple-200 rounded w-14 mx-auto"></div>
                  <div className="h-4 bg-purple-200 rounded w-14 mx-auto"></div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
