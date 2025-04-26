import pool from "../lib/db.js";

export const addWorkout = async (req, res) => {
  try {
    const { name, difficulty_level, estimated_duration, equipment_needed } =
      req.body;

    const created_by = req.userId;

    const [result] = await pool.query(
      `INSERT INTO workouttemplates (
        name, description, difficulty_level,
        estimated_duration, equipment_needed, created_by
      ) VALUES (?, NULL, ?, ?, ?, ?)`,
      [
        name,
        difficulty_level,
        estimated_duration,
        JSON.stringify(equipment_needed || []),
        created_by,
      ]
    );

    res
      .status(201)
      .json({ message: "Workout created", templateId: result.insertId });
  } catch (err) {
    console.error("Add Workout Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const addWorkoutExercises = async (req, res) => {
  try {
    const { templateId } = req.params;
    const { exercises } = req.body;

    const values = exercises.map((ex) => [
      templateId,
      ex.exercise_id,
      ex.sets,
      ex.reps,
      ex.rest_time,
      ex.sequence_order,
    ]);

    await pool.query(
      `INSERT INTO workouttemplateexercises (
        template_id, exercise_id, sets, reps, rest_time, sequence_order
      ) VALUES ?`,
      [values]
    );

    res.status(201).json({ message: "Exercises added to workout" });
  } catch (err) {
    console.error("Add Workout Exercises Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
