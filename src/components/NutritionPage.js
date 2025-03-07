import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NutritionPage = () => {
  const [nutritionData, setNutritionData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // USE THE BELOW PROMPT TO FETCH NUTRITION RECOMMENDATIONS
    // Based on the user's current weight of {HealthMetrics.weight_kg} kg, height of {HealthMetrics.height} cm, age {User.age}, gender {User.gender}, and goal of {Goal.goal_type} by {Goal.deadline}, suggest daily calorie intake, protein, carbs, and fats to achieve the goal. Return the data in JSON.
    // ----------------------------------------------------------------------
    // REPLACE WITH ACTUAL API CALL TO FETCH NUTRITION RECOMMENDATIONS
    // Example:
    //   fetch('/api/nutrition-recommendations?userId=123')
    //     .then((res) => res.json())
    //     .then((data) => {
    //       setNutritionData(data);
    //       setIsLoading(false);
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //       setIsLoading(false);
    //     });
    // ----------------------------------------------------------------------

    // For now, we’ll mock up some static data to illustrate
    // how you might handle different user goals and health metrics.
    // Example structure from the backend might look like:
    // {
    //   user: {
    //     firstName: "John",
    //     lastName: "Doe",
    //     weight_kg: 80,
    //     height_cm: 175,
    //     goal: {
    //       goalType: "Weight Loss",
    //       targetWeight: 75,
    //       dailyCalorieDeficit: 300
    //     }
    //   },
    //   recommendedNutrition: {
    //     calories: 2000,
    //     protein: 150,
    //     carbs: 250,
    //     fats: 70
    //   },
    //   sampleMealPlan: [
    //     { meal: "Breakfast", items: "Oats, Banana, Almonds", approxCalories: 400 },
    //     { meal: "Lunch", items: "Chicken Breast, Brown Rice, Veggies", approxCalories: 600 },
    //     { meal: "Dinner", items: "Salmon, Quinoa, Broccoli", approxCalories: 500 },
    //   ]
    // }

    setTimeout(() => {
      const dummyData = {
        user: {
          firstName: 'John',
          lastName: 'Doe',
          weight_kg: 80,
          height_cm: 175,
          goal: {
            goalType: 'Weight Loss',
            targetWeight: 75,
            dailyCalorieDeficit: 300,
          },
        },
        recommendedNutrition: {
          calories: 2000,
          protein: 150,
          carbs: 250,
          fats: 70,
        },
        sampleMealPlan: [
          {
            meal: 'Breakfast',
            items: 'Oats with berries, Almond milk, 1 banana',
            approxCalories: 400,
          },
          {
            meal: 'Lunch',
            items: 'Grilled Chicken Breast, Brown Rice, Mixed Veggies',
            approxCalories: 600,
          },
          {
            meal: 'Dinner',
            items: 'Baked Salmon, Quinoa, Steamed Broccoli',
            approxCalories: 500,
          },
        ],
      };
      setNutritionData(dummyData);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    // Simple loading spinner
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!nutritionData) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 8, p: 2 }}>
        <Typography variant="h5" color="text.primary">
          No nutrition data available.
        </Typography>
      </Box>
    );
  }

  const { user, recommendedNutrition, sampleMealPlan } = nutritionData;
  const { goalType, targetWeight } = user.goal || {};

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 8, p: 2 }}>
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
                  <TableCell><strong>Meal</strong></TableCell>
                  <TableCell><strong>Items</strong></TableCell>
                  <TableCell><strong>Approx. Calories</strong></TableCell>
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
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Button variant="contained" color="error" onClick={() => navigate('/log-nutrition')}>
          Log My Nutrition
        </Button>
      </Box>
    </Box>
  );
};

export default NutritionPage;
