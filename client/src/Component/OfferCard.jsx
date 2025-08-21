import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';


const OfferCard = () => {
    return (
        <Container sx={{ margin: "20px auto" }}>
            <Grid container spacing={4}>
                <Grid size={6} sx={{transition : "0.3s",":hover":{transform: "translateY(-5px)"}, background:"linear-gradient( #f8ffecff, #e2ebfaff)",borderRadius:"20px" }}>
                    <Stack justifyContent={"center"} alignItems={"center"} sx={{border:"1px solid #8dc63f",borderRadius:"20px", padding:"50px"}} >

                        <Box component={"img"} width={"100px"} height={"100px"} sx={{ background: "transparent", marginBottom: "10px" }} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ9blB7IBvt5pnkiFbPNDL9ZwUzedHTFX6DQ&s' />
                        <Typography sx={{ fontSize: { xs: "1.5rem", md: "2rem", lg: "2.5rem" },fontWeight:"800", background: "linear-gradient(90deg, #8dc63f, #3b82f6)",backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent", WebkitTextFillColor: "transparent" }}>First Order Special</Typography>
                        <Typography sx={{fontWeight:"700",color:"#555",margin:"20px 0"}}>Get <Box component={"span"} sx={{color:"#8dc63f"}}>30%</Box>  off on your first order.</Typography>
                        <Button variant='contained' sx={{background:"linear-gradient(to Right ,#8dc63f, #3b82f6)"}}>Claim Offer</Button>

                    </Stack>

                </Grid>

                <Grid size={6} sx={{transition : "0.3s",":hover":{transform: "translateY(-5px)"},background:"linear-gradient( #f8ffecff, #e2ebfaff)",borderRadius:"20px"}}>
                    <Stack justifyContent={"center"} alignItems={"center"} sx={{border:"1px solid #8dc63f",borderRadius:"20px", padding:"50px"}}>

                        <Box component={"img"} width={"100px"} height={"100px"} sx={{ background: "transparent", marginBottom: "10px" }} src='https://static.vecteezy.com/system/resources/previews/008/492/236/non_2x/delivery-cartoon-illustration-png.png' />
                        <Typography sx={{ fontSize: { xs: "1.5rem", md: "2rem", lg: "2.5rem" },fontWeight:"800", background: "linear-gradient(90deg, #8dc63f, #3b82f6)",backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent", WebkitTextFillColor: "transparent" }}>Free Delivery</Typography>
                        <Typography sx={{fontWeight:"700",color:"#555",margin:"20px 0"}}>Free delivery on orders above <Box component={"span"} sx={{color:"#8dc63f"}}>$25</Box> . Limited time offer!</Typography>
                        <Button variant='contained' sx={{background:"linear-gradient(to Right ,#8dc63f, #3b82f6)"}}>Browser Menu</Button>

                    </Stack>

                </Grid>
            </Grid>

        </Container>
    )
}

export default OfferCard