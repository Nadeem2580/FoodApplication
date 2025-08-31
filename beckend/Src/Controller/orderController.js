// controllers/orderController.js
import ordersSchema from "../Model/orderModel.js";

/**
 * POST /api/orders
 * Body: { restaurantId, items[], totalAmount }
 * req.user expected from auth (if available)
 */
export const placeOrder = async (req, res) => {
  try {
    const io = req.app.get("io");
    const { restaurantId, items, totalAmount } = req.body;
    const customerId = req.user?._id || null; // optional
    const order = await ordersSchema.create({ customerId, restaurantId, items, totalAmount, status: "pending" });

    // notify vendor room
    io.to(`vendor:${restaurantId}`).emit("order:new", order);

    // optionally notify specific admin/others
    return res.json({ status: true, data: order });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: err.message });
  }
};

/**
 * PATCH /api/orders/:id
 * Body: { status }
 * Should validate that only vendor/admin can update etc.
 */
export const updateOrderStatus = async (req, res) => {
  try {
    const io = req.app.get("io");
    const { id } = req.params;
    const { status } = req.body;
    const order = await ordersSchema.findByIdAndUpdate(id, { status }, { new: true });

    if (!order) return res.status(404).json({ status: false, message: "Order not found" });

    // notify customer and order room
    if (order.customerId) io.to(`user:${order.customerId}`).emit("order:update", order);
    io.to(`order:${order._id}`).emit("order:update", order);
    io.to(`vendor:${order.restaurantId}`).emit("order:updatedOnVendor", order);

    return res.json({ status: true, data: order });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: err.message });
  }
};

export const getOrders = async (req,res) => {
  try {
    const { vendorId, customerId } = req.query;
    const query = {};
    if (vendorId) query.restaurantId = vendorId;
    if (customerId) query.customerId = customerId;
    const orders = await ordersSchema.find(query).sort({ createdAt: -1 });
    return res.json({ status: true, data: orders });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};
