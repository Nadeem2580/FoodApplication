// src/hooks/useOrderSocket.js

import { useEffect } from "react";
import { connectSocket ,getSocket } from "./socket";

/**
 * token: JWT token string
 * handlers: { onNewOrder, onOrderUpdate, onVendorUpdate }
 */
export default function useOrderSocket(token, handlers = {}) {
  useEffect(() => {
    const s = connectSocket(token);

    if (handlers.onConnect) {
      s.on("connect", () => handlers.onConnect(s.id));
    }
    if (handlers.onNewOrder) {
      s.on("order:new", handlers.onNewOrder);
    }
    if (handlers.onOrderUpdate) {
      s.on("order:update", handlers.onOrderUpdate);
    }
    if (handlers.onVendorUpdate) {
      s.on("order:updatedOnVendor", handlers.onVendorUpdate);
    }

    return () => {
      if (!s) return;
      if (handlers.onNewOrder) s.off("order:new", handlers.onNewOrder);
      if (handlers.onOrderUpdate) s.off("order:update", handlers.onOrderUpdate);
      if (handlers.onVendorUpdate) s.off("order:updatedOnVendor", handlers.onVendorUpdate);
      if (handlers.onConnect) s.off("connect");
    };
  }, [token, handlers]);
}
