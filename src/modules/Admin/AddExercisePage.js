import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { API_BASE_URL } from "../../api/config";

const difficultyLevels = ["Beginner", "Intermediate", "Advanced"];

const AddExercisePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category_id: "",
    difficulty_level: "",
    muscle_groups: "",
    equipment_needed: "",
    instructions: "",
    video_url: "",
    image_url: "",
  });

  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/exercise-categories`);
        setCategories(res.data);
      } catch (err) {
        setErrorMessage("Failed to load categories.");
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      const payload = {
        ...formData,
        muscle_groups: formData.muscle_groups
          .split(",")
          .map((item) => item.trim()),
        equipment_needed: formData.equipment_needed
          .split(",")
          .map((item) => item.trim()),
        category_id: formData.category_id,
        created_by: user.id,
      };

      await axios.post(`${API_BASE_URL}/api/exercises/add`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccessMessage("Exercise added successfully.");
      setErrorMessage("");
      setFormData({
        name: "",
        description: "",
        category_id: "",
        difficulty_level: "",
        muscle_groups: "",
        equipment_needed: "",
        instructions: "",
        video_url: "",
        image_url: "",
      });
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || "Failed to save exercise."
      );
      setSuccessMessage("");
    }
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 5 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Add New Exercise
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
              multiline
            />

            <TextField
              select
              label="Category"
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Difficulty Level"
              name="difficulty_level"
              value={formData.difficulty_level}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            >
              {difficultyLevels.map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Muscle Groups (comma-separated)"
              name="muscle_groups"
              value={formData.muscle_groups}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Equipment Needed (comma-separated)"
              name="equipment_needed"
              value={formData.equipment_needed}
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
              label="Video URL"
              name="video_url"
              value={formData.video_url}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Image URL"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              fullWidth
              margin="normal"
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
