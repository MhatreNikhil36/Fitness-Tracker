// LogNutritionPage.js

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Divider,
} from '@mui/material';

const LogNutritionPage = () => {
  // Local state for form fields
  const [formData, setFormData] = useState({
    date: '',
    meal: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ------------------------------------------------------------
    // MAKE AN API CALL HERE TO SAVE THE NUTRITION LOG
    // Example:
    // fetch('/api/nutrition', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log('Saved nutrition log:', data);
    //   })
    //   .catch((error) => console.error(error));
    // ------------------------------------------------------------

    console.log('Logging nutrition:', formData);
    // Optionally, clear the form or navigate the user away
    setFormData({
      date: '',
      meal: '',
      calories: '',
      protein: '',
      carbs: '',
      fats: '',
    });
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 8, p: 2 }}>
      <Typography variant="h4" color="text.primary" gutterBottom>
        Log Nutrition
      </Typography>
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
