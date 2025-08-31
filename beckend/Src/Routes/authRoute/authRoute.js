import express from "express"
import { login_controller, signup_controller, single_user_contoller } from "../../Controller/authController.js"
import authMiddleware from "../../Middleware/authMiddleware.js"

const authRouter = express.Router()

authRouter.post("/login", login_controller)
authRouter.post("/signup", signup_controller)
authRouter.get("/single-user", authMiddleware, single_user_contoller)


export default authRouter