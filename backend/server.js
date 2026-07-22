const express = require("express");
const cors = require("cors");
require("dotenv").config();

const paymentRoutes = require("./routes/payment");
const verifyPaymentRoutes = require("./routes/verifyPayment");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const addressRoutes = require("./routes/addresses");
const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/orders");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Backend is running 🚀",
  });
});

app.use("/api/payment", paymentRoutes);
app.use("/api/verify-payment", verifyPaymentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/addresses", addressRoutes);  
app.use("/api/products", productRoutes);     
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);                     
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});