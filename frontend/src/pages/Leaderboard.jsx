"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
const API = import.meta.env.VITE_API_URL
const Leaderboard = () => {
  console.log(API)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await axios.get(`${API}/api/quiz/leaderboard`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        const sortedTop10 = res.data.sort((a, b) => b.score - a.score).slice(0, 10)
        setResults(sortedTop10)
      } catch (err) {
        console.error("Leaderboard error:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchLeaderboard()
  }, [])

  if (loading) return <SkeletonLeaderboard />

  const topThree = results.slice(0, 3)
  const others = results.slice(3)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-[50px]">
      <div className="container mx-auto px-4 py-6">

        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-5 border border-white/20 shadow-xl mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-center text-white">
            🏆 Top 10 Leaderboard
          </h1>
        </div>

        {/* Podium */}
        <div className="flex justify-center items-end gap-6 mb-10">
          {topThree[1] && <Podium rank={2} data={topThree[1]} height="h-28" />}
          {topThree[0] && <Podium rank={1} data={topThree[0]} height="h-36" crown />}
          {topThree[2] && <Podium rank={3} data={topThree[2]} height="h-24" />}
        </div>

        {/* List */}
        <div className="max-w-md mx-auto space-y-3">
          {others.map((item, index) => (
            <div
              key={item._id}
              className="flex justify-between items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 shadow-md hover:scale-[1.03] transition"
            >
              <div className="flex items-center gap-4">
                <span className="text-purple-300 font-bold">{index + 4}</span>

                <div className="w-10 h-10 rounded-full flex items-center justify-center 
                  bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold shadow-md">
                  {item.user.name.charAt(0).toUpperCase()}
                </div>

                <span className="text-white font-semibold">{item.user.name}</span>
              </div>

              <span className="text-pink-300 font-bold">🎯 {item.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Leaderboard

/* Podium */
const Podium = ({ rank, data, height, crown }) => {
  const medal = rank === 1 ? "🥇" : rank === 2 ? "🥈" : "🥉"
  const gradient =
    rank === 1
      ? "from-yellow-400 to-yellow-300"
      : rank === 2
      ? "from-gray-400 to-gray-300"
      : "from-orange-400 to-orange-300"

  return (
    <div className="flex flex-col items-center relative">
      {crown && <span className="absolute -top-7 text-3xl animate-bounce">{medal}</span>}

      <div className="w-16 h-16 rounded-full flex items-center justify-center
        bg-gradient-to-br from-purple-500 to-pink-500 text-white text-2xl font-bold shadow-md mb-2">
        {data.user.name.charAt(0).toUpperCase()}
      </div>

      <span className="text-white font-semibold">{data.user.name}</span>
      <span className="text-purple-200 text-sm mb-2">🎯 {data.score}</span>

      <div className={`w-24 ${height} bg-gradient-to-t ${gradient} 
        rounded-t-xl flex items-center justify-center text-xl font-bold text-white shadow-md`}>
        {rank}
      </div>
    </div>
  )
}

/* Skeleton */
const SkeletonLeaderboard = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6 space-y-5 animate-pulse">
    <div className="h-12 bg-white/10 rounded-xl w-60 mx-auto"></div>

    <div className="flex justify-center gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="w-24 h-28 bg-white/10 rounded-xl"></div>
      ))}
    </div>

    {Array.from({ length: 7 }).map((_, i) => (
      <div key={i} className="h-16 bg-white/10 rounded-xl"></div>
    ))}
  </div>
)
