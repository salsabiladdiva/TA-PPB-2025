import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react" 
import Navbar from "../../components/Navbar"
import { supabase } from "../../utils/supabaseClient"

export default function ProfilePage() {
  const navigate = useNavigate()
  const [userProfile, setUserProfile] = useState(null); 

  // --- CEK SESI & AMBIL DATA USER DARI profiles ---
  useEffect(() => {
    async function getUserData() {
        // 1. Ambil Sesi Auth
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            // Jika tidak ada sesi aktif, arahkan ke login
            navigate("/login")
            return;
        }

        // 2. Ambil Data Profil dari Tabel profiles
        // Policy RLS memastikan hanya data user ini yang bisa diambil
        const { data: profile, error } = await supabase
            .from('profiles')
            .select('name, nim, kelompok') 
            .eq('id', user.id)
            .single();
        
        if (error) {
            console.error("Error fetching profile:", error);
            // Fallback jika data profil tidak ditemukan atau gagal diambil
            setUserProfile({
                name: 'Data Profile Tidak Ditemukan',
                nim: 'N/A',
                kelompok: 'N/A',
                displayEmail: user.email,
                prodi: 'Teknik Komputer',
                universitas: 'Universitas Diponegoro',
                posisi: 'Student Developer',
            });
            return;
        }

        // 3. Gabungkan Data Dinamis (Profile) dan Data Hardcode (Lainnya)
        setUserProfile({
            // Data Dinamis dari Supabase Profile
            name: profile.name || 'Nama Tidak Ditemukan', 
            nim: profile.nim || 'NIM Tidak Ditemukan',
            kelompok: profile.kelompok || '00',
            // Data Dinamis dari Supabase Auth
            displayEmail: user.email, 
            // Data Hardcode untuk tampilan TA
            prodi: 'Teknik Komputer',
            universitas: 'Universitas Diponegoro',
            posisi: 'Student Developer',
        });
    }
    getUserData()
  }, [navigate])

  // --- LOGOUT MENGGUNAKAN SUPABASE ---
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
        navigate("/login")
    } else {
        console.error("Logout Error:", error)
        alert("Logout failed.")
    }
  }

  // --- TAMPILAN LOADING ---
  if (!userProfile) {
    return (
        <div style={{minHeight: "100vh", background: "#c44569", color: "white", padding: 50}}>
            Loading Profile...
        </div>
    )
  }

  const user = userProfile;

  // --- TAMPILAN PROFILE PAGE ---
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
      <div
        style={{
          textAlign: "center",
          padding: "120px 20px 40px",
        }}
      >
        <h1
          style={{
            fontSize: 48,
            fontWeight: 900,
            letterSpacing: 1,
            marginBottom: 10,
          }}
        >
          My Profile
        </h1>

        <p
          style={{
            fontSize: 20,
            opacity: 0.9,
            maxWidth: 700,
            margin: "0 auto",
          }}
        >
          Your personal flight dashboard
        </p>
      </div>

      {/* ---- PROFILE WRAPPER ---- */}
      <div
        style={{
          maxWidth: 1100,
          margin: "40px auto 60px",
          display: "flex",
          gap: 40,
          padding: "0 20px",
          flexWrap: "wrap",
        }}
      >
        {/* ---- LEFT CARD ---- */}
        <div
          style={{
            flex: 1,
            minWidth: 320,
            background: "rgba(255,255,255,0.12)",
            padding: 32,
            borderRadius: 20,
            textAlign: "center",
            backdropFilter: "blur(14px)",
            border: "1px solid rgba(255,255,255,0.25)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
          }}
        >
          <div
            style={{
              width: 160,
              height: 160,
              borderRadius: "50%",
              background: "white",
              color: "#c44569",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto 20px",
              fontSize: 80,
              fontWeight: 800,
              boxShadow: "0 0 25px rgba(255,255,255,0.4)",
            }}
          >
            {user.name ? user.name[0].toUpperCase() : 'U'}
          </div>

          <h2 style={{ fontSize: 26, fontWeight: 700 }}>{user.name}</h2>
          <p style={{ opacity: 0.9, marginTop: 6 }}>{user.nim}</p>
          <p style={{ opacity: 0.9 }}>Kelompok {user.kelompok}</p>

          <button
            onClick={handleLogout}
            style={logoutBtn}
          >
            Logout
          </button>
        </div>

        {/* ---- RIGHT CARD ---- */}
        <div
          style={{
            flex: 2,
            minWidth: 340,
            background: "rgba(255,255,255,0.12)",
            padding: 32,
            borderRadius: 20,
            backdropFilter: "blur(14px)",
            border: "1px solid rgba(255,255,255,0.25)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
          }}
        >
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>
            Profile Information
          </h2>

          <div style={infoGrid}>
            <div>
              <p style={label}>Nama Lengkap</p>
              <p style={value}>{user.name}</p>
            </div>

            <div>
              <p style={label}>NIM</p>
              <p style={value}>{user.nim}</p>
            </div>

            <div>
              <p style={label}>Program Studi</p>
              <p style={value}>{user.prodi}</p>
            </div>

            <div>
              <p style={label}>Universitas</p>
              <p style={value}>{user.universitas}</p>
            </div>

            <div>
              <p style={label}>Posisi</p>
              <p style={value}>{user.posisi}</p>
            </div>

            <div>
              <p style={label}>Email</p>
              <p style={value}>{user.displayEmail}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---- STYLING ---- */

const logoutBtn = {
  marginTop: 20,
  padding: "12px 20px",
  borderRadius: 10,
  background: "white",
  color: "#c44569",
  fontWeight: 700,
  border: "none",
  cursor: "pointer",
  fontSize: 16,
  boxShadow: "0 4px 18px rgba(0,0,0,0.2)",
}

const infoGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 20,
}

const label = {
  opacity: 0.7,
  fontSize: 14,
  fontWeight: 500,
  marginBottom: 4,
}

const value = {
  fontSize: 18,
  fontWeight: 700,
}