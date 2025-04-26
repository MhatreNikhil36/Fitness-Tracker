import pool from "../lib/db.js";

export const createAiPrompt = async (req, res) => {
  try {
    const userId = req.userId;
    const { prompt_type, prompt_template, variables, is_active } = req.body;

    if (!prompt_type || !prompt_template) {
      return res
        .status(400)
        .json({ message: "prompt_type and prompt_template are required." });
    }

    const [result] = await pool.query(
      `INSERT INTO aiprompts (prompt_type, prompt_template, variables, is_active, created_by)
       VALUES (?, ?, ?, ?, ?)`,
      [
        prompt_type,
        prompt_template,
        variables ? JSON.stringify(variables) : null,
        is_active === undefined ? 1 : is_active,
        userId,
      ]
    );

    res.status(201).json({
      message: "AI prompt created successfully",
      promptId: result.insertId,
    });
  } catch (err) {
    console.error("Create AI Prompt Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const listAiPrompts = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM aiprompts ORDER BY created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error("List AI Prompts Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
