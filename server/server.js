import express from "express";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import goalsRoutes from "./routes/goals.js";
import goalProgressRoutes from "./routes/goalProgress.js";
import nutritionRoutes from "./routes/nutrition.js";
import aiPromptsRoutes from "./routes/aiPrompts.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", authRoutes);
app.use("/api/goals", goalProgressRoutes);
app.use("/api/goals", goalsRoutes);
app.use("/api/nutrition", nutritionRoutes);
app.use("/api/aiprompts", aiPromptsRoutes);
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
