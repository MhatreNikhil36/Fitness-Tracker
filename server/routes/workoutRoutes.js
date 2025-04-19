import express from "express";
import {
    getAvailableWorkouts,
    getPastActivity,
    getRecommendedWorkouts,
    completeWorkout,
    getAvailableExercises,
    completeExercise
  } from "../controllers/workoutsController.js";

import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/available", verifyToken, getAvailableWorkouts);
router.get("/past", verifyToken, getPastActivity);
router.get("/recommended", verifyToken, getRecommendedWorkouts);
router.post("/complete", verifyToken, completeWorkout);
router.get("/exercises", verifyToken, getAvailableExercises);
router.post("/exercises/complete", verifyToken, completeExercise);

export default router;