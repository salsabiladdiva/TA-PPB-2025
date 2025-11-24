import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar"; // ← pakai file navbar

const API_BASE_URL = "http://192.168.1.43:4000"; // URL ke backend Express Anda

export default function CheckInPage() {
  const [ticketCode, setTicketCode] = useState("");
  const [loading, setLoading] = useState(false); // State untuk loading
  const navigate = useNavigate();
  const location = useLocation(); // Hook untuk mengakses state navigasi

  // Efek untuk mengisi otomatis Ticket Code dari halaman Payment Success
  useEffect(() => {
    // Memeriksa apakah ada state 'ticket' yang dikirim dari halaman sebelumnya
    if (location.state && location.state.ticket) {
      setTicketCode(location.state.ticket);
    }
  }, [location.state]);

  const handleCheckIn = async () => {
    if (!ticketCode.trim()) {
      alert("Please enter your ticket code.");
      return;
    }
    
    setLoading(true);

    try {
        // PANGGIL API Backend untuk Check-In
        const response = await fetch(`${API_BASE_URL}/api/checkins/${ticketCode.trim()}`);

        if (response.status === 404) {
            alert("Ticket code not found.");
            return;
        }

        if (!response.ok) {
            // Jika ada error dari server, ambil pesan errornya
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to process check-in.");
        }
        
        // Ambil data lengkap yang dikirim dari server.js: booking, flight, dan seat
        const result = await response.json();

        // Redirect ke BoardingPassPage dengan data NYATA dari API
        navigate("/boarding-pass", {
            state: {
                booking: result.booking,
                flight: result.flight,
                seat: result.seat
            }
        });

    } catch (error) {
        alert(`Check-In Failed: ${error.message}`);
        console.error("Error during check-in:", error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        background: "#c44569",
        color: "white",
        fontFamily: "'Poppins', sans-serif"
      }}
    >
      {/* NAVBAR */}
      <Navbar />

      {/* TITLE */}
    <div style ={{ textAlign: "center", marginBottom: 30 }}>
        <h1
        style={{
          marginTop: 80,
          fontSize: 42,
          fontWeight: 900,
          marginBottom: 15
        }}
      >
        Check-In
      </h1>

      <p style={{ opacity: 0.9, marginBottom: 30 }}>
        Enter your ticket code below
      </p>
    </div>
      {/* FORM CARD */}
      <div
        style={{
          background: "rgba(255,255,255,0.15)",
          padding: 28,
          borderRadius: 16,
          backdropFilter: "blur(10px)",
          maxWidth: 900,
          margin: "0 auto"
        }}
      >
        <input
          value={ticketCode}
          onChange={(e) => setTicketCode(e.target.value)}
          placeholder="e.g. CABININ-2025-1234"
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.4)",
            background: "rgba(255,255,255,0.25)",
            color: "white",
            fontSize: 16,
            marginBottom: 18
          }}
        />

        <button
          onClick={handleCheckIn}
          disabled={loading} // Disabled saat loading
          style={{
            width: "100%",
            padding: "16px",
            background: "white",
            color: "#c44569",
            borderRadius: 14,
            border: "none",
            fontWeight: 700,
            fontSize: 18,
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(255,255,255,0.2)"
          }}
        >
          {loading ? "Processing..." : "Confirm Check-In"}
        </button>
      </div>
    </div>
  );
}