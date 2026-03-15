import { useState } from "react";
import { useApp } from "../../context/AppContext";

const EMOJIS = ["🏋️","💪","🧘","🏃","⚽","🥊","🚴","🤸","🏊","🎯"];

export default function TrainerProfilePage() {
  const { currentUser, updateTrainerProfile } = useApp();
  const [form, setForm] = useState({
    specialty:  currentUser?.specialty  || "",
    bio:        currentUser?.bio        || "",
    experience: currentUser?.experience || 0,
    available:  currentUser?.available  ?? true,
    photo:      currentUser?.photo      || "🏋️",
  });
  const [saved, setSaved] = useState(false);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(p => ({ ...p, [name]: type==="checkbox" ? checked : value }));
  };

  const handleSave = () => {
    updateTrainerProfile(currentUser.id, form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div className="page-header">
        <div><h1>My Profile</h1><p>This information is visible to members browsing trainers.</p></div>
        <button className="btn btn-primary" onClick={handleSave}>Save Profile</button>
      </div>

      {saved && <div className="alert alert-success">✅ Profile updated successfully! Members can now see your updated info.</div>}

      <div className="grid-2">
        {/* Edit Form */}
        <div className="card">
          <div className="section-title">Profile Details</div>

          {/* Emoji picker */}
          <div style={{ marginBottom:18 }}>
            <label style={{ fontSize:13, fontWeight:600, color:"#374151", display:"block", marginBottom:10 }}>Profile Icon</label>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {EMOJIS.map(e => (
                <button key={e} onClick={() => setForm(p => ({ ...p, photo:e }))}
                  style={{ width:42, height:42, borderRadius:10, fontSize:20, cursor:"pointer",
                    background:form.photo===e?"#eff6ff":"#f9fafb",
                    border:form.photo===e?"2px solid #2563eb":"1.5px solid #e5e7eb",
                    transition:"all 0.15s" }}>{e}</button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label>Specialty</label>
            <input name="specialty" value={form.specialty} onChange={handleChange} placeholder="e.g. Strength & Conditioning" />
          </div>

          <div className="input-group">
            <label>Bio</label>
            <textarea name="bio" value={form.bio} onChange={handleChange} rows={4}
              placeholder="Tell members about your background and training approach..."
              style={{ padding:"10px 13px", border:"1.5px solid #e5e7eb", borderRadius:12, fontFamily:"'Outfit',sans-serif", fontSize:14, resize:"vertical", outline:"none", transition:"border-color 0.18s" }}
              onFocus={e => e.target.style.borderColor="#2563eb"}
              onBlur={e => e.target.style.borderColor="#e5e7eb"} />
          </div>

          <div className="input-group">
            <label>Years of Experience</label>
            <input name="experience" type="number" value={form.experience} onChange={handleChange} min={0} max={50} />
          </div>

          {/* Availability toggle */}
          <div style={{ background:"#f9fafb", borderRadius:12, padding:"14px 16px", border:"1px solid #e5e7eb" }}>
            <label style={{ display:"flex", alignItems:"center", justifyContent:"space-between", cursor:"pointer" }}>
              <div>
                <div style={{ fontWeight:600, fontSize:14, color:"#111827" }}>Available for New Members</div>
                <div style={{ fontSize:12, color:"#9ca3af", marginTop:2 }}>Toggle your availability for assignment by admin</div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <span className={`badge ${form.available?"badge-green":"badge-gray"}`}>{form.available?"Available":"Unavailable"}</span>
                <input type="checkbox" name="available" checked={form.available} onChange={handleChange}
                  style={{ width:18, height:18, accentColor:"#2563eb", cursor:"pointer" }} />
              </div>
            </label>
          </div>
        </div>

        {/* Preview */}
        <div>
          <div style={{ fontSize:12, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:12 }}>Preview — as members see you</div>
          <div className="card" style={{ border:"2px dashed #e5e7eb" }}>
            <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:16 }}>
              <div style={{ width:58, height:58, borderRadius:"50%", background:"#ecfeff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, border:"2px solid #a5f3fc" }}>{form.photo}</div>
              <div>
                <div style={{ fontWeight:700, fontSize:17, color:"#111827" }}>{currentUser?.username}</div>
                <div style={{ fontSize:13, color:"#0891b2", fontWeight:600 }}>{form.specialty || "No specialty set"}</div>
              </div>
            </div>
            <p style={{ fontSize:13, color:"#6b7280", lineHeight:1.6, marginBottom:14 }}>{form.bio || "No bio yet."}</p>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              <span className="badge badge-cyan">⭐ {form.experience}y exp</span>
              <span className={`badge ${form.available?"badge-green":"badge-gray"}`}>{form.available?"Available":"Unavailable"}</span>
            </div>
          </div>

          <button className="btn btn-primary btn-full btn-lg" onClick={handleSave} style={{ marginTop:16 }}>
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}