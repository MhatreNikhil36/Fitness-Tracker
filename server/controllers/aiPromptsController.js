// server/controllers/aiPromptsController.js
import pool from "../lib/db.js";

/**
 * POST /api/aiprompts
 * Inserts a new AI prompt template into the 'aiprompts' table.
 */
export const createAiPrompt = async (req, res) => {
  const userId = req.userId; // from verifyToken
  const {
    prompt_type,
    prompt_template,
    variables, // optional JSON
    is_active,
  } = req.body;

  if (!prompt_type || !prompt_template) {
    return res.status(400).json({
      message: "prompt_type and prompt_template are required fields.",
    });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO aiprompts 
       (prompt_type, prompt_template, variables, is_active, created_by) 
       VALUES (?, ?, ?, ?, ?)`,
      [
        prompt_type,
        prompt_template,
        variables ? JSON.stringify(variables) : null,
        is_active === undefined ? 1 : is_active,
        userId,
      ]
    );

    const newId = result.insertId;
    res.status(201).json({
      message: "AI prompt template created successfully",
      promptId: newId,
    });
  } catch (err) {
    console.error("Error creating AI prompt:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /api/aiprompts
 * Retrieves a list of AI prompt templates. (Optional, if you want to see them.)
 */
export const listAiPrompts = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM aiprompts ORDER BY created_at DESC`);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching AI prompts:", err);
    res.status(500).json({ message: "Server error" });
  }
};
