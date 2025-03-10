import React, { useState, useEffect } from 'react';
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
  TextField,
  MenuItem,
  CircularProgress,
} from '@mui/material';

const navBarHeight = 64;
const drawerWidth = 240;

const mockAvailable = [
  {
    id: 101,
    workout_name: 'Full Body Blast',
    duration: 45,
    level_of_intensity: 3,
    exercises: [
      {
        id: 1,
        name: 'Push Ups',
        sets: 3,
        reps: 12,
        rest_seconds: 60,
        total_calories_burned: 100,
      },
      {
        id: 2,
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
  const [selectedTab, setSelectedTab] = useState('available');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState('');
  const [selectedExercise, setSelectedExercise] = useState('');
  const [duration, setDuration] = useState('');
  const [calories, setCalories] = useState('');
  const [loadingWorkouts, setLoadingWorkouts] = useState(true);
  const [pastWorkouts, setPastWorkouts] = useState(mockPast);

  useEffect(() => {
    setTimeout(() => {
      setWorkouts(mockAvailable);
      setLoadingWorkouts(false);
    }, 500);
  }, []);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setOpenDialog(false);
    setSelectedWorkout(null);
  };

  const handleWorkoutClick = (workout) => {
    setSelectedWorkout(workout);
    setOpenDialog(true);
  };

  const handleFinishWorkout = () => {
    alert(`Workout "${selectedWorkout.workout_name}" completed!`);
    setOpenDialog(false);
  };

  const handleWorkoutChange = (e) => {
    const workoutId = e.target.value;
    setSelectedWorkoutId(workoutId);
    const foundWorkout = workouts.find(w => w.id.toString() === workoutId);
    if (foundWorkout && foundWorkout.exercises.length > 0) {
      setSelectedExercise(foundWorkout.exercises[0].name);
    } else {
      setSelectedExercise('');
    }
    setDuration('');
    setCalories('');
  };

  const handleExerciseChange = (e) => {
    setSelectedExercise(e.target.value);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const handleCaloriesChange = (e) => {
    setCalories(e.target.value);
  };

  const handleLogActivity = () => {
    if (!selectedWorkoutId || !selectedExercise || !duration || !calories) {
      alert('Please fill all the fields before logging activity!');
      return;
    }
    console.log('Activity Logged:', {
      workout_id: selectedWorkoutId,
      exercise_name: selectedExercise,
      duration_minutes: duration,
      calories_burned: calories,
    });

    const newActivity = {
      id: pastWorkouts.length + 1,
      workout_name: workouts.find(w => w.id.toString() === selectedWorkoutId)?.workout_name,
      completed_on: new Date().toISOString().split('T')[0], // Using current date for "Completed On"
      total_calories_burned: calories,
    };

    setPastWorkouts([...pastWorkouts, newActivity]);

    alert('Activity has been logged!');
    setSelectedWorkoutId('');
    setSelectedExercise('');
    setDuration('');
    setCalories('');
  };

  const handleResetForm = () => {
    setSelectedWorkoutId('');
    setSelectedExercise('');
    setDuration('');
    setCalories('');
  };

  if (loadingWorkouts) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  const sidebarContent = (
    <List>
      {['Available Workouts', 'Past Workouts', 'Recommended Workouts', 'Log Activity'].map((tab) => (
        <ListItemButton
          key={tab}
          selected={selectedTab === tab.toLowerCase().replace(' ', '_')}
          onClick={() => handleTabChange(tab.toLowerCase().replace(' ', '_'))}
        >
          <ListItemText primary={tab} />
        </ListItemButton>
      ))}
    </List>
  );

  let mainContent;
  switch (selectedTab) {
    case 'available':
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
      break;
    case 'past':
      mainContent = (
        <Box>
          <Typography variant="h5" gutterBottom>
            Past Workouts
          </Typography>
          {pastWorkouts.map((pw) => (
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
      break;
    case 'recommended':
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
      break;
    case 'log_activity':
      mainContent = (
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, p: 2 }}>
          <Typography variant="h4" gutterBottom>
            Log New Activity
          </Typography>
          <Divider sx={{ mb: 3 }} />

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
              <MenuItem key={w.id} value={w.id.toString()}>
                {w.workout_name}
              </MenuItem>
            ))}
          </TextField>

          {selectedWorkoutId && (
            <TextField
              select
              fullWidth
              margin="normal"
              label="Select Exercise"
              value={selectedExercise}
              onChange={handleExerciseChange}
            >
              <MenuItem value="">-- Choose Exercise --</MenuItem>
              {workouts.find(w => w.id.toString() === selectedWorkoutId)?.exercises.map((exercise, index) => (
                <MenuItem key={index} value={exercise.name}>
                  {exercise.name}
                </MenuItem>
              ))}
            </TextField>
          )}

          <TextField
            fullWidth
            margin="normal"
            label="Duration (minutes)"
            type="number"
            value={duration}
            onChange={handleDurationChange}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Calories Burned"
            type="number"
            value={calories}
            onChange={handleCaloriesChange}
          />

          <Button
            variant="contained"
            color="error"
            sx={{ mt: 3 }}
            onClick={handleLogActivity}
          >
            Log Activity
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            sx={{ mt: 2, ml: 2 }}
            onClick={handleResetForm}
          >
            Reset
          </Button>
        </Box>
      );
      break;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            mt: `${navBarHeight}px`,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              top: `${navBarHeight}px`,
              height: `calc(100% - ${navBarHeight}px)`,
            },
          }}
          anchor="left"
        >
          {sidebarContent}
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3, ml: `${drawerWidth}px`, mt: `${navBarHeight}px` }}>
          {mainContent}
        </Box>
      </Box>

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
