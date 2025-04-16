// server/routes/nutritionRoutes.js
import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getAllNutritionRecords,
  getNutritionRecommendations,
  logNutrition
} from "../controllers/nutritionController.js";

const router = express.Router();

// GET all logs for the user
router.get("/", verifyToken, getAllNutritionRecords);

// GET AI-based recommendations
router.get("/recommendations", verifyToken, getNutritionRecommendations);

// POST a new nutrition log
router.post("/", verifyToken, logNutrition);

export default router;
