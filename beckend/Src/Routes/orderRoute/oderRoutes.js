// routes/orderRoutes.js
import express from "express";
import { all_food_home_restaurant, all_food_restaurant, confirm_order, fetch_order_user, fetch_restaurant } from "../../Controller/orderController.js";
import authMiddleware from "../../Middleware/authMiddleware.js";
const orderRouter = express.Router();


orderRouter.get("/restaurant", authMiddleware, fetch_restaurant)
orderRouter.get("/all-home-foods/:id", all_food_home_restaurant)
orderRouter.get("/all-foods/:id", authMiddleware, all_food_restaurant)
orderRouter.post("/confirm-order", authMiddleware, confirm_order)
orderRouter.get("/get-order", authMiddleware, fetch_order_user)



export default orderRouter;
