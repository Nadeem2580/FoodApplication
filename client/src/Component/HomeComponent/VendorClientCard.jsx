import { Box, Container, Grid, Stack, Typography } from '@mui/material'
import { motion } from "framer-motion"
import client from "../../assets/client.png"
import vendor from "../../assets/vendor.png"

const VendorClientCard = () => {
  return (
    <Container sx={{ margin: "20px auto" }}>
      <Grid container spacing={4}>
        
        {/* Vendor Card */}
        <Grid size={{xs:12 , md:6}}>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <Stack justifyContent={"center"} alignItems={"center"} sx={{ transition: "0.3s", ":hover": { transform: "translateY(-5px)" }, background: "linear-gradient(#f8ffecff, #e2ebfaff)", borderRadius: "20px", border: "1px solid #8dc63f", p: "50px" }}>
              <Box component={"img"} width={"100px"} height={"100px"} mb={2} src={vendor} />
              <Typography sx={{ fontWeight: "800", fontSize: "2rem" }}>Vendor</Typography>
              <Typography sx={{ fontWeight: "700", color: "#555", margin: "20px 0", fontSize: { xs: "1rem", sm: "2rem", md: "1.3rem" } }}>
                Manage your restaurant and fulfill orders
              </Typography>

              {/* List */}
              <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                <ul style={{ paddingLeft: "20px", marginBottom: "20px" }}>
                  {["Restaurant management", "Menu Management", "Order Processing", "Revenue report", "Profile setting"].map((item, index) => (
                    <li key={index} style={{ marginBottom: "8px", color: "#333", fontWeight: "500", listStyle: "none", listStylePosition: "inside" }}>
                      <span style={{ color: "#8dc63f", marginRight: "8px", fontSize: "25px" }}>•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Box>
            </Stack>
          </motion.div>
        </Grid>

        {/* Client Card */}
        <Grid size={{xs:12 , md:6}}>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <Stack justifyContent={"center"} alignItems={"center"} sx={{ transition: "0.3s", ":hover": { transform: "translateY(-5px)" }, background: "linear-gradient(#f8ffecff, #e2ebfaff)", borderRadius: "20px", border: "1px solid #8dc63f", p: "50px" }}>
              <Box component={"img"} width={"100px"} height={"100px"} mb={2} src={client} />
              <Typography sx={{ fontWeight: "800", fontSize: "2rem" }}>Client</Typography>
              <Typography sx={{ fontWeight: "700", color: "#555", margin: "20px 0", fontSize: { xs: "1rem", sm: "2rem", md: "1.3rem" } }}>
                Browse restaurants and place orders
              </Typography>

              <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                <ul style={{ paddingLeft: "20px", marginBottom: "20px" }}>
                  {["Browse restaurants", "Menu Management", "Place order", "Track deliveries", "Order history"].map((item, index) => (
                    <li key={index} style={{ marginBottom: "8px", color: "#333", fontWeight: "500", listStyle: "none", listStylePosition: "inside" }}>
                      <span style={{ color: "#8dc63f", marginRight: "8px", fontSize: "25px" }}>•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Box>
            </Stack>
          </motion.div>
        </Grid>

      </Grid>
    </Container>
  )
}

export default VendorClientCard
