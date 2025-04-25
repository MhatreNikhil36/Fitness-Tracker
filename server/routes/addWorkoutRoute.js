import express from "express";
import {
  addWorkout,
  addWorkoutExercises,
} from "../controllers/addWorkoutController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/add", verifyToken, addWorkout);
router.post("/add-exercises/:templateId", verifyToken, addWorkoutExercises);

export default router;
