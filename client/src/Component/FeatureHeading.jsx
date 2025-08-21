import { Box, Container, Typography } from '@mui/material'
import React from 'react'

const FeatureHeading = () => {
  return (
    <Container maxWidth="lg">
        
    <Box>
        <Typography  sx={{ background: "linear-gradient(90deg, #8dc63f, #3b82f6)", fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem", lg: "3.5rem" }, fontWeight: "800", lineHeight: "1", backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent", WebkitTextFillColor: "transparent"}}>Featured Restaurants</Typography>
        <Typography sx={{color:"#555",fontSize:{xs:"1rem" , md:"1.5rem"}}}>Top-rated restaurants delivering to you now</Typography>
    </Box>
    </Container>
  )
}

export default FeatureHeading