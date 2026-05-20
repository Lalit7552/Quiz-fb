"use client"

import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const ScrollToTop = ({ children }) => {
  const location = useLocation()

  useEffect(() => {
    // Smooth scroll to top with better mobile support
    const scrollToTop = () => {
      if ("scrollBehavior" in document.documentElement.style) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        })
      } else {
        // Fallback for older browsers
        window.scrollTo(0, 0)
      }
    }

    // Small delay for better UX
    const timer = setTimeout(scrollToTop, 100)
    return () => clearTimeout(timer)
  }, [location.pathname])

  return <>{children}</>
}

export default ScrollToTop
