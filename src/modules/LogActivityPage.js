import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
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
  Container,
} from "@mui/material";

const LogActivityPage = () => {
  const [selectedTab, setSelectedTab] = useState("available");
  const [availableWorkouts, setAvailableWorkouts] = useState([]);
  const [pastActivity, setPastActivity] = useState([]);
  const [recommendedWorkouts, setRecommendedWorkouts] = useState([]);
  const [availableExercises, setAvailableExercises] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [intensityFilter, setIntensityFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    if (!token) return;
    setLoading(true);

    try {
      if (selectedTab === "available") {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/workouts/available`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { search: searchQuery, intensity: intensityFilter },
          }
        );
        setAvailableWorkouts(res.data);
      } else if (selectedTab === "recommended") {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/workouts/recommended`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRecommendedWorkouts(res.data.recommendations || []);
      } else if (selectedTab === "past") {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/workouts/past`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPastActivity(res.data);
      } else if (selectedTab === "exercises") {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/workouts/exercises`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { search: searchQuery, intensity: intensityFilter },
          }
        );
        setAvailableExercises(res.data);
      }
    } catch (err) {
      console.error(`Error fetching ${selectedTab} data:`, err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    setAvailableWorkouts([]);
    setPastActivity([]);
    setRecommendedWorkouts([]);
    setAvailableExercises([]);
  }, [selectedTab, searchQuery, intensityFilter]);

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const handleFinish = async () => {
    if (!selectedItem) return;
    const isWorkout = !!selectedItem.exercises;
    const endpoint = isWorkout ? "complete" : "exercises/complete";

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/workouts/${endpoint}`,
        isWorkout
          ? {
              workout_id: selectedItem.id,
              duration_minutes: selectedItem.duration ?? 30,
              calories_burned: 200,
            }
          : {
              exercise_id: selectedItem.id,
              duration_minutes: selectedItem.duration ?? 20,
              calories_burned: 100,
            },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(`${isWorkout ? "Workout" : "Exercise"} marked as complete!`);
      setOpenDialog(false);
      setSelectedTab("past");
    } catch (err) {
      console.error("Error completing activity:", err);
      alert("Failed to log activity.");
    }
  };

  const renderCards = (items, isWorkout = true) => (
    <Grid container spacing={3}>
      {items.map((item) => (
        <Grid item xs={12} md={6} lg={4} key={item.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                {item.workout_name || item.name}
              </Typography>
              <Typography variant="body2">
                Duration: {item.duration ?? 20} min
              </Typography>
              <Typography variant="body2">
                Intensity: {item.level_of_intensity || item.difficulty_level}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleViewDetails(item)}
              >
                View Details
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      );
    }

    switch (selectedTab) {
      case "available":
        return (
          <>
            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
              <TextField
                label="Search Workouts"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <TextField
                select
                label="Intensity"
                value={intensityFilter}
                onChange={(e) => setIntensityFilter(e.target.value)}
                sx={{ width: 200 }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="beginner">Beginner</MenuItem>
                <MenuItem value="intermediate">Intermediate</MenuItem>
                <MenuItem value="advanced">Advanced</MenuItem>
              </TextField>
            </Box>
            {renderCards(availableWorkouts)}
          </>
        );
      case "past":
        return (
          <Box>
            {pastActivity.map((entry) => (
              <Card key={entry.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6">
                    {entry.workout_name || entry.exercise_name}
                  </Typography>
                  <Typography variant="body2">
                    Completed on: {entry.completed_on} | Calories:{" "}
                    {entry.total_calories_burned}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        );
      case "recommended":
        return (
          <Box>
            {recommendedWorkouts.length > 0 ? (
              renderCards(recommendedWorkouts)
            ) : (
              <Typography>No recommended workouts found.</Typography>
            )}
          </Box>
        );
      case "exercises":
        return (
          <Box>
            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
              <TextField
                label="Search Exercises"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <TextField
                select
                label="Intensity"
                value={intensityFilter}
                onChange={(e) => setIntensityFilter(e.target.value)}
                sx={{ width: 200 }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="beginner">Beginner</MenuItem>
                <MenuItem value="intermediate">Intermediate</MenuItem>
                <MenuItem value="advanced">Advanced</MenuItem>
              </TextField>
            </Box>
            {renderCards(availableExercises, false)}
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Grid container spacing={4}>
        <Grid item sx={{ width: 240 }}>
          <List>
            {[
              { key: "available", label: "Available Workouts" },
              { key: "past", label: "Past Activity" },
              { key: "recommended", label: "Recommended Workouts" },
              { key: "exercises", label: "Available Exercises" },
            ].map((tab) => (
              <ListItemButton
                key={tab.key}
                selected={selectedTab === tab.key}
                onClick={() => setSelectedTab(tab.key)}
                sx={{
                  borderLeft: "4px solid",
                  borderLeftColor:
                    selectedTab === tab.key ? "error.main" : "transparent",
                }}
              >
                <ListItemText
                  primary={tab.label}
                  primaryTypographyProps={{
                    fontSize: "0.875rem",
                    fontWeight: selectedTab === tab.key ? 500 : 400,
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Grid>

        <Grid item xs>
          <Box sx={{ maxWidth: 900 }}>
            <Typography variant="h6" fontWeight={500} sx={{ mb: 4 }}>
              {
                {
                  available: "Available Workouts",
                  past: "Past Activity",
                  recommended: "Recommended Workouts",
                  exercises: "Available Exercises",
                }[selectedTab]
              }
            </Typography>

            {renderContent()}
          </Box>
        </Grid>
      </Grid>

      {selectedItem && (
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            {selectedItem.workout_name || selectedItem.name}
          </DialogTitle>
          <DialogContent dividers>
            <Typography sx={{ mb: 1 }}>
              Duration: {selectedItem.duration ?? 20} min
            </Typography>
            <Typography sx={{ mb: 2 }}>
              Intensity:{" "}
              {selectedItem.level_of_intensity || selectedItem.difficulty_level}
            </Typography>
            {selectedItem.exercises?.map((ex) => (
              <Box key={ex.id} sx={{ mb: 2 }}>
                <Typography variant="subtitle1">{ex.name}</Typography>
                <Typography variant="body2">
                  Sets: {ex.sets}, Reps: {ex.reps}
                </Typography>
                <Typography variant="body2">
                  Rest: {ex.rest_seconds} sec | Est. Calories:{" "}
                  {ex.total_calories_burned}
                </Typography>
                <Divider sx={{ my: 1 }} />
              </Box>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button variant="contained" color="error" onClick={handleFinish}>
              Complete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default LogActivityPage;
