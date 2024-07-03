import express from "express";
import { config } from "dotenv";
import pg from "pg";

console.clear();

config();

const app = express();
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/ping", async (req, res) => {
    const result =await pool.query("SELECT NOW()"); // Le consulta la fecha actual a la base de datos
    
    return res.json(result.rows[0]);
  });

app.listen(3000);
console.log("Server running on port 3000");
