// src/components/LoadingBar.js
import React from "react";
import { CircularProgress, Box } from "@mui/material";

const LoadingBar = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingBar;
