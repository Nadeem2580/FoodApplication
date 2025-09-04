import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { motion } from "framer-motion";

const MotionCard = motion(Card); // 👈 MUI Card ko motion component banaya

const OrderCard = ({ restaurant }) => {
  return (
    <MotionCard
      sx={{ maxWidth: 345, borderRadius: "16px", boxShadow: 3 }}
      initial={{ opacity: 0, y: 100 }}                 // 👈 start position
      whileInView={{ opacity: 1, y: 0 }}              // 👈 animate on scroll
      transition={{ duration: 0.6, ease: "easeOut" }} // 👈 smooth effect
      viewport={{ once: false, amount: 0.3 }}         // 👈 scroll trigger
      whileHover={{ scale: 1.05 }}                    // 👈 hover zoom
    >
      {/* Image */}
      <CardMedia
        component="img"
        height="200"
        image={restaurant?.imageUrl || "https://via.placeholder.com/300x200"}
        alt={restaurant?.restaurantName}
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
          {restaurant?.address?.slice(0, 80) + "..."}
        </Typography>
      </CardContent>
    </MotionCard>
  );
};

export default OrderCard;
