import { useState } from "react"
import axios from "axios"
const API = import.meta.env.VITE_API_URL
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaQuestionCircle,
  FaPaperPlane,
  FaSpinner,
} from "react-icons/fa"

export default function ContactForm() {
  console.log(API)
  const [sending, setSending] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    query: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)

    try {
      await axios.post(
        `${API}/api/contact-inquiries`,
        formData
      )

      alert("Message sent successfully")

      setFormData({
        name: "",
        phone: "",
        email: "",
        city: "",
        query: "",
      })
    } catch (err) {
      alert("Failed to send message")
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">

      <div className="w-full max-w-md bg-white/10 border border-white/20
        rounded-3xl p-6 backdrop-blur-lg shadow-xl">

        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-extrabold text-center mb-4">
            ✉️ Send a Message
          </h2>

          <Input icon={<FaUser />} name="name" placeholder="Your Name"
            value={formData.name} onChange={handleChange} />

          <Input icon={<FaPhone />} name="phone" placeholder="Phone Number"
            value={formData.phone} onChange={handleChange} />

          <Input icon={<FaEnvelope />} name="email" placeholder="Email Address"
            value={formData.email} onChange={handleChange} />

          <Input icon={<FaMapMarkerAlt />} name="city" placeholder="City"
            value={formData.city} onChange={handleChange} />

          <div className="relative">
            <FaQuestionCircle className="absolute left-4 top-4 text-white/50" />
            <textarea
              name="query"
              rows="4"
              required
              value={formData.query}
              onChange={handleChange}
              placeholder="How can we help you?"
              className="w-full pl-12 pr-4 py-3 bg-white/10
              border border-white/20 rounded-2xl
              placeholder:text-white/50 resize-none"
            />
          </div>

          <button
            disabled={sending}
            className="w-full py-4 rounded-2xl font-bold text-lg
            bg-gradient-to-r from-purple-500 to-pink-500
            disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {sending ? (
              <>
                <FaSpinner className="animate-spin" /> Sending...
              </>
            ) : (
              <>
                <FaPaperPlane /> Send Message
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

/* INPUT COMPONENT */
const Input = ({ icon, ...props }) => (
  <div className="relative">
    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
      {icon}
    </span>
    <input
      {...props}
      required
      className="w-full pl-12 pr-4 py-3 bg-white/10
      border border-white/20 rounded-2xl
      placeholder:text-white/50"
    />
  </div>
)
