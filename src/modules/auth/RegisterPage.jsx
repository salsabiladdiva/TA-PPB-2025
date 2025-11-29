// Ganti seluruh isi file src/modules/auth/RegisterPage.jsx dengan kode ini

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";

// ==========================================================
// DEFINISI KOMPONEN PEMBANTU (Wajib di luar fungsi utama)
// ==========================================================

const GlassCard = ({ children }) => (
  <div
    style={{
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      borderRadius: 20,
      padding: 40,
      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
      maxWidth: 450,
      width: "90%",
    }}
  >
    {children}
  </div>
);

const InputField = ({ type, placeholder, value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    required
    style={{
      width: "100%",
      padding: "15px 20px",
      marginBottom: 20,
      borderRadius: 10,
      border: "1px solid rgba(255, 255, 255, 0.4)",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      color: "white",
      fontSize: 16,
      boxSizing: "border-box",
    }}
  />
);

const Button = ({ children, disabled }) => (
  <button
    type="submit"
    disabled={disabled}
    style={{
      width: "100%",
      padding: "15px",
      borderRadius: 10,
      border: "none",
      backgroundColor: disabled ? "#ccc" : "#ff6b81", 
      color: "white",
      fontSize: 18,
      fontWeight: 600,
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "background-color 0.3s",
    }}
  >
    {children}
  </button>
);


// ==========================================================
// FUNGSI UTAMA (RegisterPage)
// ==========================================================

export default function RegisterPage() {
  const [name, setName] = useState(""); 
  const [nim, setNim] = useState("");   
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    // 1. SIGN UP PENGGUNA BARU
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    const user = authData.user;
    
    // 2. MASUKKAN DATA PROFIL KE TABEL profiles
    if (user) {
        const { error: profileError } = await supabase.from('profiles').insert([
            {
                id: user.id,
                name: name,
                nim: nim,
                kelompok: '22',
            }
        ]);

        if (profileError) {
            console.error("Profile Insertion Error:", profileError);
            setError("Pendaftaran berhasil, tetapi gagal menyimpan data profil.");
            setLoading(false);
            return;
        }
    }
    
    // 3. TAMPILKAN PESAN SUKSES & REDIRECT
    setMessage("Pendaftaran berhasil! Anda akan diarahkan ke halaman login.");
    setTimeout(() => navigate('/login'), 3000);
    
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#c44569", 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <GlassCard>
        <h2 style={{ textAlign: "center", marginBottom: 30, fontSize: 30, fontWeight: 700 }}>
          Register CabinIn
        </h2>
        
        {error && (
            <div style={{ backgroundColor: '#ff5252', padding: 10, borderRadius: 8, marginBottom: 20, fontSize: 14, textAlign: 'center' }}>
                {error}
            </div>
        )}
        
        {message && (
            <div style={{ backgroundColor: '#4caf50', padding: 10, borderRadius: 8, marginBottom: 20, fontSize: 14, textAlign: 'center' }}>
                {message}
            </div>
        )}

        <form onSubmit={handleRegister}>
          <InputField
            type="text"
            placeholder="Nama Lengkap"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputField
            type="text"
            placeholder="NIM (contoh: 2112012314xxxx)"
            value={nim}
            onChange={(e) => setNim(e.target.value)}
          />
          
          <InputField
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="Password (Min 6 Karakter)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        <p style={{ textAlign: "center", marginTop: 25, fontSize: 16 }}>
          Sudah punya akun?{" "}
          <Link to="/login" style={{ color: "#fff3cd", textDecoration: "none", fontWeight: 600 }}>
            Login di sini
          </Link>
        </p>
      </GlassCard>
    </div>
  );
}