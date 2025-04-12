import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "metro.proxy.rlwy.net",
  user: "root",
  password: "TZDJVoochBkFPyuGuXYyqKVNJXNwwNnX",
  database: "railway",
  port: 26252,
});

export default pool;
