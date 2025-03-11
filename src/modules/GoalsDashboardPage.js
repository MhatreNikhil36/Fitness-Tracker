// GoalsDashboardPage.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Grid,
  CircularProgress,
  Button,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";

const GoalsDashboardPage = () => {
  const navigate = useNavigate();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // -----------------------------------------------------
    // MOCK API CALL: Replace with a real fetch/axios call to your backend.
    // -----------------------------------------------------
    setTimeout(() => {
      const mockGoals = [
        {
          id: 1,
          user_id: 101,
          goal_type: "lose_weight",
          target_value: 70,
          current_value: 75,
          status: "in_progress",
          deadline: "2025-12-31",
          progress: [
            { recorded_value: 78, timestamp: "2025-05-01" },
            { recorded_value: 76, timestamp: "2025-06-01" },
            { recorded_value: 75, timestamp: "2025-07-01" },
          ],
        },
        {
          id: 2,
          user_id: 101,
          goal_type: "gain_muscle",
          target_value: 85,
          current_value: 85,
          status: "completed",
          deadline: "2024-12-31",
          progress: [
            { recorded_value: 80, timestamp: "2024-03-01" },
            { recorded_value: 83, timestamp: "2024-05-01" },
            { recorded_value: 85, timestamp: "2024-07-01" },
          ],
        },
      ];
      setGoals(mockGoals);
      setLoading(false);
    }, 1000);
  }, []);

  // Delete goal handler
  const handleDeleteGoal = (goalId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this goal?"
    );
    if (confirmDelete) {
      // -------------------------------------------------------
      // Dummy API call to delete the goal:
      // fetch(`/api/goals/${goalId}`, { method: 'DELETE' })
      //   .then((res) => res.json())
      //   .then(() => {
      //     setGoals((prevGoals) =>
      //       prevGoals.filter((goal) => goal.id !== goalId)
      //     );
      //   })
      //   .catch((err) => console.error(err));
      // -------------------------------------------------------
      console.log(`Deleting goal with id: ${goalId}`);
      setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalId));
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Separate goals into current (active) vs. past (completed)
  const currentGoals = goals.filter((g) => g.status === "in_progress");
  const pastGoals = goals.filter((g) => g.status === "completed");

  // Helper to map goal_type to user-friendly text
  const renderGoalType = (type) => {
    switch (type) {
      case "lose_weight":
        return "Lose Weight";
      case "gain_muscle":
        return "Gain Muscle";
      case "add_weight":
        return "Add Weight";
      default:
        return type;
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4, p: 2 }}>
      <Typography variant="h3" color="text.primary" gutterBottom>
        My Goals
      </Typography>

      {/* Add Goal Button */}
      <Box sx={{ textAlign: "right", mb: 3 }}>
        <Button
          variant="contained"
          color="error"
          onClick={() => navigate("/addGoal")}
        >
          Add New Goal
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Current (Active) Goals Section */}
        <Grid item xs={12}>
          <Typography variant="h5" color="text.primary" gutterBottom>
            Current Goals
          </Typography>
          <Divider sx={{ mb: 2 }} />
        </Grid>
        {currentGoals.length > 0 ? (
          currentGoals.map((goal) => (
            <Grid item xs={12} md={6} key={goal.id}>
              <Card sx={{ cursor: "pointer" }}>
                <CardContent>
                  <Typography variant="h6" color="text.primary" gutterBottom>
                    {renderGoalType(goal.goal_type)}
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

                  {/* Chart for progress */}
                  {goal.progress && goal.progress.length > 0 && (
                    <Box sx={{ mt: 2, width: "100%", height: 250 }}>
                      <ResponsiveContainer>
                        <LineChart data={formatProgressData(goal.progress)}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="label" />
                          <YAxis />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="recorded_value"
                            stroke="#d32f2f"
                            strokeWidth={2}
                            dot={{ r: 5 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </Box>
                  )}

                  {/* Buttons for View Progress and Delete */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 2,
                    }}
                  >
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => navigate(`/goal-progress/${goal.id}`)}
                    >
                      View Progress
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteGoal(goal.id)}
                    >
                      Delete Goal
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography>No current goals found.</Typography>
          </Grid>
        )}

        {/* Past Goals Section */}
        <Grid item xs={12} sx={{ mt: 4 }}>
          <Typography variant="h5" color="text.primary" gutterBottom>
            Past Goals
          </Typography>
          <Divider sx={{ mb: 2 }} />
        </Grid>
        {pastGoals.length > 0 ? (
          pastGoals.map((goal) => (
            <Grid item xs={12} md={6} key={goal.id}>
              <Card sx={{ cursor: "pointer" }}>
                <CardContent>
                  <Typography variant="h6" color="text.primary" gutterBottom>
                    {renderGoalType(goal.goal_type)}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Target Value:</strong> {goal.target_value}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Final Value:</strong> {goal.current_value}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Status:</strong> {goal.status}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Deadline:</strong> {goal.deadline}
                  </Typography>

                  {/* Chart for progress */}
                  {goal.progress && goal.progress.length > 0 && (
                    <Box sx={{ mt: 2, width: "100%", height: 250 }}>
                      <ResponsiveContainer>
                        <LineChart data={formatProgressData(goal.progress)}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="label" />
                          <YAxis />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="recorded_value"
                            stroke="#d32f2f"
                            strokeWidth={2}
                            dot={{ r: 5 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </Box>
                  )}

                  {/* Buttons for View Progress and Delete */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 2,
                    }}
                  >
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => navigate(`/goal-progress/${goal.id}`)}
                    >
                      View Progress
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteGoal(goal.id)}
                    >
                      Delete Goal
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography>No past goals found.</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

function formatProgressData(progressArray) {
  return progressArray.map((p) => ({
    recorded_value: p.recorded_value,
    label: p.timestamp,
  }));
}

export default GoalsDashboardPage;
