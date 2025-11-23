import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar"; // ← pakai file navbar

export default function CheckInPage() {
  const [ticketCode, setTicketCode] = useState("");
  const navigate = useNavigate();

  const handleCheckIn = () => {
    if (!ticketCode.trim()) {
      alert("Please enter your ticket code.");
      return;
    }

    // Redirect dengan data dummy
    navigate("/boarding-pass", {
      state: {
        booking: { ticket_code: ticketCode },
        flight: {
          from_city: "Jakarta (CGK)",
          to_city: "Bali (DPS)",
          date: "2025-01-05",
          time: "08:45",
          gate: "A7"
        },
        seat: "12A"
      }
    });
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
          Confirm Check-In
        </button>
      </div>
    </div>
  );
}
