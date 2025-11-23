import Navbar from "../../components/Navbar";

export default function HomePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#c44569",
        color: "white",
        textAlign: "center",
        fontFamily: "'Poppins', sans-serif"
      }}
    >

      <Navbar />  {/* ← pakai komponen navbar */}

      {/* --- HERO SECTION --- */}
      <div style={{ marginTop: "0px", padding: "120px 20px" }}>
        <h1 style={heroLine}>WELCOME TO THE FUTURE OF</h1>
        <h1 style={heroLine}>FLIGHT BOOKING</h1>
        <h1 style={heroLine}>FAST • SIMPLE • RELIABLE</h1>

        <p style={{ marginTop: 30, fontSize: 20, opacity: 3.0 }}>
          Experience seamless traveling with CabinIn Airlines ✈️
        </p>

        <div style={{ marginTop: 40 }}>
          <a
            href="/booking"
            style={{
              display: "inline-block",
              padding: "14px 32px",
              background: "white",
              color: "#c44569",
              borderRadius: 12,
              fontSize: 20,
              fontWeight: 700,
              boxShadow: "0 6px 20px rgba(255, 255, 255, 0.26)",
              textDecoration: "none"
            }}
          >
            Book Your Flight
          </a>
        </div>
      </div>
    </div>
  );
}

const heroLine = {
  fontSize: "48px",
  margin: "10px 0",
  fontWeight: 900,
  lineHeight: 1.1
};
