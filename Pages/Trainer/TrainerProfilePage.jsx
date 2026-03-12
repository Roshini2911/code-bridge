import { useState } from "react";
import { useApp } from "../../context/AppContext";

export default function TrainerProfilePage() {
  const { currentUser, updateTrainerProfile } = useApp();
  const [form, setForm] = useState({
    specialty: currentUser?.specialty || "",
    bio: currentUser?.bio || "",
    experience: currentUser?.experience || 0,
    available: currentUser?.available ?? true,
    photo: currentUser?.photo || "🏋️"
  });
  const [saved, setSaved] = useState(false);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSave = () => {
    updateTrainerProfile(currentUser.id, form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const emojis = ["🏋️", "💪", "🧘", "🏃", "⚽", "🥊", "🚴", "🤸"];

  return (
    <div>
      <div className="page-header">
        <h1>My Profile</h1>
        <p>This information is visible to members browsing trainers.</p>
      </div>

      {saved && <div className="alert alert-success">✅ Profile updated successfully! Members can now see your updated info.</div>}

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
        <div className="card">
          <h3 style={{ marginBottom: 22 }}>Profile Details</h3>

          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 10 }}>Profile Icon</label>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {emojis.map(e => (
                <button key={e} onClick={() => setForm(prev => ({ ...prev, photo: e }))}
                  style={{
                    width: 44, height: 44, borderRadius: 10, fontSize: 22, cursor: "pointer",
                    background: form.photo === e ? "#eff6ff" : "#f9fafb",
                    border: form.photo === e ? "2px solid #2563eb" : "1.5px solid #e5e7eb"
                  }}>{e}</button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label>Specialty</label>
            <input name="specialty" value={form.specialty} onChange={handleChange} placeholder="e.g. Strength & Conditioning" />
          </div>

          <div className="input-group">
            <label>Bio</label>
            <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Tell members about your background and approach..." rows={4} style={{ padding: "11px 16px", border: "1.5px solid #e5e7eb", borderRadius: 12, fontFamily: "'Outfit',sans-serif", fontSize: 15, resize: "vertical", outline: "none" }} />
          </div>

          <div className="input-group">
            <label>Years of Experience</label>
            <input name="experience" type="number" value={form.experience} onChange={handleChange} min={0} max={50} />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, padding: "14px 16px", background: "#f9fafb", borderRadius: 12 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", flex: 1 }}>
              <input type="checkbox" name="available" checked={form.available} onChange={handleChange}
                style={{ width: 18, height: 18, accentColor: "#2563eb" }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: "#111827" }}>Available for New Members</div>
                <div style={{ fontSize: 12, color: "#9ca3af" }}>Toggle your availability for assignment</div>
              </div>
            </label>
            <span className={`badge ${form.available ? "badge-green" : "badge-gray"}`}>
              {form.available ? "Available" : "Unavailable"}
            </span>
          </div>

          <button onClick={handleSave} style={{
            padding: "13px 28px",
            background: "linear-gradient(135deg, #0891b2, #0ea5e9)",
            color: "white", border: "none", borderRadius: 12,
            fontFamily: "'Outfit',sans-serif", fontSize: 15, fontWeight: 600, cursor: "pointer"
          }}>Save Profile</button>
        </div>

        {/* Preview card */}
        <div>
          <h4 style={{ marginBottom: 14, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.05em", color: "#9ca3af" }}>Preview (as members see you)</h4>
          <div className="card" style={{ border: "2px dashed #e5e7eb" }}>
            <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#ecfeff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 14 }}>{form.photo}</div>
            <div style={{ fontWeight: 700, fontSize: 18, color: "#111827", marginBottom: 4 }}>{currentUser?.username}</div>
            <div style={{ fontSize: 13, color: "#0891b2", fontWeight: 600, marginBottom: 8 }}>{form.specialty || "No specialty set"}</div>
            <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.5, marginBottom: 12 }}>{form.bio || "No bio yet."}</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span className="badge badge-blue">⭐ {form.experience}y exp</span>
              <span className={`badge ${form.available ? "badge-green" : "badge-gray"}`}>{form.available ? "Available" : "Unavailable"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
