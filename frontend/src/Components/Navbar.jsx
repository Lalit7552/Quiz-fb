"use client"

import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { FaHome, FaTrophy, FaUser } from "react-icons/fa"
import { LuNotepadText } from "react-icons/lu"
import { MdOutlinePrivacyTip } from "react-icons/md"
import { GiBookshelf, GiTrashCan } from "react-icons/gi"
import Logo from "../assets/logo2.png"

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const user = JSON.parse(localStorage.getItem("user") || "null")

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // ✅ LOGOUT → LOGIN PAGE
  const logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    navigate("/login", { replace: true })
  }

  const isActive = (path) => location.pathname === path

  // 🔒 Logged-in navigation items
  const loggedInNav = [
    {
      path: "/",
      label: "Home",
      icon: <FaHome />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      path: "/categories",
      label: "Categories",
      icon: <GiBookshelf />,
      color: "from-purple-500 to-pink-500",
    },
    {
      path: "/leaderboard",
      label: "Leaderboard",
      icon: <FaTrophy />,
      color: "from-yellow-400 to-orange-500",
    },
    {
      path: "/profile",
      label: "Profile",
      icon: <FaUser />,
      color: "from-green-500 to-emerald-500",
    },
    {
      path: "/terms",
      label: "Terms",
      icon: <LuNotepadText />,
      color: "from-orange-500 to-red-500",
    },
    {
      path: "/privacy",
      label: "Privacy",
      icon: <MdOutlinePrivacyTip />,
      color: "from-indigo-500 to-purple-500",
    },
    {
      path: "/deleteaccount",
      label: "Delete Account",
      icon: <GiTrashCan />,
      color: "from-red-500 to-pink-600",
    },
  ]

  // ❌ Not logged in → no navbar
  if (!user) return null

  // 📱 Bottom nav (mobile – first 4 only)
  const bottomNav = loggedInNav.slice(0, 4)

  return (
    <>
      {/* 🔝 TOP NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-slate-900/90 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* LOGO */}
            <Link to="/">
              <img
                src={Logo}
                alt="logo"
                className="w-12 h-12 rounded-2xl"
              />
            </Link>

            {/* 🖥️ DESKTOP MENU */}
            <div className="hidden lg:flex items-center gap-2">
              {loggedInNav.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? `bg-gradient-to-r ${item.color} text-white`
                      : "text-white/80 hover:bg-white/10"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.icon} {item.label}
                  </span>
                </Link>
              ))}

              <button
                onClick={logout}
                className="ml-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
              >
                Logout
              </button>
            </div>

            {/* 📱 MOBILE TOGGLE */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-10 h-10 bg-white/10 rounded-lg text-white flex items-center justify-center text-xl"
            >
              ☰
            </button>
          </div>
        </div>

        {/* 📱 MOBILE MENU */}
        {isMenuOpen && (
          <div className="lg:hidden bg-slate-900/95 mx-4 mt-2 rounded-xl p-4 space-y-2 shadow-xl">
            {loggedInNav.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="block text-white p-3 rounded hover:bg-white/10 transition"
              >
                <span className="flex items-center gap-2">
                  {item.icon} {item.label}
                </span>
              </Link>
            ))}

            <button
              onClick={logout}
              className="w-full bg-red-500 text-white py-2 rounded-lg mt-2 hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* 🔻 BOTTOM MOBILE NAV */}
      <div className="fixed bottom-0 left-0 w-full bg-slate-900 border-t border-white/10 flex justify-around py-2 z-50 lg:hidden">
        {bottomNav.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center text-xs transition-colors ${
              isActive(item.path)
                ? "text-white"
                : "text-white/70 hover:text-white"
            }`}
          >
            <div className="text-lg">{item.icon}</div>
            <span>{item.label}</span>
          </Link>
        ))}

       
      </div>

      {/* Spacer for bottom nav */}
      <div className="h-16 sm:h-20 lg:hidden"></div>
    </>
  )
}

export default Navbar
