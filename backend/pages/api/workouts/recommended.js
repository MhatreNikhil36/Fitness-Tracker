import db from "../../../utils/db";
import withCors from "../../../utils/corsMiddleware";

async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const [rows] = await db.query(`
      SELECT id, name AS workout_name, estimated_duration AS duration, difficulty_level AS level_of_intensity
      FROM WorkoutTemplates
      WHERE difficulty_level IN ('beginner', 'intermediate') -- Sample filter, refine later with AI
      ORDER BY RAND()
      LIMIT 5
    `);

    res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching recommended workouts:", err);
    res.status(500).json({ message: "Failed to fetch recommended workouts." });
  }
}

export default withCors(handler);