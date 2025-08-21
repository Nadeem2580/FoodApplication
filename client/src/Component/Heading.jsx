import { Box, Typography } from '@mui/material'
import React from 'react'

const Heading = () => {
    return (
        <Box sx={{ margin: "50px 0", textAlign: "center" ,":after":{ content: '""' , display: "block" ,width: "100px",height: "4px",background: "linear-gradient(90deg, #8dc63f, #3b82f6)",margin: "10px auto 0",borderRadius: "2px"} }}>
            <Typography sx={{ background: "linear-gradient(90deg, #8dc63f, #3b82f6)", fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem" }, fontWeight: "800", lineHeight: "2", backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent", WebkitTextFillColor: "transparent"}}>Browse by Category</Typography>
            <Typography sx={{color:"#555"}}>What are you craving today?</Typography>

        </Box>

    )
}

export default Heading