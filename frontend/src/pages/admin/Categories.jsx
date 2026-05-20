import React, { useState, useEffect } from "react";
import axios from "axios";
const API = import.meta.env.VITE_API_URL
export const Categories = () => {
  console.log(API)
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const getToken = () => localStorage.getItem("adminToken");

  const fetchCategories = async () => {
    try {
      const token = getToken();
      const res = await axios.get(
        `${API}/api/admin/category`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCategories(res.data || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      if (!token) return alert("Admin not logged in");

      if (editingCategory) {
        await axios.put(
          `${API}/api/admin/category/${editingCategory._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          `${API}/api/admin/category`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      fetchCategories();
      resetForm();
    } catch (err) {
      console.error("Error saving category:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      const token = getToken();
      await axios.delete(
        `${API}/api/admin/category/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCategories();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleEdit = (cat) => {
    setEditingCategory(cat);
    setFormData({ name: cat.name, description: cat.description });
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingCategory(null);
    setFormData({ name: "", description: "" });
  };

  if (loading) {
    return <CategorySkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 p-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-extrabold text-purple-800">
          📂 Category Management
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-purple-600 to-purple-500 
          text-white px-6 py-2 rounded-xl shadow-md hover:scale-105 transition"
        >
          + Add Category
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl mb-8 animate-fadeIn">
          <h2 className="text-xl font-bold text-purple-700 mb-4">
            {editingCategory ? "Edit Category" : "Add New Category"}
          </h2>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Category Name"
              className="p-3 border rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
              required
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="p-3 border rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-green-500 text-white px-5 py-2 rounded-xl hover:scale-105 transition"
              >
                {editingCategory ? "Update" : "Add"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-5 py-2 rounded-xl hover:scale-105 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Category Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.length === 0 ? (
          <p className="text-purple-700">No categories found.</p>
        ) : (
          categories.map((cat) => (
            <div
              key={cat._id}
              className="bg-white/80 backdrop-blur-xl p-5 rounded-2xl shadow-lg 
              hover:shadow-2xl transform hover:-translate-y-1 transition"
            >
              <div className="flex justify-between mb-3">
                <h3 className="text-lg font-bold text-purple-800">
                  {cat.name}
                </h3>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm hover:scale-105 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:scale-105 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <p className="text-gray-600 text-sm">
                {cat.description || "No description"}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease forwards;
          }
        `}
      </style>

    </div>
  );
};

export default Categories;

/* -------------- Skeleton Loader -------------- */

const CategorySkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 p-6 animate-pulse">

      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-8">
        <div className="h-10 w-64 bg-purple-300 rounded-lg"></div>
        <div className="h-10 w-40 bg-purple-300 rounded-xl"></div>
      </div>

      {/* Cards Skeleton */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1,2,3,4,5,6].map((i) => (
          <div
            key={i}
            className="bg-white/70 p-5 rounded-2xl shadow-lg"
          >
            <div className="flex justify-between mb-3">
              <div className="h-5 w-40 bg-purple-300 rounded"></div>
              <div className="flex gap-2">
                <div className="h-6 w-12 bg-purple-300 rounded-lg"></div>
                <div className="h-6 w-14 bg-purple-300 rounded-lg"></div>
              </div>
            </div>
            <div className="h-4 w-full bg-purple-200 rounded"></div>
            <div className="h-4 w-3/4 bg-purple-200 rounded mt-2"></div>
          </div>
        ))}
      </div>

    </div>
  );
};
