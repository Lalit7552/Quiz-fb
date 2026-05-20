import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const API = import.meta.env.VITE_API_URL
const PlayQuiz = () => {
   console.log(API)
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const categoryId = location.state?.category;

  useEffect(() => {
    if (!categoryId) navigate("/categories");
  }, [categoryId, navigate]);

  const fetchQuestions = async () => {
    try {
      const token = localStorage.getItem("token");
      const params = categoryId ? { category: categoryId } : {};
      const res = await axios.get(
        `${API}/api/quiz/questions`,
        { headers: { Authorization: `Bearer ${token}` }, params }
      );
      setQuestions(res.data);
    } catch {
      setError("Failed to fetch questions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [categoryId]);

  const handleAnswerSelect = (id, index) => {
    setSelectedAnswers({ ...selectedAnswers, [id]: index });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const answers = Object.keys(selectedAnswers).map((id) => ({
        questionId: id,
        selectedAnswer: selectedAnswers[id],
      }));

      const res = await axios.post(
        `${API}/api/quiz/submit`,
        { answers },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setScore(res.data.score);
    } catch {
      alert("Submit failed");
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  if (score !== null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl shadow-2xl text-center max-w-md w-full">
          <h1 className="text-4xl font-extrabold text-white mb-4 animate-pulse">
            🎉 Quiz Completed!
          </h1>
          <p className="text-xl text-purple-200 mb-6">
            Score:{" "}
            <span className="text-4xl font-bold text-pink-400">
              {score}
            </span>{" "}
            / {questions.length}
          </p>

          <div className="space-y-4">
            <button
              onClick={() => navigate("/categories")}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition font-bold text-white shadow-xl"
            >
              🔁 Play Again
            </button>

            <button
              onClick={() => navigate("/leaderboard")}
              className="w-full py-3 rounded-xl border border-white/20 bg-white/10 text-white hover:bg-white/20 transition font-bold shadow-lg"
            >
              🏆 Leaderboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6 mt-[25px]">
      <h1 className="text-4xl font-extrabold text-center text-white mb-10 animate-pulse pt-[30px]">
        🎯 Play Quiz
      </h1>

      <div className="space-y-8 max-w-5xl mx-auto">
        {questions.map((q, qIndex) => (
          <div
            key={q._id}
            className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            <span className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full shadow-lg text-sm font-bold">
              Q {qIndex + 1}
            </span>

            <h2 className="text-xl font-bold text-white mb-5">
              {q.question}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {q.options.map((option, oIndex) => {
                const selected = selectedAnswers[q._id] === oIndex;

                return (
                  <button
                    key={oIndex}
                    onClick={() => handleAnswerSelect(q._id, oIndex)}
                    className={`p-4 rounded-xl border transition-all font-semibold
                      ${
                        selected
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent shadow-xl scale-[1.03]"
                          : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                      }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <button
          onClick={handleSubmit}
          className="px-12 py-4 rounded-full text-lg font-bold bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-110 transition text-white shadow-2xl"
        >
          🚀 Submit Quiz
        </button>
      </div>
    </div>
  );
};

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white text-2xl font-bold animate-pulse">
    Loading Questions...
  </div>
);

const Error = ({ message }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-red-400 text-xl font-bold animate-pulse">
    {message}
  </div>
);

export default PlayQuiz;
