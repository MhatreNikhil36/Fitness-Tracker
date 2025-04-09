import db from "../../../utils/db";
import withCors from "../../../utils/corsMiddleware";

async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const [rows] = await db.query(`
      SELECT cw.id, wt.name AS workout_name, cw.workout_date AS completed_on, cw.calories_burned AS total_calories_burned
      FROM CompletedWorkouts cw
      JOIN WorkoutTemplates wt ON cw.template_id = wt.id
      WHERE cw.user_id = 1 -- replace with dynamic session-based user ID
      ORDER BY cw.workout_date DESC
    `);

    res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching past workouts:", err);
    res.status(500).json({ message: "Failed to fetch past workouts." });
  }
}

export default withCors(handler);