import express from "express"
import cors from "cors"
import dbConnect from "./Src/Config/dbConnected.js"
import dotenv from "dotenv"
import authRouter from "./Src/Routes/authRoute.js"

dotenv.config()
// express initialization
const app = express()

const PORT = process.env.PORT
// All needfull configuration of production
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Database Connection
dbConnect()

// All Routes
app.use("/api/auth/", authRouter)
app.use("/", (req, res) => res.send("Server Up"))


// Server running and listing 
app.listen(PORT, () => { console.log("Server running or port : ", PORT) })