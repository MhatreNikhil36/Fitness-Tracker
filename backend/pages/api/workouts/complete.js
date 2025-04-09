import db from "../../../utils/db";
import withCors from "../../../utils/corsMiddleware";

async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  if (req.method !== "POST") return res.status(405).end();

  const { workout_id } = req.body;

  try {
    // 1. Get details of the workout template
    const [templates] = await db.query(
      `SELECT estimated_duration, difficulty_level FROM WorkoutTemplates WHERE id = ?`,
      [workout_id]
    );

    if (templates.length === 0) {
      return res.status(404).json({ message: "Workout template not found" });
    }

    const { estimated_duration } = templates[0];

    // 2. Insert into CompletedWorkouts using the values we got
    await db.query(
      `INSERT INTO CompletedWorkouts (user_id, template_id, workout_date, duration, calories_burned)
       VALUES (?, ?, CURDATE(), ?, ?)`,
      [1, workout_id, estimated_duration, 200] // 🔁 Static calories for now
    );

    res.status(200).json({ message: "Workout completed and logged successfully" });
  } catch (err) {
    console.error("🔥 DB ERROR:", err);
    res.status(500).json({ message: "Failed to log workout." });
  }
}

export default withCors(handler);