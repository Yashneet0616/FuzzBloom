const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getCart,
  addToCart,
  updateQuantity,
  removeItem,
  clearCart,
} = require("../controllers/cartController");

// Protect all cart routes
router.use(authMiddleware);

// ==========================
// CART ROUTES
// ==========================

// Get user's cart
router.get("/", getCart);

// Add item to cart
router.post("/", addToCart);

// Update quantity
router.put("/:productId", updateQuantity);

// Remove item
router.delete("/:productId", removeItem);

// Clear cart
router.delete("/", clearCart);

module.exports = router;