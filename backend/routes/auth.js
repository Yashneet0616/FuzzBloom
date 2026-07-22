const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authController = require("../controllers/authController");

// ======================================
// Register User
// POST /api/auth/register
// ======================================
router.post(
  "/register",
  authMiddleware,
  authController.register
);

// ======================================
// Get Profile
// GET /api/auth/profile
// ======================================
router.get(
  "/profile",
  authMiddleware,
  authController.getProfile
);

// ======================================
// Update Profile
// PUT /api/auth/profile
// ======================================
router.put(
  "/profile",
  authMiddleware,
  authController.updateProfile
);

// ======================================
// Current Authenticated User
// GET /api/auth/me
// ======================================
router.get("/me", authMiddleware, async (req, res) => {
  try {
    res.json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
});

module.exports = router;