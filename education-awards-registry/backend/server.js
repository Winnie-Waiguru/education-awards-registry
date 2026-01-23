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
  port: Number(process.env.DB_PORT),
});

// Endpoint to register a new school
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

// Endpoint to login based on whether user in DB
app.post("/api/login", async (req, res) => {
  console.log("Received login request:", req.body);

  const { email } = req.body;
  console.log("Login attempt for email:", email);

  try {
    const result = await pool.query(
      "SELECT official_email FROM school WHERE official_email = $1",
      [email],
    );

    if (result.rows.length > 0) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Database error during login:", error);
    res.status(500).json({ error: "Database error", details: error.message });
  }
});

app.listen(port, "localhost", () => {
  console.log(`Server running on http://localhost:${port}`);
});
