// server/controllers/nutritionController.js
import pool from "../lib/db.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

/**
 * GET /api/nutrition/recommendations
 */
export const getAllNutritionRecords = async (req, res) => {
  const userId = req.userId;
  try {
    const [rows] = await pool.query(
      `SELECT 
         id,
         user_id,
         date,
         meal_type,
         calories,
         protein,
         carbs,
         fats,
         created_at
       FROM nutrition
       WHERE user_id = ?
       ORDER BY date DESC`,
      [userId]
    );
    // Return array of logs or [] if none
    res.json(rows);
  } catch (err) {
    console.error("Error fetching nutrition records:", err);
    return res.status(500).json({ message: "Server error" });
  }
};


export const getNutritionRecommendations = async (req, res) => {
  const userId = req.userId;

  try {
    /* ------------------------------------------------------------------ */
    /* 1) Basic user + supporting data                                    */
    /* ------------------------------------------------------------------ */
    const [[user]] = await pool.query(
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

    const [[latestMetrics]] = await pool.query(
      `SELECT weight_kg, height_cm
         FROM users
        WHERE id = ?`,
      [userId]
    );

    const [[activeGoal]] = await pool.query(
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
          "We need more data about your health metrics and your goals to provide recommendations. " +
          "Please record your weight/height in Health Metrics and set an active goal.",
        user: {
          firstName: user.first_name,
          lastName: user.last_name,
          weight_kg: latestMetrics?.weight_kg || null,
          height_cm: latestMetrics?.height_cm || null,
          goal: null,
        },
        recommendedNutrition: null,
        sampleMealPlan: [],
      });
    }

    /* ------------------------------------------------------------------ */
    /* 2) Check stored recommendation                                     */
    /* ------------------------------------------------------------------ */
    let existingRow = null;
    if (hasActiveGoal) {
      const [rows] = await pool.query(
        `SELECT *
           FROM recommendations
          WHERE user_id      = ?
            AND goal_type    = ?
            AND target_value = ?
            AND deadline     = ?
       ORDER BY created_at DESC
          LIMIT 1`,
        [
          userId,
          activeGoal.goal_type,
          activeGoal.target_value,
          activeGoal.deadline,
        ]
      );
      if (rows.length) existingRow = rows[0];
    }

    if (existingRow) {
      return res.json({
        user: {
          firstName: user.first_name,
          lastName: user.last_name,
          weight_kg: latestMetrics?.weight_kg || null,
          height_cm: latestMetrics?.height_cm || null,
          goal: {
            goalType: existingRow.goal_type,
            targetWeight: existingRow.target_value,
            deadline: existingRow.deadline,
          },
        },
        recommendedNutrition: {
          calories: existingRow.recommended_calories,
          protein: existingRow.recommended_protein,
          carbs: existingRow.recommended_carbs,
          fats: existingRow.recommended_fats,
        },
        sampleMealPlan: existingRow.meal_plan || [],
      });
    }

    /* ------------------------------------------------------------------ */
    /* 3) Gemini request                                                  */
    /* ------------------------------------------------------------------ */
    const geminiPrompt = `
      Suggest an evidence‑based daily nutrition plan.
      Return JSON ONLY with exactly two keys:
      {
        "recommendedNutrition": { "calories": 0, "protein": 0, "carbs": 0, "fats": 0 },
        "sampleMealPlan": [
          { "meal": "Breakfast", "items": "Oatmeal with fruit", "approxCalories": 0 },
          { "meal": "Lunch",     "items": "Grilled chicken salad", "approxCalories": 0 }
        ]
      }
    `;

    let geminiData;
    try {
      geminiData = await callGeminiApi(geminiPrompt);
    } catch (gemErr) {
      return res.status(200).json({
        message:
          "Unable to generate nutrition recommendations at this time. Please try again later.",
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
        recommendedNutrition: null,
        sampleMealPlan: [],
      });
    }

    if (!geminiData?.recommendedNutrition || !geminiData?.sampleMealPlan) {
      return res.status(200).json({
        message:
          "We tried to generate a recommendation, but not enough data was returned. " +
          "Please try again or add more user info.",
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
        recommendedNutrition: null,
        sampleMealPlan: [],
      });
    }

    /* ------------------------------------------------------------------ */
    /* 4) Save recommendation (if active goal)                            */
    /* ------------------------------------------------------------------ */
    if (hasActiveGoal) {
      try {
        await pool.query(
          `INSERT INTO recommendations
             (user_id, goal_type, target_value, deadline,
              recommended_calories, recommended_protein,
              recommended_carbs,   recommended_fats, meal_plan)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            userId,
            activeGoal.goal_type,
            activeGoal.target_value,
            activeGoal.deadline,
            geminiData.recommendedNutrition.calories,
            geminiData.recommendedNutrition.protein,
            geminiData.recommendedNutrition.carbs,
            geminiData.recommendedNutrition.fats,
            JSON.stringify(geminiData.sampleMealPlan),
          ]
        );
      } catch (err) {
        console.error("Error storing new recommendation:", err);
      }
    }

    /* ------------------------------------------------------------------ */
    /* 5) Response                                                        */
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
      recommendedNutrition: geminiData.recommendedNutrition,
      sampleMealPlan: geminiData.sampleMealPlan,
    });
  } catch (err) {
    console.error("Error fetching nutrition recommendations:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ===================================================================== */
/* POST /api/nutrition – log a manual nutrition entry                    */
/* ===================================================================== */
export const logNutrition = async (req, res) => {
  const userId = req.userId;
  const { date, meal, calories, protein, carbs, fats } = req.body;

  try {
    await pool.query(
      `INSERT INTO nutrition
         (user_id, date, meal_type, calories, protein, carbs, fats, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        userId,
        date || new Date(),
        meal || "Meal",
        calories || 0,
        protein || 0,
        carbs || 0,
        fats || 0,
      ]
    );
    res.status(201).json({ message: "Nutrition record saved successfully" });
  } catch (err) {
    console.error("Error logging nutrition:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ===================================================================== */
/* Helper: Gemini call                                                   */
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
    console.error("Gemini API call / parse failed:", err);
    throw new Error("Gemini API call failed");
  }
}
