import pool from "../lib/db.js";

export const getAdminStats = async (req, res) => {
  try {
    const [[{ totalExercises }]] = await pool.query(
      "SELECT COUNT(*) AS totalExercises FROM exercises"
    );
    const [[{ totalWorkouts }]] = await pool.query(
      "SELECT COUNT(*) AS totalWorkouts FROM workouttemplates"
    );
    const [[{ totalAiPrompts }]] = await pool.query(
      "SELECT COUNT(*) AS totalAiPrompts FROM aiprompts"
    );
    const [[{ totalUsers }]] = await pool.query(
      "SELECT COUNT(*) AS totalUsers FROM users"
    );

    res.json({ totalExercises, totalWorkouts, totalAiPrompts, totalUsers });
  } catch (err) {
    console.error("Failed to get admin stats:", err);
    res.status(500).json({ message: "Failed to load stats" });
  }
};
