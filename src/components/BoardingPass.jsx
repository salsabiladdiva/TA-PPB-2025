import QRCode from "qrcode.react"

export default function BoardingPass({ booking, seat, flight }) {
  return (
    <div
      style={{
        background: "white",
        padding: 24,
        borderRadius: 20,
        maxWidth: 500,
        margin: "0 auto",
        boxShadow: "0 8px 30px rgba(0,0,0,0.12)"
      }}
    >
      <h2
        style={{
          fontSize: 22,
          fontWeight: 700,
          marginBottom: 14,
          textAlign: "center"
        }}
      >
        Boarding Pass ✈️
      </h2>

      <div style={{ marginBottom: 20 }}>
        <p><b>Passenger:</b> {booking.passengerName || "Unknown"}</p>
        <p><b>Ticket Code:</b> {booking.ticket_code}</p>
        <p><b>From:</b> {flight.from_city}</p>
        <p><b>To:</b> {flight.to_city}</p>
        <p><b>Date:</b> {flight.date}</p>
        <p><b>Time:</b> {flight.time}</p>
        <p><b>Gate:</b> {flight.gate}</p>
        <p><b>Seat:</b> {seat}</p>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        {/* QR Code mengandung ticket_code */}
        <QRCode value={booking.ticket_code} size={160} />
      </div>
    </div>
  )
}
