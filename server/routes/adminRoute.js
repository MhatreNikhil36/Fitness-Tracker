import express from "express";
import { getAdminStats } from "../controllers/adminController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/stats", verifyToken, getAdminStats);

export default router;
