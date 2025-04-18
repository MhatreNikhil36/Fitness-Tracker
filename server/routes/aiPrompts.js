// server/routes/aiPrompts.js
import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createAiPrompt,
  listAiPrompts,
} from "../controllers/aiPromptsController.js";

const router = express.Router();

// POST /api/aiprompts => Insert a new AI prompt
router.post("/", verifyToken, createAiPrompt);

// GET /api/aiprompts => Optional: list all prompts for debugging
router.get("/", verifyToken, listAiPrompts);

export default router;
