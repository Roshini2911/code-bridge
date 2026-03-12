import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function AuthPage({ role, onNavigate, onLoginSuccess }) {
  const { login, register } = useApp();
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [form, setForm] = useState({ username: "", password: "", confirmPassword: "", email: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const roleLabel = role.charAt(0) + role.slice(1).toLowerCase();
  const roleColor = role === "MEMBER" ? "#2563eb" : role === "TRAINER" ? "#0891b2" : "#7c3aed";

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    setError(""); setSuccess("");
    if (mode === "login") {
      const res = login(form.username, form.password, role);
      if (res.success) onLoginSuccess();
      else setError(res.error);
    } else {
      if (!form.username || !form.password) { setError("Please fill all required fields."); return; }
      if (form.password !== form.confirmPassword) { setError("Passwords do not match."); return; }
      register(form, role);
      setSuccess("Account created! Please log in.");
      setMode("login");
      setForm({ username: form.username, password: "", confirmPassword: "", email: "" });
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f0f7ff 0%, #e8f4fd 50%, #f5f0ff 100%)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24
    }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <button onClick={() => onNavigate("role-select")} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", fontSize: 14, marginBottom: 20 }}>← Back</button>

        <div style={{ background: "white", borderRadius: 20, padding: 36, boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
          <div style={{
            width: 52, height: 52, borderRadius: "50%",
            background: `${roleColor}15`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 24, marginBottom: 20
          }}>
            {role === "MEMBER" ? "🧑‍💪" : role === "TRAINER" ? "🏋️" : "🛡️"}
          </div>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: "#111827", marginBottom: 4 }}>
            {mode === "login" ? `${roleLabel} Login` : `Create Account`}
          </h2>
          <p style={{ color: "#9ca3af", fontSize: 14, marginBottom: 28 }}>
            {mode === "login" ? `Welcome back! Sign in to continue.` : `Join GymFlow as a ${roleLabel}.`}
          </p>

          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <div className="input-group">
            <label>Username</label>
            <input name="username" value={form.username} onChange={handleChange} placeholder="Enter your username" />
          </div>

          {mode === "register" && (
            <div className="input-group">
              <label>Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" />
            </div>
          )}

          <div className="input-group">
            <label>Password</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="••••••••" />
          </div>

          {mode === "register" && (
            <div className="input-group">
              <label>Confirm Password</label>
              <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="••••••••" />
            </div>
          )}

          <button
            onClick={handleSubmit}
            style={{
              width: "100%", padding: "13px",
              background: `linear-gradient(135deg, ${roleColor}, ${roleColor}cc)`,
              color: "white", border: "none", borderRadius: 12,
              fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 600,
              cursor: "pointer", marginTop: 8, marginBottom: 20
            }}
          >
            {mode === "login" ? "Sign In →" : "Create Account"}
          </button>

          {(role === "MEMBER" || role === "TRAINER") && (
            <p style={{ textAlign: "center", fontSize: 14, color: "#6b7280" }}>
              {mode === "login" ? "New user? " : "Already have an account? "}
              <button onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); setSuccess(""); }}
                style={{ background: "none", border: "none", color: roleColor, fontWeight: 600, cursor: "pointer", fontSize: 14 }}>
                {mode === "login" ? "Register" : "Log in"}
              </button>
            </p>
          )}

          {mode === "login" && role === "ADMIN" && (
            <p style={{ textAlign: "center", fontSize: 13, color: "#9ca3af" }}>Demo: admin / admin123</p>
          )}
          {mode === "login" && role === "MEMBER" && (
            <p style={{ textAlign: "center", fontSize: 13, color: "#9ca3af" }}>Demo: alice / pass</p>
          )}
          {mode === "login" && role === "TRAINER" && (
            <p style={{ textAlign: "center", fontSize: 13, color: "#9ca3af" }}>Demo: bob / pass</p>
          )}
        </div>
      </div>
    </div>
  );
}
