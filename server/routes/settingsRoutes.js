const express = require("express");

const router = express.Router();

const {
  getProfile,
  updateProfile,
} = require("../controllers/settingsController");

const { protect } = require("../middleware/authMiddleware");

console.log("protect:", protect);
console.log("getProfile:", getProfile);
console.log("updateProfile:", updateProfile);

router.get("/", protect, getProfile);

router.put("/", protect, updateProfile);

module.exports = router;