import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import orderImage from "../../assets/order.gif";
import { clearCart } from "../../ReduxSlices/AddToCart";

const ConfirmOrdder = ({ orderId }) => {   // 🔹 orderId props se ya API response se lena hoga
    const { items } = useSelector((store) => store.cart);
    const [orderStatus, setOrderStatus] = useState("pending"); // 🔹 default pending
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentStatus, setCurrentStatus] = useState(null)
    const socket = io("http://localhost:5000", { withCredentials: true });
    useEffect(() => {
        socket.on("connect", () => {
        });

        // Listen for order status update
        socket.on("order_status_updated", (updatedOrder) => {
            setCurrentStatus(updatedOrder)
            // Sirf current order ka status update karein
            if (updatedOrder._id === orderId) {
                setOrderStatus(updatedOrder.status);
            }
        });

        return () => {
            socket.off("connect");
            socket.off("order_status_updated");
        };
    }, [orderId]);

    return (
        <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", bgcolor: "#f9fafb", p: 2 }}>
            <Paper elevation={6} sx={{ width: { xs: "100%", sm: "90%", md: "70%", lg: "50%", xl: "40%" }, p: 3, borderRadius: "16px", textAlign: "center" }}>

                {/* Success Animation */}
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                    <Box component="img" src={orderImage} alt="Order Confirmed" sx={{ maxWidth: "400px", maxHeight: "250px" }} />
                </Box>

                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#16a34a", mb: 1 }}>
                    🎉 Order Confirmed!
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Your order has been placed successfully.
                </Typography>

                <Divider sx={{ mb: 2 }} />

                {/* ✅ Live Order Status */}
                <Box sx={{ mb: 3, p: 2, borderRadius: "10px", bgcolor: "#e0f2fe" }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#0369a1" }}>
                        Current Status: {currentStatus?.status == null ? "Pending" : currentStatus?.status}
                    </Typography>
                </Box>

                {/* Order Details */}
                <Box sx={{ textAlign: "left", mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>Order Summary</Typography>

                    {items?.map((item, index) => (
                        <Box key={index} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                            <Box component="img" src={item?.imageUrl} alt={item?.name} sx={{ width: 90, height: 60, borderRadius: 2, mr: 2 }} />
                            <Typography>{item?.name} x {item.quantity}</Typography>
                            <Typography>Rs. {item?.price}</Typography>
                        </Box>
                    ))}

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
                        <Typography>Total Amount</Typography>
                        <Typography>Rs. {items?.reduce((acc, item) => acc + item?.price * item?.quantity, 0)}</Typography>
                    </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Delivery Info */}
                <Box sx={{ textAlign: "left", mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>Delivery Information</Typography>
                    <Typography>💳 Payment Method: <b>Cash on Delivery</b></Typography>
                </Box>

                {/* Buttons */}
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
                    {currentStatus?.status === "rejected" ? <Button variant="outlined" color="error" onClick={() => {
                        dispatch(clearCart());
                        navigate("/user-dashboard", { replace: true });
                    }}>Back to Home</Button>
                        : currentStatus?.status === "delivered" ? <Button variant="outlined" color="success" onClick={() => {
                            dispatch(clearCart());
                            navigate("/user-dashboard", { replace: true });
                        }}>Back to Home</Button> : null}
                </Box>
            </Paper >
        </Box >
    );
};

export default ConfirmOrdder;
