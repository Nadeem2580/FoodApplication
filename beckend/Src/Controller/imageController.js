import fs from "fs"
import { cloudinaryUplaoder } from "../Config/cloudinary.js"

export const image_contoller = async (req, res) => {
    try {
        if (!req.files || !req.files[0]) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const file = req.files[0];
        console.log(file, "file")
        const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
        console.log(base64, "base64")

        // Upload directly to Cloudinary
        const imageResponse = await cloudinaryUplaoder.upload(base64, {
            folder: "uploads",
        });

        return res.status(200).json({
            message: "Image uploaded successfully",
            status: true,
            data: imageResponse,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false
        })
    }
}