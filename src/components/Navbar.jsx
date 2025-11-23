export default function Navbar() {
  const navLink = {
    color: "white",
    textDecoration: "none",
    fontWeight: 500,
  };

  return (
    <nav
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 40px",
        fontWeight: 600,
        fontSize: 18,
        position: "fixed", // Ubah dari sticky ke fixed
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10000, // Tingkatkan z-index
        backgroundColor: "transparent", // Pastikan background transparan
        backdropFilter: "none", // Hapus efek blur jika ada
      }}
    >
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
      <div style={{ display: "flex", gap: 30 }}>
        <a href="/" style={navLink}>Home</a>
        <a href="/booking" style={navLink}>Booking</a>
        <a href="/checkin" style={navLink}>Check-In</a>
        <a href="/about" style={navLink}>About</a>
        <a href="/profile" style={navLink}>Profile</a>
      </div>
    </nav>
  );
}