import db from "../../../utils/db";
import withCors from "../../../utils/corsMiddleware"; // Import the CORS middleware

async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const [rows] = await db.query(`
      SELECT w.id, w.name AS workout_name, w.estimated_duration AS duration, w.difficulty_level AS level_of_intensity,
             e.id AS exercise_id, e.name AS exercise_name, we.sets, we.reps, we.rest_time AS rest_seconds
      FROM WorkoutTemplates w
      JOIN WorkoutTemplateExercises we ON w.id = we.template_id
      JOIN Exercises e ON we.exercise_id = e.id
    `);

    const workouts = {};
    for (const row of rows) {
      if (!workouts[row.id]) {
        workouts[row.id] = {
          id: row.id,
          workout_name: row.workout_name,
          duration: row.duration,
          level_of_intensity: row.level_of_intensity,
          exercises: [],
        };
      }
      workouts[row.id].exercises.push({
        id: row.exercise_id,
        name: row.exercise_name,
        sets: row.sets,
        reps: row.reps,
        rest_seconds: row.rest_seconds,
        total_calories_burned: 100,
      });
    }

    res.status(200).json(Object.values(workouts));
  } catch (err) {
    console.error("🔥 DATABASE ERROR:", err);
    res.status(500).json({ message: "Failed to fetch available workouts.", error: err.message });
  }
}

export default withCors(handler);