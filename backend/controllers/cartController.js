const cartService = require("../services/cartService");

// ==========================
// GET CART
// ==========================
exports.getCart = async (req, res) => {
  try {
    const cart = await cartService.getCart(req.user.uid);

    return res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    console.error("Get Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch cart.",
    });
  }
};

// ==========================
// ADD TO CART
// ==========================
exports.addToCart = async (req, res) => {
  try {
    await cartService.addToCart(req.user.uid, req.body);

    return res.status(200).json({
      success: true,
      message: "Product added to cart.",
    });
  } catch (error) {
    console.error("Add Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add product to cart.",
    });
  }
};

// ==========================
// UPDATE QUANTITY
// ==========================
exports.updateQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;

    await cartService.updateQuantity(
      req.user.uid,
      req.params.productId,
      quantity
    );

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully.",
    });
  } catch (error) {
    console.error("Update Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update cart.",
    });
  }
};

// ==========================
// REMOVE ITEM
// ==========================
exports.removeItem = async (req, res) => {
  try {
    await cartService.removeItem(
      req.user.uid,
      req.params.productId
    );

    return res.status(200).json({
      success: true,
      message: "Item removed from cart.",
    });
  } catch (error) {
    console.error("Remove Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to remove item.",
    });
  }
};

// ==========================
// CLEAR CART
// ==========================
exports.clearCart = async (req, res) => {
  try {
    await cartService.clearCart(req.user.uid);

    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully.",
    });
  } catch (error) {
    console.error("Clear Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to clear cart.",
    });
  }
};