import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { supabase } from "../../utils/supabaseClient";

// URL Backend (Pastikan server.js jalan)
const API_BASE_URL = "http://localhost:4000"; 

export default function AddFlightPage() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false); // State untuk cek hak akses
  const [loadingCheck, setLoadingCheck] = useState(true); // Loading saat cek role

  // Form State
  const [formData, setFormData] = useState({
    from_city: "",
    to_city: "",
    date: "",
    time: "",
    price: "",
    gate: ""
  });
  const [submitLoading, setSubmitLoading] = useState(false);

  // 1. CEK APAKAH USER ADALAH ADMIN
  useEffect(() => {
    const checkAdminRole = async () => {
      // Ambil user yang sedang login
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }

      // Cek role di tabel profiles
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile?.role !== 'admin') {
        alert("⛔ Akses Ditolak! Halaman ini khusus Admin.");
        navigate("/"); // Tendang user biasa ke Home
      } else {
        setIsAdmin(true); // User valid
      }
      setLoadingCheck(false);
    };

    checkAdminRole();
  }, [navigate]);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      // Kirim data ke Backend Express
      const response = await fetch(`${API_BASE_URL}/api/flights`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.error || "Gagal menyimpan data.");

      alert("✅ Sukses! Jadwal penerbangan berhasil ditambahkan.");
      
      // Reset Form
      setFormData({
        from_city: "",
        to_city: "",
        date: "",
        time: "",
        price: "",
        gate: ""
      });

    } catch (error) {
      alert(`❌ Gagal: ${error.message}`);
    } finally {
      setSubmitLoading(false);
    }
  };

  // Tampilan Loading saat cek role
  if (loadingCheck) {
    return (
      <div style={{ minHeight: "100vh", background: "#c44569", display: "flex", justifyContent: "center", alignItems: "center", color: "white" }}>
        Memeriksa hak akses...
      </div>
    );
  }

  // Jika bukan admin, jangan render apa-apa (tapi useEffect di atas sudah handle redirect)
  if (!isAdmin) return null;

  return (
    <div style={pageStyle}>
      <Navbar />
      
      <div style={contentWrapper}>
        <h1 style={{ fontSize: "36px", fontWeight: "900", marginBottom: "10px" }}>
          Admin Dashboard
        </h1>
        <p style={{ fontSize: "18px", opacity: 0.9, marginBottom: "40px" }}>
          Input Jadwal Penerbangan Baru
        </p>

        {/* Form Card */}
        <div style={glassCard}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            
            {/* Baris 1: Kota Asal & Tujuan */}
            <div style={rowStyle}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Dari Kota (Origin)</label>
                <input 
                  name="from_city" 
                  value={formData.from_city} 
                  onChange={handleChange} 
                  placeholder="e.g. Jakarta (CGK)" 
                  style={inputStyle} 
                  required 
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Ke Kota (Destination)</label>
                <input 
                  name="to_city" 
                  value={formData.to_city} 
                  onChange={handleChange} 
                  placeholder="e.g. Bali (DPS)" 
                  style={inputStyle} 
                  required 
                />
              </div>
            </div>

            {/* Baris 2: Tanggal & Waktu */}
            <div style={rowStyle}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Tanggal</label>
                <input 
                  type="date" 
                  name="date" 
                  value={formData.date} 
                  onChange={handleChange} 
                  style={inputStyle} 
                  required 
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Jam</label>
                <input 
                  type="time" 
                  name="time" 
                  value={formData.time} 
                  onChange={handleChange} 
                  style={inputStyle} 
                  required 
                />
              </div>
            </div>

            {/* Baris 3: Harga & Gate */}
            <div style={rowStyle}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Harga (Rp)</label>
                <input 
                  type="number" 
                  name="price" 
                  value={formData.price} 
                  onChange={handleChange} 
                  placeholder="e.g. 1500000" 
                  style={inputStyle} 
                  required 
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Gate (Opsional)</label>
                <input 
                  type="text" 
                  name="gate" 
                  value={formData.gate} 
                  onChange={handleChange} 
                  placeholder="e.g. D2" 
                  style={inputStyle} 
                />
              </div>
            </div>

            <button type="submit" disabled={submitLoading} style={buttonStyle}>
              {submitLoading ? "Menyimpan Data..." : "Tambah Penerbangan"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

// --- STYLING ---
const pageStyle = {
  minHeight: "100vh",
  background: "#c44569",
  color: "white",
  fontFamily: "'Poppins', sans-serif",
  paddingBottom: "50px"
};

const contentWrapper = {
  padding: "120px 20px 20px",
  maxWidth: "800px",
  margin: "0 auto",
  textAlign: "center"
};

const glassCard = {
  background: "rgba(255,255,255,0.15)",
  backdropFilter: "blur(12px)",
  padding: "40px",
  borderRadius: "20px",
  border: "1px solid rgba(255,255,255,0.3)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
  textAlign: "left"
};

const rowStyle = {
  display: "flex",
  gap: "20px",
  flexWrap: "wrap"
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  fontWeight: "600",
  fontSize: "14px",
  color: "#f8f9fa"
};

const inputStyle = {
  width: "100%",
  padding: "12px 15px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.5)",
  background: "rgba(255,255,255,0.2)",
  color: "white",
  fontSize: "16px",
  outline: "none",
  boxSizing: "border-box"
};

const buttonStyle = {
  marginTop: "25px",
  padding: "15px",
  borderRadius: "10px",
  border: "none",
  background: "white",
  color: "#c44569",
  fontSize: "18px",
  fontWeight: "800",
  cursor: "pointer",
  transition: "0.3s",
  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
  width: "100%"
};