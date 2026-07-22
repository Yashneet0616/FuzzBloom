const express = require("express");
const router = express.Router();

const razorpay = require("../config/razorpay");
const authMiddleware = require("../middleware/authMiddleware");
const { calculateOrder } = require("../services/orderService");

router.post("/create-order", authMiddleware, async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        message: "Cart items are required.",
      });
    }

    // Calculate total securely from Firestore
    const order = await calculateOrder(items);

    // Generate a short receipt (Razorpay max = 40 chars)
    const receipt = `FB_${Date.now().toString().slice(-10)}`;

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(order.total * 100), // Amount in paise
      currency: "INR",
      receipt,
    });

    return res.status(200).json({
      success: true,
      order: razorpayOrder,
      total: order.total,
      items: order.items,
    });
  } catch (error) {
    console.error("Create Order Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create order.",
    });
  }
});

module.exports = router;