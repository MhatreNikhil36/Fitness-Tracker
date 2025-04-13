import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Divider,
  Alert,
} from "@mui/material";

const LogNutritionPage = () => {
  // Local state for form fields
  const [formData, setFormData] = useState({
    date: "",
    meal: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
  });

  // Optional: track errors and success
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear previous messages on change
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem("token") || "";
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/nutrition`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("Saved nutrition log:", response.data);

      // Display a success message and reset the form
      setSuccessMessage("Nutrition record saved successfully!");
      setFormData({
        date: "",
        meal: "",
        calories: "",
        protein: "",
        carbs: "",
        fats: "",
      });
    } catch (error) {
      console.error("Error saving nutrition:", error);
      setErrorMessage(
        error.response?.data?.message || "Error saving nutrition record."
      );
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 8, p: 2 }}>
      <Typography variant="h4" color="text.primary" gutterBottom>
        Log Nutrition
      </Typography>

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      <Card>
        <CardContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Enter details of your meal or daily totals to track your nutrition.
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Meal or Description"
              name="meal"
              value={formData.meal}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Calories"
              type="number"
              name="calories"
              value={formData.calories}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Protein (g)"
              type="number"
              name="protein"
              value={formData.protein}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Carbs (g)"
              type="number"
              name="carbs"
              value={formData.carbs}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Fats (g)"
              type="number"
              name="fats"
              value={formData.fats}
              onChange={handleChange}
            />

            <Button
              variant="contained"
              color="error" // Red highlight
              sx={{ mt: 2 }}
              type="submit"
              fullWidth
            >
              Save
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LogNutritionPage;
