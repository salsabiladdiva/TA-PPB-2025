import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function LoginPage() {
  const navigate = useNavigate()

  // Jika sudah login → ke profile
  useEffect(() => {
    const logged = localStorage.getItem("logged_in")
    if (logged === "true") {
      navigate("/profile")
    }
  }, [])

  const handleLogin = () => {
    localStorage.setItem("logged_in", "true")
    navigate("/profile")
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#c44569",
        color: "white",
        padding: "60px 20px",
        fontFamily: "'Poppins', sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start"
      }}
    >
      {/* Glass Card */}
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          padding: 32,
          borderRadius: 20,
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(255,255,255,0.25)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)"
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: 36,
            fontWeight: 900,
            marginBottom: 10
          }}
        >
          Login
        </h1>

        <p
          style={{
            textAlign: "center",
            opacity: 0.9,
            marginBottom: 30
          }}
        >
          Use dummy credentials to continue.
        </p>

        <label style={labelStyle}>Email</label>
        <input
          defaultValue="demo@cabinair.com"
          style={inputStyle}
        />

        <label style={labelStyle}>Password</label>
        <input
          defaultValue="123456"
          type="password"
          style={inputStyle}
        />

        <button onClick={handleLogin} style={buttonStyle}>
          Login
        </button>
      </div>
    </div>
  )
}

const labelStyle = {
  fontSize: 14,
  fontWeight: 600,
  marginBottom: 4,
  display: "block"
}

const inputStyle = {
  width: "100%",
  marginBottom: 18,
  padding: "12px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.4)",
  background: "rgba(255,255,255,0.25)",
  color: "white",
  outline: "none",
  fontSize: 16
}

const buttonStyle = {
  marginTop: 10,
  width: "100%",
  padding: "14px",
  borderRadius: 12,
  border: "none",
  background: "white",
  color: "#c44569",
  fontWeight: 700,
  cursor: "pointer",
  fontSize: 17,
  boxShadow: "0 4px 12px rgba(255,255,255,0.25)"
}
