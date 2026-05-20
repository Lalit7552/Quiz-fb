import React, { useState, useEffect } from "react";
import axios from "axios";
const API = import.meta.env.VITE_API_URL
export const Questions = () => {
  console.log(API)
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [formData, setFormData] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    category: "",
  });

  const getToken = () => localStorage.getItem("adminToken");

  const fetchQuestions = async () => {
    try {
      const token = getToken();
      const res = await axios.get(`${API}/api/admin/question`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const token = getToken();
      const res = await axios.get(`${API}/api/admin/category`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchQuestions();
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("option")) {
      const index = parseInt(name.split("-")[1]);
      const newOptions = [...formData.options];
      newOptions[index] = value;
      setFormData({ ...formData, options: newOptions });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();

    try {
      if (editingQuestion) {
        await axios.put(
          `${API}/api/admin/question/${editingQuestion._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          `${API}/api/admin/question`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      fetchQuestions();
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this question?")) return;

    const token = getToken();
    await axios.delete(
      `${API}/api/admin/question/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchQuestions();
  };

  const handleEdit = (q) => {
    setEditingQuestion(q);
    setFormData({
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      category: q.category._id || q.category,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingQuestion(null);
    setFormData({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      category: "",
    });
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200">

      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 transition-all">

        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-extrabold text-purple-800 tracking-wide">
            🛠 Manage Questions
          </h1>

          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-purple-400 to-purple-500 
                       hover:from-purple-500 hover:to-purple-600 
                       text-white px-6 py-2.5 rounded-xl shadow-lg 
                       transition-all duration-300 hover:scale-105"
          >
            ➕ Add Question
          </button>
        </div>

        {showForm && (
          <div className="bg-gradient-to-br from-white via-purple-50 to-purple-100 
                          rounded-2xl p-6 shadow-xl mb-8 
                          animate-[fadeIn_0.4s_ease-in-out]">
            <h2 className="text-xl font-bold mb-5 text-purple-700">
              {editingQuestion ? "✏ Edit Question" : "➕ Add New Question"}
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <textarea
                name="question"
                value={formData.question}
                onChange={handleInputChange}
                placeholder="Enter your question"
                className="md:col-span-2 w-full p-3 border border-purple-200 
                           rounded-xl focus:ring-2 focus:ring-purple-400 
                           outline-none transition-all"
                required
              />

              {formData.options.map((opt, i) => (
                <input
                  key={i}
                  name={`option-${i}`}
                  value={opt}
                  onChange={handleInputChange}
                  placeholder={`Option ${i + 1}`}
                  className="w-full p-3 border border-purple-200 
                             rounded-xl focus:ring-2 focus:ring-purple-400 
                             outline-none transition-all"
                  required
                />
              ))}

              <select
                name="correctAnswer"
                value={formData.correctAnswer}
                onChange={handleInputChange}
                className="w-full p-3 border border-purple-200 
                           rounded-xl focus:ring-2 focus:ring-purple-400 
                           outline-none transition-all"
              >
                {formData.options.map((_, i) => (
                  <option key={i} value={i}>
                    Correct Option {i + 1}
                  </option>
                ))}
              </select>

              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-3 border border-purple-200 
                           rounded-xl focus:ring-2 focus:ring-purple-400 
                           outline-none transition-all"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <div className="md:col-span-2 flex gap-3">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 
                             text-white px-6 py-2.5 rounded-xl 
                             transition-all hover:scale-105 shadow"
                >
                  {editingQuestion ? "Update" : "Save"}
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-400 hover:bg-gray-500 
                             text-white px-6 py-2.5 rounded-xl 
                             transition-all hover:scale-105 shadow"
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        )}

        <div className="space-y-4">
          {questions.map((q, i) => (
            <div
              key={q._id}
              className="bg-gradient-to-br from-white to-purple-50 
                         rounded-2xl p-5 shadow-md 
                         hover:shadow-xl hover:scale-[1.01] 
                         transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-purple-800">
                  Q{i + 1}. {q.question}
                </h3>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(q)}
                    className="bg-yellow-400 hover:bg-yellow-500 
                               text-white px-3 py-1 rounded-lg transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(q._id)}
                    className="bg-red-500 hover:bg-red-600 
                               text-white px-3 py-1 rounded-lg transition"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map((opt, idx) => (
                  <li
                    key={idx}
                    className={`p-2 rounded-lg transition ${
                      idx === q.correctAnswer
                        ? "bg-green-100 text-green-700 font-bold"
                        : "bg-purple-50 text-purple-700"
                    }`}
                  >
                    {opt}
                  </li>
                ))}
              </ul>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
