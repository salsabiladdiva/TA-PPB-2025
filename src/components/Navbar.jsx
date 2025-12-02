import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: 500,
    display: 'block', 
    padding: "10px 0", 
  };

  const navContainerStyle = {
    width: "100%",
    padding: "20px 40px",
    fontWeight: 600,
    fontSize: 18,
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10000,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    backgroundColor: isMenuOpen ? "rgba(196, 69, 105, 0.95)" : "transparent",
    backdropFilter: "none",
    transition: 'background-color 0.3s',
  };

  const headerAndToggleWrapperStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%', 
  };

  const menuLinksStyle = {
    display: isMenuOpen ? "flex" : "none", 
    flexDirection: "column",
    gap: 0,
    marginTop: 10,
    width: "100%",
  }

  return (
    <nav style={navContainerStyle}>
      
      <div style={headerAndToggleWrapperStyle}>
        <div
          style={{
            letterSpacing: 2,
            fontSize: 22,
            fontWeight: 700,
            color: "white",
          }}
        >
          CABININ AIRLINES
        </div>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
              background: "none",
              border: "none",
              color: "white",
              fontSize: 24,
              cursor: "pointer",
          }}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      <div style={menuLinksStyle}>
        <a href="/" style={navLinkStyle}>Home</a>
        <a href="/booking" style={navLinkStyle}>Booking</a>
        <a href="/checkin" style={navLinkStyle}>Check-In</a>
        <a href="/about" style={navLinkStyle}>About</a>
        <a href="/profile" style={navLinkStyle}>Profile</a>
        
        {/* Link Admin (Tambahan Baru) */}
        <div style={{ margin: "10px 0", borderTop: "1px solid rgba(255,255,255,0.3)" }}></div>
        <a href="/admin/add-flight" style={{ ...navLinkStyle, color: "#ffd1dc" }}>
          Admin Input
        </a>
      </div>
      
    </nav>
  );
}