import { useApp } from "../context/AppContext";

const navItems = {
  MEMBER: [
    { label: "Dashboard", icon: "🏠", page: "member-dashboard" },
    { label: "Subscription", icon: "💳", page: "subscription" },
    { label: "Browse Trainers", icon: "🏋️", page: "trainers" },
    { label: "Workout Plan", icon: "📋", page: "workout" },
  ],
  TRAINER: [
    { label: "Dashboard", icon: "🏠", page: "trainer-dashboard" },
    { label: "My Profile", icon: "👤", page: "trainer-profile" },
    { label: "Assigned Members", icon: "👥", page: "trainer-members" },
    { label: "Create Workout", icon: "✏️", page: "create-workout" },
  ],
  ADMIN: [
    { label: "Dashboard", icon: "🏠", page: "admin-dashboard" },
    { label: "Assign Trainer", icon: "🔗", page: "assign-trainer" },
    { label: "Reports", icon: "📊", page: "reports" },
  ]
};

export default function Sidebar({ currentPage, onNavigate }) {
  const { currentUser, logout } = useApp();
  const items = navItems[currentUser?.role] || [];

  return (
    <aside style={{
      width: 240,
      minHeight: "100vh",
      background: "white",
      borderRight: "1px solid #e5e7eb",
      display: "flex",
      flexDirection: "column",
      padding: "0 0 24px 0",
      position: "fixed",
      left: 0, top: 0,
      boxShadow: "2px 0 16px rgba(0,0,0,0.04)"
    }}>
      {/* Logo */}
      <div style={{ padding: "28px 24px 20px", borderBottom: "1px solid #f3f4f6" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 26 }}>🏟️</span>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "#1f2937" }}>GymFlow</span>
        </div>
        <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "linear-gradient(135deg, #2563eb, #0ea5e9)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", fontWeight: 700, fontSize: 14
          }}>
            {currentUser?.username?.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, color: "#1f2937" }}>{currentUser?.username}</div>
            <div style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em" }}>{currentUser?.role}</div>
          </div>
        </div>
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, padding: "16px 12px" }}>
        {items.map(item => (
          <button
            key={item.page}
            onClick={() => onNavigate(item.page)}
            style={{
              display: "flex", alignItems: "center", gap: 12,
              width: "100%", padding: "11px 14px",
              border: "none", borderRadius: 10, cursor: "pointer",
              fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 500,
              textAlign: "left", marginBottom: 4, transition: "all 0.15s",
              background: currentPage === item.page ? "#eff6ff" : "transparent",
              color: currentPage === item.page ? "#2563eb" : "#4b5563",
            }}
          >
            <span style={{ fontSize: 18 }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div style={{ padding: "0 12px" }}>
        <button
          onClick={logout}
          style={{
            display: "flex", alignItems: "center", gap: 12,
            width: "100%", padding: "11px 14px",
            border: "none", borderRadius: 10, cursor: "pointer",
            fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 500,
            background: "transparent", color: "#ef4444"
          }}
        >
          <span style={{ fontSize: 18 }}>🚪</span>
          Log Out
        </button>
      </div>
    </aside>
  );
}