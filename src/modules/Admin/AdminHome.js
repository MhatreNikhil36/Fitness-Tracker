import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../api/config";

const AdminHome = () => {
  const [stats, setStats] = useState({
    totalExercises: 0,
    totalWorkouts: 0,
    totalAiPrompts: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_BASE_URL}/api/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };

    fetchStats();
  }, []);

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
                <Typography variant="h5">{stats.totalExercises}</Typography>
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
                <Typography variant="h5">{stats.totalWorkouts}</Typography>
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
                <Typography variant="h5">{stats.totalAiPrompts}</Typography>
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
                <Typography variant="h5">{stats.totalUsers}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Typography variant="h5" gutterBottom>
          Quick Actions
        </Typography>
        <Grid container spacing={3}>
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
