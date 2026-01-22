require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const port = 4000;

// Enable CORS
app.use(cors());
// Parse JSON bodies
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.post("/api/register-school", async (req, res) => {
  const { schoolName, schoolEmail } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO school (school_name, official_email) VALUES ($1, $2) RETURNING *",
      [schoolName, schoolEmail],
    );
    console.log(result.rows[0]);
    res.status(201).json({
      message: "School registered successfully",
      school: result.rows,
    });
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
