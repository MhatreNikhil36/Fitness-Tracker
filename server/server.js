import express from "express";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
// import progressRoutes from "./routes/progress.js";
// Import other routes as needed…
import goalsRoutes from "./routes/goals.js";
import goalProgressRoutes from "./routes/goalProgress.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", authRoutes);
app.use("/api/goals", goalProgressRoutes);
app.use("/api/goals", goalsRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
