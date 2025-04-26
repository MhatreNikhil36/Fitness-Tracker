import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  IconButton,
  Grid,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { API_BASE_URL } from "../../api/config";

const AddWorkoutPage = () => {
  const [workoutData, setWorkoutData] = useState({
    workout_name: "",
    level_of_intensity: "",
    duration: "",
  });

  const [exercises, setExercises] = useState([
    {
      exercise_id: "",
      sets: "",
      reps: "",
      rest_seconds: "",
      total_calories_burned: "",
    },
  ]);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleWorkoutChange = (e) => {
    const { name, value } = e.target;
    setWorkoutData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleExerciseChange = (index, e) => {
    const { name, value } = e.target;
    setExercises((prev) => {
      const updated = [...prev];
      updated[index][name] = value;
      return updated;
    });
  };

  const handleAddExercise = () => {
    setExercises((prev) => [
      ...prev,
      {
        exercise_id: "",
        sets: "",
        reps: "",
        rest_seconds: "",
        total_calories_burned: "",
      },
    ]);
  };

  const handleRemoveExercise = (index) => {
    setExercises((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      const workoutRes = await axios.post(
        `${API_BASE_URL}/api/workouts/add`,
        {
          name: workoutData.workout_name,
          difficulty_level: workoutData.level_of_intensity,
          estimated_duration: workoutData.duration,
          equipment_needed: [],
          created_by: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const templateId = workoutRes.data.templateId;

      const exercisesPayload = exercises.map((ex, idx) => ({
        exercise_id: ex.exercise_id,
        sets: ex.sets,
        reps: ex.reps,
        rest_time: ex.rest_seconds,
        sequence_order: idx + 1,
      }));

      await axios.post(
        `${API_BASE_URL}/api/workouts/add-exercises/${templateId}`,
        { exercises: exercisesPayload },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage("Workout added successfully.");
      setErrorMessage("");

      setWorkoutData({
        workout_name: "",
        level_of_intensity: "",
        duration: "",
      });
      setExercises([
        {
          exercise_id: "",
          sets: "",
          reps: "",
          rest_seconds: "",
          total_calories_burned: "",
        },
      ]);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Failed to save workout.");
      setSuccessMessage("");
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 5 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Add New Workout
          </Typography>

          {errorMessage && (
            <Typography variant="body2" sx={{ color: "error.main", mb: 2 }}>
              {errorMessage}
            </Typography>
          )}
          {successMessage && (
            <Typography variant="body2" sx={{ color: "success.main", mb: 2 }}>
              {successMessage}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Workout Name"
              name="workout_name"
              value={workoutData.workout_name}
              onChange={handleWorkoutChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Level of Intensity (1-5)"
              name="level_of_intensity"
              value={workoutData.level_of_intensity}
              onChange={handleWorkoutChange}
              fullWidth
              margin="normal"
              required
              type="number"
            />
            <TextField
              label="Duration (minutes)"
              name="duration"
              value={workoutData.duration}
              onChange={handleWorkoutChange}
              fullWidth
              margin="normal"
              required
              type="number"
            />

            <Typography variant="h6" sx={{ mt: 3 }}>
              Exercises
            </Typography>
            {exercises.map((ex, index) => (
              <Grid container spacing={2} key={index} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Exercise ID"
                    name="exercise_id"
                    value={ex.exercise_id}
                    onChange={(e) => handleExerciseChange(index, e)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} sm={2}>
                  <TextField
                    label="Sets"
                    name="sets"
                    value={ex.sets}
                    onChange={(e) => handleExerciseChange(index, e)}
                    fullWidth
                    type="number"
                  />
                </Grid>
                <Grid item xs={6} sm={2}>
                  <TextField
                    label="Reps"
                    name="reps"
                    value={ex.reps}
                    onChange={(e) => handleExerciseChange(index, e)}
                    fullWidth
                    type="number"
                  />
                </Grid>
                <Grid item xs={6} sm={2}>
                  <TextField
                    label="Rest (s)"
                    name="rest_seconds"
                    value={ex.rest_seconds}
                    onChange={(e) => handleExerciseChange(index, e)}
                    fullWidth
                    type="number"
                  />
                </Grid>
                <Grid item xs={12} sm={1}>
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveExercise(index)}
                    sx={{ mt: 1 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}

            <Button
              variant="outlined"
              color="error"
              startIcon={<AddCircleIcon />}
              onClick={handleAddExercise}
              sx={{ mt: 2 }}
            >
              Add Exercise
            </Button>

            <Button
              type="submit"
              variant="contained"
              color="error"
              sx={{ mt: 4, display: "block" }}
            >
              Save Workout
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddWorkoutPage;
