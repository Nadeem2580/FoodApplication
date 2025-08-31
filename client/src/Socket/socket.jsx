// src/socket.js
import { io } from "socket.io-client";

let socket = null;

/**
 * Connect socket once and reuse.
 * token may be null (guest) or valid JWT
 */
export const connectSocket = (token) => {
  if (socket && socket.connected) return socket;
  socket = io(process.env.VITE_BASE_URL || "http://localhost:5000", {
    auth: { token },
    transports: ["websocket"],
    autoConnect: true
  });
  socket.on("connect_error", (err) => console.error("Socket connect_error", err.message));
  return socket;
};

export const getSocket = () => socket;
