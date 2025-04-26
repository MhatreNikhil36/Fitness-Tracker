import express from "express";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import goalsRoutes from "./routes/goals.js";
import goalProgressRoutes from "./routes/goalProgress.js";
import nutritionRoutes from "./routes/nutrition.js";
import aiPromptsRoute from "./routes/aiPromptsRoute.js";
import workoutRoutes from "./routes/workoutRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import addExerciseRoutes from "./routes/addExerciseRoute.js";
import addWorkoutRoute from "./routes/addWorkoutRoute.js";
import adminRoutes from "./routes/adminRoute.js";
import exerciseCategoriesRoute from "./routes/exerciseCategoriesRoute.js";
import contactRoute from "./routes/contactRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", authRoutes);
app.use("/api/goals", goalProgressRoutes);
app.use("/api/goals", goalsRoutes);
app.use("/api/nutrition", nutritionRoutes);
app.use("/api/aiprompts", aiPromptsRoute);
app.use("/api/workouts", workoutRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/exercises", addExerciseRoutes);
app.use("/api/workouts", addWorkoutRoute);
app.use("/api/admin", adminRoutes);
app.use("/api/exercise-categories", exerciseCategoriesRoute);
app.use("/api/contact", contactRoute);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
