const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  getAll,
  create,
  update,
  remove,
  makeDefault,
} = require("../controllers/addressController");

const router = express.Router();

// ======================================
// Authentication
// ======================================
router.use(authMiddleware);

// ======================================
// Address Routes
// ======================================

// Get all addresses
router.get("/", getAll);

// Add new address
router.post("/", create);

// Update address
router.put("/:id", update);

// Set default address
router.patch("/:id/default", makeDefault);

// Delete address
router.delete("/:id", remove);

module.exports = router;