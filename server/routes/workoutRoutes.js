import express from "express";
import {
    getAvailableWorkouts,
    getPastWorkouts,
    getRecommendedWorkouts,
    completeWorkout
  } from "../controllers/workoutsController.js";

import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/available", verifyToken, getAvailableWorkouts);
router.get("/past", verifyToken, getPastWorkouts);
router.get("/recommended", verifyToken, getRecommendedWorkouts);
router.post("/complete", verifyToken, completeWorkout);

export default router;