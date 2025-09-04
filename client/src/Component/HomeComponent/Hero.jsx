import React from 'react'
import pizza from "../../assets/pizza.jpg"
import { Box, Button, Typography } from '@mui/material'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { motion } from "framer-motion"

const Hero = () => {
  // Parent container variants
  const containerVariant = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3 // delay between each child animation
      }
    }
  }

  // Each item animation
  const itemVariant = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } }
  }

  return (
    <Box
      sx={{
        minHeight: "87vh",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(${pizza})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      <motion.div
        variants={containerVariant}
        initial="hidden"
        animate="show"
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}
      >
        {/* Heading 1 */}
        <motion.div variants={itemVariant}>
          <Typography
            sx={{
              background: "linear-gradient(90deg, #fff,#fff, #8dc63f, #3b82f6)",
              fontSize: { xs: "2rem", sm: "3rem", md: "4rem", lg: "5rem" },
              fontWeight: "800",
              lineHeight: "1.5",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
              textShadow: "2px 2px 8px rgba(0,0,0,0.4)"
            }}
          >
            Delicious Food
          </Typography>
        </motion.div>

        {/* Heading 2 */}
        <motion.div variants={itemVariant}>
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
        </motion.div>

        {/* Tagline */}
        <motion.div variants={itemVariant}>
          <Typography sx={{ color: "#3b82f6", fontSize: "1.8rem", textAlign: "center" }}>
            Order from your favorite restaurants and get it delivered in{" "}
            <Box component={"span"} sx={{ display: "block", color: "#8dc63f", fontWeight: "700" }}>
              Minutes
            </Box>
          </Typography>
        </motion.div>

        {/* Search box */}
        <motion.div variants={itemVariant} style={{ width: "100%" }}>
          <Box
            sx={{
              width: { xs: "90%", sm: "70%", md: "50%" },
              display: "flex",
              alignItems: "center",
              margin: "20px auto",
              padding: "5px",
              border: "2px solid #8dc63f",
              background: "#8dc63f",
              borderRadius: "50px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
            }}
          >
            <Box
              component="input"
              placeholder="Search for restaurants"
              sx={{
                flex: 1,
                border: "none",
                outline: "none",
                padding: "12px 16px",
                background: "transparent",
                color: "#fff",
                fontSize: "16px",
                "::placeholder": { color: "#f1f1f1", opacity: 0.9 }
              }}
            />
            <Button
              sx={{
                border: "1px solid #fff",
                color: "#fff",
                padding: "10px 25px",
                borderRadius: "50px",
                fontWeight: "bold",
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(6px)",
                textTransform: "none",
                transition: "all 0.3s ease",
                "&:hover": { background: "#fff", color: "#8dc63f", borderColor: "#8dc63f" }
              }}
            >
              <FilterAltIcon sx={{ fontSize: "18px", marginRight: "6px" }} />
              Search
            </Button>
          </Box>
        </motion.div>
      </motion.div>
    </Box>
  )
}

export default Hero
