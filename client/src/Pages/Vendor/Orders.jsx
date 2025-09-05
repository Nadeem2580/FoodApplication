import { useEffect, useState } from 'react';
import api from '../Utils/axiosConfig';
import toastAlert from '../Utils/utils';

import { Box, Card, CardContent, Container, Divider, FormControl, Grid, InputLabel, List, ListItem, ListItemText, MenuItem, Select, Typography } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { io } from "socket.io-client";
import Loading from '../../../Loader/Loading';
import { setIsRefresh } from '../../ReduxSlices/slices';
const Orders = () => {
  const [orders, setOrder] = useState([])
  const [socket, setSocket] = useState(null);
  const { isRefresh } = useSelector((store) => store.Counter)
  const dispatch = useDispatch()
  const statusOptions = ["pending", "accepted", "preparing", "on_the_way", "delivered", "rejected"];
  useEffect(() => {
    fetchOrder()
  }, [isRefresh])



useEffect(() => {
  const newSocket = io("http://localhost:5000", { withCredentials: true });
  setSocket(newSocket);

  // ✅ use newSocket directly
  newSocket.on("order_status_updated", (updatedOrder) => {
    setOrder(prev => prev.map(o => o._id === updatedOrder._id ? updatedOrder : o));
  });

  newSocket.on("message", (msg) => {
    console.log("Message received:", msg);
  });

  return () => {
    newSocket.off("order_status_updated");
    newSocket.off("message");
    newSocket.disconnect();
  };
}, []);



  const fetchOrder = async () => {
    try {
      const orders = await api.get("/api/vendor/order")
      setOrder(orders.data.data)
    } catch (error) {
      toastAlert({
        message: error.message || "Something went wrong",
        type: "error"
      })
    }
  }


  const orderStatus = async (id, status) => {
    try {
      const response = await api.patch(`/api/vendor/order/${id}`, { status });
      const updatedOrder = response.data.data;

      // ✅ Notify backend via socket
      socket.emit("update_order_status", updatedOrder);

      dispatch(setIsRefresh(!isRefresh));
      toastAlert({
        message: "Status updated",
        type: "success"
      });
    } catch (error) {
      toastAlert({
        message: error.message || "Something went wrong",
        type: "error"
      });
    }
  };


 return (
  orders.length === 0 ? (
    <Loading />
  ) : (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        {orders.map((order, index) => (
          <Grid key={index} size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
            <Card
              sx={{
                maxWidth: 400,
                borderRadius: 2,
                boxShadow: 3,
                bgcolor: "#fafafa",
                transition: "transform 0.2s ease",
                "&:hover": { transform: "scale(1.03)", boxShadow: 6 },
              }}
            >
              <CardContent sx={{ py: 1.5, px: 2 }}>
                {/* Header */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="subtitle1" fontWeight="600" color="text.primary">
                    Order #{order?._id.slice(-6).toUpperCase()}
                  </Typography>
                  <FormControl size="small" sx={{ minWidth: 130 }}>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={order.status}
                      label="Status"
                      onChange={(e) => orderStatus(order._id, e.target.value)}
                      sx={{ textTransform: "capitalize" }}
                      size="small"
                    >
                      {statusOptions.map((status) => (
                        <MenuItem
                          key={status}
                          value={status}
                          sx={{ textTransform: "capitalize" }}
                        >
                          {status.replace(/_/g, " ")}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Divider />

                {/* Order Items */}
                <Typography variant="subtitle2" fontWeight="600" mt={1} mb={0.5}>
                  Items:
                </Typography>
                <List dense disablePadding sx={{ maxHeight: 120, overflowY: "auto" }}>
                  {order.items.map((item) => (
                    <ListItem key={item._id} sx={{ px: 0 }}>
                      <ListItemText
                        primary={`${item.name} (x${item.quantity})`}
                        primaryTypographyProps={{ fontSize: 13 }}
                        secondary={`Price: Rs. ${item.price}`}
                        secondaryTypographyProps={{ fontSize: 11, color: "text.secondary" }}
                      />
                      <Typography
                        fontWeight="600"
                        fontSize={13}
                        color="primary.main"
                        sx={{ minWidth: 55, textAlign: "right" }}
                      >
                        Rs.{item.price * item.quantity}
                      </Typography>
                    </ListItem>
                  ))}
                </List>

                <Divider sx={{ my: 1 }} />

                {/* Summary */}
                <Box display="flex" justifyContent="space-between" mb={0.7}>
                  <Typography variant="body2" fontWeight="600" color="text.primary">
                    Payment:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ textTransform: "capitalize", color: "text.secondary" }}
                  >
                    {order.paymentMethod.replace(/_/g, " ")}
                  </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" fontWeight="600" color="text.primary">
                    Total:
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="700" color="primary.main">
                    Rs.{order.totalAmount}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
);

};

export default Orders;
