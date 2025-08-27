import React from 'react'
import Navbar from '../../Component/Navbar'
import Hero from '../../Component/Hero'
import Heading from '../../Component/Heading'
import CardSlider from '../../Component/CardSlider'
import FeatureHeading from '../../Component/FeatureHeading'
import HomeCards from '../../Component/Cards'
import { Container, Grid } from '@mui/material'
import SpecialOffer from '../../Component/SpecialOffer'
import OfferCard from '../../Component/OfferCard'
import JoiningHeading from '../../Component/JoiningHeading'
import VendorClientCard from '../../Component/VendorClientCard'
import Footer from '../../Component/Footer'
import HomeIcon from '@mui/icons-material/Home';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ContactsIcon from '@mui/icons-material/Contacts';
import RoundaboutLeftIcon from '@mui/icons-material/RoundaboutLeft';
const Home = () => {
  const homeLink = [
    { title: "Home", url: "/Home", icon: <HomeIcon fontSize="small" /> },
    { title: "Restaurants", url: "/restaurants", icon: <RestaurantMenuIcon fontSize="small" /> },
    { title: "About", url: "/about", icon: <RoundaboutLeftIcon fontSize="small" /> },
    { title: "Contact", url: "/contact", icon: <ContactsIcon fontSize="small" /> },
  ];

  return (
    <>
      <Navbar links={homeLink} />
      <Hero />
      <Heading />
      <CardSlider />
      <FeatureHeading />

      <Container sx={{ marginTop: "60px" }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6, md: 4 }}> <HomeCards /> </Grid>
          <Grid size={{ xs: 6, md: 4 }}> <HomeCards /> </Grid>
          <Grid size={{ xs: 6, md: 4 }}> <HomeCards /> </Grid>
          <Grid size={{ xs: 6, md: 4 }}> <HomeCards /> </Grid>
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