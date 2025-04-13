import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";

/** Example mock data for demonstration */
const mockAvailable = [
  {
    id: 101,
    workout_name: "Full Body Blast",
    duration: 45,
    level_of_intensity: 3,
    exercises: [
      {
        id: 1,
        exercise_id: 201,
        name: "Push Ups",
        sets: 3,
        reps: 12,
        rest_seconds: 60,
        total_calories_burned: 100,
      },
      {
        id: 2,
        exercise_id: 202,
        name: "Squats",
        sets: 3,
        reps: 10,
        rest_seconds: 45,
        total_calories_burned: 80,
      },
    ],
  },
  {
    id: 102,
    workout_name: "Cardio Quickie",
    duration: 20,
    level_of_intensity: 2,
    exercises: [
      {
        id: 3,
        exercise_id: 203,
        name: "Jumping Jacks",
        sets: 2,
        reps: 15,
        rest_seconds: 30,
        total_calories_burned: 120,
      },
    ],
  },
];

const mockPast = [
  {
    id: 201,
    workout_name: "Leg Day",
    completed_on: "2025-08-01",
    total_calories_burned: 300,
  },
  {
    id: 202,
    workout_name: "Upper Body Pump",
    completed_on: "2025-08-05",
    total_calories_burned: 250,
  },
];

const mockRecommended = [
  {
    id: 301,
    workout_name: "HIIT Beginner",
    duration: 15,
    level_of_intensity: 2,
  },
  {
    id: 302,
    workout_name: "Core Crusher",
    duration: 30,
    level_of_intensity: 4,
  },
];

const LogActivityPage = () => {
  const [selectedTab, setSelectedTab] = useState("available");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const handleWorkoutClick = (workout) => {
    setSelectedWorkout(workout);
    setOpenDialog(true);
  };

  const handleFinishWorkout = () => {
    if (!selectedWorkout) return;
    if (selectedWorkout.exercises) {
      selectedWorkout.exercises.forEach((ex) => {
        const activityData = {
          workout_id: selectedWorkout.id,
          exercise_id: ex.exercise_id,
          duration_minutes: 30,
          calories_burned: 200,
        };
        console.log("Mock POST /api/activity-logs:", activityData);
      });
    } else {
      console.log("Mock POST single entry for workout:", selectedWorkout.id);
    }
    alert(`Workout "${selectedWorkout.workout_name}" completed (mock)!`);
    setOpenDialog(false);
  };

  // Main content based on selectedTab
  let mainContent;
  if (selectedTab === "available") {
    mainContent = (
      <Grid container spacing={3}>
        {mockAvailable.map((w) => (
          <Grid item xs={12} md={6} lg={4} key={w.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: "none",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {w.workout_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Duration: {w.duration} min
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Intensity: {w.level_of_intensity}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => handleWorkoutClick(w)}
                  sx={{
                    bgcolor: "error.main",
                    "&:hover": { bgcolor: "error.dark" },
                  }}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  } else if (selectedTab === "past") {
    mainContent = (
      <Box>
        {mockPast.map((pw) => (
          <Card
            key={pw.id}
            sx={{
              mb: 2,
              boxShadow: "none",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <CardContent>
              <Typography variant="h6">{pw.workout_name}</Typography>
              <Typography variant="body2" color="text.secondary">
                Completed on: {pw.completed_on} | Calories:{" "}
                {pw.total_calories_burned}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  } else if (selectedTab === "recommended") {
    mainContent = (
      <Grid container spacing={3}>
        {mockRecommended.map((rw) => (
          <Grid item xs={12} md={6} lg={4} key={rw.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: "none",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {rw.workout_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Duration: {rw.duration} min
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Intensity: {rw.level_of_intensity}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => handleWorkoutClick(rw)}
                  sx={{
                    bgcolor: "error.main",
                    "&:hover": { bgcolor: "error.dark" },
                  }}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
        px: 4, // Add padding on the sides
      }}
    >
      {/* Center container */}
      <Box
        sx={{
          display: "flex",
          maxWidth: "1200px",
          width: "100%",
        }}
      >
        {/* Left sidebar */}
        <Box
          sx={{
            width: 240,
            flexShrink: 0,
          }}
        >
          <List sx={{ pt: 0 }}>
            <ListItemButton
              selected={selectedTab === "available"}
              onClick={() => setSelectedTab("available")}
              sx={{
                borderLeft: "4px solid",
                borderLeftColor:
                  selectedTab === "available" ? "error.main" : "transparent",
                "&.Mui-selected": {
                  bgcolor: "transparent",
                  color: "text.primary",
                },
                "&:hover": {
                  bgcolor: "transparent",
                  color: "text.primary",
                },
              }}
            >
              <ListItemText
                primary="Available Workouts"
                primaryTypographyProps={{
                  fontSize: "0.875rem",
                  fontWeight: selectedTab === "available" ? 500 : 400,
                }}
              />
            </ListItemButton>
            <ListItemButton
              selected={selectedTab === "past"}
              onClick={() => setSelectedTab("past")}
              sx={{
                borderLeft: "4px solid",
                borderLeftColor:
                  selectedTab === "past" ? "error.main" : "transparent",
                "&.Mui-selected": {
                  bgcolor: "transparent",
                  color: "text.primary",
                },
                "&:hover": {
                  bgcolor: "transparent",
                  color: "text.primary",
                },
              }}
            >
              <ListItemText
                primary="Past Workouts"
                primaryTypographyProps={{
                  fontSize: "0.875rem",
                  fontWeight: selectedTab === "past" ? 500 : 400,
                }}
              />
            </ListItemButton>
            <ListItemButton
              selected={selectedTab === "recommended"}
              onClick={() => setSelectedTab("recommended")}
              sx={{
                borderLeft: "4px solid",
                borderLeftColor:
                  selectedTab === "recommended" ? "error.main" : "transparent",
                "&.Mui-selected": {
                  bgcolor: "transparent",
                  color: "text.primary",
                },
                "&:hover": {
                  bgcolor: "transparent",
                  color: "text.primary",
                },
              }}
            >
              <ListItemText
                primary="Recommended"
                primaryTypographyProps={{
                  fontSize: "0.875rem",
                  fontWeight: selectedTab === "recommended" ? 500 : 400,
                }}
              />
            </ListItemButton>
          </List>
        </Box>

        {/* Main content area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
            {selectedTab === "available"
              ? "Available Workouts"
              : selectedTab === "past"
              ? "Past Workouts"
              : "Recommended Workouts"}
          </Typography>
          {mainContent}
        </Box>
      </Box>

      {/* WORKOUT DETAIL DIALOG */}
      {selectedWorkout && (
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>{selectedWorkout.workout_name}</DialogTitle>
          <DialogContent dividers>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Duration: {selectedWorkout.duration ?? "N/A"} min
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Intensity: {selectedWorkout.level_of_intensity ?? "N/A"}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {selectedWorkout.exercises &&
            selectedWorkout.exercises.length > 0 ? (
              selectedWorkout.exercises.map((ex) => (
                <Box key={ex.id} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1">{ex.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Sets/Reps: {ex.sets} x {ex.reps}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rest: {ex.rest_seconds} sec | Est. Calories:{" "}
                    {ex.total_calories_burned}
                  </Typography>
                  <Divider sx={{ mt: 1, mb: 1 }} />
                </Box>
              ))
            ) : (
              <Typography>No exercises found.</Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleFinishWorkout}
              sx={{
                bgcolor: "error.main",
                "&:hover": { bgcolor: "error.dark" },
              }}
            >
              Finish/Complete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default LogActivityPage;
