import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createAiPrompt,
  listAiPrompts,
} from "../controllers/aiPromptsController.js";

const router = express.Router();

router.post("/", verifyToken, createAiPrompt);

router.get("/", verifyToken, listAiPrompts);

export default router;
