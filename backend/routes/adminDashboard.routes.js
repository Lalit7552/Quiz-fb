const express = require("express");
const User = require("../models/user");
const Category = require("../models/Category");
const Question = require("../models/Question");
const Result = require("../models/Result");
const auth = require("../middleware/auth");

const router = express.Router();

// GET dashboard stats (admin only)
router.get("/stats", auth("admin"), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalQuizzes = await Category.countDocuments();
    const totalQuestions = await Question.countDocuments();
    const totalWinners = await Result.countDocuments(); // Assuming winners are quiz participants

    res.json({
      totalUsers,
      totalQuizzes,
      totalQuestions,
      totalWinners,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
