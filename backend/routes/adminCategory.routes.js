const express = require("express");
const Category = require("../models/Category");
const auth = require("../middleware/auth");

const router = express.Router();

// GET all categories (admin only)
router.get("/", auth("admin"), async (req, res) => {
  try {
    const categories = await Category.find().populate("createdBy", "username");
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create a new category (admin only)
router.post("/", auth("admin"), async (req, res) => {
  const { name, description } = req.body;
  try {
    const newCategory = new Category({
      name,
      description,
      createdBy: req.user.id || null,
    });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a category (admin only)
router.put("/:id", auth("admin"), async (req, res) => {
  const { name, description } = req.body;
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    if (!updatedCategory) return res.status(404).json({ message: "Category not found" });
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a category (admin only)
router.delete("/:id", auth("admin"), async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
