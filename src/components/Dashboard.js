import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    // In a real app, you'd do something like:
    // fetch('/api/dashboard')
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setGoals(data.goals);
    //     setProgressData(data.progress);
    //     setNutritionData(data.nutrition);
    //     setRecentActivity(data.activity);
    //     setIsLoading(false);
    //   })
    //   .catch((err) => console.error(err));
    // Mock data for demonstration:
    setTimeout(() => {
      const mockGoals = [
        {
          goal_type: "lose_weight",
          target_value: 70,
          current_value: 75,
          status: "in_progress",
          deadline: "2025-12-31",
        },
        {
          goal_type: "gain_muscle",
          target_value: 85,
          current_value: 83,
          status: "in_progress",
          deadline: "2025-10-01",
        },
      ];

      const mockProgress = [
        { name: "Week 1", weight: 78 },
        { name: "Week 2", weight: 77 },
        { name: "Week 3", weight: 76 },
        { name: "Week 4", weight: 75 },
      ];

      const mockNutrition = [
        { day: "Mon", calories: 2000, protein: 150 },
        { day: "Tue", calories: 1900, protein: 140 },
        { day: "Wed", calories: 2100, protein: 160 },
        { day: "Thu", calories: 2200, protein: 165 },
        { day: "Fri", calories: 2000, protein: 150 },
      ];

      const mockActivity = [
        {
          id: 1,
          workout_name: "Full Body Blast",
          date: "2025-09-01",
          calories_burned: 300,
        },
        {
          id: 2,
          workout_name: "Cardio Quickie",
          date: "2025-09-03",
          calories_burned: 250,
        },
      ];

      setGoals(mockGoals);
      setProgressData(mockProgress);
      setNutritionData(mockNutrition);
      setRecentActivity(mockActivity);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Compute quick stats (e.g., how many goals are in progress vs completed)
  const goalsInProgress = goals.filter(
    (g) => g.status === "in_progress"
  ).length;
  const completedGoals = goals.filter((g) => g.status === "completed").length;
  // Example: total weekly calories from mockNutrition
  const totalWeeklyCalories = nutritionData.reduce(
    (acc, day) => acc + day.calories,
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
              {goals && goals.length > 0 ? (
                goals.map((goal, idx) => (
                  <Box key={idx} sx={{ mb: 2 }}>
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
                      <Bar
                        dataKey="protein"
                        fill="#757575"
                        name="Protein (g)"
                      />
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

export default DashboardPage;
