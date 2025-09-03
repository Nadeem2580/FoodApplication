import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const OrderCard = ({ restaurant }) => {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: "16px", boxShadow: 3 }}>
      {/* Image */}
      <CardMedia
        component="img"
        height="200"
        image={restaurant?.imageUrl || null } // fallback image
        alt={restaurant.restaurantName}
      />

      {/* Name + Category */}
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {restaurant?.restaurantName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {restaurant?.category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {restaurant?.address.slice(0, 80)+"..."}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
