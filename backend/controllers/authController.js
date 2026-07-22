const authService = require("../services/authService");

// =====================================
// Register User
// POST /api/auth/register
// =====================================
async function register(req, res) {
  try {
    const { uid, email } = req.user;

    const {
      firstName,
      lastName,
      phone,
    } = req.body;

    const user = await authService.registerUser(uid, {
      firstName,
      lastName,
      phone,
      email,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user,
    });
  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Registration failed.",
    });
  }
}

// =====================================
// Get Profile
// GET /api/auth/profile
// =====================================
async function getProfile(req, res) {
  try {
    const profile = await authService.getProfile(
      req.user.uid
    );

    return res.json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error("Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// =====================================
// Update Profile
// PUT /api/auth/profile
// =====================================
async function updateProfile(req, res) {
  try {
    const {
      firstName,
      lastName,
      phone,
    } = req.body;

    const profile =
      await authService.updateProfile(
        req.user.uid,
        {
          firstName,
          lastName,
          phone,
        }
      );

    return res.json({
      success: true,
      message: "Profile updated successfully.",
      profile,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  register,
  getProfile,
  updateProfile,
};