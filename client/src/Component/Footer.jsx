import React from 'react'
import { Card, Typography, Box, Button, Container, Grid } from "@mui/material";
import logo from "../assets/saylaniPapa.png"
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
const Footer = () => {
  return (
    <Box sx={{ marginTop: "100px", background: "linear-gradient( #aee64eff, #e2ebfaff)", padding: "70px 30px" }}>
      <Container maxWidth="xl">
        <Grid container spacing={2} >
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }} >
            <Box component={"img"} src={logo} sx={{ width: "200px", height: "80px", fill: "#8dc63f" }} />
            <Typography sx={{ marginTop: "10px", color: "#555", fontSize: "14px" }}>
              Your favorite food delivery platform connecting you with the best restaurants in your area.
            </Typography>
            <Box sx={{ marginTop: "20px", display: "flex", gap: "20px" }}>
              <FacebookOutlinedIcon sx={{ color: "#3b82f6" }} />
              <TwitterIcon sx={{ color: "#1DA1F2" }} />
              <InstagramIcon sx={{ color: "#E4405F" }} />
              <LinkedInIcon sx={{ color: "#0A66C2" }} />
            </Box>
          </Grid>


          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }} sx={{ display: "flex", flexDirection: "column", gap: "10px", p: "0 20px" }}>
            <Typography sx={{ fontWeight: "bold", color: "#333", fontSize: "16px", mb: 1 }}>Quick Links</Typography>
            {["Browse Restaurants", "Cuisines", "Special Offers", "Help Center"].map((item, i) => (
              <Typography key={i} sx={{ fontSize: "14px", color: "#555", cursor: "pointer", "&:hover": { color: "#000", textDecoration: "underline" } }}>{item}</Typography>
            ))}
          </Grid>


          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }} sx={{ display: "flex", flexDirection: "column", gap: "10px", p: "0 20px" }}>
            <Typography sx={{ fontWeight: "bold", color: "#333", fontSize: "16px", mb: 1 }}>For Partners</Typography>
            {["Partner with us", "Advertise with us", "Careers", "Privacy Policy"].map((item, i) => (
              <Typography key={i} sx={{ fontSize: "14px", color: "#555", cursor: "pointer", "&:hover": { color: "#000", textDecoration: "underline" } }}>{item}</Typography>
            ))}
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }} sx={{ display: "flex", flexDirection: "column", gap: "14px", p: "0 20px" }}>
            {/* Section Heading */}
            <Typography sx={{ fontWeight: "bold", color: "#333", fontSize: "16px" }}>Stay Connected</Typography>

            {/* Contact Info with Icons */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PhoneIcon sx={{ fontSize: 18, color: "#0A66C2" }} />
              <Typography sx={{ fontSize: "14px", color: "#555" }}>+92 323 1324567</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <EmailIcon sx={{ fontSize: 18, color: "#E4405F" }} />
              <Typography sx={{ fontSize: "14px", color: "#555" }}>hello@fooddeliver.com</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LocationOnIcon sx={{ fontSize: 18, color: "#3b82f6" }} />
              <Typography sx={{ fontSize: "14px", color: "#555" }}>Karachi</Typography>
            </Box>

            {/* Newsletter */}
            <Typography sx={{ fontSize: "14px", color: "#555", mt: 2 }}>Subscribe to our newsletter</Typography>
            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
              <Box component="input" placeholder="Enter your email"
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  outline: "none",
                  fontSize: "14px"
                }}
              />
              <Button variant="contained" sx={{ borderRadius: "8px", px: 3, textTransform: "none", fontSize: "14px" }}>
                Subscribe
              </Button>
            </Box>
          </Grid>

        </Grid>
      </Container>
    </Box>
  )
}

export default Footer