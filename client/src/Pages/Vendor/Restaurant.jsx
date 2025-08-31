import React, { useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import toastAlert from '../Utils/utils'
import api from '../Utils/axiosConfig'
import { setCreateResModal, setIsRefresh, setRestaurant, setSelectedRestaurant } from '../../ReduxSlices/slices'
import Loading from '../../../Loader/Loading'
import RestaurantCard from '../../Component/vendor/Cards/RestaurantCard'
import AddFoodModal from '../../Component/vendor/Modal/addFoodModal'
import CreateRestaurant from '../../Component/vendor/Modal/CreateRestaurant'
import { Container, Grid } from '@mui/material'
const RestaurantPage = () => {
    const dispatch = useDispatch()
    const { role, isRefresh, restaurant, createResModal, selectedRestaurant ,addFood} = useSelector((store) => store.Counter)

    useEffect(() => {
        if (role) {
            fetchRestaurants()
        }
    }, [role, isRefresh])



    const fetchRestaurants = async () => {
        try {

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
    const onEdit = (restaurant) => {
        dispatch(setCreateResModal(true))
        dispatch(setSelectedRestaurant(restaurant))

    }

    const onDelete = async (id) => {
        try {
            await api.delete(`/api/vendor/restaurant/${id}`)
            toastAlert({
                message: "Restaurant deleted successfully",
                type: "success"
            })
            dispatch(setIsRefresh(!isRefresh))
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

                    {restaurant.length === 0 ? (
                        <Grid size={{ xs: 12 }} sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
                            <Loading />
                        </Grid>
                    ) : (
                        restaurant.map((rest) => (
                            <RestaurantCard show={true} key={rest._id} restaurant={rest} onDelete={onDelete} onEdit={onEdit} />
                        ))
                    )}
                    <CreateRestaurant open={createResModal} setOpen={setCreateResModal} restaurant={selectedRestaurant} />
                {addFood &&  <AddFoodModal text={"Create Food Item"} />}   

                </Grid>
            </Container>
        </>
    )
}

export default RestaurantPage