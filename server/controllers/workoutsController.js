import db from "../lib/db.js";

// GET /api/workouts/available
export const getAvailableWorkouts = async (req, res) => {
  try {
    const { search, intensity } = req.query;

    let sql = `
      SELECT w.id, w.name AS workout_name, w.estimated_duration AS duration, w.difficulty_level AS level_of_intensity,
         e.id AS exercise_id, e.name AS exercise_name, we.sets, we.reps, we.rest_time AS rest_seconds
      FROM workouttemplates w
      JOIN workouttemplateexercises we ON w.id = we.template_id
      JOIN exercises e ON we.exercise_id = e.id
    `;

    const params = [];
    const filters = [];
    if (search) {
        filters.push(`w.name LIKE ?`);
        params.push(`%${search}%`);
    }

    if (intensity) {
        filters.push(`w.difficulty_level = ?`);
        params.push(intensity);
      }
  
    if (filters.length > 0) {
        sql += " WHERE " + filters.join(" AND ");
        
    }

    const [rows] = await db.query(sql, params);

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
};

// GET /api/workouts/past
export const getPastWorkouts = async (req, res) => {
  try {
    const userId = req.userId;
    const [rows] = await db.query(`
      SELECT cw.id, wt.name AS workout_name, cw.workout_date AS completed_on, cw.calories_burned AS total_calories_burned
      FROM completedworkouts cw
      JOIN workouttemplates wt ON cw.template_id = wt.id
      WHERE cw.user_id = ?
      ORDER BY cw.workout_date DESC
    `, [userId]);

    res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching past workouts:", err);
    res.status(500).json({ message: "Failed to fetch past workouts." });
  }
};

// GET /api/workouts/recommended
export const getRecommendedWorkouts = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT id, name AS workout_name, estimated_duration AS duration, difficulty_level AS level_of_intensity
      FROM workouttemplates
      WHERE difficulty_level IN ('beginner', 'intermediate') -- Adjust later based on user profile
      ORDER BY RAND()
      LIMIT 3
    `);

    res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching recommended workouts:", err);
    res.status(500).json({ message: "Failed to fetch recommended workouts." });
  }
};

// POST /api/workouts/complete
export const completeWorkout = async (req, res) => {
  try {
    const userId = req.userId;
    const { workout_id, duration_minutes, calories_burned } = req.body;

    // Get template details
    const [templateRows] = await db.query(`
      SELECT id, name, estimated_duration FROM workouttemplates WHERE id = ?
    `, [workout_id]);

    if (templateRows.length === 0) {
      return res.status(404).json({ message: "Workout template not found" });
    }

    // Insert into CompletedWorkouts only
    await db.query(`
      INSERT INTO completedworkouts (user_id, template_id, workout_date, duration, calories_burned)
      VALUES (?, ?, CURDATE(), ?, ?)
    `, [userId, workout_id, duration_minutes ?? templateRows[0].estimated_duration, calories_burned ?? 200]);

    res.status(200).json({ message: "Workout marked as completed" });
  } catch (err) {
    console.error("🔥 DB ERROR:", err);
    res.status(500).json({ message: "Failed to log workout", error: err.message });
  }
};
