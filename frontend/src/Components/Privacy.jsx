import { motion } from "framer-motion"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const card = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const Privacy = () => {
  return (
    <div className="px-4 py-10 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 min-h-screen overflow-hidden pt-[80px]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">
            Privacy Policy
          </h1>
          <p className="text-blue-200">
            Last updated: January 29, 2026
          </p>
          <div className="w-28 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mt-5 rounded-full animate-pulse"></div>
        </div>

        {/* CONTENT */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {/* CARD */}
          {[
            {
              title: "1. Introduction",
              color: "text-green-400",
              content:
                "Welcome to Quiz App (\"we,\" \"our,\" or \"us\"). We are committed to protecting your personal information and your right to privacy. This policy explains how we collect, use, and safeguard your information.",
            },
            {
              title: "2. Information We Collect",
              color: "text-yellow-400",
              content: (
                <>
                  <p className="mb-2 font-semibold text-white">Personal Information</p>
                  <ul className="list-disc list-inside mb-3">
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Password (encrypted)</li>
                  </ul>
                  <p className="mb-2 font-semibold text-white">Usage Information</p>
                  <ul className="list-disc list-inside">
                    <li>Quiz attempts and scores</li>
                    <li>Time taken to complete quizzes</li>
                    <li>Quiz history & preferences</li>
                    <li>Device & browser information</li>
                    <li>IP address & approximate location</li>
                  </ul>
                </>
              ),
            },
            {
              title: "3. How We Use Your Information",
              color: "text-blue-400",
              list: [
                "Account creation and management",
                "Personalized quiz experience",
                "Progress tracking & leaderboards",
                "Service improvement",
                "Security and fraud prevention",
              ],
            },
            {
              title: "4. Information Sharing",
              color: "text-red-400",
              list: [
                "With your consent",
                "Legal requirements",
                "Trusted service providers",
                "Public leaderboards (username & scores)",
              ],
            },
            {
              title: "5. Data Security",
              color: "text-purple-400",
              list: [
                "bcrypt password encryption",
                "JWT authentication",
                "HTTPS secure transmission",
                "Restricted database access",
              ],
            },
            {
              title: "6. Your Privacy Rights",
              color: "text-green-400",
              list: [
                "Access & correction",
                "Deletion requests",
                "Data portability",
                "Withdraw consent",
              ],
            },
          ].map((section, index) => (
            <motion.div
              key={index}
              variants={card}
              whileHover={{ scale: 1.02 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-lg hover:shadow-2xl transition-all"
            >
              <h2 className={`text-2xl font-bold mb-3 ${section.color}`}>
                {section.title}
              </h2>

              <div className="text-blue-100 leading-relaxed space-y-2">
                {section.content}
                {section.list && (
                  <ul className="list-disc list-inside space-y-1">
                    {section.list.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}

          {/* FINAL NOTICE */}
          <motion.div
            variants={card}
            className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 p-1 rounded-3xl"
          >
            <div className="bg-blue-900 rounded-3xl p-6 text-blue-100 space-y-3">
              <p>Our service is not intended for children under 13.</p>
              <p>
                Data is retained only as necessary. Deleted accounts result in
                deletion or anonymization of data.
              </p>
              <p>
                Continued use of Quiz App indicates acceptance of policy updates.
              </p>
              <p className="font-semibold text-white">
                By using Quiz App, you agree to this Privacy Policy.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Privacy
