import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { Link } from "react-router-dom";

// Example: replace these with real fetch calls or props
const mockStats = {
  totalExercises: 42,
  totalWorkouts: 15,
  totalAiPrompts: 7,
  totalUsers: 123,
};

const AdminHome = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box sx={{ p: 3, width: "60%" }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Welcome to the admin panel. Use the navigation above to manage
          exercises, workouts, and AI prompts. Below you’ll find a quick
          overview and direct actions.
        </Typography>

        {/* Quick Stats Section */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  Total Exercises
                </Typography>
                <Typography variant="h5">{mockStats.totalExercises}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  Total Workouts
                </Typography>
                <Typography variant="h5">{mockStats.totalWorkouts}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  AI Prompts
                </Typography>
                <Typography variant="h5">{mockStats.totalAiPrompts}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  Registered Users
                </Typography>
                <Typography variant="h5">{mockStats.totalUsers}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Quick Actions Section */}
        <Typography variant="h5" gutterBottom>
          Quick Actions
        </Typography>
        <Grid container spacing={3}>
          {/* Add Exercise */}
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardActionArea component={Link} to="/admin/add-exercise">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Add Exercise
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Create a new exercise entry in the system.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          {/* Add Workout */}
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardActionArea component={Link} to="/admin/add-workout">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Add Workout
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Define a workout plan with multiple exercises.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardActionArea component={Link} to="/admin/messages">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    messages
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    check messages from users.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          {/* Add AI Prompt */}
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardActionArea component={Link} to="/admin/add-Ai">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Add AI Prompt
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Create or update AI-based recommendations or prompts.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminHome;
