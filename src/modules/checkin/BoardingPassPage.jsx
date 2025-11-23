import { useLocation } from "react-router-dom"
import BoardingPass from "../../components/BoardingPass"

export default function BoardingPassPage() {
  const { state } = useLocation()

  // Cegah error jika user masuk tanpa data state
  if (!state || !state.booking || !state.flight || !state.seat) {
    return (
      <div style={{ padding: 20, color: "white" }}>
        <p>Invalid boarding pass data.</p>
      </div>
    )
  }

  const { booking, flight, seat } = state

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "24px",
        background:
          "radial-gradient(circle at top, #4f46e5, #9333ea 60%, #1a1a1a)",
        color: "white"
      }}
    >
      <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 20 }}>
        Your Boarding Pass
      </h1>

      {/* Render komponen BoardingPass */}
      <BoardingPass booking={booking} flight={flight} seat={seat} />
    </div>
  )
}
