// server/routes/goals.js
import express from "express";
import { deleteGoal,getGoalsForUser, createGoal, updateGoal } from "../controllers/goalsController.js";
import { verifyToken } from "../middleware/verifyToken.js"; // Ensure you have this middleware set up

const router = express.Router();

// GET /api/goals – Retrieve all goals for the authenticated user.
router.get("/", verifyToken, getGoalsForUser);

// DELETE /api/goals/:goalId – Delete a specific goal.
router.delete("/:goalId", verifyToken, deleteGoal);

// Create a new goal
router.post("/", verifyToken, createGoal);

// Update an existing goal
router.put("/", verifyToken, updateGoal);

export default router;
