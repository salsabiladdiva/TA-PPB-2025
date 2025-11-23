import { useState } from "react"
import { supabase } from "../../utils/supabaseClient"
import { useNavigate } from "react-router-dom"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const navigate = useNavigate()

  const handleRegister = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      alert(error.message)
      return
    }

    // Insert ke tabel profiles
    await supabase.from("profiles").insert({
      id: data.user.id,
      name: name
    })

    alert("Registration successful!")
    navigate("/login")
  }

  return (
    <div style={{
      minHeight: "100vh",
      padding: "24px",
      background: "radial-gradient(circle at top, #4f46e5, #9333ea 60%, #1a1a1a)",
      color: "white"
    }}>
      <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 16 }}>Register</h1>

      <label>Full Name</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={input}
      />

      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={input}
      />

      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={input}
      />

      <button style={button} onClick={handleRegister}>
        Register
      </button>
    </div>
  )
}

const input = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.4)",
  background: "rgba(0,0,0,0.2)",
  color: "white",
  marginBottom: 14
}

const button = {
  width: "100%",
  padding: "12px",
  borderRadius: 999,
  border: "1px solid white",
  background: "transparent",
  color: "white",
  fontWeight: 600,
  cursor: "pointer"
}
