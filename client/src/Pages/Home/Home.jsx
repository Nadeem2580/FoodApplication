import React from 'react'
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