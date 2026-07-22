const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  // Products
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,

  // Orders
  getOrders,
  getOrderById,
  updateOrderStatus,

  // Settings
  getSettings,
  updateSettings,
} = require("../controllers/adminController");

// Protect all admin routes
router.use(authMiddleware);
router.use(adminMiddleware);

// ====================================
// PRODUCT ROUTES
// ====================================

// Get all products
router.get("/products", getProducts);

// Get single product
router.get("/products/:id", getProductById);

// Add product
router.post("/products", addProduct);

// Update product
router.put("/products/:id", updateProduct);

// Delete product
router.delete("/products/:id", deleteProduct);

// ====================================
// ORDER ROUTES
// ====================================

// Get all orders
router.get("/orders", getOrders);

// Get single order
router.get("/orders/:id", getOrderById);

// Update order status
router.put("/orders/:id/status", updateOrderStatus);

// ====================================
// SETTINGS ROUTES
// ====================================

// Get website settings
router.get("/settings", getSettings);

// Update website settings
router.put("/settings", updateSettings);

module.exports = router;                                                                                                                                                                                                                                                