// GoalsDashboardPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Grid,
  CircularProgress,
  Button,
  Alert,
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
  const [errorMessage, setErrorMessage] = useState("");

  // Retrieve auth token from localStorage (adjust if needed)
  const authToken = localStorage.getItem("token") || "";

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/goals`,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        console.log("Fetched goals from backend:", response.data);
        setGoals(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching goals:", error);
        setErrorMessage(
          error.response?.data?.message || "Error fetching goals from server."
        );
        setLoading(false);
      }
    };

    fetchGoals();
  }, [authToken]);

  // Delete goal handler: calls backend API to delete a goal.
  const handleDeleteGoal = async (goalId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this goal?"
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_API_URL}/api/goals/${goalId}`,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        console.log(
          `Goal with id ${goalId} deleted successfully:`,
          response.data
        );
        setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalId));
      } catch (error) {
        console.error("Error deleting goal:", error);
        setErrorMessage(
          error.response?.data?.message ||
            "Error deleting goal. Please try again."
        );
      }
    }
  };

  // Separate goals into current (active) and past (completed)
  const currentGoals = goals.filter((g) => g.status === "in_progress");
  const pastGoals = goals.filter((g) => g.status === "completed");

  // Helper to map goal_type to user-friendly text.
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

  if (loading) {
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
        {/* Current Goals Section */}
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
