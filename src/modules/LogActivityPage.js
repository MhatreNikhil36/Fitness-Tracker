import React, { useState, useEffect } from "react";
import axios from "axios";
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
  TextField,
  MenuItem,
  CircularProgress,
} from "@mui/material";

const LogActivityPage = () => {
  const [selectedTab, setSelectedTab] = useState("available");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [availableWorkouts, setAvailableWorkouts] = useState([]);
  const [pastWorkouts, setPastWorkouts] = useState([]);
  const [recommendedWorkouts, setRecommendedWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const [searchTerm, setSearchTerm] = useState("");
  const [intensityFilter, setIntensityFilter] = useState("");

  useEffect(() => {
    const validTabs = ["available", "past", "recommended"];
    if (!validTabs.includes(selectedTab)) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/workouts/${selectedTab}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params:
              selectedTab === "available"
                ? {
                    search: searchTerm,
                    intensity: intensityFilter,
                  }
                : {},
          }
        );

        if (selectedTab === "available") setAvailableWorkouts(res.data);
        if (selectedTab === "past") setPastWorkouts(res.data);
        if (selectedTab === "recommended") setRecommendedWorkouts(res.data);
      } catch (err) {
        console.error(`Failed to fetch ${selectedTab} workouts`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTab, searchTerm, intensityFilter]);

  const handleWorkoutClick = (workout) => {
    setSelectedWorkout(workout);
    setOpenDialog(true);
  };

  const handleFinishWorkout = async () => {
    if (!selectedWorkout) return;
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/workouts/complete`,
        {
          workout_id: selectedWorkout.id,
          duration_minutes: selectedWorkout.duration ?? 30,
          calories_burned: 200,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(`Workout "${selectedWorkout.workout_name}" completed!`);
      setOpenDialog(false);
      setSelectedTab("past");
    } catch (err) {
      console.error("Error logging workout:", err);
      alert("Error logging workout.");
    }
  };

  // --- Main content based on tab ---
  let mainContent;

  if (loading) {
    mainContent = (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  } else if (selectedTab === "available") {
    mainContent = (
      <>
        {/* Search & Filter Section */}
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <TextField
            label="Intensity"
            variant="outlined"
            select
            value={intensityFilter}
            onChange={(e) => setIntensityFilter(e.target.value)}
            sx={{ minWidth: 180 }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="beginner">Beginner</MenuItem>
            <MenuItem value="intermediate">Intermediate</MenuItem>
            <MenuItem value="advanced">Advanced</MenuItem>
          </TextField>
        </Box>

        <Grid container spacing={3}>
          {Array.isArray(availableWorkouts) &&
            availableWorkouts.map((w) => (
              <Grid item xs={12} md={6} lg={4} key={w.id}>
                <Card sx={{ height: "100%", display: "flex", flexDirection: "column", boxShadow: "none", border: "1px solid", borderColor: "divider" }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>{w.workout_name}</Typography>
                    <Typography variant="body2" color="text.secondary">Duration: {w.duration} min</Typography>
                    <Typography variant="body2" color="text.secondary">Intensity: {w.level_of_intensity}</Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
                    <Button
                      variant="contained"
                      onClick={() => handleWorkoutClick(w)}
                      sx={{ bgcolor: "error.main", "&:hover": { bgcolor: "error.dark" } }}
                    >
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </>
    );
  } else if (selectedTab === "past") {
    mainContent = (
      <Box>
        {Array.isArray(pastWorkouts) &&
          pastWorkouts.map((pw) => (
            <Card key={pw.id} sx={{ mb: 2, boxShadow: "none", border: "1px solid", borderColor: "divider" }}>
              <CardContent>
                <Typography variant="h6">{pw.workout_name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Completed on: {pw.completed_on} | Calories: {pw.total_calories_burned}
                </Typography>
              </CardContent>
            </Card>
          ))}
      </Box>
    );
  } else if (selectedTab === "recommended") {
    mainContent = (
      <Grid container spacing={3}>
        {Array.isArray(recommendedWorkouts) &&
          recommendedWorkouts.map((rw) => (
            <Grid item xs={12} md={6} lg={4} key={rw.id}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column", boxShadow: "none", border: "1px solid", borderColor: "divider" }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>{rw.workout_name}</Typography>
                  <Typography variant="body2" color="text.secondary">Duration: {rw.duration} min</Typography>
                  <Typography variant="body2" color="text.secondary">Intensity: {rw.level_of_intensity}</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
                  <Button
                    variant="contained"
                    onClick={() => handleWorkoutClick(rw)}
                    sx={{ bgcolor: "error.main", "&:hover": { bgcolor: "error.dark" } }}
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
    <Box sx={{ display: "flex", justifyContent: "center", minHeight: "100vh", bgcolor: "background.default", px: 4 }}>
      <Box sx={{ display: "flex", maxWidth: "1200px", width: "100%" }}>
        {/* Sidebar */}
        <Box sx={{ width: 240, flexShrink: 0 }}>
          <List sx={{ pt: 0 }}>
            {["available", "past", "recommended"].map((tab) => (
              <ListItemButton
                key={tab}
                selected={selectedTab === tab}
                onClick={() => setSelectedTab(tab)}
                sx={{
                  borderLeft: "4px solid",
                  borderLeftColor: selectedTab === tab ? "error.main" : "transparent",
                  "&.Mui-selected": { bgcolor: "transparent", color: "text.primary" },
                  "&:hover": { bgcolor: "transparent", color: "text.primary" },
                }}
              >
                <ListItemText
                  primary={tab.charAt(0).toUpperCase() + tab.slice(1) + " Workouts"}
                  primaryTypographyProps={{
                    fontSize: "0.875rem",
                    fontWeight: selectedTab === tab ? 500 : 400,
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>

        {/* Main content */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
            {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)} Workouts
          </Typography>
          {mainContent}
        </Box>
      </Box>

      {/* Workout Detail Dialog */}
      {selectedWorkout && (
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>{selectedWorkout.workout_name}</DialogTitle>
          <DialogContent dividers>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Duration: {selectedWorkout.duration ?? "N/A"} min
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Intensity: {selectedWorkout.level_of_intensity ?? "N/A"}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {selectedWorkout.exercises?.length > 0 ? (
              selectedWorkout.exercises.map((ex) => (
                <Box key={ex.id} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1">{ex.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Sets/Reps: {ex.sets} x {ex.reps}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
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
            <Button variant="contained" onClick={handleFinishWorkout} sx={{ bgcolor: "error.main", "&:hover": { bgcolor: "error.dark" } }}>
              Finish/Complete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default LogActivityPage;
