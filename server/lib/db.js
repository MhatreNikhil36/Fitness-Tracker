import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "knv2382",
  database: "fitness_tracker",
  port: 3306,
});

export default pool;
