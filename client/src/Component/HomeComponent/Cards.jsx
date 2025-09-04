import { Box, Button, Card, CardContent, CardMedia, Chip, Typography } from "@mui/material";

const HomeCards = () => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: 3,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        overflow: "hidden",
        transition: "0.3s",
        "&:hover": { transform: "translateY(-5px)", boxShadow: "0 8px 20px rgba(0,0,0,0.15)" },
      }}
    >
      {/* Image */}
      <CardMedia
        component="img"
        height="180"
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV3V_QmFRmB8xPPSOmShms0tMMMAH1G9i7pg&s"
        alt="Restaurant"
      />

      <CardContent>
        {/* Title */}
        <Typography variant="h6" fontWeight={600} gutterBottom>
          The Spice House
        </Typography>

        {/* Category */}
        <Box mb={1}>
          <Chip label="Italian" size="small" sx={{ backgroundColor: "#e8f5e9", color: "#2e7d32", fontWeight: 600 }} />
        </Box>

        {/* Description */}
        <Typography variant="body2" color="text.secondary">
          A modern Italian restaurant offering fresh pasta, wood-fired pizzas, and classic wines.
        </Typography>

        <Button variant="contained" sx={{display:"block", margin:"10px auto",backgroundColor:"#8dc63f" , ":hover":{background:"linear-gradient(90deg , #8dc63f, #3b82f6)"}}}>Order Now</Button>
      </CardContent>
    </Card>
  );
};

export default HomeCards;
