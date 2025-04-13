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

const AddWorkoutPage = () => {
  const [workoutData, setWorkoutData] = useState({
    workout_name: "",
    level_of_intensity: "",
    duration: "",
  });

  const [exercises, setExercises] = useState([
    // Start with one row or none, up to you
    {
      exercise_id: "",
      sets: "",
      reps: "",
      rest_seconds: "",
      total_calories_burned: "",
    },
  ]);

  // Handle workout details
  const handleWorkoutChange = (e) => {
    const { name, value } = e.target;
    setWorkoutData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle exercise row changes
  const handleExerciseChange = (index, e) => {
    const { name, value } = e.target;
    setExercises((prev) => {
      const updated = [...prev];
      updated[index][name] = value;
      return updated;
    });
  };

  // Add new exercise row
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

  // Remove exercise row
  const handleRemoveExercise = (index) => {
    setExercises((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit the form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Example: POST /api/workouts to create the workout
    // Then POST /api/workout-exercises for each exercise entry
    console.log("Workout Data:", workoutData);
    console.log("Exercises:", exercises);
    // Reset form
    setWorkoutData({ workout_name: "", level_of_intensity: "", duration: "" });
    setExercises([
      {
        exercise_id: "",
        sets: "",
        reps: "",
        rest_seconds: "",
        total_calories_burned: "",
      },
    ]);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 5 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Add New Workout
          </Typography>
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
                <Grid item xs={6} sm={2}>
                  <TextField
                    label="Calories"
                    name="total_calories_burned"
                    value={ex.total_calories_burned}
                    onChange={(e) => handleExerciseChange(index, e)}
                    fullWidth
                    type="number"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={1}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveExercise(index)}
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
