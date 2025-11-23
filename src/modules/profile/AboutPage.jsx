import Navbar from "../../components/Navbar";

export default function AboutPage() {
  return (
    <div
      style={{
        height: "100%",
        minHeight: "100vh",
        paddingBottom: "40px",
        background: "#c44569",
        color: "white",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Navbar />

      {/* HERO SECTION */}
      <div
        style={{
          textAlign: "center",
          padding: "80px 20px 40px",
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
          About CabinIn
        </h1>

        <p
          style={{
            fontSize: 20,
            opacity: 0.9,
            maxWidth: 700,
            margin: "0 auto",
          }}
        >
          Your modern gateway to a faster, simpler, and more elegant flight
          booking experience.
        </p>
      </div>

      {/* GLASS CARD */}
      <div
        style={{
          maxWidth: 900,
          margin: "30px auto",
          padding: 32,
          borderRadius: 20,
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(255,255,255,0.25)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
          lineHeight: 1.8,
          fontSize: 18,
        }}
      >
        <p>
          <b>CabinIn</b> adalah platform booking penerbangan modern yang dirancang
          untuk memberikan pengalaman terbaik — mulai dari pemesanan tiket,
          proses check-in, hingga mendapatkan boarding pass digital.
        </p>

        <p style={{ marginTop: 20 }}>
          Dibangun menggunakan teknologi terbaru:
        </p>

        <ul style={{ marginTop: 10, paddingLeft: 20 }}>
          <li>🚀 React + Vite untuk performa super cepat</li>
          <li>🔐 Supabase Authentication untuk login aman</li>
          <li>🗄️ Supabase Database (PostgreSQL) yang andal</li>
          <li>✨ Glass UI Design yang modern dan elegan</li>
        </ul>

        <p style={{ marginTop: 20 }}>
          Tujuan utama CabinIn adalah mengubah cara Anda bepergian — menjadi lebih
          mudah, lebih cepat, dan tentunya lebih stylish.
        </p>
      </div>
    </div>
  );
}
