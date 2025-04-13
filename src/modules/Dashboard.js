import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Alert,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

const DashboardPage = () => {
  // States to hold fetched data
  const [goals, setGoals] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [nutritionData, setNutritionData] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Retrieve auth token (adjust if needed)
  const authToken = localStorage.getItem("token") || "";

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch goals from your backend
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/goals`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        console.log("Fetched goals from backend:", res.data);

        setGoals(res.data);

        // If you want to do something special with the first active goal's progress:
        const activeGoal = res.data.find((g) => g.status === "in_progress");
        if (activeGoal && activeGoal.progress && activeGoal.progress.length > 0) {
          setProgressData(formatProgressData(activeGoal.progress));
        }

        // For now, these remain empty arrays unless you implement endpoints for them
        setNutritionData([]);
        setRecentActivity([]);

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setErrorMessage(
          err.response?.data?.message || "Error fetching dashboard data from server."
        );
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [authToken]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (errorMessage) {
    return (
      <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4, p: 2 }}>
        <Alert severity="error">{errorMessage}</Alert>
      </Box>
    );
  }

  // Compute quick stats (e.g., how many goals are in progress vs completed)
  const goalsInProgress = goals.filter((g) => g.status === "in_progress").length;
  const completedGoals = goals.filter((g) => g.status === "completed").length;
  // Example: total weekly calories from nutritionData (currently empty)
  const totalWeeklyCalories = nutritionData.reduce((acc, day) => acc + (day.calories || 0), 0);

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 0, p: 2 }}>
      <Typography variant="h3" color="text.primary" gutterBottom>
        Dashboard
      </Typography>

      {/* Quick Stats Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Goals In Progress
              </Typography>
              <Typography variant="h5">{goalsInProgress}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Completed Goals
              </Typography>
              <Typography variant="h5">{completedGoals}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Weekly Calories
              </Typography>
              <Typography variant="h5">{totalWeeklyCalories}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Recent Workouts
              </Typography>
              <Typography variant="h5">{recentActivity.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Goals Section */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" color="text.primary" gutterBottom>
                My Goals
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {goals.length > 0 ? (
                goals.map((goal) => (
                  <GoalItem key={goal.id} goal={goal} />
                ))
              ) : (
                <Typography>No goals found.</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Progress Chart (Weight Over Time) */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h5" color="text.primary" gutterBottom>
                Weight Progress
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {progressData && progressData.length > 0 ? (
                <Box sx={{ width: "100%", height: 300 }}>
                  <ResponsiveContainer>
                    <LineChart data={progressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="weight"
                        stroke="#d32f2f"
                        strokeWidth={3}
                        dot={{ r: 5 }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              ) : (
                <Typography>No progress data available.</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Nutrition Chart (Daily Calories/Protein) */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h5" color="text.primary" gutterBottom>
                Nutrition Overview
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {nutritionData && nutritionData.length > 0 ? (
                <Box sx={{ width: "100%", height: 300 }}>
                  <ResponsiveContainer>
                    <BarChart data={nutritionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="calories" fill="#d32f2f" name="Calories" />
                      <Bar dataKey="protein" fill="#757575" name="Protein (g)" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              ) : (
                <Typography>No nutrition data available.</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" color="text.primary" gutterBottom>
                Recent Activity
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {recentActivity.length > 0 ? (
                <List>
                  {recentActivity.map((act) => (
                    <ListItem key={act.id} disableGutters>
                      <ListItemText
                        primary={act.workout_name}
                        secondary={`Date: ${act.date} | Calories: ${act.calories_burned}`}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography>No recent activity found.</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

// Reusable component to render a single goal's details
const GoalItem = ({ goal }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="body1">
      <strong>Type:</strong> {goal.goal_type}
    </Typography>
    <Typography variant="body1">
      <strong>Target Value:</strong> {goal.target_value}
    </Typography>
    <Typography variant="body1">
      <strong>Current Value:</strong> {goal.current_value}
    </Typography>
    <Typography variant="body1">
      <strong>Status:</strong> {goal.status}
    </Typography>
    <Typography variant="body1">
      <strong>Deadline:</strong> {goal.deadline}
    </Typography>
    <Divider sx={{ mt: 1, mb: 1 }} />
  </Box>
);

// Helper to format progress data from e.g. goal.progress
function formatProgressData(progressArray) {
  return progressArray.map((p) => ({
    weight: p.recorded_value,
    name: p.timestamp,
  }));
}

export default DashboardPage;
