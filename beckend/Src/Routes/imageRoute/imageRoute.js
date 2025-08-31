
import express from "express"
import authMiddleware from "../../Middleware/authMiddleware.js"
import { image_contoller } from "../../Controller/imageController.js"
import upload from "../../Middleware/multer.js"


const imageRoute = express.Router()

imageRoute.post("/image-upload", authMiddleware, upload.any("image"), image_contoller)


export default imageRoute