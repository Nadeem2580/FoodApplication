import { Box, Button, Chip, Container, Grid, Stack, Typography } from '@mui/material'
import Cookie from "js-cookie"
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../../Loader/Loading'
import food from "../../assets/food.png"
import orderImage from "../../assets/order.png"
import rating from "../../assets/rating.png"
import restaurantsImage from "../../assets/restaurant.png"
import RestaurantCard from '../../Component/vendor/Cards/RestaurantCard'
import CreateRestaurant from '../../Component/vendor/Modal/CreateRestaurant'
import api from '../../Pages/Utils/axiosConfig'
import { setCreateResModal, setRestaurant } from '../../ReduxSlices/slices'
import toastAlert from '../Utils/utils'



const VendorDahsboard = () => {
  
    const [selectRestaurant, setSelectRestaurant] = useState({})
    const { role, restaurant, isRefresh, createResModal } = useSelector((store) => store.Counter)
    const [val, setVal] = useState("");
   
    const dispatch = useDispatch()
    useEffect(() => {

        if (role) {
            fetchRestaurants()
        }
    }, [role, isRefresh])
   

    const fetchRestaurants = async () => {
        try {
            if (!role) {
                Cookie.get("token")
                Cookie.get("role")
                api.defaults.headers.common = `Bearer ${token}`
            }
            const fetchRestaurant = await api.get("/api/vendor/restaurant")
            const restaurant = fetchRestaurant.data.data
            dispatch(setRestaurant(restaurant))
        } catch (error) {
            toastAlert({
                message: error.message,
                type: "error"
            })
        }
    }
    const handleOpen = () => dispatch(setCreateResModal(true));

    return (
        <>

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 3, px: 1 }}
            >
                <Typography variant="h5" fontWeight="bold" color="#3b82f6">
                    Restaurants
                    <Typography variant="body2" color="text.secondary">
                        Manage and create new restaurants for your platform
                    </Typography>
                </Typography>

                <Button
                    onClick={handleOpen}
                    variant="contained"
                    sx={{
                        textTransform: "capitalize",
                        background: "linear-gradient(90deg, #3b82f6, #2563eb)",
                        color: "#fff",
                        borderRadius: "10px",
                        px: 3,
                        py: 1,
                        fontWeight: "bold",
                        boxShadow: "0px 4px 10px rgba(59, 130, 246, 0.4)",
                        transition: "all 0.3s ease-in-out",
                        ":hover": {
                            background: "linear-gradient(90deg, #2563eb, #1d4ed8)",
                            transform: "scale(1.06)",
                            boxShadow: "0px 6px 16px rgba(37, 99, 235, 0.6)",
                        },
                    }}
                >
                    + Create Restaurant
                </Button>
            </Stack>
            <Container>

                <Grid spacing={2} container>
                    <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                        <Box
                            sx={{ p: 2, borderRadius: 3, bgcolor: "background.paper", boxShadow: "0px 4px 12px rgba(0,0,0,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all 0.3s ease-in-out", ":hover": { transform: "translateY(-5px)", boxShadow: "0px 6px 16px rgba(0,0,0,0.2)", }, }}>
                            {/* Left Side */}
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Your Orders
                                </Typography>

                                <Box display="flex" alignItems="center" gap={1}>
                                    <Typography variant="h5" fontWeight="bold" color="text.primary">
                                        23
                                    </Typography>
                                    <Chip
                                        label="+3"
                                        size="small"
                                        sx={{ bgcolor: "#e0f2fe", color: "#0284c7", fontWeight: "bold" }}
                                    />
                                </Box>
                            </Box>

                            {/* Right Side (Image) */}
                            <Box>
                                <Box component="img" src={orderImage} alt="orders" sx={{ width: "55px", height: "55px" }} />
                            </Box>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                        <Box
                            sx={{ p: 2, borderRadius: 3, bgcolor: "background.paper", boxShadow: "0px 4px 12px rgba(0,0,0,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all 0.3s ease-in-out", ":hover": { transform: "translateY(-5px)", boxShadow: "0px 6px 16px rgba(0,0,0,0.2)", }, }}>
                            {/* Left Side */}
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Menu Items
                                </Typography>

                                <Box display="flex" alignItems="center" gap={1}>
                                    <Typography variant="h5" fontWeight="bold" color="text.primary">
                                        45
                                    </Typography>
                                    <Chip
                                        label="+2"
                                        size="small"
                                        sx={{ bgcolor: "#e0f2fe", color: "#0284c7", fontWeight: "bold" }}
                                    />
                                </Box>
                            </Box>

                            {/* Right Side (Image) */}
                            <Box>
                                <Box component="img" src={food} alt="orders" sx={{ width: "55px", height: "55px" }} />
                            </Box>
                        </Box>
                    </Grid>


                    <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                        <Box
                            sx={{ p: 2, borderRadius: 3, bgcolor: "background.paper", boxShadow: "0px 4px 12px rgba(0,0,0,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all 0.3s ease-in-out", ":hover": { transform: "translateY(-5px)", boxShadow: "0px 6px 16px rgba(0,0,0,0.2)", }, }}>
                            {/* Left Side */}
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Restaurants
                                </Typography>

                                <Box display="flex" alignItems="center" gap={1}>
                                    <Typography variant="h5" fontWeight="bold" color="text.primary">
                                        23
                                    </Typography>
                                    <Chip
                                        label="+3"
                                        size="small"
                                        sx={{ bgcolor: "#e0f2fe", color: "#0284c7", fontWeight: "bold" }}
                                    />
                                </Box>
                            </Box>

                            {/* Right Side (Image) */}
                            <Box>
                                <Box component="img" src={restaurantsImage} alt="orders" sx={{ width: "55px", height: "55px" }} />
                            </Box>
                        </Box>
                    </Grid>


                    <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                        <Box
                            sx={{ p: 2, borderRadius: 3, bgcolor: "background.paper", boxShadow: "0px 4px 12px rgba(0,0,0,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all 0.3s ease-in-out", ":hover": { transform: "translateY(-5px)", boxShadow: "0px 6px 16px rgba(0,0,0,0.2)", }, }}>
                            {/* Left Side */}
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Rating
                                </Typography>

                                <Box display="flex" alignItems="center" gap={1}>
                                    <Typography variant="h5" fontWeight="bold" color="text.primary">
                                        23
                                    </Typography>
                                    <Chip
                                        label="+3"
                                        size="small"
                                        sx={{ bgcolor: "#e0f2fe", color: "#0284c7", fontWeight: "bold" }}
                                    />
                                </Box>
                            </Box>

                            {/* Right Side (Image) */}
                            <Box>
                                <Box component="img" src={rating} alt="orders" sx={{ width: "55px", height: "55px" }} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            {/* Restaurant Cards */}

            <Container sx={{ margin: "30px auto" }}>
                <Grid spacing={2} container>
                    {restaurant.length === 0 ? (
                        <Grid size={{ xs: 12 }} sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
                            <Loading />
                        </Grid>

                    ) : (
                        restaurant.map((rest) => (
                            <Grid key={rest._id} size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                                <RestaurantCard restaurant={rest} />
                            </Grid>
                        ))

                    )}
                </Grid>
            </Container>

            <Box>
                <input type="text" placeholder='enter message' onChange={(e) => setVal(e.target.value)} />
                <button onClick={check}>Send</button>

            </Box>





            {createResModal && <CreateRestaurant open={createResModal} setOpen={dispatch(setCreateResModal(true))} isRefresh={isRefresh} restaurant={selectRestaurant} />}

        </>



    )

}

export default VendorDahsboard