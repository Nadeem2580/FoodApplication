import React, { useEffect, useState } from 'react'
import { Container, Grid } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ContactsIcon from '@mui/icons-material/Contacts';
import RoundaboutLeftIcon from '@mui/icons-material/RoundaboutLeft';
import Navbar from '../../Component/HomeComponent/Navbar';
import Hero from '../../Component/HomeComponent/Hero';
import Heading from '../../Component/HomeComponent/Heading';
import CardSlider from '../../Component/HomeComponent/CardSlider';
import FeatureHeading from '../../Component/HomeComponent/FeatureHeading';
import HomeCards from '../../Component/HomeComponent/Cards';
import SpecialOffer from '../../Component/HomeComponent/SpecialOffer';
import OfferCard from '../../Component/HomeComponent/OfferCard';
import JoiningHeading from '../../Component/HomeComponent/JoiningHeading';
import VendorClientCard from '../../Component/HomeComponent/VendorClientCard';
import Footer from '../../Component/HomeComponent/Footer';
import Loading from '../../../Loader/Loading';
import OrderCard from '../../Component/user/orderCard';
import { Link } from 'react-router-dom';
import toastAlert from '../Utils/utils';
import api from '../Utils/axiosConfig';
const Home = () => {
  const homeLink = [
    { title: "Home", url: "/Home", icon: <HomeIcon fontSize="small" /> },
    { title: "Restaurants", url: "/restaurants", icon: <RestaurantMenuIcon fontSize="small" /> },
    { title: "About", url: "/about", icon: <RoundaboutLeftIcon fontSize="small" /> },
    { title: "Contact", url: "/contact", icon: <ContactsIcon fontSize="small" /> },
  ];

  const [restaurant, setRestaurant] = useState([])

  useEffect(() => {
    fetchRestaurant()
  }, [])

  const fetchRestaurant = async () => {
    try {
      const res = await api.get("api/vendor/all-restaurant")
      setRestaurant(res.data.data)
console.log(res)
    } catch (error) {
      // console.log(error.response.data.message)
      toastAlert({
        message: error.message,
        type: "error"
      })
    }
  }


  return (
    <>
      <Navbar links={homeLink} />
      <Hero />
      <Heading />
      <CardSlider />
      <FeatureHeading />

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
      <SpecialOffer />
      <OfferCard />
      <JoiningHeading />
      <VendorClientCard />
      <Footer />
    </>
  )
}

export default Home

// https://preview--role-plate-express.lovable.app/