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
  Button,
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
import { useNavigate } from "react-router-dom";

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

// Helper to format progress data from a goal's progress array (if available)
function formatProgressData(progressArray) {
  return progressArray.map((p) => ({
    weight: p.recorded_value,
    name: p.timestamp,
  }));
}

const DashboardPage = () => {
  // States for different dashboard data
  const [goals, setGoals] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [nutritionData, setNutritionData] = useState([]); // Nutrition logs/daily summaries
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const authToken = localStorage.getItem("token") || "";
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchDashboardData = async () => {
      // Use individual try/catch blocks so a failure in one call won't block the others.
      let fetchedGoals = [];
      try {
        const resGoals = await axios.get(`${API_URL}/api/goals`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        console.log("Fetched goals from backend:", resGoals.data);
        fetchedGoals = resGoals.data;
        setGoals(fetchedGoals);
      } catch (err) {
        console.error("Error fetching goals:", err);
        setGoals([]); // Set empty array to allow rest of the page to render
      }

      // If there is an active goal with progress, set progress data
      const activeGoal = fetchedGoals.find(
        (g) => g.status === "in_progress" && g.progress && g.progress.length > 0
      );
      if (activeGoal) {
        setProgressData(formatProgressData(activeGoal.progress));
      } else {
        setProgressData([]);
      }

      // Fetch nutrition data from backend
      try {
        const resNutrition = await axios.get(`${API_URL}/api/nutrition`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        console.log("Fetched nutrition logs:", resNutrition.data);
        setNutritionData(resNutrition.data); // Expects an array; if empty, will display fallback
      } catch (err) {
        console.error("Error fetching nutrition data:", err);
        setNutritionData([]); // Fallback to empty array
      }

      // // Fetch recent activity data from backend
      try {
        const resActivity = await axios.get(`${API_URL}/api/workouts/past`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        console.log("Fetched recent activity:", resActivity.data);
        setRecentActivity(resActivity.data);
      } catch (err) {
        console.error("Error fetching recent activity:", err);
        setRecentActivity([]);
      }

      setIsLoading(false);
    };

    fetchDashboardData();
  }, [authToken, API_URL]);

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

  // Quick Stats
  const goalsInProgress = goals.filter(
    (g) => g.status === "in_progress"
  ).length;
  const completedGoals = goals.filter((g) => g.status === "completed").length;
  // For weekly calories, sum calories field from nutritionData if present;
  // Otherwise, use a meaningful message or fallback value.
  const totalWeeklyCalories = nutritionData.reduce(
    (acc, day) => acc + (day.calories || 0),
    0
  );

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
              {totalWeeklyCalories > 0 ? (
                <Typography variant="h5">{totalWeeklyCalories}</Typography>
              ) : (
                <Typography variant="body2">
                  No nutrition logs available. Log your meals to view this stat.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Recent Workouts
              </Typography>
              {recentActivity.length > 0 ? (
                <Typography variant="h5">{recentActivity.length}</Typography>
              ) : (
                <Typography variant="body2">
                  No recent workouts. Start an activity!
                </Typography>
              )}
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
                goals.map((goal) => <GoalItem key={goal.id} goal={goal} />)
              ) : (
                <Typography>
                  No goals found. Add a goal to get started!
                </Typography>
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
                <Typography>
                  No progress data available. Track your weight to see progress!
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Nutrition Overview */}
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
                      <Bar
                        dataKey="protein"
                        fill="#757575"
                        name="Protein (g)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              ) : (
                <Typography>
                  No nutrition data available. Log your meals to see the chart
                  here!
                </Typography>
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
                  {recentActivity.slice(0, 3).map((act) => (
                    <ListItem key={act.id} disableGutters>
                      <ListItemText
                        primary={act.workout_name || act.exercise_name || "Activity"}
                        secondary={`Completed on: ${act.completed_on} | Calories: ${act.calories_burned}`}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography>
                  No recent workouts found. Start an activity and it will appear
                  here!
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
