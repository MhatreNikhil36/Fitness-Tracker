import express from "express";
import pool from "../lib/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, name FROM exercisecategories");
    res.json(rows);
  } catch (err) {
    console.error("Failed to fetch categories:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
