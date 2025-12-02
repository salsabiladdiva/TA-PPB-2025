import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { supabase } from "../../utils/supabaseClient";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUserData() {
      try {
        // 1. Ambil Sesi Auth
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          navigate("/login");
          return;
        }

        // 2. Ambil Data Profil
        // GANTI .single() DENGAN .maybeSingle()
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('name, nim, kelompok, role') 
          .eq('id', user.id)
          .maybeSingle(); 

        if (error) {
          console.error("Error fetching profile:", error);
        }

        // 3. Set State dengan Data Default (Fallback) jika profil kosong
        const profileData = profile || {}; 

        setUserProfile({
          name: profileData.name || 'User (Data Belum Lengkap)',
          nim: profileData.nim || '-',
          kelompok: profileData.kelompok || '-',
          role: profileData.role || 'user', 
          displayEmail: user.email,
          prodi: 'Teknik Komputer',
          universitas: 'Universitas Diponegoro',
          posisi: profileData.role === 'admin' ? 'Administrator' : 'Student Developer',
        });

      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        setLoading(false);
      }
    }
    getUserData();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#c44569", color: "white", padding: 50, textAlign: "center" }}>
        Loading Profile...
      </div>
    );
  }

  if (!userProfile) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingBottom: 60,
        background: "#c44569",
        color: "white",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Navbar />

      {/* ---- HERO SECTION ---- */}
      <div style={{ textAlign: "center", padding: "120px 20px 40px" }}>
        <h1 style={{ fontSize: 48, fontWeight: 900, marginBottom: 10 }}>My Profile</h1>
        <p style={{ fontSize: 20, opacity: 0.9 }}>Your personal flight dashboard</p>
      </div>

      {/* ---- PROFILE WRAPPER ---- */}
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 40, padding: "0 20px", flexWrap: "wrap" }}>
        
        {/* LEFT CARD */}
        <div style={cardStyle}>
          <div style={avatarStyle}>
            {userProfile.name ? userProfile.name[0].toUpperCase() : 'U'}
          </div>

          <h2 style={{ fontSize: 26, fontWeight: 700 }}>{userProfile.name}</h2>
          <p style={{ opacity: 0.9, marginTop: 6 }}>{userProfile.nim}</p>
          
          {/* Badge Role */}
          <div style={{ 
            display: "inline-block", 
            padding: "4px 12px", 
            borderRadius: "20px", 
            background: userProfile.role === 'admin' ? "#ffd700" : "rgba(255,255,255,0.2)",
            color: userProfile.role === 'admin' ? "#000" : "#fff",
            fontWeight: "bold",
            fontSize: "12px",
            marginTop: "10px",
            textTransform: "uppercase"
          }}>
            {userProfile.role}
          </div>

          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: "10px" }}>
            
            {/* TOMBOL ADMIN (Hanya muncul jika role === 'admin') */}
            {userProfile.role === 'admin' && (
              <button
                onClick={() => navigate("/admin/add-flight")}
                style={adminBtnStyle}
              >
                🛠️ Admin Dashboard
              </button>
            )}

            <button onClick={handleLogout} style={logoutBtnStyle}>
              Logout
            </button>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div style={{ ...cardStyle, flex: 2 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Profile Information</h2>
          
          <div style={infoGrid}>
            <InfoItem label="Nama Lengkap" value={userProfile.name} />
            <InfoItem label="NIM" value={userProfile.nim} />
            <InfoItem label="Program Studi" value={userProfile.prodi} />
            <InfoItem label="Universitas" value={userProfile.universitas} />
            <InfoItem label="Posisi" value={userProfile.posisi} />
            <InfoItem label="Email" value={userProfile.displayEmail} />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS & STYLES ---

const InfoItem = ({ label, value }) => (
  <div>
    <p style={{ opacity: 0.7, fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{label}</p>
    <p style={{ fontSize: 18, fontWeight: 700 }}>{value}</p>
  </div>
);

const cardStyle = {
  flex: 1,
  minWidth: 320,
  background: "rgba(255,255,255,0.12)",
  padding: 32,
  borderRadius: 20,
  backdropFilter: "blur(14px)",
  border: "1px solid rgba(255,255,255,0.25)",
  textAlign: "center",
};

const avatarStyle = {
  width: 120,
  height: 120,
  borderRadius: "50%",
  background: "white",
  color: "#c44569",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: 60,
  fontWeight: 800,
  margin: "0 auto 20px",
};

const infoGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 20,
  textAlign: "left",
};

const logoutBtnStyle = {
  padding: "12px",
  borderRadius: 10,
  background: "rgba(255,255,255,0.2)",
  color: "white",
  fontWeight: 700,
  border: "none",
  cursor: "pointer",
  transition: "0.2s"
};

const adminBtnStyle = {
  padding: "12px",
  borderRadius: 10,
  background: "white",
  color: "#c44569",
  fontWeight: 800,
  border: "none",
  cursor: "pointer",
  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
  transition: "0.2s"
};