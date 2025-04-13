// NutritionPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Button,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const NutritionPage = () => {
  const [nutritionData, setNutritionData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNutritionRecommendations = async () => {
      try {
        const authToken = localStorage.getItem("token") || "";
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/nutrition/recommendations`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        console.log("Fetched nutrition recommendations:", response.data);
        setNutritionData(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching nutrition recommendations:", err);
        setErrorMessage(
          err.response?.data?.message ||
            "Failed to load nutrition recommendations."
        );
        setIsLoading(false);
      }
    };

    fetchNutritionRecommendations();
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (errorMessage) {
    return (
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 8, p: 2 }}>
        <Alert severity="error">{errorMessage}</Alert>
      </Box>
    );
  }

  if (!nutritionData) {
    return (
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 8, p: 2 }}>
        <Typography variant="h5" color="text.primary">
          No nutrition data available.
        </Typography>
      </Box>
    );
  }

  // Destructure the response data
  const { user, recommendedNutrition, sampleMealPlan } = nutritionData;
  const { goalType, targetWeight } = user?.goal || {};

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 8, p: 2 }}>
      <Typography variant="h4" color="text.primary" gutterBottom>
        Nutrition Recommendations
      </Typography>

      {/* USER & GOAL DETAILS */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            User Overview
          </Typography>
          <Typography variant="body1">
            <strong>Name:</strong> {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="body1">
            <strong>Current Weight:</strong> {user.weight_kg} kg
          </Typography>
          <Typography variant="body1">
            <strong>Height:</strong> {user.height_cm} cm
          </Typography>
          {goalType && (
            <>
              <Typography variant="body1">
                <strong>Goal:</strong> {goalType}
              </Typography>
              <Typography variant="body1">
                <strong>Target Weight:</strong> {targetWeight} kg
              </Typography>
            </>
          )}
        </CardContent>
      </Card>

      {/* RECOMMENDED MACROS */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Daily Macro Targets
          </Typography>
          {recommendedNutrition ? (
            <>
              <Typography variant="body1">
                <strong>Calories:</strong> {recommendedNutrition.calories} kcal
              </Typography>
              <Typography variant="body1">
                <strong>Protein:</strong> {recommendedNutrition.protein} g
              </Typography>
              <Typography variant="body1">
                <strong>Carbs:</strong> {recommendedNutrition.carbs} g
              </Typography>
              <Typography variant="body1">
                <strong>Fats:</strong> {recommendedNutrition.fats} g
              </Typography>
            </>
          ) : (
            <Typography variant="body2">
              No recommended nutrition data available.
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* SAMPLE MEAL PLAN */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Suggested Meal Plan
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {sampleMealPlan && sampleMealPlan.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Meal</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Items</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Approx. Calories</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sampleMealPlan.map((meal, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{meal.meal}</TableCell>
                    <TableCell>{meal.items}</TableCell>
                    <TableCell>{meal.approxCalories}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography variant="body2">No meal plan available.</Typography>
          )}
        </CardContent>
      </Card>

      {/* ACTIONS (e.g., LOG NUTRITION) */}
      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Button
          variant="contained"
          color="error"
          onClick={() => navigate("/log-nutrition")}
        >
          Log My Nutrition
        </Button>
      </Box>
    </Box>
  );
};

export default NutritionPage;
