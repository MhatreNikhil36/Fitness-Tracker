// server/routes/goalProgress.js
import express from "express";
import {
  getGoalWithProgress,
  addProgressToGoal,
  markGoalCompleted 
} from "../controllers/goalProgressController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// GET /api/goals/:goalId
router.get("/:goalId", verifyToken, getGoalWithProgress);

// POST /api/goals/:goalId/progress
router.post("/:goalId/progress", verifyToken, addProgressToGoal);

router.patch("/:goalId/complete", verifyToken, markGoalCompleted);

export default router;
