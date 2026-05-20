
// "use client"

// import { useState, useEffect } from "react"
// import axios from "axios"
// import FlappyGame from "./FlappyGame"

// const Home = () => {
//   const [contacts, setContacts] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [showGame, setShowGame] = useState(false)

//   useEffect(() => {
//     fetchContacts()
//   }, [])

//   const fetchContacts = async () => {
//     try {
//       setLoading(true)
//       const response = await axios.get("https://backend.nextgenhost.fun/api/contacts/active")
//       setContacts(response.data.contacts)
//     } catch (error) {
//       console.error("Failed to fetch contacts:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleContactClick = (contact) => {
//     const { type, value } = contact

//     switch (type) {
//       case "whatsapp":
//         const whatsappNumber = value.replace(/[^\d]/g, "")
//         window.open(`https://wa.me/${whatsappNumber}`, "_blank")
//         break
//       case "phone":
//         window.open(`tel:${value}`, "_blank")
//         break
//       case "telegram":
//         if (value.includes("t.me") || value.includes("telegram")) {
//           window.open(value, "_blank")
//         } else if (value.startsWith("@")) {
//           window.open(`https://t.me/${value.substring(1)}`, "_blank")
//         } else {
//           window.open(`https://t.me/${value}`, "_blank")
//         }
//         break
//       case "instagram":
//         window.open(value.startsWith("http") ? value : `https://instagram.com/${value}`, "_blank")
//         break
//       case "facebook":
//         window.open(value.startsWith("http") ? value : `https://facebook.com/${value}`, "_blank")
//         break
//       default:
//         if (value.startsWith("http")) {
//           window.open(value, "_blank")
//         }
//     }
//   }

//   // Get specific contact types
//   const whatsappContact = contacts.find((c) => c.type === "whatsapp")
//   const phoneContact = contacts.find((c) => c.type === "phone")
//   const telegramContact = contacts.find((c) => c.type === "telegram")
//   const emailContact = contacts.find((c) => c.type === "email")
//   const socialContacts = contacts.filter((c) =>
//     ["instagram", "facebook", "twitter", "linkedin", "youtube"].includes(c.type),
//   )

//   // Check if we have any primary contacts
//   const hasPrimaryContacts = whatsappContact || phoneContact || telegramContact

//   if (showGame) {
//     return <FlappyGame onBack={() => setShowGame(false)} />
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
//       <div className="container mx-auto px-4 py-6 ">
//         {/* Header */}
//         <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 mb-4 border border-white/20">
//           <h1 className="text-white text-lg font-semibold mb-3">
//             Get exclusive access and personalized support through our official WhatsApp and Telegram channels.
//           </h1>
//         </div>

//         {/* Features */}
//         <div className="grid grid-cols-1 gap-3 mb-4">
//           <div className="bg-white/10 backdrop-blur-lg rounded-lg p-3 border border-white/20">
//             <div className="flex items-center gap-2">
//               <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
//                 <span className="text-white text-xs">⚡</span>
//               </div>
//               <div>
//                 <div className="text-white font-medium text-sm">24/7 Support</div>
//                 <div className="text-blue-200 text-xs">Always Online</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Play Game button */}
//         <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-xl p-4 mb-4 border border-purple-400/30">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="text-white font-semibold text-lg mb-1">Play Flappy Bird</h3>
//               <p className="text-purple-200 text-sm">Take a break and enjoy the game!</p>
//             </div>
//             <button
//               onClick={() => setShowGame(true)}
//               className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center gap-2"
//             >
//               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
//               </svg>
//               Play Game
//             </button>
//           </div>
//         </div>

//         {/* WhatsApp Contact */}
//         {loading ? (
//           <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 mb-4 border border-white/20">
//             <div className="flex items-center justify-center">
//               <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
//               <span className="text-white">Loading contact...</span>
//             </div>
//           </div>
//         ) : whatsappContact ? (
//           <div className="bg-green-500/20 backdrop-blur-lg rounded-xl p-4 mb-4 border border-green-400/30">
//             <div className="flex items-center gap-3 mb-3">
//               <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
//                 <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787" />
//                 </svg>
//               </div>
//               <div>
//                 <div className="text-white font-semibold">{whatsappContact.value}</div>
//                 <div className="text-green-200 text-sm">WhatsApp Support</div>
//                 {whatsappContact.proof && <div className="text-green-300 text-xs">{whatsappContact.proof}</div>}
//               </div>
//             </div>
//             <button
//               onClick={() => handleContactClick(whatsappContact)}
//               className="w-full bg-green-500 hover:bg-green-600 rounded-lg p-3 text-white font-medium transition-colors"
//             >
//               Chat on WhatsApp
//             </button>
//           </div>
//         ) : null}
//       </div>
//     </div>
//   )
// }

// export default Home
import React, { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"

const API = import.meta.env.VITE_API_URL

const Home = () => {

  console.log(API)
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user") || "null")

  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      navigate('/Login');
      return;
    }
    fetchCategories()
  }, [user, navigate])

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) return setLoading(false)

      const res = await axios.get(`${API}/api/quiz/categories`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      setCategories(res.data.slice(0, 4))
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">

      {/* HERO SECTION */}
      <section className="pt-28 pb-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
          Play. Learn. <span className="text-pink-400">Win.</span>
        </h1>

        <p className="max-w-xl mx-auto text-white/80 text-lg mb-8">
          Challenge yourself with exciting quizzes, climb the leaderboard and become a quiz champion 🏆
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/categories")}
            className="px-10 py-4 rounded-2xl font-bold text-lg
            bg-gradient-to-r from-purple-500 to-pink-500
            hover:scale-105 transition shadow-xl"
          >
            🎮 Play Quiz
          </button>

          {!user && (
            <Link
              to="/register"
              className="px-10 py-4 rounded-2xl font-bold text-lg
              bg-white/10 border border-white/20 hover:bg-white/20 transition"
            >
              🚀 Create Account
            </Link>
          )}
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto px-4 mb-20">
        <Stat title="10K+" subtitle="Players" icon="👥" />
        <Stat title="5K+" subtitle="Quizzes Played" icon="🎯" />
        <Stat title="50+" subtitle="Categories" icon="📚" />
        <Stat title="100+" subtitle="Questions" icon="⚡" />
      </section>

      {/* CATEGORIES PREVIEW */}
      <section className="max-w-6xl mx-auto px-4 mb-20">
        <h2 className="text-3xl font-extrabold mb-6">🔥 Popular Categories</h2>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-32 rounded-2xl bg-white/10"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => navigate(`/play/${cat._id}`)}
                className="p-4 rounded-2xl bg-white/10 border border-white/20
                hover:scale-105 transition shadow-lg text-left"
              >
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="font-bold text-lg">{cat.name}</h3>
                <p className="text-white/60 text-sm">Tap to play</p>
              </button>
            ))}
          </div>
        )}

        <div className="text-center mt-6">
          <Link to="/categories" className="text-white font-semibold hover:underline">
            View All Categories →
          </Link>
        </div>
      </section>

      {/* LEADERBOARD CTA */}
      <section className="max-w-6xl mx-auto px-4 mb-24">
        <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30
          rounded-3xl p-8 border border-white/20 shadow-xl flex flex-col md:flex-row
          items-center justify-between gap-6"
        >
          <div>
            <h2 className="text-3xl font-extrabold mb-2">🏆 Top Players</h2>
            <p className="text-white/80">
              Compete with players worldwide and secure your spot at the top.
            </p>
          </div>

          <Link
            to="/leaderboard"
            className="px-8 py-4 rounded-xl font-bold text-lg
            bg-gradient-to-r from-yellow-400 to-orange-500
            hover:scale-105 transition shadow-lg"
          >
            View Leaderboard
          </Link>
        </div>
      </section>

    </div>
  )
}

export default Home

const Stat = ({ title, subtitle, icon }) => (
  <div className="bg-white/10 border border-white/20 rounded-2xl text-center
    hover:scale-105 transition shadow-xl">
    <div className="text-3xl mb-2">{icon}</div>
    <div className="text-2xl font-black">{title}</div>
    <div className="text-white/70 text-sm">{subtitle}</div>
  </div>
)
