const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  wins: { type: Number, default: 0 },
  gamesPlayed: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
});

module.exports = mongoose.model("User", userSchema);
