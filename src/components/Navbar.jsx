import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 1. Tambahkan state untuk toggle menu

  const navLinkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: 500,
    // Gaya untuk mobile view agar mudah diklik:
    display: 'block', 
    padding: "10px 0", 
  };

  const navContainerStyle = {
    width: "100%",
    padding: "20px 40px",
    fontWeight: 600,
    fontSize: 18,
    position: "fixed", // <-- Tetap Fixed
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10000,
    
    // Kunci responsif: flex dan flex-wrap
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap", // Memungkinkan item untuk turun ke baris baru
    
    // Sesuaikan latar belakang saat menu terbuka (simulasi tampilan mobile)
    backgroundColor: isMenuOpen ? "rgba(196, 69, 105, 0.95)" : "transparent",
    backdropFilter: "none",
    transition: 'background-color 0.3s',
  };

  // Gaya untuk wrapper yang berisi Logo dan Tombol Toggle
  const headerAndToggleWrapperStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%', // Ambil lebar 100% agar menu link berada di baris baru
  };

  // Gaya untuk Link Menu
  const menuLinksStyle = {
    // Tampilkan hanya jika isMenuOpen = true
    display: isMenuOpen ? "flex" : "none", // Kontrol tampilan dengan state
    flexDirection: "column", // Susun vertikal di mode mobile
    gap: 0,
    marginTop: 10,
    width: "100%", // Ambil lebar penuh
  }

  // Catatan: Karena tidak ada media query, menu ini akan bertingkah sebagai menu toggleable 
  // (mode mobile) di semua ukuran layar. Di aplikasi nyata, Anda akan menggunakan CSS media query
  // untuk menampilkan tombol toggle hanya di layar sempit.

  return (
    <nav style={navContainerStyle}>
      
      {/* Baris 1: Logo dan Tombol Toggle */}
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

        {/* Tombol Toggle (☰/✕) */}
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

      {/* Baris 2: Link Menu (Hanya tampil saat di-toggle) */}
      <div style={menuLinksStyle}>
        <a href="/" style={navLinkStyle}>Home</a>
        <a href="/booking" style={navLinkStyle}>Booking</a>
        <a href="/checkin" style={navLinkStyle}>Check-In</a>
        <a href="/about" style={navLinkStyle}>About</a>
        <a href="/profile" style={navLinkStyle}>Profile</a>
      </div>
      
    </nav>
  );
}