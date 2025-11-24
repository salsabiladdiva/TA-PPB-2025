import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import QRCode from "qrcode" // <-- MENGGUNAKAN LIBRARY CORE 'qrcode'
import Navbar from "../../components/Navbar"

export default function BoardingPassPage() {
  const { state } = useLocation()
  
  // Data Validity Check (Mencegah crash jika data hilang)
  if (!state || !state.booking || !state.flight || !state.seat) {
    return (
      <div style={{ padding: 20, color: "white" }}>
        <p>Invalid boarding pass data. Please check in first.</p>
      </div>
    )
  }

  const { booking, flight, seat } = state;
  const passengerName = booking.passengerName || "N/A";

  const [qrImg, setQrImg] = useState(null)

  useEffect(() => {
    // Data yang akan dienkripsi dalam QR Code (cukup ticket_code saja)
    const qrData = booking.ticket_code; 
    
    // Fungsi async untuk menghasilkan Base64 QR Code
    const generateQR = async () => {
      try {
        // Menggunakan library core qrcode untuk menghasilkan data URL
        const img = await QRCode.toDataURL(qrData, {
            errorCorrectionLevel: 'H',
            type: 'image/jpeg',
            quality: 0.8,
            margin: 1,
            color: {
                dark: '#000000',
                light: '#ffffff'
            }
        });
        setQrImg(img);
      } catch (err) {
        console.error("Error generating QR code:", err);
      }
    }

    // Hanya jalankan jika booking code tersedia
    if (booking?.ticket_code) {
        generateQR()
    }
  }, [booking?.ticket_code]) // Dependency array

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#c44569",
        color: "white",
        fontFamily: "'Poppins', sans-serif",
        paddingBottom: 60
      }}
    >
      <Navbar />

      {/* TITLE + SUBTITLE */}
      <div style={{ textAlign: "center", padding: "60px 20px 20px" }}>
        <h1 style={{ fontSize: 42, fontWeight: 900 }}>Your Boarding Pass</h1>
        <p style={{ fontSize: 18, opacity: 0.9 }}>
          Please present this QR code at the airport
        </p>
      </div>

      {/* MAIN CARD */}
      <div
        style={{
          maxWidth: 550,
          margin: "40px auto",
          background: "rgba(255,255,255,0.15)",
          padding: 32,
          borderRadius: 24,
          backdropFilter: "blur(16px)",
          boxShadow: "0 10px 35px rgba(0,0,0,0.25)",
          textAlign: "center",
          border: "1px solid rgba(255,255,255,0.25)"
        }}
      >
        {/* Flight Info (Set warna teks menjadi putih agar terbaca di latar belakang transparan) */}
        <div style={{ marginBottom: 30, color: 'white' }}>
          <h2 style={{ fontWeight: 800, marginBottom: 12 }}>
            {flight.from_city} → {flight.to_city}
          </h2>

          <p>Date: <b>{flight.date}</b></p>
          <p>Time: <b>{flight.time}</b></p>
          <p>Passenger: <b>{passengerName}</b></p>
          <p>Ticket Code: <b>{booking.ticket_code}</b></p>
          <p>Gate: <b>{flight.gate || "TBD"}</b></p> 
          <p>Seat: <b>{seat}</b></p>
        </div>

        {/* QR CODE BOX */}
        <div
          style={{
            background: "white",
            padding: 20,
            borderRadius: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 6px 20px rgba(0,0,0,0.15)"
          }}
        >
          {qrImg ? (
            // Render Base64 Image
            <img src={qrImg} alt="QR Code" style={{ width: 200 }} />
          ) : (
            <p
              style={{
                color: "#c44569",
                fontWeight: 600,
                padding: "40px 0"
              }}
            >
              Loading QR Code...
            </p>
          )}
        </div>
      </div>
    </div>
  )
}