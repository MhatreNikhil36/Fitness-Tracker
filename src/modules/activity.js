import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Divider,
} from "@mui/material";

const Activity = () => {
  const [recentActivity, setRecentActivity] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [loadingActivity, setLoadingActivity] = useState(true);
  const [loadingWorkouts, setLoadingWorkouts] = useState(true);

  useEffect(() => {
    // 1. Fetch user’s recent activity
    fetch("/api/activity-logs?limit=5")
      .then((res) => res.json())
      .then((data) => {
        setRecentActivity(data); // array of activity log objects
        setLoadingActivity(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingActivity(false);
      });

    // 2. Fetch available workouts
    fetch("/api/workouts")
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data); // array of workout objects
        setLoadingWorkouts(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingWorkouts(false);
      });
  }, []);

  // 3. Handle user adding a workout to activity log
  const handleFollowWorkout = (workoutId) => {
    // Example: POST /api/activity-logs
    // Body might just include workout_id and let the server handle user_id, etc.
    const newLog = {
      workout_id: workoutId,
      duration_minutes: 30, // or ask the user
      calories_burned: 200, // or calculate on server
    };

    fetch("/api/activity-logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLog),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to add activity log");
        }
        return res.json();
      })
      .then((createdLog) => {
        console.log("Activity log created:", createdLog);
        // Optionally refresh recent activity
        setRecentActivity((prev) => [createdLog, ...prev]);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", mt: 4, p: 2 }}>
      <Typography variant="h3" gutterBottom>
        Home
      </Typography>

      {/* Recent Activity Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Recent Activity
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {loadingActivity ? (
          <CircularProgress />
        ) : recentActivity.length === 0 ? (
          <Typography>No recent activity found.</Typography>
        ) : (
          recentActivity.map((log) => (
            <Card key={log.id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="body1">
                  <strong>Workout ID:</strong> {log.workout_id}
                </Typography>
                <Typography variant="body1">
                  <strong>Duration (min):</strong> {log.duration_minutes}
                </Typography>
                <Typography variant="body1">
                  <strong>Calories Burned:</strong> {log.calories_burned}
                </Typography>
              </CardContent>
            </Card>
          ))
        )}
      </Box>

      {/* Workouts to Follow Section */}
      <Box>
        <Typography variant="h5" gutterBottom>
          Follow a Workout
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {loadingWorkouts ? (
          <CircularProgress />
        ) : workouts.length === 0 ? (
          <Typography>No workouts available.</Typography>
        ) : (
          workouts.map((workout) => (
            <Card key={workout.id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{workout.workout_name}</Typography>
                <Typography variant="body1">
                  <strong>Duration:</strong> {workout.duration} min
                </Typography>
                <Typography variant="body1">
                  <strong>Intensity:</strong> {workout.level_of_intensity}
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ mt: 2 }}
                  onClick={() => handleFollowWorkout(workout.id)}
                >
                  Add to Activity Log
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </Box>
    </Box>
  );
};

export default Activity;
