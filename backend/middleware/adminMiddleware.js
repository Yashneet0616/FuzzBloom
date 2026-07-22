const { db } = require("../config/firebaseAdmin");

module.exports = async (req, res, next) => {
  try {
    // authMiddleware should already attach the Firebase UID
    const uid = req.user.uid;

    const userDoc = await db.collection("users").doc(uid).get();

    if (!userDoc.exists) {
      return res.status(403).json({
        success: false,
        message: "User not found",
      });
    }

    const user = userDoc.data();

   if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      });
    }

    next();
  } catch (error) {
    console.error("Admin Middleware Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to verify admin",
    });
  }
};