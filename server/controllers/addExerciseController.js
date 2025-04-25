import pool from "../lib/db.js";

export const addExercise = async (req, res) => {
  try {
    const {
      name,
      description,
      category_id,
      difficulty_level,
      muscle_groups,
      equipment_needed,
      instructions,
      video_url,
      image_url,
    } = req.body;

    const created_by = req.userId;

    const [result] = await pool.query(
      `INSERT INTO exercises (
        name, description, category_id, difficulty_level,
        muscle_groups, equipment_needed,
        instructions, video_url, image_url, created_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        description,
        category_id,
        difficulty_level,
        JSON.stringify(muscle_groups),
        JSON.stringify(equipment_needed),
        instructions,
        video_url,
        image_url,
        created_by,
      ]
    );

    res.status(201).json({ message: "Exercise added", id: result.insertId });
  } catch (err) {
    console.error("Add Exercise Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
