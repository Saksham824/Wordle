const express = require("express");
const router = express.Router();
const Score = require("../models/Score.js");
const User = require("../models/User.js");
const authMiddleware = require("../middleware/authMiddleware.js");

// POST /api/scores → Save a score
router.post("/", authMiddleware, async (req, res) => {
  const { score, streak } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.gamesPlayed += 1;
    user.wins += 1;
    if (streak > user.longestStreak) user.longestStreak = streak;
    await user.save();

    const newScore = new Score({
      username: user.username,
      score,
      streak,
    });
    await newScore.save();

    res.status(201).json({ message: "Score saved" });
  } catch (err) {
    res.status(500).json({ error: "Score save failed" });
  }
});

// GET /api/scores/top → Get top 10 by streak
router.get("/top", async (req, res) => {
  try {
    const scores = await Score.find().sort({ streak: -1, createdAt: 1 }).limit(10);
    res.json(scores);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch scores" });
  }
});

module.exports = router;
