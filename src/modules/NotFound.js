// NotFoundPage.js
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
        textAlign: "center",
        p: 3,
      }}
    >
      <Typography variant="h1" color="error" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" color="textPrimary" gutterBottom>
        Oops! Page not found.
      </Typography>
      <Typography
        variant="body1"
        color="textSecondary"
        sx={{ maxWidth: 400, mb: 4 }}
      >
        The page you are looking for doesn't exist or may have been moved.
      </Typography>
      <Button variant="contained" color="error" onClick={() => navigate("/")}>
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
