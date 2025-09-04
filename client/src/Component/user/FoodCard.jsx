import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "../../ReduxSlices/AddToCart";

const OderFoodCard = ({ food }) => {
    const dispatch = useDispatch()

    const addTOCart = (food) => {


        dispatch(addToCart(food))


    }

    return (
        <Card sx={{ maxWidth: 345, borderRadius: 3, boxShadow: 3 }}>
            {/* Food Image */}
            <CardMedia
                component="img"
                height="200"
                image={food.imageUrl}
                alt={food.name}
                sx={{ objectFit: "cover" }}
            />

            {/* Food Details */}
            <CardContent>
                <Typography gutterBottom variant="h6" component="div" fontWeight="bold">
                    {food.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {food.description.length > 80 ? food.description.slice(0, 80) + "..." : food.description}
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="body1" color="primary" fontWeight="bold">
                        Rs. {food.price}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {food.category}
                    </Typography>
                </Box>

                {/* Order Button */}
                <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={() => addTOCart(food)}
                    sx={{ borderRadius: 2, fontWeight: "700" }}
                >
                    Add to Cart
                </Button>
            </CardContent>
        </Card>
    );
};

export default OderFoodCard;
