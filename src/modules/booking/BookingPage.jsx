import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function BookingPage() {
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [sortPrice, setSortPrice] = useState("default");

  // Ambil Data Flights
  useEffect(() => {
    async function loadFlights() {
      const { data } = await supabase.from("flights").select("*");
      setFlights(data || []);
    }
    loadFlights();
  }, []);

  // Filter
  const filteredFlights = flights.filter(f => {
    return (
      (from ? f.from_city === from : true) &&
      (to ? f.to_city === to : true) &&
      (date ? f.date === date : true)
    );
  });

  // Sorting
  if (sortPrice === "cheap") {
    filteredFlights.sort((a, b) => a.price - b.price);
  } else if (sortPrice === "expensive") {
    filteredFlights.sort((a, b) => b.price - a.price);
  }

  const handleSelectFlight = flight => {
    navigate(`/flight/${flight.id}`);
  };

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #c44569)", // Sama dengan home
          color: "white",
          padding: "0", // Reset padding
          paddingTop: "100px", // Ruang untuk fixed navbar
          fontFamily: "'Poppins', sans-serif",
          margin: 0, // Pastikan tidak ada margin
        }}
      >
        {/* NAVBAR GLOBAL - Pindahkan ke luar container utama */}
      <Navbar />
      
        {/* CONTENT CONTAINER */}
        <div style={{
          padding: "20px 50px", // Padding untuk konten
        }}>
          
          <h1 style={{ 
            fontSize: 42, 
            fontWeight: 900, 
            marginBottom: 10,
            marginTop: 0, // Reset margin top
          }}>
            Book Your Flight
          </h1>

          {/* FILTER BOX */}
          <div
            style={{
              background: "rgba(255,255,255,0.15)",
              padding: 25,
              borderRadius: 16,
              backdropFilter: "blur(12px)",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
              marginBottom: 40,
              border: "1px solid rgba(255,255,255,0.2)", // Tambah border
            }}
          >
            <div>
              <label style={labelStyle}>From</label>
              <select 
                value={from} 
                onChange={e => setFrom(e.target.value)} 
                style={input}
              >
                <option value="">From</option>
                {[...new Set(flights.map(f => f.from_city))].map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={labelStyle}>To</label>
              <select 
                value={to} 
                onChange={e => setTo(e.target.value)} 
                style={input}
              >
                <option value="">To</option>
                {[...new Set(flights.map(f => f.to_city))].map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Date</label>
              <input 
                type="date" 
                value={date} 
                onChange={e => setDate(e.target.value)} 
                style={input} 
              />
            </div>

            <div>
              <label style={labelStyle}>Sort Price</label>
              <select 
                value={sortPrice} 
                onChange={e => setSortPrice(e.target.value)} 
                style={input}
              >
                <option value="default">Default</option>
                <option value="cheap">Harga Termurah</option>
                <option value="expensive">Harga Termahal</option>
              </select>
            </div>
          </div>

          <h2 style={{ 
            fontSize: 32, 
            fontWeight: 800, 
            marginBottom: 20 
          }}>
            Available Flights
          </h2>

          {/* LIST FLIGHT */}
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: 20,
            paddingBottom: "40px", // Tambah ruang di bawah
          }}>
            {filteredFlights.length > 0 ? (
              filteredFlights.map(flight => (
                <div
                  key={flight.id}
                  onClick={() => handleSelectFlight(flight)}
                  style={card}
                >
                  <h3 style={{ marginBottom: 5, fontSize: 18 }}>
                    {flight.from_city} → {flight.to_city}
                  </h3>
                  <p style={{ margin: "5px 0", opacity: 0.9 }}>
                    {flight.date} • {flight.time}
                  </p>
                  <p style={{ 
                    fontWeight: 700, 
                    fontSize: 20,
                    margin: "5px 0 0 0",
                    color: "#fff3cd",
                  }}>
                    Rp {flight.price.toLocaleString("id-ID")}
                  </p>
                </div>
              ))
            ) : (
              <div style={{
                textAlign: "center",
                padding: "40px",
                background: "rgba(255,255,255,0.1)",
                borderRadius: 16,
                opacity: 0.8,
              }}>
                <p>No flights found matching your criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/* STYLES */
const labelStyle = {
  display: "block",
  marginBottom: 5,
  fontWeight: 600,
  fontSize: 14,
};

const input = {
  width: "100%",
  padding: "12px 16px",
  background: "rgba(255,255,255,0.2)",
  border: "1px solid rgba(255,255,255,0.4)",
  borderRadius: 12,
  color: "white",
  fontSize: 14,
  outline: "none",
  transition: "all 0.3s ease",
  boxSizing: "border-box",
};

const card = {
  background: "rgba(255,255,255,0.15)",
  padding: 20,
  borderRadius: 18,
  cursor: "pointer",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255,255,255,0.2)",
  transition: "all 0.3s ease",
  ":hover": {
    transform: "translateY(-2px)",
    background: "rgba(255,255,255,0.25)",
  }
};