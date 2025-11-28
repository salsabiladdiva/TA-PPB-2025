import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";
import cryptoRandomString from "crypto-random-string"; // Import tambahan untuk buat kode tiket

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
// UTILITY: Fungsi untuk membuat kursi acak
// ==========================================================
function generateRandomSeat() {
  const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const columns = ['A', 'B', 'C', 'D', 'E', 'F'];
  const randomRow = rows[Math.floor(Math.random() * rows.length)];
  const randomColumn = columns[Math.floor(Math.random() * columns.length)];
  return `${randomRow}${randomColumn}`;
}
// ==========================================================


// ==========================================================
// ROUTES
// ==========================================================

// 1. GET / - Status Server
app.get("/", (req, res) => {
  res.send("CabinIn API is running");
});

// 2. GET /api/flights - Ambil semua data penerbangan (Digunakan di BookingPage.jsx)
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

// 3. GET /api/flights/:id - Ambil detail penerbangan (Digunakan di FlightDetailPage.jsx)
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

// 4. POST /api/bookings - Buat booking baru (Mengganti logic DUMMY di FlightDetailPage.jsx)
app.post("/api/bookings", async (req, res) => {
  try {
    // Ambil data dari body request frontend
    const { flight_id, passenger_name, user_id } = req.body;
    
    if (!flight_id || !passenger_name || !user_id) {
      return res.status(400).json({ error: "Missing required fields: flight_id, passenger_name, user_id" });
    }

    // 1. Generate Ticket Code Unik (Contoh: CABININ-2025-1234)
    const ticket_code = "CABININ-" + new Date().getFullYear() + "-" + cryptoRandomString({ length: 4, type: 'numeric' });

    // 2. Simpan Booking ke Supabase
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

    // Kirim kembali data booking yang baru dibuat
    res.status(201).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create booking" });
  }
});


// 5. GET /api/checkins/:ticket_code - Proses Check-In (MEMAKSA DOUBLE ENTRY DENGAN SEAT UNIK)
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
        // Ticket tidak ditemukan di database
        return res.status(404).json({ error: "Ticket code not found." });
      }
      throw error;
    }
    
    // **LOGIKA MODIFIKASI: SELALU BUAT RECORD CHECK-IN BARU DENGAN KURSI UNIK**
    const newSeat = generateRandomSeat(); // Tetapkan kursi unik baru
    
    // Catat check-in baru ke tabel 'checkins' (ini akan menjadi double entry)
    const { error: checkinError } = await supabase
        .from("checkins")
        .insert({
            booking_id: bookingData.id,
            seat: newSeat
        }); 
        
    if (checkinError) throw checkinError;

    const finalSeat = newSeat; // Kursi yang ditampilkan adalah kursi yang baru dibuat
    const gate = bookingData.flights.gate || "TBD"; 

    // Kirim data yang dibutuhkan frontend untuk BoardingPassPage
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
      seat: finalSeat,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed during check-in process" });
  }
});

// SERVER LISTEN
app.listen(process.env.PORT, () => {
  console.log("Backend running at http://localhost:" + process.env.PORT);
});