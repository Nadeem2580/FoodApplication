import React, { useEffect, useState } from 'react'
import { Container, Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import Navbar from '../../Component/HomeComponent/Navbar'
import Hero from '../../Component/HomeComponent/Hero'
import Heading from '../../Component/HomeComponent/Heading'
import CardSlider from '../../Component/HomeComponent/CardSlider'
import FeatureHeading from '../../Component/HomeComponent/FeatureHeading'
import SpecialOffer from '../../Component/HomeComponent/SpecialOffer'
import OfferCard from '../../Component/HomeComponent/OfferCard'
import JoiningHeading from '../../Component/HomeComponent/JoiningHeading'
import VendorClientCard from '../../Component/HomeComponent/VendorClientCard'
import Footer from '../../Component/HomeComponent/Footer'
import Loading from '../../../Loader/Loading'
import OrderCard from '../../Component/user/orderCard'
import toastAlert from '../Utils/utils'
import api from '../Utils/axiosConfig'
import { motion } from "framer-motion"

const Home = () => {
  const [restaurant, setRestaurant] = useState([])

  useEffect(() => {
    fetchRestaurant()
  }, [])

  const fetchRestaurant = async () => {
    try {
      const res = await api.get("api/vendor/all-restaurant")
      setRestaurant(res.data.data)
    } catch (error) {
      toastAlert({
        message: error.message,
        type: "error"
      })
    }
  }

  // Variants for animation
  const containerVariant = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const cardVariant = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 70 } }
  }

  return (
    <>
      <Navbar />
        <Hero />

      <motion.div initial={{ scale: 0.5, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }}>
        <Heading />
      </motion.div>

      <CardSlider />
      <motion.div initial={{ scale: 0.5, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }}>
        <FeatureHeading />

      </motion.div>

      <Container sx={{ margin: "30px auto" }}>
        <motion.div
          variants={containerVariant}
          initial="hidden"
          animate="show"
        >
          <Grid spacing={2} container>
            {
              restaurant?.length === 0 ? (
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
                  <Loading />
                </Grid>
              ) : (
                restaurant?.map((restaurant, index) => (
                  <motion.div key={index} variants={cardVariant}>
                    <Link to={`/all-home-foods/${restaurant._id}`} style={{ textDecoration: "none" }}>
                      <OrderCard restaurant={restaurant} />
                    </Link>
                  </motion.div>
                ))
              )
            }
          </Grid>
        </motion.div>
      </Container>

      <motion.div initial={{ scale: 0.5, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }}>
        <SpecialOffer />
      </motion.div>

      
        <OfferCard />


      <motion.div initial={{ scale: 0.5, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }}>
        <JoiningHeading />
      </motion.div>

        <VendorClientCard />

      <Footer />
    </>
  )
}

export default Home
