import express from "express";
import { addExercise } from "../controllers/addExerciseController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/add", verifyToken, addExercise);

export default router;
