import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getNutritionRecommendations,
  logNutrition,
} from "../controllers/nutritionController.js";

const router = express.Router();

// GET /api/nutrition/recommendations => returns recommended macros & sample meal plan
router.get("/recommendations", verifyToken, getNutritionRecommendations);

// POST /api/nutrition => logs a new nutrition record
router.post("/", verifyToken, logNutrition);

export default router;
