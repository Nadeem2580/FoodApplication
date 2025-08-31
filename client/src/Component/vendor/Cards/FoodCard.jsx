import { Delete, Edit } from '@mui/icons-material'
import { Box, Button, Card, CardContent, CardMedia, IconButton, Tooltip, Typography } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAddFood, setEditFood, setIsRefresh, setSelectedFood } from '../../../ReduxSlices/slices'
import toastAlert from '../../../Pages/Utils/utils'
import api from '../../../Pages/Utils/axiosConfig'
const FoodCard = ({ item }) => {
    const dispatch = useDispatch()
    const { isRefresh } = useSelector((store) => store.Counter)

    const onDelete = async (id) => {
        try {
            await api.delete(`/api/vendor/food/${id}`)
            dispatch(setIsRefresh(!isRefresh))
            toastAlert({
                message: "Deleted successfully",
                type: "success"
            })
        } catch (error) {
            console.log(error)
            toastAlert({
                message: error.message,
                type: "error"
            })
        }

    }

    return (
        <>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "end", gap: 1, backgroundColor: "#3b82f6", padding: "10px" }}>
                    <Tooltip title="Edit">
                        <IconButton
                            size="small"
                            sx={{
                                bgcolor: "white",
                                "&:hover": { bgcolor: "#e0f2fe" },
                            }}
                            onClick={() => {
                                dispatch(setSelectedFood(item))
                                dispatch(setEditFood(true))
                            }}
                        >
                            <Edit fontSize="small" color="primary" />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                        <IconButton
                            size="small"
                            sx={{
                                bgcolor: "white",
                                "&:hover": { bgcolor: "#fee2e2" },
                            }}
                            onClick={() => onDelete(item._id)}
                        >
                            <Delete fontSize="small" color="error" />
                        </IconButton>
                    </Tooltip>
                </Box>
                <CardMedia component="img" height="180" image={item.imageUrl} alt={item.name} />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{item.description}</Typography>
                    <Typography variant="body2" color="text.secondary">Category: {item.category}</Typography>
                    <Typography variant="subtitle1" color="success.main" sx={{ fontWeight: "bold", mt: 1 }}>Rs. {item.price}</Typography>
                </CardContent>
                <Button variant="contained" color="success" sx={{ borderRadius: 2, m: 2 }}>Order Now</Button>
            </Card>

        </>
    )
}

export default FoodCard