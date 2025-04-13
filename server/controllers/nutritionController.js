// server/controllers/nutritionController.js
import pool from "../lib/db.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

/**
 * GET /api/nutrition/recommendations
 * Returns recommended macros & sample meal plan based on the user's profile/goal data.
 * If some or all data is missing, returns helpful messages or modifies the prompt accordingly.
 * If a matching recommendation is already in the 'recommendations' table, reuse it;
 * otherwise, fetch a new one from Gemini and store it.
 */
export const getNutritionRecommendations = async (req, res) => {
  const userId = req.userId; // from verifyToken middleware

  try {
    // 1) Retrieve basic user info from 'users'
    const [[user]] = await pool.query(
      "SELECT id, first_name, last_name, gender, date_of_birth FROM users WHERE id = ?",
      [userId]
    );
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found. Please sign up or log in." });
    }

    // 2) Gather current weight, height from 'healthmetrics' (latest record)
    const [[latestMetrics]] = await pool.query(
      `SELECT weight_kg, height_cm 
         FROM healthmetrics 
        WHERE user_id = ?
     ORDER BY recorded_date DESC
        LIMIT 1`,
      [userId]
    );

    // 3) Optionally gather the user’s top active goal
    const [[activeGoal]] = await pool.query(
      `SELECT goal_type, target_value, deadline 
         FROM goals
        WHERE user_id = ?
          AND status = 'in_progress'
     ORDER BY created_at DESC
        LIMIT 1`,
      [userId]
    );

    // Check if we have enough data to produce a recommendation
    const hasMetrics = Boolean(latestMetrics?.weight_kg && latestMetrics?.height_cm);
    const hasActiveGoal = Boolean(activeGoal);

    if (!hasMetrics && !hasActiveGoal) {
      return res.status(200).json({
        message:
          "We need more data about your health metrics and your goals to provide recommendations. " +
          "Please record your weight/height in Health Metrics and set an active goal.",
      });
    }

    // If partial data is missing, disclaim it in the prompt
    const prompt = buildGeminiPrompt(
      user,
      hasMetrics ? latestMetrics : null,
      hasActiveGoal ? activeGoal : null
    );
    // Extra disclaimers
    let disclaimers = "";
    if (!hasMetrics) {
      disclaimers += "\n(Note: The user has no recorded weight or height, so provide general advice.)";
    }
    if (!hasActiveGoal) {
      disclaimers += "\n(Note: The user has no active goal, so provide general nutrition suggestions.)";
    }
    const finalPrompt = prompt + disclaimers;

    // 4) Check if we already have a recommendation stored for this exact goal
    let existingRow = null;
    if (hasActiveGoal) {
      const [rows] = await pool.query(
        `SELECT * FROM recommendations
         WHERE user_id = ?
           AND goal_type = ?
           AND target_value = ?
           AND deadline = ?
         ORDER BY created_at DESC
         LIMIT 1`,
        [
          userId,
          activeGoal.goal_type,
          activeGoal.target_value,
          activeGoal.deadline,
        ]
      );
      if (rows.length > 0) {
        existingRow = rows[0];
      }
    }

    // If we have a stored recommendation for this user's current goal, reuse it
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

    // Otherwise, call the Gemini AI to get recommended macros
    const geminiData = await callGeminiApi(finalPrompt);
    if (!geminiData?.recommendedNutrition || !geminiData?.sampleMealPlan) {
      return res.status(200).json({
        message:
          "We tried to generate a recommendation, but not enough data was returned. " +
          "Please try again or add more user info.",
        generatedData: geminiData,
      });
    }

    // 5) Store the new recommendation in the 'recommendations' table if we have an active goal
    // If there's no active goal, we skip storing because we can't reliably compare next time
    if (hasActiveGoal) {
      try {
        await pool.query(
          `INSERT INTO recommendations 
             (user_id, goal_type, target_value, deadline,
              recommended_calories, recommended_protein, recommended_carbs, recommended_fats, meal_plan)
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
      } catch (insertErr) {
        console.error("Error storing new recommendation:", insertErr);
        // We won't fail the request if storage fails; user still sees the recommendation
      }
    }

    // 6) Return the newly generated data to the frontend
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

/**
 * POST /api/nutrition
 * Logs a new nutrition record in the 'nutrition' table.
 */
export const logNutrition = async (req, res) => {
  const userId = req.userId;
  const {
    date,
    meal, // e.g. "Breakfast" or user text
    calories,
    protein,
    carbs,
    fats,
  } = req.body;

  try {
    await pool.query(
      `INSERT INTO nutrition
         (user_id, date, meal_type, calories, protein, carbs, fats, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        userId,
        date || new Date(), // fallback if empty
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

/**
 * Helper function to build a prompt for the Gemini API
 */
function buildGeminiPrompt(user, metrics, goal) {
  const name = `${user.first_name} ${user.last_name}`;
  const weight = metrics?.weight_kg || "Unknown";
  const height = metrics?.height_cm || "Unknown";
  const gender = user.gender || "other";

  const goalType = goal?.goal_type || "general_improvement";
  const goalValue = goal?.target_value || "Unknown";
  const deadline = goal?.deadline
    ? new Date(goal.deadline).toISOString().split("T")[0]
    : "N/A";

  return `
  You are a top-tier fitness & nutrition AI. The user is ${name},
  weighing ${weight} kg, height ${height} cm, gender: ${gender}.
  Their active goal is ${goalType} with a target of ${goalValue},
  by ${deadline}. Suggest daily calorie intake and macros
  plus a sample meal plan. Return JSON with keys:
  - recommendedNutrition: { calories, protein, carbs, fats }
  - sampleMealPlan: [ { meal, items, approxCalories }, ... ]
  `;
}

/**
 * Helper function: Call the Gemini AI API using @google/generative-ai
 * Also removes code fences from the AI's JSON output
 */
async function callGeminiApi(prompt) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Use a cost-efficient Gemini model
    const model = await genAI.getGenerativeModel({
      model: "models/gemini-2.0-flash-lite",
    });

    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();

    // Remove markdown code fences if present
    if (text.startsWith("```json")) {
      text = text.substring(7).trim(); // remove ```json
    }
    if (text.endsWith("```")) {
      text = text.substring(0, text.lastIndexOf("```")).trim();
    }

    try {
      const parsedData = JSON.parse(text);
      return parsedData;
    } catch (parseError) {
      console.error("Error parsing Gemini output:", parseError, "Raw text:", text);
      throw new Error("Invalid JSON returned from Gemini API.");
    }
  } catch (err) {
    console.error("Gemini API call failed:", err.response ? err.response.data : err);
    throw new Error("Gemini API call failed");
  }
}
