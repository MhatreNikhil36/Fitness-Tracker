import mysql from "mysql2/promise";
// import dotenv from "dotenv";
// dotenv.config();

const pool = mysql.createPool({
  host: "metro.proxy.rlwy.net",
  user: "root",
  password: "TZDJVoochBkFPyuGuXYyqKVNJXNwwNnX",
  database: "railway",
  port: 26252,
  //   host: process.env.DB_HOST,
  //   user: process.env.DB_USER,
  //   password: process.env.DB_PASSWORD,
  //   database: process.env.DB_NAME,
  //   port: process.env.DB_PORT,
});

export default pool;
