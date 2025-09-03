import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Divider, IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, clearCart, decreaseQuantity, removeFromCart } from "../../ReduxSlices/AddToCart";
import api from "../../Pages/Utils/axiosConfig";
import toastAlert from "../../Pages/Utils/utils";


export default function CartSideBar({ open, setOpen }) {
  const { items } = useSelector((store) => store.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const barClose = () => {
    setOpen(false)
  }

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const clearItem = () => {
    dispatch(clearCart());
  };

  console.log(items)

  const confirmOrderFunc = async () => {

    try {
      const res = await api.post("/api/orders/confirm-order", items)
      barClose(); navigate("/confirm-orders");
      toastAlert({
        message: "Order created successfully",
        type: "success"
      })
    } catch (error) {
      console.log(error.message)
      toastAlert({
        message: error.message,
        type: "error"
      })
    }


  }


  return (
    <div>


      {/* Right Side Drawer */}
      <SwipeableDrawer anchor="right" open={open} onClose={barClose}>
        <Box sx={{ width: 400, display: "flex", flexDirection: "column", height: "100%" }}>
          {/* Header */}
          <Box
            sx={{
              borderRadius: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
              backgroundColor: "#8dc63f"
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "700", color: "#fff", display: "flex", alignItems: "center" }}
            >
              <ShoppingCartIcon sx={{ color: "#fff", fontSize: "25px", mr: 1 }} />
              Your Cart
            </Typography>
            <IconButton onClick={barClose} sx={{ color: "#fff" }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider />

          {/* Cart Items */}
          <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
            {items.length > 0 ? (
              items.map((item, index) => (
                <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  {/* Image */}
                  <Box
                    component="img"
                    src={item.imageUrl}
                    alt={item.name}
                    sx={{ width: 80, height: 80, borderRadius: 2, mr: 2 }}
                  />
                  {/* Details */}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Rs. {item.price}
                    </Typography>
                    {/* Quantity controls */}
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      <Button size="small" variant="outlined" onClick={() => dispatch(decreaseQuantity(item._id))}>-</Button>
                      <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                      <Button size="small" variant="outlined" onClick={() => dispatch(addToCart(item))}>+</Button>
                    </Box>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography align="center" color="text.secondary">Cart is empty</Typography>
            )}
          </Box>

          {/* Footer */}
          <Divider />
          <Typography variant="subtitle1" sx={{ margin: "20px 15px " }}>
            Cash on Delivery
          </Typography>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Total: Rs. {items.reduce((acc, item) => acc + item.price * item.quantity, 0)}
            </Typography>
            <Button sx={{ marginTop: "10px" }} onClick={confirmOrderFunc} variant="contained" color="primary" fullWidth>
              Confirm order
            </Button>
          </Box>


          <Divider />

          {/* Footer */}

        </Box>
      </SwipeableDrawer>

    </div>
  );
}
// 