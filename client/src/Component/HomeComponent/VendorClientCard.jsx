import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import vendor from "../../assets/vendor.png"
import client from "../../assets/client.png"

const VendorClientCard = () => {
  return (
    <Container sx={{ margin: "20px auto" }}>
      <Grid container spacing={4}>
        {/* Vendor Card */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ transition: "0.3s", ":hover": { transform: "translateY(-5px)" }, background: "linear-gradient( #f8ffecff, #e2ebfaff)", borderRadius: "20px" }}>
          <Stack justifyContent={"center"} alignItems={"center"} sx={{ border: "1px solid #8dc63f", borderRadius: "20px", padding: "50px" }}>
            <Box component={"img"} width={"100px"} height={"100px"} sx={{ background: "transparent", marginBottom: "10px" }} src={vendor} />
            <Typography sx={{ fontWeight: "800", fontSize: "2rem" }}>Vendor</Typography>
            <Typography sx={{ fontWeight: "700", color: "#555", margin: "20px 0", fontSize: { xs: "1rem", sm: "2rem", md: "1.3rem" } }}>
              Manage your restaurant and fulfill orders
            </Typography>

            {/* List */}
            <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-start",alignItems:"center" }}>
              <ul style={{ paddingLeft: "20px", marginBottom: "20px" }}>
                {["Restaurant management", "Menu Management", "Order Processing", "Revenue report", "Profile setting"].map((item, index) => (
                  <li key={index} style={{ marginBottom: "8px", color: "#333", fontWeight: "500", listStyle: "none", listStylePosition: "inside" }}>
                    <span style={{ color: "#8dc63f", marginRight: "8px",fontSize:"25px" }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Box>

          </Stack>
        </Grid>

        {/* Client Card */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ transition: "0.3s", ":hover": { transform: "translateY(-5px)" }, background: "linear-gradient( #f8ffecff, #e2ebfaff)", borderRadius: "20px" }}>
          <Stack justifyContent={"center"} alignItems={"center"} sx={{ border: "1px solid #8dc63f", borderRadius: "20px", padding: "50px" }}>
            <Box component={"img"} width={"100px"} height={"100px"} sx={{ background: "transparent", marginBottom: "10px" }} src={client} />
            <Typography sx={{ fontWeight: "800", fontSize: "2rem" }}>Client</Typography>
            <Typography sx={{ fontWeight: "700", color: "#555", margin: "20px 0", fontSize: { xs: "1rem", sm: "2rem", md: "1.3rem" } }}>
              Browse restaurants and place orders
            </Typography>

            <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-start",alignItems:"center" }}>
              <ul style={{ paddingLeft: "20px", marginBottom: "20px" }}>
                {["Browse restaurants", "Menu Management", "Place order", "Track deliveries","order history"].map((item, index) => (
                  <li key={index} style={{ marginBottom: "8px", color: "#333", fontWeight: "500", listStyle: "none", listStylePosition: "inside" }}>
                    <span style={{ color: "#8dc63f", marginRight: "8px",fontSize:"25px" }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Box>

          </Stack>
        </Grid>
      </Grid>
    </Container>
  )
}

export default VendorClientCard
