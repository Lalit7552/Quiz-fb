const Terms = () => {
  return (
    <div className="px-4 py-6 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-[90px]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-white mb-4">Terms of Use</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-lime-500 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">📋 Informational Use</h2>
            <div className="space-y-4 text-blue-100">
              <p>
                This app is intended solely for informational and educational purposes related to cricket.
                It does <strong>not promote or offer any form of real betting or gambling</strong>.
              </p>
              <p>
                All content, tips, or guides shared in the app are for general knowledge only.
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-green-400 mb-4">✅ User Responsibility</h2>
            <div className="space-y-3">
              {[
                "Use this app only for lawful and personal purposes",
                "You are solely responsible for how you interpret or act upon the information",
                "No personal betting or money transactions occur within this app"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <p className="text-blue-100">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-red-400 mb-4">🚫 Disclaimer</h2>
            <div className="space-y-3 text-blue-100">

              <p>
                This app is <strong>not affiliated with any government or betting organization</strong>.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-1 rounded-3xl">
            <div className="bg-blue-900 rounded-3xl p-6">
              <h2 className="text-2xl font-bold text-yellow-300 mb-4">📌 Changes</h2>
              <p className="text-blue-100 text-lg leading-relaxed">
                We may update these terms at any time. Continued use of the app means you accept the latest terms. Please review this page regularly.
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">📞 Contact Us</h2>
            <p className="text-blue-100 text-lg leading-relaxed">
              For any questions about these Terms of Use, contact us. <br />

            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Terms;
