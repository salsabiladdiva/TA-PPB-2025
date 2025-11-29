import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import Navbar from "../../components/Navbar"

const API_BASE_URL = "http://10.158.74.12:4000" // Diperbaiki ke localhost

export default function FlightDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [flight, setFlight] = useState(null)
  const [name, setName] = useState("")
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)

  // --- Ambil Flight Detail ---
  useEffect(() => {
    async function fetchFlightDetail() {
      try {
        setLoading(true)
        const response = await fetch(`${API_BASE_URL}/api/flights/${id}`)

        if (response.status === 404) {
          alert("Flight not found.")
          navigate("/booking")
          return
        }

        if (!response.ok) throw new Error("Failed to fetch flight detail.")

        const data = await response.json()
        setFlight(data)
      } catch (error) {
        console.error(error)
        alert("Failed to load flight details.")
        navigate("/booking")
      } finally {
        setLoading(false)
      }
    }

    fetchFlightDetail()
  }, [id, navigate])

  // --- Upload Gambar ---
  const handleImage = (e) => {
    const file = e.target.files[0]
    setImage(file)

    if (file) {
      const previewURL = URL.createObjectURL(file)
      setPreview(previewURL)
    }
  }

  // --- Confirm Payment ---
  const handlePayment = async () => {
    if (!name || !image) {
      alert("Please enter passenger name and upload payment proof.")
      return
    }

    const user_id =
      localStorage.getItem("user_id") ||
      "919a1ca5-9f22-4c63-9001-e91239f096df"

    setLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          flight_id: flight.id,
          passenger_name: name,
          user_id,
          payment_proof: image.name, // (simulasi)
        }),
      })

      if (!response.ok)
        throw new Error("Failed to create booking.")

      const booking = await response.json()

      navigate("/payment-success", {
        state: {
          booking,
          flight,
          passengerName: name,
        },
      })
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading && !flight) {
    return <p style={{ padding: 20 }}>Loading...</p>
  }

  if (!flight) return null

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#c44569",
        color: "white",
        fontFamily: "'Poppins', sans-serif",
        paddingBottom: 60,
      }}
    >
      <Navbar />

      {/* HERO TITLE */}
      <div style={{ textAlign: "center", padding: "100px 20px 20px" }}>
        <h1 style={{ fontSize: 42, fontWeight: 900 }}>Flight Details</h1>
      </div>

      {/* FLIGHT CARD */}
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          background: "rgba(255,255,255,0.15)",
          padding: 28,
          borderRadius: 20,
          border: "1px solid rgba(255,255,255,0.25)",
          backdropFilter: "blur(14px)",
          lineHeight: 1.8,
          boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
        }}
      >
        <p><b>From:</b> {flight.from_city}</p>
        <p><b>To:</b> {flight.to_city}</p>
        <p><b>Date:</b> {flight.date}</p>
        <p><b>Time:</b> {flight.time}</p>
        <p><b>Price:</b> Rp {flight.price.toLocaleString("id-ID")}</p>
      </div>

      {/* FORM */}
      <div
        style={{
          maxWidth: 900,
          margin: "30px auto",
          padding: "0 20px",
        }}
      >
        <label style={label}>Passenger Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter full name"
          style={input}
        />

        <label style={{ ...label, marginTop: 20 }}>Upload Payment Proof</label>
        <input type="file" onChange={handleImage} style={fileInput} />

        {/* Preview Image */}
        {preview && (
          <img
            src={preview}
            alt="preview"
            style={{
              marginTop: 20,
              width: "100%",
              borderRadius: 14,
              border: "2px solid rgba(255,255,255,0.3)",
            }}
          />
        )}

        <button
          onClick={handlePayment}
          disabled={loading || !name || !image}
          style={{
            ...button,
            opacity: !name || !image ? 0.6 : 1,
            cursor: !name || !image ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Processing..." : "Confirm Payment"}
        </button>
      </div>
    </div>
  )
}

const label = {
  display: "block",
  marginBottom: 6,
  opacity: 0.9,
  fontSize: 16,
}

const input = {
  width: "100%",
  padding: "12px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.3)",
  background: "rgba(0,0,0,0.15)",
  color: "white",
}

const fileInput = {
  marginTop: 6,
  color: "white",
}

const button = {
  marginTop: 24,
  width: "100%",
  padding: "14px",
  borderRadius: 14,
  border: "none",
  background: "white",
  color: "#c44569",
  fontWeight: 700,
  fontSize: 18,
  boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
}