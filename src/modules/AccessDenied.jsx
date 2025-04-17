import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AccessDeniedPage = () => {
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
        403
      </Typography>
      <Typography variant="h5" color="textPrimary" gutterBottom>
        Access Denied.
      </Typography>
      <Typography
        variant="body1"
        color="textSecondary"
        sx={{ maxWidth: 400, mb: 4 }}
      >
        You do not have permission to view this page.
      </Typography>
      <Button variant="contained" color="error" onClick={() => navigate("/")}>
        Go to Home
      </Button>
    </Box>
  );
};

export default AccessDeniedPage;
