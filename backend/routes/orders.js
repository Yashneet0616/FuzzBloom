const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  getOrders,
  getOrder,
} = require("../controllers/orderController");

router.use(authMiddleware);

router.get("/", getOrders);

router.get("/:id", getOrder);

module.exports = router;