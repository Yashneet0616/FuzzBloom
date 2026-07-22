const adminService = require("../services/adminService");

// ==========================
// PUBLIC PRODUCTS
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