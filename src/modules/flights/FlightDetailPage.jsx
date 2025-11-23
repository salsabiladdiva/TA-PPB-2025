import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

export default function FlightDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [flight, setFlight] = useState(null)
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  //---------------------------------------------------
  // 1. Ambil data flight dari local flights.js
  //---------------------------------------------------
  useEffect(() => {
    // kamu punya file flights local? ambil di sini
    // untuk sementara, aku buat dummy fetch
    const storedFlights = JSON.parse(localStorage.getItem("flights")) || []
    const f = storedFlights.find(f => f.id === id)

    if (!f) {
      alert("Flight not found.")
      navigate("/booking")
      return
    }

    setFlight(f)
  }, [id, navigate])

  //---------------------------------------------------
  // 2. Generate Ticket Code
  //---------------------------------------------------
  const generateTicketCode = () => {
    return (
      "CABININ-" +
      new Date().getFullYear() +
      "-" +
      Math.floor(1000 + Math.random() * 9000)
    )
  }

  //---------------------------------------------------
  // 3. Confirm Payment (LOCAL ONLY, NO SUPABASE)
  //---------------------------------------------------
  const handlePayment = () => {
    if (!name) {
      alert("Please enter passenger name.")
      return
    }

    setLoading(true)

    // ambil user dummy
    const user = JSON.parse(localStorage.getItem("loggedInUser"))

    if (!user) {
      alert("Please log in first.")
      setLoading(false)
      return
    }

    const ticket_code = generateTicketCode()

    // SIMPAN BOOKING KE LOCALSTORAGE
    const newBooking = {
      id: crypto.randomUUID(),
      ticket_code,
      passenger: name,
      flight,
      user,
      status: "paid",
      created_at: new Date().toISOString()
    }

    const bookings = JSON.parse(localStorage.getItem("bookings")) || []
    bookings.push(newBooking)
    localStorage.setItem("bookings", JSON.stringify(bookings))

    // redirect ke payment success
    navigate("/payment-success", {
      state: {
        booking: newBooking,
        flight,
        passengerName: name
      }
    })
  }

  if (!flight) {
    return <p style={{ padding: 20 }}>Loading...</p>
  }

  return (
    <div style={{
      padding: "24px",
      color: "white",
      minHeight: "100vh",
      background: "radial-gradient(circle at top, #4f46e5, #9333ea 60%, #1a1a1a)"
    }}>
      <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 16 }}>
        Flight Details
      </h1>

      <div style={{
        background: "rgba(255,255,255,0.12)",
        padding: 18,
        borderRadius: 18,
        marginBottom: 24,
        border: "1px solid rgba(255,255,255,0.25)",
        backdropFilter: "blur(12px)"
      }}>
        <p><b>From:</b> {flight.from_city}</p>
        <p><b>To:</b> {flight.to_city}</p>
        <p><b>Date:</b> {flight.date}</p>
        <p><b>Time:</b> {flight.time}</p>
        <p><b>Price:</b> Rp {flight.price.toLocaleString("id-ID")}</p>
      </div>

      <label>Passenger Name</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter full name"
        style={input}
      />

      <button onClick={handlePayment} disabled={loading} style={button}>
        {loading ? "Processing..." : "Confirm Payment"}
      </button>
    </div>
  )
}

const input = {
  width: "100%",
  padding: "10px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.3)",
  background: "rgba(0,0,0,0.2)",
  color: "white",
  marginBottom: 12
}

const button = {
  marginTop: 20,
  width: "100%",
  padding: "12px",
  borderRadius: 14,
  border: "none",
  background: "#4f46e5",
  color: "white",
  fontWeight: 600,
  fontSize: 16,
  cursor: "pointer"
}
