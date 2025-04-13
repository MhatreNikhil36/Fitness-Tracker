import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

const AddExercisePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    muscle_group: "",
    instructions: "",
    video_link: "",
    calories: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Example: POST /api/exercises
    console.log("Submitting new exercise:", formData);
    // Reset
    setFormData({
      name: "",
      description: "",
      muscle_group: "",
      instructions: "",
      video_link: "",
      calories: "",
    });
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 5 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Add New Exercise
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Muscle Group"
              name="muscle_group"
              value={formData.muscle_group}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Instructions"
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              fullWidth
              margin="normal"
              multiline
            />
            <TextField
              label="Video Link"
              name="video_link"
              value={formData.video_link}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Calories (estimated)"
              name="calories"
              value={formData.calories}
              onChange={handleChange}
              fullWidth
              margin="normal"
              type="number"
              required
            />

            <Button
              type="submit"
              variant="contained"
              color="error"
              sx={{ mt: 2 }}
            >
              Save Exercise
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddExercisePage;
