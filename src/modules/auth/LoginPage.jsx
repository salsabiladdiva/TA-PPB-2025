import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";

// ==========================================================
// PINDAHKAN KOMPONEN PEMBANTU KE LUAR FUNGSI UTAMA (Fix Focus Loss)
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
// FUNGSI UTAMA (Kini lebih stabil)
// ==========================================================

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate("/profile"); 
    }
    
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
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <GlassCard>
        <h2 style={{ textAlign: "center", marginBottom: 30, fontSize: 30, fontWeight: 700 }}>
          Login to CabinIn
        </h2>
        
        {error && (
            <div style={{ backgroundColor: '#ff5252', padding: 10, borderRadius: 8, marginBottom: 20, fontSize: 14, textAlign: 'center' }}>
                {error}
            </div>
        )}

        <form onSubmit={handleLogin}>
          <InputField
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button disabled={loading}>
            {loading ? "Logging In..." : "Login"}
          </Button>
        </form>

        <p style={{ textAlign: "center", marginTop: 25, fontSize: 16 }}>
          Belum punya akun?{" "}
          <Link to="/register" style={{ color: "#fff3cd", textDecoration: "none", fontWeight: 600 }}>
            Daftar di sini
          </Link>
        </p>
      </GlassCard>
    </div>
  );
}