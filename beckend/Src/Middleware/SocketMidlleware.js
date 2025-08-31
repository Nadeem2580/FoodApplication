// socketAuth.js
import jwt from "jsonwebtoken";

export function socketAuth(io){
  // simple auth middleware for sockets
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token || (socket.handshake.headers?.authorization || "").split(" ")[1];
      if (!token) return next(); // allow unauthenticated but skip user info
      const user = jwt.verify(token, process.env.JWT_SECRET || "YOUR_JWT_SECRET");
      socket.user = user; // user: { _id, role, restaurantId? }
      next();
    } catch (err) {
      // reject if token invalid
      next(new Error("UNAUTHORIZED"));
    }
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id, "user:", socket.user?._id ?? "guest");

    // auto-join rooms if user info present
    if (socket.user?._id) socket.join(`user:${socket.user._id}`);
    if (socket.user?.role === "vendor" && socket.user?.restaurantId) {
      socket.join(`vendor:${socket.user.restaurantId}`);
    }

    socket.on("order:join", (orderId) => {
      if (orderId) socket.join(`order:${orderId}`);
    });

    socket.on("order:leave", (orderId) => {
      if (orderId) socket.leave(`order:${orderId}`);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected", socket.id);
    });
  });
}
