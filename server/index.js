import express from "express";
import pg from "pg";
import config from "./config.js";
import cors from "cors";

const { Client } = pg;

const connectDB = async () => {
  const client = new Client(config);
  await client.connect();
  return client;
};

const app = express();
const port = 3006;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// runs queries code more efficient 
const executeQuery = async (query, params = []) => {
  const client = await connectDB();
  try {
    const { rows } = await client.query(query, params);
    return rows;
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  } finally {
    await client.end();
  }
};

// get user by ID
app.get("/user/:id", async (req, res) => {
  try {
    const rows = await executeQuery("SELECT * FROM user_data WHERE user_id = $1", [req.params.id]);
    res.status(rows.length ? 200 : 404).json(rows.length ? { success: true, data: rows[0] } : { success: false, message: "User not found" });
  } catch {
    res.status(500).json({ success: false, message: "Failed to fetch user" });
  }
});

// add new user
app.post("/add-user", async (req, res) => {
  const { user_name, user_email, user_country, bio } = req.body;
  try {
    const result = await executeQuery(
      "INSERT INTO user_data (user_name, user_email, user_country, bio) VALUES ($1, $2, $3, $4) RETURNING user_id",
      [user_name, user_email, user_country, bio]
    );
    const user_id = result[0]?.user_id;  

    if (user_id) {
      res.json({ success: true, message: "User added!", user_id });
    } else {
      res.status(500).json({ success: false, message: "Failed to retrieve user ID" });
    }
  } catch {
    res.status(500).json({ success: false, message: "Failed to add user data" });
  }
});

// save country for user
app.post("/save-country", async (req, res) => {
  const { user_id, country_code, country_name, flag, region, capital, population } = req.body;

  // makes sure user id is there had bug of no user id in user saved countries table
  if (!user_id) {
    return res.status(400).json({ success: false, message: "User ID required." });
  }

  try {
    const rows = await executeQuery(
      // no duplicates 
      `INSERT INTO user_saved_countries (user_id, country_code, country_name, flag, region, capital, population)
       VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT DO NOTHING RETURNING *`,
      [user_id, country_code, country_name, flag, region, capital, population]
    );
    res.json(rows.length ? { success: true, message: "Country saved!" } : { success: false, message: "Country already saved." });
  } catch {
    res.status(500).json({ success: false, message: "Failed to save country" });
  }
});
//  all saved countries for a user
app.get("/saved-countries/:id", async (req, res) => {
  try {
    const rows = await executeQuery(
      "SELECT country_code, country_name, flag, region, capital, population FROM user_saved_countries WHERE user_id = $1",
      [req.params.id]
    );
    res.json({ success: true, data: rows });
  } catch {
    res.status(500).json({ success: false, message: "Failed to fetch saved countries" });
  }
});

//country click count
app.post("/click-country/:code", async (req, res) => {
  try {
    const rows = await executeQuery(
      `INSERT INTO country_clicks (country_code, country_count)
       VALUES ($1, 1)
       ON CONFLICT (country_code) DO UPDATE 
       SET country_count = country_clicks.country_count + 1
       RETURNING country_count`,
      [req.params.code]
    );
    res.json({ success: true, country_code: req.params.code, country_count: rows[0]?.country_count || 0 });
  } catch {
    res.status(500).json({ success: false, message: "Click count failed" });
  }
});