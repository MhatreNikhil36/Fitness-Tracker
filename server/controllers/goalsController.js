// server/controllers/goalsController.js
import pool from "../lib/db.js";

// Endpoint to get all goals for the authenticated user
export const getGoals = async (req, res) => {
  const userId = req.userId; // Assume verifyToken middleware sets this
  try {
    const [rows] = await pool.query("SELECT * FROM goals WHERE user_id = ?", [userId]);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching goals:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Endpoint to create a new goal
export const createGoal = async (req, res) => {
    const userId = req.userId; // Assume verifyToken middleware sets this
    const { goal_type, target_value, current_value, status, deadline } = req.body;
  
    try {
      // Insert a new goal record for the user.
      const [result] = await pool.query(
        `INSERT INTO goals (user_id, goal_type, target_value, current_value, status, deadline)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [userId, goal_type, target_value, current_value, status, deadline]
      );
  
      // Retrieve the newly created goal.
      const [createdRows] = await pool.query(
        "SELECT * FROM goals WHERE id = ?",
        [result.insertId]
      );
      console.log("Created goal:", createdRows[0]);
      res.status(201).json(createdRows[0]);
    } catch (err) {
      console.error("Error creating goal:", err);
      res.status(500).json({ message: "Server error" });
    }
  };
  

// Endpoint to update an existing goal
export const updateGoal = async (req, res) => {
  const userId = req.userId;
  // For updating, we assume the client sends the goal 'id' along with other fields.
  const { id, goal_type, target_value, current_value, status, deadline } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE goals 
       SET goal_type = ?, target_value = ?, current_value = ?, status = ?, deadline = ?
       WHERE id = ? AND user_id = ?`,
      [goal_type, target_value, current_value, status, deadline, id, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Goal not found or unauthorized" });
    }

    res.json({ message: "Goal updated successfully" });
  } catch (error) {
    console.error("Error updating goal:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// GET /api/goals
// Returns all goals for the authenticated user with their progress data.
export const getGoalsForUser = async (req, res) => {
    const userId = req.userId;  // Set by your verifyToken middleware
    try {
      // Get all goals for this user.
      const [goals] = await pool.query(
        "SELECT * FROM goals WHERE user_id = ? ORDER BY created_at DESC",
        [userId]
      );
  
      // For each goal, fetch associated progress records.
      const goalsWithProgress = await Promise.all(
        goals.map(async (goal) => {
          const [progress] = await pool.query(
            "SELECT * FROM progress WHERE goal_id = ? ORDER BY recorded_date ASC",
            [goal.id]
          );
          return { ...goal, progress };
        })
      );
  
      console.log("Fetched goals with progress:", goalsWithProgress);
      res.json(goalsWithProgress);
    } catch (err) {
      console.error("Error fetching goals:", err);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  // DELETE /api/goals/:goalId
  // Deletes the specified goal if it belongs to the authenticated user.
  export const deleteGoal = async (req, res) => {
    const userId = req.userId; 
    const { goalId } = req.params;
  
    try {
      // First, verify that the goal exists and belongs to the user.
      const [goals] = await pool.query(
        "SELECT id FROM goals WHERE id = ? AND user_id = ?",
        [goalId, userId]
      );
      if (goals.length === 0) {
        return res.status(404).json({ message: "Goal not found or unauthorized" });
      }
  
      // Delete the goal. Associated progress entries will be removed via ON DELETE CASCADE.
      await pool.query("DELETE FROM goals WHERE id = ? AND user_id = ?", [goalId, userId]);
      console.log(`Goal with id ${goalId} deleted successfully.`);
      res.json({ message: "Goal deleted successfully" });
    } catch (err) {
      console.error("Error deleting goal:", err);
      res.status(500).json({ message: "Server error" });
    }
  };