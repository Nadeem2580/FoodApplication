// src/pages/PlaceOrder.jsx
import React, { useState } from "react";
import { connectSocket, getSocket } from "../socket";
import api from "../Utils/axiosConfig";

export default function PlaceOrder({ token }) {
  const [placing, setPlacing] = useState(false);
  const [items] = useState([
    { foodId: "f1", name: "Burger", qty: 1, price: 300 },
    { foodId: "f2", name: "Fries", qty: 1, price: 150 }
  ]);

  const place = async () => {
    try {
      setPlacing(true);
      const body = { restaurantId: "6123456789abcdef01234567", items, totalAmount: 450 };
      const res = await api.post("/orders", body);
      const order = res.data.data;
      // join order room for live updates
      const s = getSocket() || connectSocket(token);
      s.emit("order:join", order._id);
      alert("Order placed: " + order._id);
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setPlacing(false);
    }
  };

  return <button onClick={place} disabled={placing}>{placing ? "Placing..." : "Place Order"}</button>;
}
