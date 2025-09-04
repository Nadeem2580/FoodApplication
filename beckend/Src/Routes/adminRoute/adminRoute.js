import express from "express"
import { get_all_food, get_all_restaurants, get_all_users, get_update_restaurant, get_update_user_vendor, } from "../../Controller/adminController.js"
import authMiddleware from "../../Middleware/authMiddleware.js"

const adminRoute = express.Router()

adminRoute.get("/restaurants", authMiddleware, get_all_restaurants)
adminRoute.get("/food", authMiddleware, get_all_food)
adminRoute.get("/users", authMiddleware, get_all_users)
adminRoute.patch("/updat-content/:id", authMiddleware, get_update_user_vendor)
adminRoute.patch("/updat-restaurant/:id", authMiddleware, get_update_restaurant)

export default adminRoute