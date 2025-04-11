import express from "express";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", authRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
