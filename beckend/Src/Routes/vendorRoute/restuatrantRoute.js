import express from "express"
import { add_food_controller, all_restaurant, create_restaurant, delete_food_controller, delete_restaurant, edit_restaurant_contorller, fetch_food_controller, fetch_order, get_all_restaurant, restaurant_open_controller, updata_status, update_food_controller } from "../../Controller/restaurantController.js"
import authMiddleware from "../../Middleware/authMiddleware.js"

const vendorRouter = express.Router()

vendorRouter.get("/all-restaurant", all_restaurant)
vendorRouter.post("/restaurant", authMiddleware, create_restaurant)
vendorRouter.get("/restaurant", authMiddleware, get_all_restaurant)
vendorRouter.delete("/restaurant/:id", authMiddleware, delete_restaurant)
vendorRouter.put("/restaurant/:id", authMiddleware, edit_restaurant_contorller)
vendorRouter.patch("/restaurant/:id", authMiddleware, restaurant_open_controller)

// /Food Reoutes
vendorRouter.post("/add-food", authMiddleware, add_food_controller)
vendorRouter.get("/food", authMiddleware, fetch_food_controller)
vendorRouter.put("/add-food/:id", authMiddleware, update_food_controller)
vendorRouter.delete("/food/:id", authMiddleware, delete_food_controller)

// /Food Orders
vendorRouter.get("/order", authMiddleware, fetch_order)
vendorRouter.patch("/order/:id", authMiddleware, updata_status)

export default vendorRouter
