import React, { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
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

      // ✅ SAFE stats
      const statsData = statsRes?.data?.data || statsRes?.data || {};

      // ✅ SAFE leaderboard (handles all cases)
      const rawLeaderboard =
        Array.isArray(leaderboardRes?.data)
          ? leaderboardRes.data
          : leaderboardRes?.data?.data || [];

      const safeLeaderboard = rawLeaderboard
        .filter(item => item && item?.user?.name)
        .sort((a, b) => (b?.score || 0) - (a?.score || 0))
        .slice(0, 10);

      setStats(statsData);
      setLeaderboard(safeLeaderboard);
    } catch (err) {
      console.error("Dashboard Error:", err);
      setStats({});
      setLeaderboard([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("API URL:", API); // 🔍 debug
    fetchDashboardData();
  }, []);

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="min-h-screen bg-purple-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <Card title="Quizzes" value={stats?.totalQuizzes || 0} />
        <Card title="Users" value={stats?.totalUsers || 0} />
        <Card title="Questions" value={stats?.totalQuestions || 0} />
        <Card title="Winners" value={stats?.totalWinners || 0} />
      </div>

      {/* Leaderboard */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">🏆 Leaderboard</h2>

        {!Array.isArray(leaderboard) || leaderboard.length === 0 ? (
          <p>No data</p>
        ) : (
          leaderboard.map((item, i) => {
            const name = item?.user?.name || "Unknown";
            const first = name.charAt(0).toUpperCase();

            return (
              <div
                key={item?._id || i}
                className="flex justify-between p-3 border-b"
              >
                <div className="flex gap-3 items-center">
                  <span>{i + 1}</span>

                  <div className="w-8 h-8 bg-purple-500 text-white flex items-center justify-center rounded-full">
                    {first}
                  </div>

                  <span>{name}</span>
                </div>

                <span>{item?.score || 0}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

/* Card */
const Card = ({ title, value }) => (
  <div className="bg-white p-4 rounded shadow text-center">
    <h2 className="text-xl font-bold">{value}</h2>
    <p>{title}</p>
  </div>
);

/* Loader */
const DashboardSkeleton = () => (
  <div className="p-10">Loading...</div>
);
