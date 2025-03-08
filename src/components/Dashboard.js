import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  CircularProgress,
} from '@mui/material';
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
} from 'recharts';

const DashboardPage = () => {
  // States to hold fetched data
  const [goals, setGoals] = useState(null);
  const [progressData, setProgressData] = useState(null);
  const [nutritionData, setNutritionData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // ------------------------------------------------------------------
    // In a real app, you'd fetch data from your backend:
    // Example:
    //   fetch('/api/dashboard')
    //     .then((res) => res.json())
    //     .then((data) => {
    //       setGoals(data.goals);
    //       setProgressData(data.progress);
    //       setNutritionData(data.nutrition);
    //       setIsLoading(false);
    //     })
    //     .catch((err) => console.error(err));
    // For now, we'll mock up some data:
    // ------------------------------------------------------------------
    setTimeout(() => {
      const mockGoals = [
        {
          goal_type: 'lose_weight',
          target_value: 70,
          current_value: 75,
          status: 'in_progress',
          deadline: '2025-12-31',
        },
      ];

      // Mock progress data (e.g., weight over time)
      // The `name` could be a date or week label
      const mockProgress = [
        { name: 'Week 1', weight: 78 },
        { name: 'Week 2', weight: 77 },
        { name: 'Week 3', weight: 76 },
        { name: 'Week 4', weight: 75 },
      ];

      // Mock nutrition data for daily macros
      const mockNutrition = [
        { day: 'Mon', calories: 2000, protein: 150 },
        { day: 'Tue', calories: 1900, protein: 140 },
        { day: 'Wed', calories: 2100, protein: 160 },
        { day: 'Thu', calories: 2200, protein: 165 },
        { day: 'Fri', calories: 2000, protein: 150 },
      ];

      setGoals(mockGoals);
      setProgressData(mockProgress);
      setNutritionData(mockNutrition);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4, p: 2 }}>
      <Typography variant="h3" color="text.primary" gutterBottom>
        Dashboard
      </Typography>
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
                  </Box>
                ))
              ) : (
                <Typography>No goals found.</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Progress Chart (e.g., Weight Over Time) */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h5" color="text.primary" gutterBottom>
                Weight Progress
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {progressData && progressData.length > 0 ? (
                <LineChart
                  width={600}
                  height={300}
                  data={progressData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {/* Animation is enabled by default in Recharts */}
                  <Line
                    type="monotone"
                    dataKey="weight"
                    stroke="#d32f2f" // red highlight
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              ) : (
                <Typography>No progress data available.</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Nutrition Chart (Daily Calories/Protein) */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" color="text.primary" gutterBottom>
                Nutrition Overview
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {nutritionData && nutritionData.length > 0 ? (
                <BarChart
                  width={800}
                  height={300}
                  data={nutritionData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="calories" fill="#d32f2f" name="Calories" />
                  <Bar dataKey="protein" fill="#757575" name="Protein (g)" />
                </BarChart>
              ) : (
                <Typography>No nutrition data available.</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
