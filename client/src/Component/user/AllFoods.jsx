import { Container, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../../../Loader/Loading'
import api from '../../Pages/Utils/axiosConfig'
import toastAlert from '../../Pages/Utils/utils'
import OderFoodCard from './FoodCard'

const AllFoods = () => {
    const [foodItem, setFoodItem] = useState([])
    const [userId, setUserID] = useState([])
    const { id } = useParams()

    useEffect(() => {
        allFood()
    }, [])


    const allFood = async () => {
        try {
            const res = await api.get(`/api/orders/all-foods/${id}`)
            setFoodItem(res.data.data)
            const userId = res.data.userId 
            setUserID(userId)
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

            <Container sx={{ margin: "30px auto" }}>

                <Grid spacing={2} container>

                    {
                        foodItem.length == 0 ?
                            <Grid size={{ xs: 12 }} sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
                                <Loading />
                            </Grid> :
                            (
                                foodItem.map((food, index) => (
                                    <Grid key={index} size={{xs:12 , md:6 , lg:4 ,xl:3}}>
                                        <OderFoodCard  food={food} userId={userId}/>

                                    </Grid>
                                ))
                            )
                    }
                </Grid>
            </Container>
        </>
    )
}

export default AllFoods