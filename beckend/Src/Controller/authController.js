import userModel from "../Model/schema.js"
import bcrypt, { genSalt } from "bcryptjs"
import jwt from "jsonwebtoken"


export const login_controller = async (req, res) => {
    try {
        const { email, password } = req.body
        const isExist = await userModel.findOne({ email: email })
        if (!isExist) {
            return res.status(400).json({
                message: "email and password is invalid",
                status: false
            })
        }
        const comparePassword = await bcrypt.compare(password, isExist.password)
        if (!comparePassword) {
            return res.status(400).json({
                message: "email and password is invalid",
                status: false
            })
        }
        const PRIVATE_KEY = process.env.PRIVATE_KEY
        const token = jwt.sign({ id: isExist._id }, PRIVATE_KEY)
        res.status(200).json({
            message: "Conratulation! successfully logged in",
            status: true,
            data: isExist,
            token
        })
    } catch (error) {
        res.status(500).json({ status: false, message: error.message || "Something went wrong" })
    }
}

export const signup_controller = async (req, res) => {
    try {

        const body = req.body
        const isEmail = await userModel.findOne({ email: body.email })
        if (isEmail) {
            return res.status(400).json({
                message: "This account already exist",
                status: false
            })
        }
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(body.password, salt)

        const userObj = {
            ...body,
            password: passwordHash
        }
        const user = await userModel.create(userObj)
        res.status(201).json({
            message: "Conratulation! you have successfully Signup",
            status: true,
            data: user
        })

    } catch (error) {
        res.status(500).json({ status: false, message: error.message || "Something went wrong" })
    }
}

export const single_user_contoller = async (req, res) => {
    try {
        const userId = req.user.id
        const user = await userModel.findById(userId)
        res.status(200).json({
            message: "Successfully get user",
            status: true,
            data: user.type
        })
    } catch (error) {
        res.status(500).json({ status: false, message: error.message || "Something went wrong" })

    }
}