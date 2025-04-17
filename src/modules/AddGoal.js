import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  MenuItem,
  Divider,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

const GoalsPage = () => {
  // Local state matching the schema (minus id/user_id)
  const [goalData, setGoalData] = useState({
    goal_type: "",
    target_value: "",
    current_value: "",
    status: "",
    deadline: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Dialog visibility control
  const [showDialog, setShowDialog] = useState(false);

  // Access auth token from storage
  const authToken = localStorage.getItem("token") || "";
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoalData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/goals`,
        goalData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("Goal saved successfully:", response.data);

      // Show success message and open the dialog
      setSuccessMessage("Goal saved successfully!");
      setShowDialog(true);

      // Optionally reset the form
      setGoalData({
        goal_type: "",
        target_value: "",
        current_value: "",
        status: "",
        deadline: "",
      });
    } catch (err) {
      console.error("Error saving goal:", err);
      setErrorMessage(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  // Handle "Add Another Goal" in the dialog
  const handleAddAnotherGoal = () => {
    setShowDialog(false);
    setSuccessMessage("");
    // The form was already cleared, so user can start fresh
  };

  // Handle "Go Back" in the dialog
  const handleGoBack = () => {
    setShowDialog(false);
    navigate("/goals");
  };

  return (
    <>
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 8, p: 2 }}>
        <Typography variant="h4" color="text.primary" gutterBottom>
          Set or Update Your Goal
        </Typography>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {/* Goal Type Dropdown */}
              <TextField
                select
                fullWidth
                margin="normal"
                label="Goal Type"
                name="goal_type"
                value={goalData.goal_type}
                onChange={handleChange}
              >
                <MenuItem value="">Select a goal type</MenuItem>
                <MenuItem value="lose_weight">Lose Weight</MenuItem>
                <MenuItem value="gain_muscle">Gain Muscle</MenuItem>
                <MenuItem value="add_weight">Add Weight</MenuItem>
              </TextField>

              <TextField
                fullWidth
                margin="normal"
                type="number"
                label="Target Value"
                name="target_value"
                value={goalData.target_value}
                onChange={handleChange}
                placeholder="e.g., 70 (kg) or 100 (reps)"
              />
              <TextField
                fullWidth
                margin="normal"
                type="number"
                label="Current Value"
                name="current_value"
                value={goalData.current_value}
                onChange={handleChange}
                placeholder="e.g., 75 (kg) or 80 (reps)"
              />

              {/* Status Dropdown */}
              <TextField
                select
                fullWidth
                margin="normal"
                label="Status"
                name="status"
                value={goalData.status}
                onChange={handleChange}
              >
                <MenuItem value="">Select a status</MenuItem>
                <MenuItem value="in_progress">In Progress</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </TextField>

              <TextField
                fullWidth
                margin="normal"
                label="Deadline"
                type="date"
                name="deadline"
                value={goalData.deadline}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />

              <Divider sx={{ my: 2 }} />
              <Button variant="contained" color="error" type="submit" fullWidth>
                Save Goal
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>

      {/* Dialog for post-success actions */}
      <Dialog open={showDialog} onClose={handleGoBack}>
        <DialogTitle>Goal Saved Successfully</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your goal has been saved. Would you like to add another goal or go
            back to your goals page?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleAddAnotherGoal}
          >
            Add Another Goal
          </Button>
          <Button variant="contained" color="error" onClick={handleGoBack}>
            Go Back
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GoalsPage;
