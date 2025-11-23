import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import Navbar from "../../components/Navbar"

export default function ProfilePage() {
  const navigate = useNavigate()

  // Cegah masuk tanpa login
  useEffect(() => {
    const logged = localStorage.getItem("logged_in")
    if (logged !== "true") {
      navigate("/login")
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("logged_in")
    navigate("/login")
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingBottom: 60,
        background: "#c44569",
        color: "white",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Navbar />

      {/* ---- HERO SECTION ---- */}
      <div
        style={{
          textAlign: "center",
          padding: "120px 20px 40px",
        }}
      >
        <h1
          style={{
            fontSize: 48,
            fontWeight: 900,
            letterSpacing: 1,
            marginBottom: 10,
          }}
        >
          My Profile
        </h1>

        <p
          style={{
            fontSize: 20,
            opacity: 0.9,
            maxWidth: 700,
            margin: "0 auto",
          }}
        >
          Your personal flight dashboard
        </p>
      </div>

      {/* ---- PROFILE WRAPPER ---- */}
      <div
        style={{
          maxWidth: 1100,
          margin: "40px auto 60px",
          display: "flex",
          gap: 40,
          padding: "0 20px",
          flexWrap: "wrap",
        }}
      >
        {/* ---- LEFT CARD ---- */}
        <div
          style={{
            flex: 1,
            minWidth: 320,
            background: "rgba(255,255,255,0.12)",
            padding: 32,
            borderRadius: 20,
            textAlign: "center",
            backdropFilter: "blur(14px)",
            border: "1px solid rgba(255,255,255,0.25)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
          }}
        >
          <div
            style={{
              width: 160,
              height: 160,
              borderRadius: "50%",
              background: "white",
              color: "#c44569",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto 20px",
              fontSize: 80,
              fontWeight: 800,
              boxShadow: "0 0 25px rgba(255,255,255,0.4)",
            }}
          >
            S
          </div>

          <h2 style={{ fontSize: 26, fontWeight: 700 }}>Salsabila Diva</h2>
          <p style={{ opacity: 0.9, marginTop: 6 }}>21120123140044</p>
          <p style={{ opacity: 0.9 }}>Kelompok 22</p>

          <button
            onClick={handleLogout}
            style={logoutBtn}
          >
            Logout
          </button>
        </div>

        {/* ---- RIGHT CARD ---- */}
        <div
          style={{
            flex: 2,
            minWidth: 340,
            background: "rgba(255,255,255,0.12)",
            padding: 32,
            borderRadius: 20,
            backdropFilter: "blur(14px)",
            border: "1px solid rgba(255,255,255,0.25)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
          }}
        >
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>
            Profile Information
          </h2>

          <div style={infoGrid}>
            <div>
              <p style={label}>Nama Lengkap</p>
              <p style={value}>Salsabila Diva</p>
            </div>

            <div>
              <p style={label}>NIM</p>
              <p style={value}>21120123140044</p>
            </div>

            <div>
              <p style={label}>Program Studi</p>
              <p style={value}>Teknik Komputer</p>
            </div>

            <div>
              <p style={label}>Universitas</p>
              <p style={value}>Universitas Diponegoro</p>
            </div>

            <div>
              <p style={label}>Posisi</p>
              <p style={value}>Student Developer</p>
            </div>

            <div>
              <p style={label}>Email</p>
              <p style={value}>salsabila@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---- STYLING ---- */

const logoutBtn = {
  marginTop: 20,
  padding: "12px 20px",
  borderRadius: 10,
  background: "white",
  color: "#c44569",
  fontWeight: 700,
  border: "none",
  cursor: "pointer",
  fontSize: 16,
  boxShadow: "0 4px 18px rgba(0,0,0,0.2)",
}

const infoGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 20,
}

const label = {
  opacity: 0.7,
  fontSize: 14,
  fontWeight: 500,
  marginBottom: 4,
}

const value = {
  fontSize: 18,
  fontWeight: 700,
}
