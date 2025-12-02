import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";
import cryptoRandomString from "crypto-random-string";

// Fix __dirname untuk ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paksa dotenv membaca .env di folder server
dotenv.config({ path: path.join(__dirname, ".env") });

console.log("Loaded ENV:", {
  SUPABASE_URL: process.env.SUPABASE_URL,
  PORT: process.env.PORT,
}); 

// Buat client Supabase menggunakan Service Role Key dari server/.env
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const app = express();
app.use(cors()); // Izinkan CORS
app.use(express.json()); // Parsing JSON body

// ==========================================================
// UTILITY: Fungsi Bantuan
// ==========================================================

// 1. Fungsi untuk membuat kursi acak (Check-in)
function generateRandomSeat() {
  const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const columns = ['A', 'B', 'C', 'D', 'E', 'F'];
  const randomRow = rows[Math.floor(Math.random() * rows.length)];
  const randomColumn = columns[Math.floor(Math.random() * columns.length)];
  return `${randomRow}${randomColumn}`;
}

// ==========================================================
// ROUTES
// ==========================================================

// 1. GET / - Status Server
app.get("/", (req, res) => {
  res.send("CabinIn API is running");
});

// 2. GET /api/flights - Ambil semua data penerbangan
app.get("/api/flights", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("flights")
      .select("*")
      .order('created_at', { ascending: false }); // Urutkan dari yang terbaru

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch flights" });
  }
});

// 3. GET /api/flights/:id - Ambil detail penerbangan
app.get("/api/flights/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data: flight, error } = await supabase
      .from("flights")
      .select("*")
      .eq("id", id)
      .single(); 

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: "Flight not found." });
      }
      throw error;
    }

    res.json(flight);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch flight detail" });
  }
});

// 4. POST /api/bookings - Buat booking baru
app.post("/api/bookings", async (req, res) => {
  try {
    const { flight_id, passenger_name, user_id } = req.body;
    
    if (!flight_id || !passenger_name || !user_id) {
      return res.status(400).json({ error: "Missing required fields: flight_id, passenger_name, user_id" });
    }

    // Generate Ticket Code Unik (Contoh: CABININ-2025-1234)
    const ticket_code = "CABININ-" + new Date().getFullYear() + "-" + cryptoRandomString({ length: 4, type: 'numeric' });

    // Simpan Booking ke Supabase
    const { data, error } = await supabase
      .from("bookings")
      .insert({
        ticket_code,
        user_id,
        flight_id,
        passenger_name, 
        status: "paid",
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create booking" });
  }
});

// 5. GET /api/checkins/:ticket_code - Proses Check-In
app.get("/api/checkins/:ticket_code", async (req, res) => {
  try {
    const { ticket_code } = req.params;
    
    // Ambil data booking + join data flights
    const { data: bookingData, error } = await supabase
      .from("bookings")
      .select(`
        *,
        flights(*)
      `)
      .eq("ticket_code", ticket_code)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: "Ticket code not found." });
      }
      throw error;
    }
    
    // Buat kursi unik baru
    const newSeat = generateRandomSeat();
    
    // Catat check-in baru ke tabel 'checkins'
    const { error: checkinError } = await supabase
        .from("checkins")
        .insert({
            booking_id: bookingData.id,
            seat: newSeat
        }); 
        
    if (checkinError) throw checkinError;

    const gate = bookingData.flights.gate || "TBD"; 

    res.json({
      booking: {
        id: bookingData.id,
        ticket_code: bookingData.ticket_code,
        passengerName: bookingData.passenger_name,
      },
      flight: {
        from_city: bookingData.flights.from_city,
        to_city: bookingData.flights.to_city,
        date: bookingData.flights.date,
        time: bookingData.flights.time,
        gate: gate,
        price: bookingData.flights.price
      },
      seat: newSeat,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed during check-in process" });
  }
});

// 6. POST /api/flights - [ADMIN] Tambah Flight (FIX ERROR ID NULL)
app.post("/api/flights", async (req, res) => {
  try {
    const { from_city, to_city, date, time, price, gate } = req.body;

    // A. Validasi Input
    if (!from_city || !to_city || !date || !time || !price) {
      return res.status(400).json({ error: "Semua field wajib diisi!" });
    }

    // B. Generate ID Unik secara Manual
    // Mengambil 3 huruf pertama dari nama kota (misal: "Jakarta" -> "JAK")
    // Format ID: JAK-BAL-1234 (Asal-Tujuan-AngkaAcak)
    const fromCode = from_city.replace(/[^a-zA-Z]/g, "").substring(0, 3).toUpperCase();
    const toCode = to_city.replace(/[^a-zA-Z]/g, "").substring(0, 3).toUpperCase();
    
    const randomSuffix = cryptoRandomString({ length: 4, type: 'numeric' });
    const manualId = `${fromCode}-${toCode}-${randomSuffix}`;

    // C. Simpan ke Database
    const { data, error } = await supabase
      .from("flights")
      .insert([{
        id: manualId, // <--- KITA ISI ID SECARA MANUAL AGAR TIDAK NULL
        from_city,
        to_city,
        date,
        time,
        price: parseInt(price),
        gate: gate || "TBA"
      }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ message: "Success", data });

  } catch (err) {
    console.error("Add Flight Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// SERVER LISTEN
app.listen(process.env.PORT, () => {
  console.log("Backend running at http://localhost:" + process.env.PORT);
});

