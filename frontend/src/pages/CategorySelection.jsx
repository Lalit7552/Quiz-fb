import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API = import.meta.env.VITE_API_URL
const DEMO_CATEGORIES = [
  { _id: "demo1", name: "General Knowledge" },
  { _id: "demo2", name: "Science & Tech" },
  { _id: "demo3", name: "History" },
  { _id: "demo4", name: "Sports" },
];

const CategorySelection = () => {
  console.log(API)
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!user || !token) {
      setCategories(DEMO_CATEGORIES);
      setLoading(false);
      return;
    }

    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API}/api/quiz/categories`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCategories(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Category fetch error:", err);
        setCategories(DEMO_CATEGORIES);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [user]);

  if (loading) return <SkeletonCategories />;

  const handleClick = (id) => {
    if (!user) return navigate("/login");
    navigate(`/play/${id}`, { state: { category: id } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-[90px]">
      
      {/* Header */}
      <div className="text-center mb-10 animate-[fadeIn_0.6s_ease-out]">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
          Choose Category 🎯
        </h1>
        <p className="text-purple-200 mt-2">
          {user ? "Pick your challenge & start playing" : "Login to unlock full game 🔒"}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {categories.map((cat, index) => (
          <div
            key={cat._id}
            onClick={() => handleClick(cat._id)}
            style={{ animationDelay: `${index * 120}ms` }}
            className="cursor-pointer group relative p-6 rounded-3xl
              bg-white/10 backdrop-blur-xl border border-white/20
              shadow-xl hover:shadow-2xl transition-all duration-300
              hover:-translate-y-3 hover:scale-[1.03]
              animate-[fadeInUp_0.7s_ease-out_both]"
          >
            {/* Glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-xl opacity-0 group-hover:opacity-100 transition"></div>

            <div className="relative flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg animate-pulse">
                <span className="text-3xl">{user ? "🎮" : "🔒"}</span>
              </div>

              <p className="text-xs uppercase tracking-widest text-purple-300">
                Category {index + 1}
              </p>

              <h2 className="text-xl font-extrabold text-white mt-2">
                {cat.name}
              </h2>

              <span className="mt-4 inline-block px-4 py-1 rounded-full text-xs font-bold
                bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md">
                {user ? "Play Now" : "Login First"}
              </span>
            </div>
          </div>
        ))}
      </div>

      <style>
        {`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default CategorySelection;

/* Skeleton */
const SkeletonCategories = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
    {Array.from({ length: 4 }).map((_, i) => (
      <div
        key={i}
        className="rounded-3xl p-6 bg-white/10 backdrop-blur-xl border border-white/20 h-44"
      >
        <div className="w-16 h-16 bg-purple-500/40 rounded-2xl mb-4"></div>
        <div className="h-4 bg-purple-500/40 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-purple-500/40 rounded w-1/2"></div>
      </div>
    ))}
  </div>
);
