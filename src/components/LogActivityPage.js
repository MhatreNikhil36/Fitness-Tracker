// LogActivityPage.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
  Divider,
} from '@mui/material';

const LogActivityPage = () => {
  // 1. Store data in state
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState('');
  const [exercises, setExercises] = useState([]);
  const [loadingWorkouts, setLoadingWorkouts] = useState(true);
  const [loadingExercises, setLoadingExercises] = useState(false);

  useEffect(() => {
    // -----------------------------
    // Mock fetching workouts
    // Replace this with real fetch('/api/workouts') if available
    // -----------------------------
    setTimeout(() => {
      const mockWorkouts = [
        {
          id: 101,
          workout_name: 'Full Body Blast',
          duration: 45,
          level_of_intensity: 3,
        },
        {
          id: 102,
          workout_name: 'Cardio Quickie',
          duration: 20,
          level_of_intensity: 2,
        },
      ];
      setWorkouts(mockWorkouts);
      setLoadingWorkouts(false);
    }, 500);
  }, []);

  // Handle user selecting a workout
  const handleWorkoutChange = (e) => {
    const workoutId = e.target.value;
    setSelectedWorkoutId(workoutId);
    setExercises([]);
    if (workoutId) {
      setLoadingExercises(true);

      // -----------------------------
      // Mock fetching exercises for the chosen workout
      // Replace this with real fetch(`/api/workout-exercises?workoutId=${workoutId}`)
      // -----------------------------
      setTimeout(() => {
        let mockExercises = [];
        if (workoutId === 101) {
          mockExercises = [
            {
              id: 1,
              workout_id: 101,
              exercise_id: 201,
              sets: 3,
              reps: 12,
              rest_seconds: 60,
              total_calories_burned: 100,
              sequence_order: 1,
            },
            {
              id: 2,
              workout_id: 101,
              exercise_id: 202,
              sets: 3,
              reps: 10,
              rest_seconds: 45,
              total_calories_burned: 80,
              sequence_order: 2,
            },
          ];
        } else if (workoutId === 102) {
          mockExercises = [
            {
              id: 3,
              workout_id: 102,
              exercise_id: 203,
              sets: 2,
              reps: 15,
              rest_seconds: 30,
              total_calories_burned: 120,
              sequence_order: 1,
            },
          ];
        }
        setExercises(mockExercises);
        setLoadingExercises(false);
      }, 600);
    }
  };

  // When user clicks "I Completed This Workout"
  // we create an ActivityLog record for each exercise
  const handleCompleteWorkout = () => {
    if (!selectedWorkoutId || exercises.length === 0) return;

    // Mocked user input for demonstration
    const duration = 30;
    const calories = 200;

    // Typically, you'd do multiple POST calls or a single call with an array
    // to your real endpoint. Here, we just log to console.
    exercises.forEach((ex) => {
      const activityData = {
        workout_id: selectedWorkoutId,
        exercise_id: ex.exercise_id,
        duration_minutes: duration,
        calories_burned: calories,
        // user_id is typically derived from auth context on the backend
      };
      console.log('Mock POST to /api/activity-logs with:', activityData);
    });

    alert('Workout completed and logged (mock)!');
  };

  if (loadingWorkouts) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Log Activity (Mock)
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* Select a Workout */}
      <TextField
        select
        fullWidth
        margin="normal"
        label="Select a Workout"
        value={selectedWorkoutId}
        onChange={handleWorkoutChange}
      >
        <MenuItem value="">-- Choose Workout --</MenuItem>
        {workouts.map((w) => (
          <MenuItem key={w.id} value={w.id}>
            {w.workout_name} (Intensity: {w.level_of_intensity})
          </MenuItem>
        ))}
      </TextField>

      {/* Show the exercises for that workout */}
      {loadingExercises && <CircularProgress size={24} />}
      {!loadingExercises && exercises.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Exercises in this Workout
          </Typography>
          {exercises.map((ex) => (
            <Card key={ex.id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="body1">
                  <strong>Exercise ID:</strong> {ex.exercise_id}
                </Typography>
                <Typography variant="body2">
                  <strong>Sets:</strong> {ex.sets} | <strong>Reps:</strong> {ex.reps} |{' '}
                  <strong>Rest (s):</strong> {ex.rest_seconds} |{' '}
                  <strong>Calories (per ex.):</strong> {ex.total_calories_burned} |{' '}
                  <strong>Order:</strong> {ex.sequence_order}
                </Typography>
              </CardContent>
            </Card>
          ))}
          <Button variant="contained" color="error" onClick={handleCompleteWorkout}>
            I Completed This Workout
          </Button>
        </Box>
      )}

      {/* If no exercises found, display a message */}
      {!loadingExercises && selectedWorkoutId && exercises.length === 0 && (
        <Typography sx={{ mt: 2 }}>No exercises found for this workout.</Typography>
      )}
    </Box>
  );
};

export default LogActivityPage;
