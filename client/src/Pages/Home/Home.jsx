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

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Heading />
      <CardSlider />
      <FeatureHeading />

      <Container sx={{marginTop:"60px"}}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 6, md: 4 }}> <HomeCards /> </Grid>
        <Grid  size={{ xs: 6, md: 4 }}> <HomeCards /> </Grid>
        <Grid  size={{ xs: 6, md: 4 }}> <HomeCards /> </Grid>
        <Grid  size={{ xs: 6, md: 4 }}> <HomeCards /> </Grid>
      </Grid>
      </Container>
    <SpecialOffer />
    <OfferCard />

    </>
  )
}

export default Home

// https://preview--role-plate-express.lovable.app/