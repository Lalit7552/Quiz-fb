"use client"

import { useState, useEffect } from "react"
import axios from "axios"

const CricketAppWithContacts = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentTime, setCurrentTime] = useState("9:41")
  const [activeUsers, setActiveUsers] = useState(12847)
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setIsVisible(true)
    fetchContacts()

    // Update time every minute
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(now.getHours() + ":" + String(now.getMinutes()).padStart(2, "0"))
    }, 60000)

    // Simulate active users counter
    const userTimer = setInterval(() => {
      setActiveUsers((prev) => prev + Math.floor(Math.random() * 5) - 2)
    }, 3000)

    return () => {
      clearInterval(timer)
      clearInterval(userTimer)
    }
  }, [])

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const response = await axios.get("http://localhost:5001/api/contacts/active")
      setContacts(response.data.contacts)
    } catch (error) {
      console.error("Failed to fetch contacts:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleContactClick = (contact) => {
    const { type, value } = contact

    switch (type) {
      case "whatsapp":
        const whatsappNumber = value.replace(/[^\d]/g, "")
        window.open(`https://wa.me/${whatsappNumber}`, "_blank")
        break
      case "phone":
        window.open(`tel:${value}`, "_blank")
        break
      case "telegram":
        if (value.includes("t.me") || value.includes("telegram")) {
          window.open(value, "_blank")
        } else if (value.startsWith("@")) {
          window.open(`https://t.me/${value.substring(1)}`, "_blank")
        } else {
          window.open(`https://t.me/${value}`, "_blank")
        }
        break
      case "instagram":
        window.open(value.startsWith("http") ? value : `https://instagram.com/${value}`, "_blank")
        break
      case "facebook":
        window.open(value.startsWith("http") ? value : `https://facebook.com/${value}`, "_blank")
        break
      default:
        if (value.startsWith("http")) {
          window.open(value, "_blank")
        }
    }
  }

  // Get specific contact types
  const whatsappContact = contacts.find((c) => c.type === "whatsapp")
  const phoneContact = contacts.find((c) => c.type === "phone")
  const telegramContact = contacts.find((c) => c.type === "telegram")
  const emailContact = contacts.find((c) => c.type === "email")
  const socialContacts = contacts.filter((c) =>
    ["instagram", "facebook", "twitter", "linkedin", "youtube"].includes(c.type),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* iPhone Status Bar */}
      {/* <div className="flex justify-between items-center px-6 py-3 text-white text-sm font-medium">
        <span>{currentTime}</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
          </div>
          <svg className="w-4 h-4 ml-1" fill="white" viewBox="0 0 24 24">
            <path d="M2 17h20v2H2zm1.15-4.05L4 11.47l.85 1.48L5.5 12H8v2H5.5l-.65-1.05zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2-2z" />
          </svg>
          <div className="w-6 h-3 border border-white rounded-sm">
            <div className="w-4 h-1.5 bg-white rounded-sm m-0.5"></div>
          </div>
        </div>
      </div> */}

      {/* Profile Header */}
      {/* <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">CB</span>
          </div>
          <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
        </div>
        <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
          <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full"></div>
        </div>
      </div> */}

      {/* Live Status with Active Users */}
      {/* <div className="px-6 mb-4">
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-2xl p-3 border border-green-400/30">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-300 font-semibold">Live Now</span>
              <span className="text-white font-bold">{activeUsers.toLocaleString()} Active Users</span>
            </div>
            <div className="text-white font-medium">{currentTime}</div>
          </div>
        </div>
      </div> */}

      {/* Main Question Card */}
      <div className="px-6 mb-6 py-3">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl">
          <h1 className="text-white text-xl font-semibold leading-relaxed mb-6">
            India's #1 Trusted Online Cricket Exchange - Get your CricBet99 ID with ₹300 FREE bonus?
          </h1>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <button className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 text-white text-sm font-medium hover:bg-white/30 transition-all">
              Best Exchange
            </button>
            <button className="bg-blue-500 backdrop-blur-sm border border-blue-400/50 rounded-full px-6 py-3 text-white text-sm font-medium hover:bg-blue-600 transition-all">
              24×7 Withdrawal
            </button>
            <button className="w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center hover:bg-white/30 transition-all">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Card */}
      <div className="px-6 mb-6">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute bottom-0 left-0 right-0 h-20 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 400 80" fill="none">
              <path
                d="M0 40 L50 20 L100 35 L150 15 L200 30 L250 10 L300 25 L350 5 L400 20"
                stroke="url(#gradient)"
                strokeWidth="2"
                fill="none"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="relative z-10">
            {/* <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-4xl font-bold text-white mb-1">₹300</div>
                <div className="text-blue-200 text-sm">Welcome Bonus</div>
              </div>
              <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                </svg>
              </button>
            </div> */}

            {/* Mini Chart */}
            <div className="h-16 flex items-end gap-1 mb-4">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-t from-blue-500 to-cyan-400 rounded-sm opacity-60"
                  style={{
                    height: `${Math.random() * 60 + 20}%`,
                    width: "4px",
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Cards */}
      {/* <div className="px-6 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <div>
                <div className="text-white font-semibold text-sm">50K+ Users</div>
                <div className="text-blue-200 text-xs">Trusted Daily</div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">⚡</span>
              </div>
              <div>
                <div className="text-white font-semibold text-sm">Instant Payout</div>
                <div className="text-blue-200 text-xs">2-5 Minutes</div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Dynamic WhatsApp Contact Card */}
      {loading ? (
        <div className="px-6 mb-6">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              <span className="ml-3 text-white">Loading contact...</span>
            </div>
          </div>
        </div>
      ) : whatsappContact ? (
        <div className="px-6 mb-6">
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-xl rounded-3xl p-6 border border-green-400/30 shadow-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787" />
                </svg>
              </div>
              <div>
                <div className="text-white font-bold text-lg">{whatsappContact.value}</div>
                <div className="text-green-200 text-sm">Tap to Connect Instantly</div>
                {whatsappContact.proof && <div className="text-green-300 text-xs">{whatsappContact.proof}</div>}
              </div>
            </div>
            <button
              onClick={() => handleContactClick(whatsappContact)}
              className="w-full bg-green-500/20 backdrop-blur-sm rounded-2xl p-3 border border-green-400/30 hover:bg-green-500/30 transition-all"
            >
              <div className="text-green-100 text-sm font-medium">Available 24/7 • Response in 30 sec</div>
            </button>
          </div>
        </div>
      ) : (
        <div className="px-6 mb-6">
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-xl rounded-3xl p-6 border border-green-400/30 shadow-2xl">
            <div className="text-center text-white">
              <div className="text-lg font-semibold mb-2">Contact information will be available soon</div>
              <div className="text-green-200 text-sm">Please check back later</div>
            </div>
          </div>
        </div>
      )}

      {/* Other Contact Methods */}
      {contacts.length > 0 && (
        <div className="px-6 mb-6">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl">
            <h3 className="text-white font-semibold text-lg mb-4">
              Create your ID with D247Official Whatsapp/ Telegram Now...
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {phoneContact && (
                <button
                  onClick={() => handleContactClick(phoneContact)}
                  className="bg-blue-500/20 backdrop-blur-sm rounded-2xl p-3 border border-blue-400/30 hover:bg-blue-500/30 transition-all"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-white text-xs font-semibold">Call</div>
                      <div className="text-blue-200 text-xs">{phoneContact.value.slice(-4)}</div>
                    </div>
                  </div>
                </button>
              )}

              {telegramContact && (
                <button
                  onClick={() => handleContactClick(telegramContact)}
                  className="bg-sky-500/20 backdrop-blur-sm rounded-2xl p-3 border border-sky-400/30 hover:bg-sky-500/30 transition-all"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-white text-xs font-semibold">Telegram</div>
                      <div className="text-sky-200 text-xs">Join Channel</div>
                    </div>
                  </div>
                </button>
              )}

              {emailContact && (
                <button
                  onClick={() => handleContactClick(emailContact)}
                  className="bg-purple-500/20 backdrop-blur-sm rounded-2xl p-3 border border-purple-400/30 hover:bg-purple-500/30 transition-all col-span-2"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-white text-xs font-semibold">Email Support</div>
                      <div className="text-purple-200 text-xs">{emailContact.value}</div>
                    </div>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Social Media Links */}
      {socialContacts.length > 0 && (
        <div className="px-6 mb-6">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl">
            <h3 className="text-white font-semibold text-lg mb-4">🌐 Follow Us on Social Media</h3>

            <div className="grid grid-cols-2 gap-3">
              {socialContacts.map((contact) => {
                const getSocialIcon = (type) => {
                  switch (type) {
                    case "instagram":
                      return (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      )
                    case "facebook":
                      return (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      )
                    case "twitter":
                      return (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                      )
                    case "youtube":
                      return (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                      )
                    case "linkedin":
                      return (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      )
                    default:
                      return (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.169 1.858-.896 6.728-.896 6.728-.896 4.411-1.768 4.411-1.768 4.411-1.768 0-1.768-.896-1.768-.896V9.056c0-.896.896-.896.896-.896h1.768c.896 0 .896.896.896.896v8.16c0 .896-.896.896-.896.896h-1.768c-.896 0-.896-.896-.896-.896V9.056c0-.896-.896-.896-.896-.896H6.432c-.896 0-.896.896-.896.896v8.16c0 .896.896.896.896.896h1.768c.896 0 .896-.896.896-.896V9.056c0-.896.896-.896.896-.896h1.768c.896 0 .896.896.896.896v8.16z" />
                        </svg>
                      )
                  }
                }

                const getSocialBgColor = (type) => {
                  switch (type) {
                    case "instagram":
                      return "bg-gradient-to-r from-purple-500 to-pink-500"
                    case "facebook":
                      return "bg-blue-600"
                    case "twitter":
                      return "bg-sky-500"
                    case "youtube":
                      return "bg-red-600"
                    case "linkedin":
                      return "bg-blue-700"
                    default:
                      return "bg-gray-500"
                  }
                }

                return (
                  <button
                    key={contact._id}
                    onClick={() => handleContactClick(contact)}
                    className={`${getSocialBgColor(contact.type)}/20 backdrop-blur-sm rounded-2xl p-3 border ${getSocialBgColor(contact.type).replace("bg-", "border-")}/30 hover:${getSocialBgColor(contact.type)}/30 transition-all`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 ${getSocialBgColor(contact.type)} rounded-full flex items-center justify-center`}
                      >
                        {getSocialIcon(contact.type)}
                      </div>
                      <div className="text-left">
                        <div className="text-white text-xs font-semibold capitalize">{contact.type}</div>
                        <div className="text-gray-300 text-xs">Follow Us</div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Company Info Cards */}
      <div className="px-6 mb-6">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl">
          <div className="space-y-4">
            {/* Registered Company */}
            <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-2xl p-4 border border-blue-400/30">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-lg">Registered Company</h3>
              </div>
              <p className="text-blue-100 text-sm leading-relaxed">
                We are not a dealer. We are officially registered. Provides support from contact links below.
              </p>
            </div>

            {/* Minimum ID */}
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-2xl p-4 border border-green-400/30">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">₹</span>
                </div>
                <h3 className="text-white font-bold text-lg">Minimum ID ₹1000</h3>
              </div>
              <p className="text-green-100 text-sm leading-relaxed">Start your journey with just ₹1000.</p>
            </div>

            {/* All IDs Available */}
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-4 border border-purple-400/30">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-lg">All IDs Available</h3>
              </div>
              <p className="text-pink-100 text-sm leading-relaxed">
                Get Client, Master, Supermaster, Admin IDs for Lords Exchange from Whatsapp or Telegram.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Button */}
      <div className="px-6 mb-6">
        <button className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center mx-auto hover:bg-white/30 transition-all">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Bottom Indicators */}
      <div className="flex justify-center gap-2 mb-6">
        <div className="w-8 h-1 bg-white/30 rounded-full"></div>
        <div className="w-8 h-1 bg-white rounded-full"></div>
        <div className="w-8 h-1 bg-white/30 rounded-full"></div>
      </div>

      {/* Voice Assistant Button */}
      <div className="flex justify-center mb-8">
        <button className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20 hover:scale-105 transition-all">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
          </svg>
        </button>
      </div>

      {/* Bottom Safe Area */}
      <div className="h-8"></div>
    </div>
  )
}

export default CricketAppWithContacts
