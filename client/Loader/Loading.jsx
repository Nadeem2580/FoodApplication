import React from "react";
import Lottie from "lottie-react";
import loaderAnimation from "../src/assets/loader.json"
import { Box } from "@mui/material";
export const Loading = () => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }} >
      <Lottie animationData={loaderAnimation} loop={true} autoplay />
    </Box>
  );
};

export default Loading



