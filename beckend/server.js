import express from "express"
import cors from "cors"
import dbConnect from "./Src/Config/dbConnected.js"
import dotenv from "dotenv"
import imageRoute from "./Src/Routes/imageRoute/imageRoute.js"
import vendorRouter from "./Src/Routes/vendorRoute/restuatrantRoute.js"
import authRouter from "./Src/Routes/authRoute/authRoute.js"
import adminRoute from "./Src/Routes/adminRoute/adminRoute.js"
import http from "http";
import { Server } from "socket.io";
import { socketAuth } from "./Src/Middleware/SocketMidlleware.js"
import orderRouter from "./Src/Routes/orderRoute/oderRoutes.js"

dotenv.config()

// express initialization
const app = express()
const server = http.createServer(app);

app.use(cors())
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5000"],
    credentials: true,
  },
});

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Database Connection
dbConnect()

// Routes (always outside socket connection)
app.use("/api/auth", authRouter)
app.use("/api/vendor", vendorRouter)
app.use("/api/admin", adminRoute)
app.use("/api", imageRoute)
app.use("/api/orders", orderRouter);
app.use("/", (req, res) => res.send("Server Up"))

// Socket connection
socketAuth(io);
io.on("connection", (socket) => {
  console.log("socket connected", socket.id)

  // Example socket event
  socket.on("message", (data) => {
    console.log("Message received:", data)
    io.emit("message", data) // broadcast to all clients
  })
})

// Server running
server.listen(PORT, () => {
  console.log("Server running on port:", PORT)
})
