export default function FlightCard({ flight, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "rgba(255,255,255,0.14)",
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        border: "1px solid rgba(255,255,255,0.25)",
        backdropFilter: "blur(14px)",
        cursor: "pointer",
        transition: "0.2s",
        width: "100%"
      }}
    >
      <h3 style={{ fontSize: 18, fontWeight: 700 }}>
        {flight.from_city} → {flight.to_city}
      </h3>
      <p style={{ opacity: 0.8 }}>
        {flight.date} • {flight.time}
      </p>

      <p style={{ marginTop: 10, fontWeight: 700 }}>
        Rp {flight.price.toLocaleString("id-ID")}
      </p>
    </div>
  );
}
