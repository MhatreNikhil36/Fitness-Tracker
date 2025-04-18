// GoalProgressPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  TextField,
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
import { useParams, useNavigate } from "react-router-dom";

const GoalProgressPage = () => {
  const { goalId } = useParams();
  const navigate = useNavigate();
  const [goalData, setGoalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [newProgress, setNewProgress] = useState({
    recorded_value: "",
    timestamp: "",
  });

  // Retrieve auth token from storage
  const authToken = localStorage.getItem("token") || "";

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/goals/${goalId}`,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        console.log("Fetched goal data:", res.data);
        setGoalData(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching goal data:", err);
        setErrorMessage(
          err.response?.data?.message || "Error fetching goal data."
        );
        setLoading(false);
      }
    };

    fetchGoal();
  }, [goalId, authToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProgress((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProgress = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/goals/${goalId}/progress`,
        newProgress,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("Progress added, updated goal:", res.data);
      setGoalData(res.data);
      setNewProgress({ recorded_value: "", timestamp: "" });
    } catch (err) {
      console.error("Error adding progress:", err);
      setErrorMessage(
        err.response?.data?.message ||
          "Error adding progress. Please try again."
      );
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!goalData) {
    return (
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 8, p: 2 }}>
        <Typography variant="h5" color="text.primary">
          Goal not found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4, p: 2 }}>
      <Typography variant="h4" color="text.primary" gutterBottom>
        Goal Progress (Goal ID: {goalData.id})
      </Typography>
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" color="text.primary" gutterBottom>
            Current Progress
          </Typography>
          {goalData.progress && goalData.progress.length > 0 ? (
            <Box sx={{ mt: 2, width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={formatProgressData(goalData.progress)}>
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
          ) : (
            <Typography>No progress data available.</Typography>
          )}
        </CardContent>
      </Card>
      {goalData.status === "in_progress" && (
        <Card>
          <CardContent>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Add Progress
            </Typography>
            <form onSubmit={handleAddProgress}>
              <TextField
                fullWidth
                margin="normal"
                label="Recorded Value"
                type="number"
                name="recorded_value"
                value={newProgress.recorded_value}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Timestamp"
                type="date"
                name="timestamp"
                value={newProgress.timestamp}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
              <Box sx={{ textAlign: "right", mt: 2 }}>
                <Button variant="contained" color="error" type="submit">
                  Save Progress
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      )}
      <Box sx={{ textAlign: "left", mt: 2 }}>
        <Button variant="outlined" onClick={() => navigate("/goals")}>
          Back to Goals
        </Button>
      </Box>
    </Box>
  );
};

function formatProgressData(progressArray) {
  return progressArray.map((p) => ({
    recorded_value: p.recorded_value,
    label: p.timestamp,
  }));
}

export default GoalProgressPage;
