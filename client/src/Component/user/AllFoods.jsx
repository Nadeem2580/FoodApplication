import { Container, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Loading from '../../../Loader/Loading'
import api from '../../Pages/Utils/axiosConfig'
import toastAlert from '../../Pages/Utils/utils'
import OderFoodCard from './FoodCard'

const AllFoods = () => {
    const [foodItem, setFoodItem] = useState([])
    const [userId, setUserID] = useState(null)
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const location = useLocation()

    useEffect(() => {
        allFood()
    }, [])

    const allFood = async () => {
        try {
            setLoading(true)
            const isHomeFood = location.pathname.includes("all-home-food")

            const endpoint = isHomeFood
                ? `/api/orders/all-home-foods/${id}`
                : `/api/orders/all-foods/${id}`

            const res = await api.get(endpoint)
            setFoodItem(res.data.data)

            if (!isHomeFood && res.data.userId) {
                setUserID(res.data.userId)
            }

            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error?.response?.data?.message || error.message)
            toastAlert({
                message: error?.response?.data?.message || "Failed to fetch foods",
                type: "error",
            })
        }
    }

    return (
        <Container sx={{ margin: "30px auto" }}>
            <Grid container spacing={2}>
                {loading ? (
                    <Grid size={{ xs: 12 }} sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
                        <Loading />
                    </Grid>
                ) : foodItem.length === 0 ? (
                    <Grid size={{ xs: 12 }} sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
                        <h1>No Food Found</h1>
                    </Grid>
                ) : (
                    foodItem.map((food, index) => (
                        <Grid key={index} size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                            <OderFoodCard food={food} userId={userId} />
                        </Grid>
                    ))
                )}
            </Grid>
        </Container>
    )
}

export default AllFoods
