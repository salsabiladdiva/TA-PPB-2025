import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

// Fix __dirname untuk ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paksa dotenv membaca .env di folder server
dotenv.config({ path: path.join(__dirname, ".env") });

console.log("Loaded ENV:", {
  SUPABASE_URL: process.env.SUPABASE_URL,
  PORT: process.env.PORT,
}); // debug

// Buat client Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const app = express();
app.use(cors());
app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
  res.send("CabinIn API is running");
});

// GET /api/flights - Ambil semua data penerbangan
app.get("/api/flights", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("flights")
      .select("*");

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch flights" });
  }
});

// SERVER LISTEN
app.listen(process.env.PORT, () => {
  console.log("Backend running at http://localhost:" + process.env.PORT);
});
