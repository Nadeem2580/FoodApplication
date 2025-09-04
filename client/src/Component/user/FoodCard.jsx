import { Box, Button, CardContent, CardMedia, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addToCart } from "../../ReduxSlices/AddToCart";

const MotionCard = motion.div; // 👈 wrapper banaya hover + animation ke liye

const OderFoodCard = ({ food }) => {
  const dispatch = useDispatch();

  const addTOCart = (food) => {
    dispatch(addToCart(food));
  };

  return (
    <MotionCard
      initial={{ opacity: 0, y: 50 }} // 👈 entry animation
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ scale: 1.05, boxShadow: "0 8px 24px rgba(0,0,0,0.25)" }} // 👈 hover effect
      style={{ borderRadius: "12px" }}
    >
      <CardMedia
        component="img"
        height="200"
        image={food.imageUrl}
        alt={food.name}
        style={{ borderTopLeftRadius: "12px", borderTopRightRadius: "12px", objectFit: "cover" }}
      />

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
    </MotionCard>
  );
};

export default OderFoodCard;
