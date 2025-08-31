
// const Orders = () => {
//   return (
//     <div>Orders</div>
//   )
// }

import { useEffect } from "react";
import api from "../Utils/axiosConfig";
import useOrderSocket from "../../Socket/useOrderSocket";
import { useState } from "react";

// export default Order
// src/pages/VendorDashboard.jsx

export default function VendorDashboard({ token, restaurantId }) {
  const [orders, setOrders] = useState([]);

  // initial fetch
  useEffect(() => {
    const load = async () => {
      const res = await api.get(`/orders?vendorId=${restaurantId}`);
      setOrders(res.data.data);
    };
    load();
  }, [restaurantId]);

  const onNewOrder = (order) => {
    setOrders(prev => [order, ...prev]);
  };

  const onOrderUpdated = (order) => {
    setOrders(prev => prev.map(o => o._id === order._1 ? order : (o._id === order._id ? order : o)));
  };

  useOrderSocket(token, { onNewOrder, onVendorUpdate: onOrderUpdated });

  const accept = async (orderId) => {
    await api.patch(`/orders/${orderId}`, { status: "accepted" });
    // server will emit updates; but optimistically update too:
    setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: "accepted" } : o));
  };

  return (
    <div>
      <h2>Vendor Dashboard - Incoming Orders</h2>
      <ul>
        {orders.map(o => (
          <li key={o._id}>
            {o._id} - {o.totalAmount} - {o.status}
            {o.status === "pending" && <button onClick={() => accept(o._id)}>Accept</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}
