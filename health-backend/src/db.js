import pg from "pg";
import { config } from "./config.js";

const { Pool } = pg;

const pool = new Pool({
  connectionString: config.dbUrl,
});

export async function query(text, params) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log("Executed query", { text, duration, rows: res.rowCount });
  return res;
}

export async function getClient() {
  return pool.connect();
}
