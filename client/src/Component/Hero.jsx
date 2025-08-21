import React from 'react'
import pizza from "../assets/pizza.jpg"
import { Box, Button, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
const Hero = () => {
    return (
        <Box
            sx={{
                minHeight: "87vh", backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(${pizza})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>

            <Typography
                sx={{ background: "linear-gradient(90deg, #fff,#fff, #8dc63f, #3b82f6)", fontSize: { xs: "2rem", sm: "3rem", md: "4rem", lg: "5rem" }, fontWeight: "800", lineHeight: "1", backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent", WebkitTextFillColor: "transparent", textShadow: "2px 2px 8px rgba(0,0,0,0.4)"}}>
                Delicious Food
            </Typography>
            <Typography
                sx={{
                    background: "linear-gradient(90deg, #fff,#fff, #8dc63f, #3b82f6)",
                    fontSize: { xs: "2rem", sm: "3rem", md: "4rem", lg: "5rem" },
                    fontWeight: "800",
                    lineHeight: "1",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    WebkitTextFillColor: "transparent",
                    textShadow: "2px 2px 8px rgba(0,0,0,0.4)"
                }}
            >
                Delivered Fast
            </Typography>


            <Typography sx={{ color: "#3b82f6", fontSize: "1.8rem", textAlign: "center" }}>
                Order from your favorite restaurants and get it delivered in <Box component={"span"} sx={{ display: "block", color: "#8dc63f", fontWeight: "700" }}> Minutes</Box>
            </Typography>

            <Box
                sx={{
                    width: { xs: "90%", sm: "70%", md: "50%" }, display: "flex", alignItems: "center", margin: "20px auto", padding: "5px", border: "2px solid #8dc63f", background: "#8dc63f", borderRadius: "50px", // fully rounded boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                }}
            >
                <Box component="input" placeholder="Search for restaurants" sx={{ flex: 1, border: "none", outline: "none", padding: "12px 16px", background: "transparent", color: "#fff", fontSize: "16px", "::placeholder": { color: "#f1f1f1", opacity: 0.9 } }} />
                <Button
                    sx={{ border: "1px solid #fff", color: "#fff", padding: "10px 25px", borderRadius: "50px", fontWeight: "bold", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(6px)", textTransform: "none", transition: "all 0.3s ease", "&:hover": { background: "#fff", color: "#8dc63f", borderColor: "#8dc63f" } }}>
                    <FilterAltIcon sx={{ fontSize: "18px", marginRight: "6px" }} />
                    Search
                </Button>
            </Box>
        </Box>
    )
}

export default Hero