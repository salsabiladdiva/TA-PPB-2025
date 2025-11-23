import { useLocation, useNavigate } from "react-router-dom"

export default function PaymentSuccessPage() {
  const navigate = useNavigate()
  const { state } = useLocation()

  // Pastikan ada data yang dikirim dari FlightDetailPage
  if (!state || !state.booking) {
    return (
      <div style={{ padding: 20, color: "white" }}>
        <p>Invalid payment session.</p>
      </div>
    )
  }

  const booking = state.booking
  const flight = state.flight
  const name = state.passengerName

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f7",
        padding: "28px 20px",
        boxSizing: "border-box"
      }}
    >
      {/* Kartu struk pembayaran */}
      <div
        style={{
          maxWidth: 500,
          margin: "0 auto",
          background: "white",
          padding: "28px",
          borderRadius: 22,
          border: "1px solid #e5e7eb",
          boxShadow: "0 4px 30px rgba(0,0,0,0.08)"
        }}
      >
        <h1
          style={{
            fontSize: 24,
            fontWeight: 700,
            textAlign: "center",
            marginBottom: 20,
            color: "#111"
          }}
        >
          Payment Successful 🎉
        </h1>

        {/* TAMPILKAN DATA BOOKING */}
        <p style={label}>Ticket Code</p>
        <p style={value}>{booking.ticket_code}</p>

        <p style={label}>Passenger</p>
        <p style={value}>{name}</p>

        <p style={label}>From</p>
        <p style={value}>{flight.from_city}</p>

        <p style={label}>To</p>
        <p style={value}>{flight.to_city}</p>

        <p style={label}>Date</p>
        <p style={value}>{flight.date}</p>

        <p style={label}>Time</p>
        <p style={value}>{flight.time}</p>

        <p style={label}>Total Paid</p>
        <p
          style={{
            ...value,
            fontSize: 20,
            fontWeight: 700
          }}
        >
          Rp {flight.price.toLocaleString("id-ID")}
        </p>

        {/* Tombol menuju halaman Check-In */}
        <button
          onClick={() =>
            navigate("/checkin", {
              state: { ticket: booking.ticket_code }
            })
          }
          style={{
            marginTop: 26,
            width: "100%",
            padding: "12px",
            borderRadius: 14,
            background: "#4f46e5",
            border: "none",
            color: "white",
            fontWeight: 600,
            fontSize: 16,
            cursor: "pointer"
          }}
        >
          Proceed to Check-In
        </button>
      </div>
    </div>
  )
}

const label = {
  marginTop: 12,
  fontSize: 14,
  color: "#6b7280"
}

const value = {
  fontSize: 17,
  fontWeight: 500,
  color: "#111"
}
