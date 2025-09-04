import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import saylaniPapa from "../../assets/saylaniPapa.png"
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Cookie from "js-cookie"
import axios from "../../Pages/Utils/axiosConfig"
import { useDispatch, useSelector } from 'react-redux';
import { setIsRefresh, setRole } from '../../ReduxSlices/slices';
import { motion } from "framer-motion";

function Navbar() {
  const { isRefresh } = useSelector((store) => store.Counter)
  let dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutFunc = () => {
    Cookie.remove("token")
    Cookie.set(null)
    axios.defaults.baseURL = ""
    dispatch(setRole(null))
    dispatch(setIsRefresh(!isRefresh))
    navigate("/")
  }

  // Parent container animation for buttons (staggered children)
  const buttonContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.25 } // delay between each button
    }
  }

  // Individual button animation
  const buttonItem = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } }
  }

  return (
    <>
      <AppBar position="sticky" sx={{ background: "#8dc63f", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
        <Container maxWidth="xl">
          <Stack justifyContent={"space-between"} direction={"row"} alignItems="center">

            {/* Logo left to right */}
            <motion.img
              src={saylaniPapa}
              alt="logo"
              width={200}
              height={80}
              initial={{ x: -150, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 3, type: "spring" }}
            />

            {/* Basket + Buttons staggered */}
            <motion.div
              style={{ display: "flex", gap: "15px", alignItems: "center" }}
              variants={buttonContainer}
              initial="hidden"
              animate="show"
            >
              {/* Basket */}
              <motion.div variants={buttonItem}>
                <IconButton>
                  <ShoppingCartIcon sx={{ color: "#fff" }} />
                </IconButton>
              </motion.div>

              {/* Sign in */}
              <motion.div variants={buttonItem}>
                <Link to={"/login"} style={{ textDecoration: "none" }}>
                  <Button sx={{ background: "white", padding: "10px 20px", fontSize: "13px", fontWeight: "700", ":hover": { background: "#3b82f6", color: "#fff" } }}>
                    <PersonOutlineIcon /> Sign in
                  </Button>
                </Link>
              </motion.div>

              {/* Logout */}
              <motion.div variants={buttonItem}>
                <Button onClick={logoutFunc} variant='contained' sx={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "10px", fontWeight: 700 }}>
                  Log out <LogoutIcon sx={{ fontSize: "12px", color: "#fff" }} />
                </Button>
              </motion.div>
            </motion.div>
          </Stack>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
}

export default Navbar;
