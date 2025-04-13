// server/db.js
import mysql from "mysql2/promise";
import dotenv from "dotenv";

// Always load .env if it exists; if running in Docker, variables set via docker-compose will override these.
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "ft_appuser",
  password: process.env.DB_PASSWORD || "StrongPassword123!",
  database: process.env.DB_NAME || "fitness_tracker",
  port: parseInt(process.env.DB_PORT || "3306"),
});

export default pool;
