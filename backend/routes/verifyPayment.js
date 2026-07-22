const express = require("express");
const crypto = require("crypto");
const { db } = require("../config/firebaseAdmin");
const { FieldValue } = require("firebase-admin/firestore");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

function generateOrderNumber() {
  const timestamp = Date.now().toString().slice(-6);
  return `FB-${timestamp}`;
}

router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customer,
      items,
      referenceFile = null,
    } = req.body;

    if (!customer || !items || !Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        message: "Missing order information.",
      });
    }

    // Verify Razorpay signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature.",
      });
    }

    // Prevent duplicate payment
    const existing = await db
      .collection("orders")
      .where("payment.razorpayPaymentId", "==", razorpay_payment_id)
      .limit(1)
      .get();

    if (!existing.empty) {
      return res.status(409).json({
        success: false,
        message: "Payment already processed.",
      });
    }

    // Recalculate prices from Firestore
    const validatedItems = [];
    let total = 0;

    for (const item of items) {
      const productDoc = await db
        .collection("products")
        .doc(item.id)
        .get();

      if (!productDoc.exists) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.id}`,
        });
      }

      const product = productDoc.data();

      const quantity = Number(item.quantity);
      const price = Number(product.price);

      if (quantity <= 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid product quantity.",
        });
      }

      validatedItems.push({
        id: productDoc.id,
        name: product.name,
        image: product.image,
        category: product.category,
        quantity,
        price,
        total: quantity * price,
      });

      total += quantity * price;
    }

    // Create Firestore Order
    const orderRef = await db.collection("orders").add({
      uid: req.user.uid,

      orderNumber: generateOrderNumber(),

      customer,

      items: validatedItems,

      total,

      payment: {
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: "Paid",
      },

      referenceFile,

      status: "Pending",

      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

    return res.status(200).json({
      success: true,
      orderId: orderRef.id,
      orderNumber: generateOrderNumber(),
      total,
    });

  } catch (error) {
    console.error("Verify Payment Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Payment verification failed.",
    });
  }
});

module.exports = router;