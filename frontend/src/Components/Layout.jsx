"use client"

import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-60 right-20 w-32 h-32 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-48 h-48 bg-gradient-to-r from-purple-400/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-36 h-36 bg-gradient-to-r from-blue-400/15 to-cyan-500/15 rounded-full blur-2xl animate-bounce"></div>

        {/* Animated Particles */}
        <div className="absolute top-10 left-5 w-3 h-3 bg-yellow-400 rounded-full animate-ping shadow-lg"></div>
        <div className="absolute top-32 right-8 w-2 h-2 bg-green-400 rounded-full animate-bounce shadow-lg"></div>
        <div className="absolute top-64 left-12 w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 right-16 w-3 h-3 bg-orange-400 rounded-full animate-ping shadow-lg"></div>
        <div className="absolute bottom-20 left-8 w-2 h-2 bg-blue-300 rounded-full animate-bounce shadow-lg"></div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%23ffffff fillOpacity=0.03%3E%3Ccircle cx=30 cy=30 r=1/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      </div>

      <Navbar />
      
      <main className="relative z-10 pb-20">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
