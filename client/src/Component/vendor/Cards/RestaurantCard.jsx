import { Delete, Edit } from "@mui/icons-material";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Grid,
    IconButton, Tooltip,
    Typography
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../Pages/Utils/axiosConfig";
import toastAlert from "../../../Pages/Utils/utils";
import { setAddFood, setIsRefresh, setSelectedRestaurant } from "../../../ReduxSlices/slices";

const RestaurantCard = ({ restaurant, onDelete, onEdit, show ,adminshow }) => {
    const { isRefresh, addFood } = useSelector((store) => store.Counter)
    const dispatch = useDispatch()
    const isOpenUpdate = async (restaurant) => {
        try {
            const { _id, isOpen } = restaurant
            const obj = {
                isOpen: !isOpen
            }
            const res = await api.patch(`/api/vendor/restaurant/${_id}`, obj);
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
        <Grid sx={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
            <Card
                sx={{
                    maxWidth: 345,
                    borderRadius: "16px",
                    boxShadow: 4,
                    transition: "0.3s",
                    "&:hover": {
                        boxShadow: 8,
                        transform: "translateY(-5px)",
                    },
                }}
            >
                {/* Edit/Delete Buttons */}
                {(show ) &&
                    <Box sx={{ display: "flex", justifyContent: "end", gap: 1, backgroundColor: "#3b82f6", padding: "10px" }}>
                        <Tooltip title="Edit">
                            <IconButton
                                size="small"
                                sx={{
                                    bgcolor: "white",
                                    "&:hover": { bgcolor: "#e0f2fe" },
                                }}
                                onClick={() => onEdit(restaurant)}
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
                                onClick={() => onDelete(restaurant._id)}
                            >
                                <Delete fontSize="small" color="error" />
                            </IconButton>
                        </Tooltip>
                    </Box>

                }

                {/* Image */}
                <CardMedia
                    component="img"
                    height="180"
                    image={restaurant.imageUrl}
                    alt={restaurant.restaurantName}
                    sx={{
                        transition: "0.5s",
                        "&:hover": {
                            transform: "scale(1.05)",
                        },
                    }}
                />

                {/* Content */}
                <CardContent>
                    {/* Chips */}
                    {(show || adminshow) && <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Chip
                            label={restaurant.category}
                            sx={{
                                bgcolor: "#8dc63f", color: "white", fontWeight: "bold"
                                , ":hover": { backgroundColor: "#426e04ff" }
                            }}
                        />
                        <Chip
                            onClick={() => isOpenUpdate(restaurant)}
                            label={restaurant.isOpen ? "Open" : "Closed"}
                            sx={{
                                bgcolor: restaurant.isOpen ? "#8dc63f" : "red",
                                color: "white",
                                fontWeight: "bold",
                                ":hover": { backgroundColor: "#426e04ff" }
                            }}
                        />
                        <Button
                            onClick={() => (dispatch(setAddFood(true)),
                                dispatch(setSelectedRestaurant(restaurant)))
                            }
                            sx={{
                                fontSize: "12px", fontWeight: "700", backgroundColor: "#8dc63f", borderRadius: "30px", color: "#fff", padding: "0 10px",
                                ":hover": { backgroundColor: "#426e04ff" }
                            }}>Add Food</Button>
                    </Box>}

                    <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "#3b82f6", mb: 1 }}
                    >
                        {restaurant.restaurantName}
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            mb: 1,
                            display: "-webkit-box",
                            overflow: "hidden",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                        }}
                    >
                        {restaurant.details?.slice(0, 80)}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        📍 {restaurant.address?.slice(0, 60)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" >
                        ☎ {restaurant.contactNumber}
                    </Typography>
                </CardContent>
            </Card>
        </Grid >

    );
};

export default RestaurantCard;
