import React, { useState } from 'react';

const DeleteAccount = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = (e) => {
    e.preventDefault();
    setError('');
    setIsSuccess(false);
    setLoading(true);

    if (!email || !password) {
      setError('Please enter both email and password.');
      setLoading(false);
      return;
    }

    // Simulate API delay
    setTimeout(() => {
      setIsSuccess(true);
      setEmail('');
      setPassword('');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-md border-t-4 border-red-600">
        
        <h2 className="text-3xl font-black text-center mb-4">Account Deletion</h2>
        <p className="text-white/70 text-sm text-center mb-8">
          This action is <span className="font-bold">permanent</span> and cannot be undone. Enter your details to confirm.
        </p>

        {/* Success Message */}
        {isSuccess && (
          <div className="bg-green-100/20 border border-green-400/40 text-green-200 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline ml-2">Your account has been <strong>permanently deleted</strong>.</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100/20 border border-red-400/40 text-red-300 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline ml-2">{error}</span>
          </div>
        )}

        {/* Deletion Form */}
        <form onSubmit={handleDeleteAccount} className="space-y-6">
          
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/80">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="mt-1 block w-full px-3 py-2 rounded-2xl bg-white/10 border border-white/20 placeholder-white/50 text-white focus:outline-none focus:ring-pink-400 focus:border-pink-400 sm:text-sm"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white/80">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="mt-1 block w-full px-3 py-2 rounded-2xl bg-white/10 border border-white/20 placeholder-white/50 text-white focus:outline-none focus:ring-pink-400 focus:border-pink-400 sm:text-sm"
            />
          </div>

          {/* Delete Account Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-2xl font-bold text-lg bg-gradient-to-r from-red-600 to-pink-500 hover:scale-105 transition shadow-xl ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Deleting...' : '🔥 Delete Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteAccount;
