const express = require("express");
const Question = require("../models/Question");
const auth = require("../middleware/auth");

const router = express.Router();

// GET all questions (admin only)
router.get("/", auth("admin"), async (req, res) => {
  try {
    const questions = await Question.find().populate("createdBy", "username");
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create a new question (admin only)
router.post("/", auth("admin"), async (req, res) => {
  const { question, options, correctAnswer, category } = req.body;
  try {
    const newQuestion = new Question({
      question,
      options,
      correctAnswer,
      category,
      createdBy: req.user.id || null, // Optional, as admin may not have ID
    });
    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a question (admin only)
router.put("/:id", auth("admin"), async (req, res) => {
  const { question, options, correctAnswer, category } = req.body;
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      { question, options, correctAnswer, category },
      { new: true }
    );
    if (!updatedQuestion) return res.status(404).json({ message: "Question not found" });
    res.json(updatedQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a question (admin only)
router.delete("/:id", auth("admin"), async (req, res) => {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
    if (!deletedQuestion) return res.status(404).json({ message: "Question not found" });
    res.json({ message: "Question deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
