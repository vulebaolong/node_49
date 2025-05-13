import mysql from "mysql2/promise";
import { DATABASE_URL } from "../constant/app.constant";

// MYSQL2
const pool = mysql.createPool({ uri: DATABASE_URL });
try {
   await pool.query("SELECT 1+1 AS result");
   console.log("MYSQL2::Connection has been established successfully.");
} catch (error) {
   console.error("MYSQL2::Unable to connect to the database:", error);
}

export default pool;