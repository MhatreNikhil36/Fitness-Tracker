// server/controllers/goalProgressController.js
import pool from "../lib/db.js";

// GET /api/goals/:goalId
// Retrieves a specific goal (if it belongs to the authenticated user)
// along with its associated progress records.
// The response transforms the 'recorded_date' field to 'timestamp' for frontend compatibility.
export const getGoalWithProgress = async (req, res) => {
  const { goalId } = req.params;
  const userId = req.userId; // Assume verifyToken middleware sets this

  try {
    // Get the goal ensuring it belongs to the user
    const [goals] = await pool.query(
      "SELECT * FROM goals WHERE id = ? AND user_id = ?",
      [goalId, userId]
    );
    if (goals.length === 0) {
      return res.status(404).json({ message: "Goal not found" });
    }
    const goal = goals[0];

    // Get progress records associated with this goal
    const [progressRows] = await pool.query(
      "SELECT id, recorded_value, recorded_date as timestamp, notes FROM progress WHERE goal_id = ? ORDER BY recorded_date ASC",
      [goalId]
    );

    // Return the goal with its progress array
    res.json({ ...goal, progress: progressRows });
  } catch (err) {
    console.error("Error fetching goal progress:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/goals/:goalId/progress
// Adds a new progress record for the specified goal.
export const addProgressToGoal = async (req, res) => {
  const { goalId } = req.params;
  const userId = req.userId;
  // Expect request body to include: recorded_value, timestamp, and optionally notes.
  const { recorded_value, timestamp, notes } = req.body;

  try {
    // Verify the goal exists and belongs to the user
    const [goals] = await pool.query(
      "SELECT * FROM goals WHERE id = ? AND user_id = ?",
      [goalId, userId]
    );
    if (goals.length === 0) {
      return res.status(404).json({ message: "Goal not found" });
    }

    // Set a default measurement type – for example, "progress"
    const measurement_type = "progress";
    await pool.query(
      `INSERT INTO progress (user_id, goal_id, recorded_value, measurement_type, recorded_date)
       VALUES (?, ?, ?, ?, ?)`,
      [userId, goalId, recorded_value, measurement_type, timestamp]
    );

    // After insertion, retrieve the updated goal with its progress records
    const [updatedGoals] = await pool.query(
      "SELECT * FROM goals WHERE id = ? AND user_id = ?",
      [goalId, userId]
    );
    const goal = updatedGoals[0];
    const [progressRows] = await pool.query(
      "SELECT id, recorded_value, recorded_date as timestamp, notes FROM progress WHERE goal_id = ? ORDER BY recorded_date ASC",
      [goalId]
    );

    res.json({ ...goal, progress: progressRows });
  } catch (err) {
    console.error("Error adding progress:", err);
    res.status(500).json({ message: "Server error" });
  }
};
