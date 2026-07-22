const adminService = require("../services/adminService");

// ==========================
// PRODUCTS
// ==========================

exports.getProducts = async (req, res) => {
  try {
    const products = await adminService.getProducts();

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Get Products Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch products.",
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await adminService.getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Get Product Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch product.",
    });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const product = await adminService.addProduct(req.body);

    return res.status(201).json({
      success: true,
      message: "Product added successfully.",
      product,
    });
  } catch (error) {
    console.error("Add Product Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add product.",
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    await adminService.updateProduct(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Product updated successfully.",
    });
  } catch (error) {
    console.error("Update Product Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update product.",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await adminService.deleteProduct(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Product Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete product.",
    });
  }
};

// ==========================
// ORDERS
// ==========================

exports.getOrders = async (req, res) => {
  try {
    const orders = await adminService.getOrders();

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Get Orders Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders.",
    });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await adminService.getOrderById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Get Order Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch order.",
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    await adminService.updateOrderStatus(req.params.id, status);

    return res.status(200).json({
      success: true,
      message: "Order updated successfully.",
    });
  } catch (error) {
    console.error("Update Order Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update order.",
    });
  }
};
// ==========================
// SETTINGS
// ==========================

exports.getSettings = async (req, res) => {
  try {
    const settings = await adminService.getSettings();

    return res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error("Get Settings Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch settings.",
    });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const settings = await adminService.updateSettings(req.body);

    return res.status(200).json({
      success: true,
      message: "Settings updated successfully.",
      settings,
    });
  } catch (error) {
    console.error("Update Settings Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update settings.",
    });
  }
};