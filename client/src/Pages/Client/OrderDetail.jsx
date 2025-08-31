// src/pages/OrderDetail.jsx
import  { useEffect, useState } from "react";
import api from "../api";
import { connectSocket, getSocket } from "../../Socket/socket";

export default function OrderDetail({ orderId, token }) {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const res = await api.get(`/orders?customerId=${localStorage.getItem("userId")}`); // or specific endpoint
      const found = res.data.data.find(o => o._id === orderId);
      if (mounted) setOrder(found || null);
    };
    load();

    const s = getSocket() || connectSocket(token);
    s.emit("order:join", orderId);

    const onUpdate = (updated) => {
      if (mounted && updated._id === orderId) setOrder(updated);
    };
    s.on("order:update", onUpdate);

    return () => {
      mounted = false;
      s.emit("order:leave", orderId);
      s.off("order:update", onUpdate);
    };
  }, [orderId, token]);

  if (!order) return <div>Loading order...</div>;
  return <div>Order {order._id} status: {order.status}</div>;
}
