// routes/orderRoutes.js
import express from "express";
import { getOrders, placeOrder, updateOrderStatus } from "../../Controller/orderController.js";
const orderRouter = express.Router();

// NOTE: protect these routes with auth middleware as needed
orderRouter.post("/", placeOrder);
orderRouter.patch("/:id", updateOrderStatus);
orderRouter.get("/", getOrders);

export default orderRouter;
