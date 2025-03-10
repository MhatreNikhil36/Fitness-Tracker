// LogActivityPage.js
import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
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
} from '@mui/material';

/** Typical Material UI AppBar height is ~64px. Adjust if your NavBar differs. */
const navBarHeight = 64;
const drawerWidth = 240;

/** Example mock data for demonstration */
const mockAvailable = [
  {
    id: 101,
    workout_name: 'Full Body Blast',
    duration: 45,
    level_of_intensity: 3,
    exercises: [
      {
        id: 1,
        exercise_id: 201,
        name: 'Push Ups',
        sets: 3,
        reps: 12,
        rest_seconds: 60,
        total_calories_burned: 100,
      },
      {
        id: 2,
        exercise_id: 202,
        name: 'Squats',
        sets: 3,
        reps: 10,
        rest_seconds: 45,
        total_calories_burned: 80,
      },
    ],
  },
  {
    id: 102,
    workout_name: 'Cardio Quickie',
    duration: 20,
    level_of_intensity: 2,
    exercises: [
      {
        id: 3,
        exercise_id: 203,
        name: 'Jumping Jacks',
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
    workout_name: 'Leg Day',
    completed_on: '2025-08-01',
    total_calories_burned: 300,
  },
  {
    id: 202,
    workout_name: 'Upper Body Pump',
    completed_on: '2025-08-05',
    total_calories_burned: 250,
  },
];

const mockRecommended = [
  {
    id: 301,
    workout_name: 'HIIT Beginner',
    duration: 15,
    level_of_intensity: 2,
  },
  {
    id: 302,
    workout_name: 'Core Crusher',
    duration: 30,
    level_of_intensity: 4,
  },
];

const LogActivityPage = () => {
  // Track which tab is selected: 'available', 'past', 'recommended'
  const [selectedTab, setSelectedTab] = useState('available');

  // For the dialog that shows workout details
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  // Sidebar navigation
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setOpenDialog(false);
    setSelectedWorkout(null);
  };

  // Clicking a workout card
  const handleWorkoutClick = (workout) => {
    setSelectedWorkout(workout);
    setOpenDialog(true);
  };

  // "Finish/Complete" in the dialog
  const handleFinishWorkout = () => {
    if (!selectedWorkout) return;

    // For each exercise in the workout, we'd do a POST to /api/activity-logs
    if (selectedWorkout.exercises) {
      selectedWorkout.exercises.forEach((ex) => {
        const activityData = {
          workout_id: selectedWorkout.id,
          exercise_id: ex.exercise_id,
          duration_minutes: 30, // Could be user input
          calories_burned: 200, // Or calculated by server
        };
        console.log('Mock POST /api/activity-logs:', activityData);
      });
    } else {
      // If no exercises, just log one entry for the workout
      console.log('Mock POST single entry for workout:', selectedWorkout.id);
    }

    alert(`Workout "${selectedWorkout.workout_name}" completed (mock)!`);
    setOpenDialog(false);
  };

  // Sidebar content
  const sidebarContent = (
    <List>
      <ListItemButton
        selected={selectedTab === 'available'}
        onClick={() => handleTabChange('available')}
      >
        <ListItemText primary="Available Workouts" />
      </ListItemButton>
      <ListItemButton
        selected={selectedTab === 'past'}
        onClick={() => handleTabChange('past')}
      >
        <ListItemText primary="Past Workouts" />
      </ListItemButton>
      <ListItemButton
        selected={selectedTab === 'recommended'}
        onClick={() => handleTabChange('recommended')}
      >
        <ListItemText primary="Recommended" />
      </ListItemButton>
    </List>
  );

  // Main content based on selectedTab
  let mainContent;
  if (selectedTab === 'available') {
    mainContent = (
      <Grid container spacing={3}>
        {mockAvailable.map((w) => (
          <Grid item xs={12} md={6} lg={4} key={w.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5">{w.workout_name}</Typography>
                <Typography variant="body1">Duration: {w.duration} min</Typography>
                <Typography variant="body1">Intensity: {w.level_of_intensity}</Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                <Button variant="contained" color="error" onClick={() => handleWorkoutClick(w)}>
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  } else if (selectedTab === 'past') {
    mainContent = (
      <Box>
        <Typography variant="h5" gutterBottom>
          Past Workouts
        </Typography>
        {mockPast.map((pw) => (
          <Card key={pw.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{pw.workout_name}</Typography>
              <Typography variant="body2">
                Completed on: {pw.completed_on} | Calories: {pw.total_calories_burned}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  } else if (selectedTab === 'recommended') {
    mainContent = (
      <Box>
        <Typography variant="h5" gutterBottom>
          Recommended Workouts
        </Typography>
        <Grid container spacing={3}>
          {mockRecommended.map((rw) => (
            <Grid item xs={12} md={6} lg={4} key={rw.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{rw.workout_name}</Typography>
                  <Typography variant="body2">Duration: {rw.duration} min</Typography>
                  <Typography variant="body2">
                    Intensity: {rw.level_of_intensity}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                  <Button variant="contained" color="error" onClick={() => handleWorkoutClick(rw)}>
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Global NavBar at the top */}


      {/* Main content with sidebar below the nav bar */}
      <Box sx={{ display: 'flex', flex: 1 }}>
        {/* SIDEBAR DRAWER (Permanent) */}
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            mt: '64px', // offset if your NavBar is ~64px tall
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              top: `${navBarHeight}px`,
              height: `calc(100% - ${navBarHeight}px)`,
            },
          }}
          anchor="left"
        >
          <Box sx={{ overflow: 'auto' }}>{sidebarContent}</Box>
        </Drawer>

        {/* MAIN AREA */}
        <Box component="main" sx={{ flexGrow: 1, p: 3, ml: `${drawerWidth}px`, mt: '64px' }}>
          {mainContent}
        </Box>
      </Box>

      {/* WORKOUT DETAIL DIALOG */}
      {selectedWorkout && (
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>{selectedWorkout.workout_name}</DialogTitle>
          <DialogContent dividers>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Duration: {selectedWorkout.duration ?? 'N/A'} min
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Intensity: {selectedWorkout.level_of_intensity ?? 'N/A'}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {selectedWorkout.exercises && selectedWorkout.exercises.length > 0 ? (
              selectedWorkout.exercises.map((ex) => (
                <Box key={ex.id} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1">{ex.name}</Typography>
                  <Typography variant="body2">
                    Sets/Reps: {ex.sets} x {ex.reps}
                  </Typography>
                  <Typography variant="body2">
                    Rest: {ex.rest_seconds} sec | Est. Calories: {ex.total_calories_burned}
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
            <Button variant="contained" color="error" onClick={handleFinishWorkout}>
              Finish/Complete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default LogActivityPage;
