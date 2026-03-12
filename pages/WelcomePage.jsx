export default function WelcomePage({ onNavigate }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f0f7ff 0%, #e8f4fd 50%, #f5f0ff 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24,
      position: "relative", overflow: "hidden"
    }}>
      {/* Decorative blobs */}
      <div style={{ position: "absolute", top: -80, right: -80, width: 360, height: 360, borderRadius: "50%", background: "rgba(37,99,235,0.06)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -60, left: -60, width: 280, height: 280, borderRadius: "50%", background: "rgba(14,165,233,0.07)", pointerEvents: "none" }} />

      <div style={{ textAlign: "center", maxWidth: 520, position: "relative" }}>
        {/* Icon */}
        <div style={{
          width: 80, height: 80, borderRadius: "50%",
          background: "linear-gradient(135deg, #2563eb, #0ea5e9)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 36, margin: "0 auto 28px",
          boxShadow: "0 8px 32px rgba(37,99,235,0.25)"
        }}>🏟️</div>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 52, fontWeight: 700,
          color: "#111827", marginBottom: 8, lineHeight: 1.1
        }}>GymFlow</h1>

        <p style={{
          fontSize: 17, color: "#6b7280", marginBottom: 10,
          fontWeight: 500, letterSpacing: "0.03em", textTransform: "uppercase"
        }}>Gym & Fitness Center Management</p>

        <p style={{
          fontSize: 16, color: "#9ca3af", marginBottom: 44, lineHeight: 1.7, maxWidth: 400, margin: "0 auto 44px"
        }}>
          Manage memberships, trainers, workout plans, and fitness classes — all in one beautiful platform.
        </p>

        <button
          onClick={() => onNavigate("role-select")}
          style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "16px 40px",
            background: "linear-gradient(135deg, #2563eb, #0ea5e9)",
            color: "white", border: "none", borderRadius: 14,
            fontFamily: "'Outfit', sans-serif", fontSize: 17, fontWeight: 600,
            cursor: "pointer", boxShadow: "0 4px 20px rgba(37,99,235,0.35)",
            transition: "all 0.2s"
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
          onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
        >
          Get Started →
        </button>

        {/* Feature pills */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 44, flexWrap: "wrap" }}>
          {["🏋️ Trainer Management", "💳 Subscriptions", "📋 Workout Plans", "📊 Reports"].map(f => (
            <span key={f} style={{
              padding: "6px 14px", background: "white",
              borderRadius: 99, fontSize: 13, color: "#4b5563",
              border: "1px solid #e5e7eb",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
            }}>{f}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
