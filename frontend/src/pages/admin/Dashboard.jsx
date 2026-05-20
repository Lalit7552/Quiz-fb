import React, { useEffect, useState } from "react";
import axios from "axios";
const API = import.meta.env.VITE_API_URL
const AdminDashboard = () => {
  console.log(API)
  const [stats, setStats] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  const getToken = () => localStorage.getItem("adminToken");

  const fetchDashboardData = async () => {
    try {
      const token = getToken();

      const [statsRes, leaderboardRes] = await Promise.all([
        axios.get(`${API}/api/admin/dashboard/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${API}/api/quiz/leaderboard`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const top10 = leaderboardRes.data
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);

      setStats(statsRes.data);
      setLeaderboard(top10);
      setLoading(false);
    } catch (err) {
      console.error("Dashboard Error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 p-8">

      <h1 className="text-3xl font-extrabold text-purple-800 mb-10">
        Admin Dashboard
      </h1>

      {/* 📊 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <DashboardCard title="Total Quizzes" value={stats.totalQuizzes} />
        <DashboardCard title="Total Users" value={stats.totalUsers} />
        <DashboardCard title="Total Questions" value={stats.totalQuestions} />
        <DashboardCard title="Total Winners" value={stats.totalWinners} />
      </div>

      {/* 🏆 Leaderboard */}
      <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-3xl p-6 shadow-xl text-purple-900">

        <h2 className="text-2xl font-bold text-center mb-8 tracking-wide">
          🏆 Top 10 Leaderboard
        </h2>

        <div className="max-w-xl mx-auto space-y-3">
          {leaderboard.map((item, index) => {
            const rank = index + 1;

            return (
              <div
                key={item._id}
                className={`flex justify-between items-center p-4 rounded-xl shadow-md transition
                  ${rank === 1 ? "bg-yellow-100 border-2 border-yellow-400" :
                    rank === 2 ? "bg-gray-100 border-2 border-gray-400" :
                    rank === 3 ? "bg-orange-100 border-2 border-orange-400" :
                    "bg-white/40 border border-white/30"
                  }`}
              >
                <div className="flex items-center gap-4">

                  {/* Rank */}
                  <span className="text-xl font-bold text-purple-700 w-10 text-center">
                    {rank === 1 && "👑"}
                    {rank === 2 && "🥈"}
                    {rank === 3 && "🥉"}
                    {rank > 3 && rank}
                  </span>

                  {/* Avatar */}
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold shadow-md
                    ${rank === 1 ? "bg-gradient-to-br from-yellow-400 to-yellow-600" :
                      rank === 2 ? "bg-gradient-to-br from-gray-400 to-gray-600" :
                      rank === 3 ? "bg-gradient-to-br from-orange-400 to-orange-600" :
                      "bg-gradient-to-br from-purple-400 to-purple-600"
                    }`}
                  >
                    {item.user.name.charAt(0).toUpperCase()}
                  </div>

                  {/* Name */}
                  <span className="font-semibold text-purple-900">
                    {item.user.name}
                  </span>
                </div>

                {/* Score */}
                <span className="font-bold text-purple-700">
                  🎯 {item.score}
                </span>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;

/* Stats Card */
const DashboardCard = ({ title, value }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    <h2 className="text-3xl font-bold text-purple-700">{value}</h2>
    <p className="text-purple-500 font-medium mt-2">{title}</p>
  </div>
);

/* Skeleton Loader */
const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 p-8 animate-pulse">

      {/* Title */}
      <div className="h-10 w-64 bg-purple-200 rounded-lg mb-10"></div>

      {/* Stat Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center"
          >
            <div className="h-8 w-20 bg-purple-200 rounded mb-3"></div>
            <div className="h-4 w-32 bg-purple-100 rounded"></div>
          </div>
        ))}
      </div>

      {/* Leaderboard Skeleton */}
      <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-3xl p-6 shadow-xl">

        <div className="h-8 w-52 bg-purple-200 rounded mx-auto mb-8"></div>

        <div className="max-w-xl mx-auto space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex justify-between items-center p-4 rounded-xl bg-white/60 shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-purple-300 rounded-full"></div>
                <div className="h-4 w-40 bg-purple-200 rounded"></div>
              </div>
              <div className="h-4 w-16 bg-purple-200 rounded"></div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
