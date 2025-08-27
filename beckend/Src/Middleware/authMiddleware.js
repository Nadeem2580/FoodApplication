import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next) => {
    try {
        const authorCheck = req.headers.authorization
        if (!authorCheck) {
            res.status(400).json({
                message: "Unauthorized",
                status: false,
            })
        }
        const token = authorCheck.split(" ")[1]
        const isVerify = jwt.verify(token, process.env.PRIVATE_KEY)
        if (isVerify?.id) {
            req.user = isVerify
            next()
        }
        else {
            res.status(200).json({
                message: "Unauthorized",
                status: false,
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || "Something went wrong",
            status: false
        })
    }
}

export default authMiddleware