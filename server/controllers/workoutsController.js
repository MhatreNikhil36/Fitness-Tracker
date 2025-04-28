import db from "../lib/db.js";

import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

/**
 * GET /api/workouts/recommendations
 * AI-powered workout suggestions
 */
export const getRecommendedWorkouts = async (req, res) => {
  const userId = req.userId;

  try {
    /* ------------------------------------------------------------------ */
    /* 1) Basic user + supporting data                                    */
    /* ------------------------------------------------------------------ */
    const [[user]] = await db.query(
      `SELECT id, first_name, last_name, gender, date_of_birth
         FROM users
        WHERE id = ?`,
      [userId]
    );
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found. Please sign up or log in." });
    }

    const [[latestMetrics]] = await db.query(
      `SELECT weight_kg, height_cm
         FROM users
        WHERE id = ?`,
      [userId]
    );

    const [[activeGoal]] = await db.query(
      `SELECT goal_type, target_value, deadline
         FROM goals
        WHERE user_id = ?
          AND status = 'in_progress'
     ORDER BY created_at DESC
        LIMIT 1`,
      [userId]
    );

    const hasMetrics = Boolean(
      latestMetrics?.weight_kg && latestMetrics?.height_cm
    );
    const hasActiveGoal = Boolean(activeGoal);

    if (!hasMetrics && !hasActiveGoal) {
      return res.status(200).json({
        message:
          "We need more data about your health metrics and goals to recommend workouts. " +
          "Please record your weight/height and set an active goal.",
        user: {
          firstName: user.first_name,
          lastName: user.last_name,
          weight_kg: latestMetrics?.weight_kg || null,
          height_cm: latestMetrics?.height_cm || null,
          goal: null,
        },
        recommendedWorkouts: [],
      });
    }

    /* ------------------------------------------------------------------ */
    /* 2) Gemini API Prompt                                               */
    /* ------------------------------------------------------------------ */
    const prompt = `
      Suggest 3 customized workout routines for a user profile:
      - Gender: ${user.gender || "other"}
      - Weight: ${latestMetrics?.weight_kg || "unknown"} kg
      - Height: ${latestMetrics?.height_cm || "unknown"} cm
      - Active Goal: ${activeGoal?.goal_type || "general fitness"}

      Each workout should have:
      - Title
      - Duration (minutes)
      - Level of difficulty (beginner, intermediate, advanced)
      - 3-5 sample exercises (briefly named)

      Format JSON ONLY like:
      {
        "recommendedWorkouts": [
          { "title": "Workout A", "duration": 30, "difficulty": "beginner", "exercises": ["Pushups", "Squats", "Lunges"] },
          { "title": "Workout B", "duration": 45, "difficulty": "intermediate", "exercises": ["Deadlifts", "Burpees", "Plank"] },
          { "title": "Workout C", "duration": 20, "difficulty": "beginner", "exercises": ["Jumping Jacks", "Situps", "Mountain Climbers"] }
        ]
      }
    `;

    let geminiData;
    try {
      geminiData = await callGeminiApi(prompt);
    } catch (gemErr) {
      console.error("Error calling Gemini API for workouts:", gemErr);
      return res.status(200).json({
        message: "Unable to generate workout recommendations at this time.",
        user: {
          firstName: user.first_name,
          lastName: user.last_name,
          weight_kg: latestMetrics?.weight_kg || null,
          height_cm: latestMetrics?.height_cm || null,
          goal: hasActiveGoal
            ? {
                goalType: activeGoal.goal_type,
                targetWeight: activeGoal.target_value,
                deadline: activeGoal.deadline,
              }
            : null,
        },
        recommendedWorkouts: [],
      });
    }

    if (!geminiData?.recommendedWorkouts) {
      return res.status(200).json({
        message: "No workouts were generated. Please try again later.",
        recommendedWorkouts: [],
      });
    }

    /* ------------------------------------------------------------------ */
    /* 3) Response                                                        */
    /* ------------------------------------------------------------------ */
    res.json({
      user: {
        firstName: user.first_name,
        lastName: user.last_name,
        weight_kg: latestMetrics?.weight_kg || null,
        height_cm: latestMetrics?.height_cm || null,
        goal: hasActiveGoal
          ? {
              goalType: activeGoal.goal_type,
              targetWeight: activeGoal.target_value,
              deadline: activeGoal.deadline,
            }
          : null,
      },
      recommendedWorkouts: geminiData.recommendedWorkouts,
    });
  } catch (err) {
    console.error("Error fetching workout recommendations:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ===================================================================== */
/* Helper: Gemini API call for workouts                                 */
/* ===================================================================== */
async function callGeminiApi(prompt) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = await genAI.getGenerativeModel({
      model: "models/gemini-2.0-flash-lite",
    });

    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();

    if (text.startsWith("```json")) text = text.slice(7).trim();
    if (text.endsWith("```"))
      text = text.slice(0, text.lastIndexOf("```")).trim();

    return JSON.parse(text);
  } catch (err) {
    console.error("Gemini API call/parse error:", err);
    throw new Error("Gemini API call failed");
  }
}

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
    res.status(500).json({
      message: "Failed to fetch available workouts.",
      error: err.message,
    });
  }
};

// GET /api/workouts/past

export const getPastActivity = async (req, res) => {
  try {
    const userId = req.userId;

    // Workouts linked to templates
    const [workouts] = await db.query(
      `
      SELECT cw.id, wt.name AS workout_name, cw.workout_date AS completed_on, cw.calories_burned AS total_calories_burned
      FROM completedworkouts cw
      JOIN workouttemplates wt ON cw.template_id = wt.id
      WHERE cw.user_id = ?
        AND cw.template_id IS NOT NULL
    `,
      [userId]
    );

    // Workouts without templates (custom Gemini ones)
    const [customWorkouts] = await db.query(
      `
      SELECT id, custom_workout_name AS workout_name, workout_date AS completed_on, calories_burned AS total_calories_burned
      FROM completedworkouts
      WHERE user_id = ?
        AND template_id IS NULL
    `,
      [userId]
    );

    // Completed exercises
    const [exercises] = await db.query(
      `
      SELECT ce.id, e.name AS exercise_name, ce.completed_on, ce.calories_burned AS total_calories_burned
      FROM completedexercises ce
      JOIN exercises e ON ce.exercise_id = e.id
      WHERE ce.user_id = ?
    `,
      [userId]
    );

    // Merge all together and sort by date
    const all = [...workouts, ...customWorkouts, ...exercises].sort(
      (a, b) => new Date(b.completed_on) - new Date(a.completed_on)
    );

    res.status(200).json(all);
  } catch (err) {
    console.error("🔥 DB ERROR (past activity):", err);
    res.status(500).json({ message: "Failed to fetch activity." });
  }
};

// GET /api/workouts/recommended
export const getRecommendedWorkouts1 = async (req, res) => {
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
    const { workout_id, workout_name, duration_minutes, calories_burned } =
      req.body;

    if (workout_id) {
      // Normal case: workout template exists
      const [templateRows] = await db.query(
        `SELECT id, name, estimated_duration FROM workouttemplates WHERE id = ?`,
        [workout_id]
      );

      if (templateRows.length === 0) {
        return res.status(404).json({ message: "Workout template not found" });
      }

      await db.query(
        `INSERT INTO completedworkouts (user_id, template_id, workout_date, duration, calories_burned)
         VALUES (?, ?, CURDATE(), ?, ?)`,
        [
          userId,
          workout_id,
          duration_minutes ?? templateRows[0].estimated_duration,
          calories_burned ?? 200,
        ]
      );

      return res.status(200).json({ message: "Workout marked as completed" });
    } else {
      // Gemini case: no workout_id — insert manually
      await db.query(
        `INSERT INTO completedworkouts (user_id, custom_workout_name, workout_date, duration, calories_burned)
         VALUES (?, ?, CURDATE(), ?, ?)`,
        [
          userId,
          workout_name ?? "AI-Recommended Workout",
          duration_minutes ?? 30,
          calories_burned ?? 200,
        ]
      );

      return res
        .status(200)
        .json({ message: "AI-generated workout logged successfully" });
    }
  } catch (err) {
    console.error("🔥 DB ERROR:", err);
    res
      .status(500)
      .json({ message: "Failed to log workout", error: err.message });
  }
};

// Get all available exercises
export const getAvailableExercises = async (req, res) => {
  try {
    const { search = "", intensity = "" } = req.query;

    let sql = `
        SELECT id, name, difficulty_level, description 
        FROM exercises
        WHERE 1=1
      `;
    const params = [];

    if (search) {
      sql += " AND name LIKE ?";
      params.push(`%${search}%`);
    }

    if (intensity) {
      sql += " AND difficulty_level = ?";
      params.push(intensity);
    }

    const [rows] = await db.query(sql, params);
    res.status(200).json(rows);
  } catch (err) {
    console.error("🔥 Error fetching available exercises:", err);
    res.status(500).json({ message: "Failed to fetch exercises" });
  }
};

// POST /api/workouts/exercises/complete
export const completeExercise = async (req, res) => {
  try {
    const userId = req.userId;
    const { exercise_id, duration_minutes, calories_burned } = req.body;

    // Insert with completed_on as today's date
    await db.query(
      `
        INSERT INTO completedexercises (user_id, exercise_id, duration_minutes, calories_burned, completed_on)
        VALUES (?, ?, ?, ?, CURDATE())
        `,
      [userId, exercise_id, duration_minutes || 20, calories_burned || 100]
    );

    res.status(201).json({ message: "Exercise marked as complete!" });
  } catch (err) {
    console.error("🔥 DB ERROR (exercise):", err);
    res.status(500).json({ message: "Failed to log completed exercise" });
  }
};
