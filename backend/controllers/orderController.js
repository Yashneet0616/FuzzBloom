const {
  getUserOrders,
  getOrderById,
} = require("../services/customerOrderService");

exports.getOrders = async (req, res) => {
  try {
    const orders = await getUserOrders(req.user.uid);

    res.json({
      success: true,
      orders,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await getOrderById(
      req.user.uid,
      req.params.id
    );

    res.json({
      success: true,
      order,
    });
  } catch (err) {
    console.error(err);

    if (
      err.message === "Order not found." ||
      err.message === "Unauthorized."
    ) {
      return res.status(404).json({
        success: false,
        message: err.message,
      });
    }

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};