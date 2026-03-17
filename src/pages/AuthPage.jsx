import { useState } from "react";
import { useApp } from "../context/AppContext";

const ROLE_CFG = {
  MEMBER:  { label:"Member",  icon:"🧑‍💪", color:"#2563eb", bg:"#eff6ff", border:"#bfdbfe" },
  TRAINER: { label:"Trainer", icon:"🏋️",  color:"#0891b2", bg:"#ecfeff", border:"#a5f3fc" },
  ADMIN:   { label:"Admin",   icon:"🛡️",  color:"#7c3aed", bg:"#f5f3ff", border:"#ddd6fe" },
};

export default function AuthPage({ role, onNavigate, onLoginSuccess }) {
  const { login, register } = useApp();
  const cfg = ROLE_CFG[role] || ROLE_CFG.MEMBER;
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ username:"", password:"", confirmPassword:"", email:"" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    setError(""); setSuccess("");
    if (!form.username.trim()) { setError("Username is required."); return; }
    if (!form.password)        { setError("Password is required."); return; }
    if (mode === "register") {
      if (form.password.length < 4)                  { setError("Password must be at least 4 characters."); return; }
      if (form.password !== form.confirmPassword)     { setError("Passwords do not match."); return; }
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 400));
    if (mode === "login") {
      const res = login(form.username, form.password, role);
      if (res.success) onLoginSuccess();
      else { setError(res.error); setLoading(false); }
    } else {
      register(form, role);
      setSuccess("Account created! You can now sign in.");
      setMode("login");
      setForm(p => ({ ...p, password:"", confirmPassword:"" }));
      setLoading(false);
    }
  };

  const inputStyle = (focused) => ({
    width:"100%", padding:"11px 13px", border:`1.5px solid ${focused?"#2563eb":"#e5e7eb"}`,
    borderRadius:10, fontSize:14, color:"#111827", background:"white",
    outline:"none", fontFamily:"'Outfit',sans-serif",
    boxShadow: focused ? "0 0 0 3px rgba(37,99,235,0.10)" : "none",
    transition:"all 0.18s",
  });

  const [focused, setFocused] = useState("");

  return (
    <div style={{ minHeight:"100vh", background:"#f3f4f6", display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
      <div style={{ width:"100%", maxWidth:420 }}>

        {/* Back */}
        <button onClick={() => onNavigate("role-select")} style={{ background:"none", border:"none", cursor:"pointer", color:"#6b7280", fontSize:14, marginBottom:20, display:"flex", alignItems:"center", gap:5, fontFamily:"'Outfit',sans-serif" }}>← Back</button>

        {/* Card */}
        <div style={{ background:"white", borderRadius:20, padding:"32px 28px", boxShadow:"0 4px 20px rgba(0,0,0,0.08)", border:"1px solid #e5e7eb" }}>

          {/* Role badge */}
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:22 }}>
            <div style={{ width:48, height:48, borderRadius:14, background:cfg.bg, border:`1px solid ${cfg.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>{cfg.icon}</div>
            <div>
              <div style={{ fontSize:11, fontWeight:700, color:cfg.color, textTransform:"uppercase", letterSpacing:"1px" }}>{cfg.label}</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, color:"#111827", fontWeight:700 }}>
                {mode === "login" ? "Welcome back" : "Create account"}
              </div>
            </div>
          </div>

          <p style={{ fontSize:13, color:"#9ca3af", marginBottom:24 }}>
            {mode === "login" ? `Sign in to your GymFlow ${cfg.label.toLowerCase()} account.` : `Join GymFlow as a ${cfg.label.toLowerCase()}.`}
          </p>

          {/* Alerts */}
          {error   && <div style={{ background:"#fef2f2", border:"1px solid #fecaca", color:"#991b1b", padding:"10px 14px", borderRadius:10, fontSize:13, marginBottom:16, display:"flex", gap:8 }}>⚠️ {error}</div>}
          {success && <div style={{ background:"#f0fdf4", border:"1px solid #a7f3d0", color:"#065f46", padding:"10px 14px", borderRadius:10, fontSize:13, marginBottom:16, display:"flex", gap:8 }}>✅ {success}</div>}

          {/* Form */}
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <div>
              <label style={{ fontSize:13, fontWeight:600, color:"#374151", display:"block", marginBottom:5 }}>Username</label>
              <input name="username" value={form.username} onChange={handleChange} placeholder="Enter your username"
                style={inputStyle(focused==="username")} onFocus={() => setFocused("username")} onBlur={() => setFocused("")}
                onKeyDown={e => e.key==="Enter" && handleSubmit()} />
            </div>

            {mode === "register" && (
              <div>
                <label style={{ fontSize:13, fontWeight:600, color:"#374151", display:"block", marginBottom:5 }}>Email <span style={{ color:"#9ca3af", fontWeight:400 }}>(optional)</span></label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com"
                  style={inputStyle(focused==="email")} onFocus={() => setFocused("email")} onBlur={() => setFocused("")} />
              </div>
            )}

            <div>
              <label style={{ fontSize:13, fontWeight:600, color:"#374151", display:"block", marginBottom:5 }}>Password</label>
              <div style={{ position:"relative" }}>
                <input name="password" type={showPwd?"text":"password"} value={form.password} onChange={handleChange} placeholder="Enter your password"
                  style={{ ...inputStyle(focused==="password"), paddingRight:44 }}
                  onFocus={() => setFocused("password")} onBlur={() => setFocused("")}
                  onKeyDown={e => e.key==="Enter" && handleSubmit()} />
                <button type="button" onClick={() => setShowPwd(p => !p)}
                  style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", fontSize:16, color:"#9ca3af" }}>
                  {showPwd ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {mode === "register" && (
              <div>
                <label style={{ fontSize:13, fontWeight:600, color:"#374151", display:"block", marginBottom:5 }}>Confirm Password</label>
                <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Repeat your password"
                  style={inputStyle(focused==="confirm")} onFocus={() => setFocused("confirm")} onBlur={() => setFocused("")} />
              </div>
            )}
          </div>

          {/* Submit */}
          <button onClick={handleSubmit} disabled={loading}
            style={{ width:"100%", padding:"12px", marginTop:20,
              background:loading?"#e5e7eb":`linear-gradient(135deg,${cfg.color},${cfg.color}dd)`,
              color:loading?"#9ca3af":"white", border:"none", borderRadius:12,
              fontFamily:"'Outfit',sans-serif", fontSize:15, fontWeight:600,
              cursor:loading?"not-allowed":"pointer", transition:"all 0.2s",
              boxShadow:loading?"none":`0 2px 8px ${cfg.color}44` }}>
            {loading ? "Please wait..." : mode==="login" ? `Sign In as ${cfg.label}` : "Create Account"}
          </button>

          {/* Switch mode */}
          {(role === "MEMBER" || role === "TRAINER") && (
            <p style={{ textAlign:"center", fontSize:13, color:"#9ca3af", marginTop:18 }}>
              {mode==="login" ? "Don't have an account?" : "Already have an account?"}{" "}
              <button onClick={() => { setMode(mode==="login"?"register":"login"); setError(""); setSuccess(""); }}
                style={{ background:"none", border:"none", color:cfg.color, fontWeight:600, cursor:"pointer", fontSize:13, fontFamily:"'Outfit',sans-serif" }}>
                {mode==="login" ? "Register" : "Sign in"}
              </button>
            </p>
          )}

          {/* Demo credentials */}
          <div style={{ marginTop:18, padding:"10px 14px", background:"#f9fafb", borderRadius:10, border:"1px solid #e5e7eb" }}>
            <div style={{ fontSize:11, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4 }}>Demo Credentials</div>
            <div style={{ fontSize:12, color:"#6b7280" }}>
              {role==="MEMBER"  && "Username: alice · Password: pass"}
              {role==="TRAINER" && "Username: bob · Password: pass"}
              {role==="ADMIN"   && "Username: admin · Password: admin123"}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}