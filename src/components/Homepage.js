import React from 'react';
import { Box, Button, Container, Grid, Typography, AppBar, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <Box sx={{ backgroundColor: "black", minHeight: "100vh", width: "100vw", display: "flex", justifyContent: "center", py: 5, overflowX: "hidden" }}>
      {/* 🔹 White Card Container */}
      <Box
        sx={{
          backgroundColor: "white",
          width: "90%",
          maxWidth: "1200px",
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* 🔹 Navbar */}
        <AppBar position="static" color="default" elevation={0} sx={{ backgroundColor: "white", py: 2 }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" fontWeight="bold" color="black">fitTrack</Typography>
            <Box sx={{ display: "flex", gap: 4 }}>
              <Button color="inherit" component={Link} to="/dashboard">DASHBOARD</Button>
              <Button color="inherit" component={Link} to="/login">LOG IN</Button>
              <Button color="inherit" component={Link} to="/signup">SIGN UP</Button>
            </Box>
          </Toolbar>
        </AppBar>

        {/* 🔹 Hero Section - Fix White Background */}
        <Box
          sx={{
            position: "relative",
            minHeight: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            backgroundImage: "url('/hero-image.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            paddingRight: "5%",
            paddingLeft: "5%",
          }}
        >
          {/* Text Directly on Image (No Background) */}
          <Box sx={{ maxWidth: "500px", textAlign: "right" }}>
            <Typography variant="h3" fontWeight="bold" color="white">
              REACH YOUR BEST
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }} color="white">
              Whether you're training for a marathon or your biggest season yet, we’re here to help you make serious progress.
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 3, bgcolor: "white", color: "black", "&:hover": { bgcolor: "#ddd" } }}
              component={Link}
              to="/signup"
            >
              SIGN UP
            </Button>
            <Typography variant="body2" sx={{ mt: 2 }} color="white">
              Already a member? <Link to="/login" style={{ color: "white", textDecoration: "underline" }}>Log In</Link>
            </Typography>
          </Box>
        </Box>

        {/* 🔹 Workout Goals Section */}
        <Container sx={{ py: 10 }}>
          <Grid container spacing={4} alignItems="center">
            {/* Left Side: Text Content */}
            <Grid item xs={12} md={6}>
              <Typography variant="h3" fontWeight="bold" sx={{ textTransform: "uppercase", lineHeight: 1 }} color="black">
                Set Goals.<br />Log Workouts.<br />Stay on Track.
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }} color="black">
                Easily track your workouts, set Training Plans, and discover new Workout Routines to crush your goals.
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 3, bgcolor: "black", color: "white", "&:hover": { bgcolor: "#333" } }}
                component={Link}
                to="/signup"
              >
                GET STARTED
              </Button>
            </Grid>
            {/* Right Side: Image */}
            <Grid item xs={12} md={6}>
              <Box component="img" src="/workout-image.png" alt="Workout Goals" sx={{ width: "100%", maxWidth: "500px", borderRadius: 2 }} />
            </Grid>
          </Grid>
        </Container>

        {/* 🔹 Performance Analytics Section */}
        <Container sx={{ py: 10 }}>
          <Grid container spacing={4} alignItems="center">
            {/* Left Side: Image */}
            <Grid item xs={12} md={6}>
              <Box component="img" src="/performance-chart.png" alt="Performance Chart" sx={{ width: "100%", borderRadius: 2 }} />
            </Grid>
            {/* Right Side: Text */}
            <Grid item xs={12} md={6}>
              <Typography variant="h3" fontWeight="bold" color="black">
                BUILT TO MAKE YOU BETTER
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }} color="black">
                Turn your phone or smartwatch into your coach—track your workouts and get tons of data and tips to help you run better.
              </Typography>
              <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }} color="black">
                Custom Workouts
              </Typography>
              <Typography variant="body1" color="black">
                5K? Marathon? No matter where you're at, get personalized training plans built just for you.
              </Typography>
            </Grid>
          </Grid>
        </Container>

        {/* 🔹 Footer - Fix Missing Issue */}
        <Box sx={{ bgcolor: "grey.100", py: 6, px: 4, minHeight: "100px" }}>
          <Container>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" color="black">Help</Typography>
                <Typography variant="body2"><Link to="#">Account Settings</Link></Typography>
                <Typography variant="body2"><Link to="#">Privacy Center</Link></Typography>
                <Typography variant="body2"><Link to="#">Support</Link></Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" color="black">About</Typography>
                <Typography variant="body2"><Link to="#">About Us</Link></Typography>
                <Typography variant="body2"><Link to="#">Contact Us</Link></Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" color="black">Connect</Typography>
                <Typography variant="body2"><Link to="#">Facebook</Link></Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default Homepage;