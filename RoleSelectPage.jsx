export default function RoleSelectPage({ onNavigate }) {
  const roles = [
    { key: "member", label: "Member", icon: "🧑‍💪", desc: "Access your subscription, trainers, and workout plans.", color: "#2563eb", bg: "#eff6ff" },
    { key: "admin",  label: "Admin",  icon: "🛡️",  desc: "Manage the platform, assign trainers, and view reports.", color: "#7c3aed", bg: "#f5f3ff" },
    { key: "trainer",label: "Trainer",icon: "🏋️",  desc: "Manage your profile and create workout plans for members.", color: "#0891b2", bg: "#ecfeff" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f0f7ff 0%, #e8f4fd 50%, #f5f0ff 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24
    }}>
      <div style={{ maxWidth: 660, width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <button onClick={() => onNavigate("welcome")} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", fontSize: 14, marginBottom: 16 }}>← Back</button>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, color: "#111827", marginBottom: 8 }}>Who are you?</h1>
          <p style={{ color: "#9ca3af", fontSize: 16 }}>Select your role to continue</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          {roles.map(role => (
            <button
              key={role.key}
              onClick={() => onNavigate(`${role.key}-login`)}
              style={{
                background: "white", border: `2px solid #e5e7eb`, borderRadius: 18,
                padding: "32px 20px", cursor: "pointer", textAlign: "center",
                transition: "all 0.2s", display: "flex", flexDirection: "column",
                alignItems: "center", gap: 12
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = role.color;
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "#e5e7eb";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: role.bg, fontSize: 28,
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>{role.icon}</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 18, color: "#111827" }}>{role.label}</div>
              <div style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.5 }}>{role.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
