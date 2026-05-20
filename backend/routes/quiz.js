const express = require("express");
const mongoose = require("mongoose");
const Question = require("../models/Question");
const Category = require("../models/Category");
const Result = require("../models/Result");
const auth = require("../middleware/auth");

const router = express.Router();

// Get 10 random questions for quiz, optionally filtered by category
router.get("/questions", auth(), async (req, res) => {
  try {
    const { category } = req.query;
    let questions;
    if (category) {
      // Get 10 random questions from the specified category
      questions = await Question.aggregate([
        { $match: { category: new mongoose.Types.ObjectId(category) } },
        { $sample: { size: 10 } }
      ]);
    } else {
      // Get 10 random questions from all categories
      questions = await Question.aggregate([{ $sample: { size: 10 } }]);
    }
    // Remove correctAnswer from response
    const quizQuestions = questions.map(q => ({
      _id: q._id,
      question: q.question,
      options: q.options,
    }));
    console.log(quizQuestions)
    res.json(quizQuestions);
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Submit quiz results
router.post("/submit", auth(), async (req, res) => {
  const { answers } = req.body; // answers should be array of { questionId, selectedAnswer }

  let score = 0;
  for (const answer of answers) {
    const question = await Question.findById(answer.questionId);
    if (question && question.correctAnswer === answer.selectedAnswer) {
      score++;
    }
  }

  const result = await Result.create({
    user: req.user.id,
    score: score,
  });

  res.json({ score, result });
});

// Get leaderboard
router.get("/leaderboard", auth(), async (req, res) => {
  try {
    const results = await Result.find().populate("user", "name").sort({ score: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user quiz results
router.get("/results", auth(), async (req, res) => {
  try {
    const results = await Result.find({ user: req.user.id }).sort({ date: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get categories for users
router.get("/categories",auth(), async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
