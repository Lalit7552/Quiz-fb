const express = require("express");
const User = require("../models/User");
const Result = require("../models/Result");
const auth = require("../middleware/auth");

const router = express.Router();

// GET all users (admin only)
router.get("/users", auth("admin"), async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password field

    // Aggregate totalQuizzes and totalScore for each user
    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const results = await Result.find({ user: user._id });
        const totalQuizzes = results.length;
        const totalScore = results.reduce((sum, result) => sum + result.score, 0);
        return {
          ...user.toObject(),
          totalQuizzes,
          totalScore,
        };
      })
    );

    res.json(usersWithStats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
