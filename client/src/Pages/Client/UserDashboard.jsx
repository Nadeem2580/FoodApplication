import { Box, Container, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../../../Loader/Loading'
import imageBackgound from "../../assets/horizontal.jpg"
import OrderCard from '../../Component/user/orderCard'
import toastAlert from "../../Pages/Utils/utils"
import api from '../Utils/axiosConfig'

const UserDashboard = () => {

  const [restaurant, setRestaurant] = useState([])

  useEffect(() => {
    fetchRestaurant()
  }, [])

  const fetchRestaurant = async () => {
    try {
      const res = await api.get("/api/orders/restaurant")
      setRestaurant(res.data.data)

    } catch (error) {
      console.log(error.response.data.message)
      toastAlert({
        message: error.message,
        type: "error"
      })
    }
  }

  return (


    <>
      <Box sx={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)),url(${imageBackgound})`, backgroundSize: "cover", backgroundPosition: "center", height: "60vh", width: "100%", display: "flex", justifyContent: "left", alignItems: "center" }}>
        <Container maxWidth="lg" sx={{ display: "flex", justifyContent: "left", alignItems: "center", flexDirection: "column" }}>

          <Typography sx={{ color: "#fff", fontSize: { xs: "1.5rem", md: "2rem", lg: "3rem", fontWeight: "800" } }}>Delicious Food,<br /> <Typography sx={{ fontWeight: "800", color: "#fff", fontSize: { xs: "1.5rem", md: "2rem", lg: "3rem" } }} component={"span"}>Delivered Fast</Typography></Typography>
          <Typography sx={{ color: "#918b8bff" }}>Order from your favorite local restaurants and get fresh,<br /> hot meals delivered to your door.</Typography>
        </Container>
      </Box>

      <Box>
        <Typography sx={{ textAlign: "center", color: "#3b82f6", fontSize: { xs: "2rem", md: "2.5rem", lg: "3rem", fontWeight: "700", margin: "30px 0" } }}>Featured Restaurants</Typography>
      </Box>

      <Container sx={{ margin: "30px auto" }}>

        <Grid spacing={2} container>

          {
            restaurant.length == 0 ?
              <Grid size={{ xs: 12 }} sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
                <Loading />
              </Grid> :
              (
                restaurant.map((restaurant, index) => (
                  <Link key={index} to={`/all-foods/${restaurant._id}`} style={{ textDecoration: "none" }}>
                    <OrderCard restaurant={restaurant} />
                  </Link>
                ))
              )
          }
        </Grid>
      </Container>



    </>

  )
}

export default UserDashboard

// https://lovable.dev/projects/56a9c36e-e53b-492f-b662-4f0071114d6f