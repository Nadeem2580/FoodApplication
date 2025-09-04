import fs from "fs"
import { cloudinaryUplaoder } from "../Config/cloudinary.js"

export const image_contoller = async (req, res) => {
    try {
        // any k lye hum files[0] use karte hain
        // agar hum single use karenge to hamen file milega object mil jayega path isi main
        const filePath = req.files[0].path
        if (!filePath) {
            return res.status(400).json({
                message: "no file uploaded"
            })
        }
        const imageResponse = await cloudinaryUplaoder.upload(filePath)

        fs.unlink(filePath, (err, res) => {
            // 
        })

        res.status(200).json({
            message: "success",
            status: true,
            data: imageResponse
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false
        })
    }
}