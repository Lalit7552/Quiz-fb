"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
const API = import.meta.env.VITE_API_URL
const Profile = () => {
  console.log(API)
  const [user, setUser] = useState(null)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token")
      const userData = JSON.parse(localStorage.getItem("user"))

      const res = await axios.get(`${API}/api/quiz/results`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      setUser(userData)
      setResults(res.data)
      setLoading(false)
    } catch (err) {
      setError("Failed to load profile")
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  if (loading) return <ProfileSkeleton />
  if (error) return <ErrorMessage message={error} />

  const totalAttempts = results.length
  const bestScore = results.length ? Math.max(...results.map((r) => r.score)) : 0
  const avgScore = results.length
    ? (results.reduce((a, b) => a + b.score, 0) / results.length).toFixed(1)
    : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-[70px]">
      <div className="container mx-auto px-4 py-6 space-y-5">

        {/* Profile Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-5 border border-white/20 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-3">👤 My Profile</h2>

          <div className="grid sm:grid-cols-3 gap-4 text-white/90">
            <ProfileItem label="Name" value={user?.name} />
            <ProfileItem label="Email" value={user?.email} />
            <ProfileItem label="Role" value={user?.role} />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard title="Total Attempts" value={totalAttempts} icon="📝" />
          <StatCard title="Best Score" value={bestScore} icon="🏆" />
          <StatCard title="Average Score" value={avgScore} icon="🎯" />
        </div>

        {/* History */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-5 border border-white/20 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-3">🕒 Quiz History</h2>

          {results.length === 0 ? (
            <p className="text-white/70 text-center">No quiz attempts yet.</p>
          ) : (
            <div className="space-y-3">
              {results.map((r, i) => (
                <div
                  key={r._id}
                  className="flex justify-between items-center bg-white/5 border border-white/10 rounded-lg p-4 hover:scale-[1.02] transition"
                >
                  <span className="text-white font-medium">
                    Attempt #{i + 1}
                  </span>
                  <span className="text-pink-400 font-bold text-lg">
                    {r.score}/10
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

/* Components */

const ProfileItem = ({ label, value }) => (
  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
    <div className="text-xs text-white/60">{label}</div>
    <div className="text-white font-semibold">{value}</div>
  </div>
)

const StatCard = ({ title, value, icon }) => (
  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg border border-purple-400/30 rounded-xl p-4 shadow-lg text-center hover:scale-105 transition">
    <div className="text-white text-sm mb-1">{title}</div>
    <div className="text-3xl font-bold text-pink-300 flex justify-center gap-2">
      {icon} {value}
    </div>
  </div>
)

/* Skeleton */
const ProfileSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6 space-y-5 animate-pulse">
    <div className="h-28 bg-white/10 rounded-xl"></div>
    <div className="grid sm:grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="h-24 bg-white/10 rounded-xl"></div>
      ))}
    </div>
    <div className="h-60 bg-white/10 rounded-xl"></div>
  </div>
)

/* Error */
const ErrorMessage = ({ message }) => (
  <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 
    text-xl font-bold text-white">
    {message}
  </div>
)

export default Profile
