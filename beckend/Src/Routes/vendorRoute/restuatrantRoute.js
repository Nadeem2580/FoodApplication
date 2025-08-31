import express from "express"
import authMiddleware from "../../Middleware/authMiddleware.js"
import { add_food_controller, create_restaurant, delete_food_controller, delete_restaurant, edit_restaurant_contorller, fetch_food_controller, get_all_restaurant, restaurant_open_controller, update_food_controller } from "../../Controller/restaurantController.js"

const vendorRouter = express.Router()

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



export default vendorRouter
