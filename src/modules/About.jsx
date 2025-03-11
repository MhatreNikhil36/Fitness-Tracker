import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import {
  FitnessCenter,
  Dashboard,
  RestaurantMenu,
  TrendingUp,
  DeviceHub,
  Security,
} from "@mui/icons-material";
import Footer from "../components/Footer";

const AboutUs = () => {
  const features = [
    {
      name: "Personalized Workouts",
      icon: <FitnessCenter />,
      description: "Customized fitness plans tailored to your goals",
    },
    {
      name: "Progress Tracking",
      icon: <TrendingUp />,
      description: "Monitor your improvements over time",
    },
    {
      name: "Nutrition Guidance",
      icon: <RestaurantMenu />,
      description: "Meal plans and nutritional advice",
    },
    {
      name: "Data Analytics",
      icon: <Dashboard />,
      description: "Insightful visualizations of your fitness journey",
    },
    {
      name: "Multi-device Sync",
      icon: <DeviceHub />,
      description: "Access your data across all your devices",
    },
    {
      name: "Privacy-focused",
      icon: <Security />,
      description: "Your data is secure and protected",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 2, sm: 3 },
          py: 2,
        }}
      >
        <Typography variant="h3" color="text.primary" gutterBottom>
          About FitTrack
        </Typography>

        <Grid container spacing={3}>
          {/* About FitTrack */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" color="text.primary" gutterBottom>
                  Our Mission
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Typography variant="body1" paragraph>
                  At FitTrack, we're passionate about helping you achieve your
                  fitness goals. Our state-of-the-art fitness tracking
                  application is designed to empower you on your wellness
                  journey, providing personalized insights and motivation every
                  step of the way.
                </Typography>

                <Typography variant="body1" paragraph>
                  Whether you're just starting out or you're a seasoned athlete,
                  FitTrack offers the tools and support you need to track your
                  progress, stay motivated, and reach new heights in your
                  fitness journey.
                </Typography>

                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    mt: 2,
                    bgcolor: (theme) =>
                      theme.palette.mode === "light" ? "#d32f2f" : "#f44336",
                    "&:hover": {
                      bgcolor: (theme) =>
                        theme.palette.mode === "light" ? "#b71c1c" : "#e53935",
                    },
                  }}
                >
                  Start Your Journey
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Features */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" color="text.primary" gutterBottom>
                  Why Choose FitTrack?
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <List>
                  {features.map((feature, index) => (
                    <ListItem key={index} disableGutters>
                      <ListItemIcon sx={{ minWidth: 40, color: "#d32f2f" }}>
                        {feature.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={feature.name}
                        secondary={feature.description}
                      />
                    </ListItem>
                  ))}
                </List>

                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Join Thousands of Satisfied Users
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    FitTrack has helped countless individuals transform their
                    lives through fitness. Our community of users ranges from
                    beginners to professional athletes, all united by the goal
                    of becoming their best selves.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ width: "100%" }}>
        {" "}
        <Footer />
      </Box>
    </Box>
  );
};

export default AboutUs;
