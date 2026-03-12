import { useApp } from "../../context/AppContext";

export default function TrainerHome({ onNavigate }) {
  const { currentUser, getTrainerAssignments, members, getTrainerWorkoutPlans } = useApp();
  const myAssignments = getTrainerAssignments(currentUser?.id);
  const myPlans = getTrainerWorkoutPlans(currentUser?.id);

  return (
    <div>
      <div className="page-header">
        <h1>Trainer Dashboard</h1>
        <p>Manage your members and workout programmes.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, marginBottom: 32 }}>
        {[
          { icon: "👥", label: "Assigned Members", value: myAssignments.length, color: "#0891b2" },
          { icon: "📋", label: "Workout Plans", value: myPlans.length, color: "#10b981" },
          { icon: "✅", label: "Availability", value: currentUser?.available ? "Available" : "Unavailable", color: currentUser?.available ? "#10b981" : "#ef4444" },
        ].map(s => (
          <div key={s.label} className="stat-card" style={{ borderTop: `4px solid ${s.color}` }}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-value" style={{ fontSize: 24 }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Assigned members */}
        <div className="card">
          <h3 style={{ marginBottom: 18 }}>My Members</h3>
          {myAssignments.length === 0 ? (
            <div style={{ textAlign: "center", padding: 32, color: "#9ca3af" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>👥</div>
              No members assigned yet.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {myAssignments.map(a => {
                const member = members.find(m => m.id === a.memberId);
                const hasPlan = myPlans.find(p => p.memberId === a.memberId);
                return member ? (
                  <div key={a.memberId} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: "#f9fafb", borderRadius: 10 }}>
                    <div>
                      <div style={{ fontWeight: 600, color: "#111827", fontSize: 14 }}>{member.username}</div>
                      <div style={{ fontSize: 12, color: "#9ca3af" }}>Since {a.date}</div>
                    </div>
                    {hasPlan
                      ? <span className="badge badge-green">Plan Created</span>
                      : <button onClick={() => onNavigate("create-workout")} style={{ fontSize: 12, color: "#2563eb", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>Create Plan →</button>
                    }
                  </div>
                ) : null;
              })}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card" style={{ cursor: "pointer" }} onClick={() => onNavigate("trainer-profile")}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "#ecfeff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>👤</div>
              <div>
                <div style={{ fontWeight: 700, color: "#111827" }}>Edit My Profile</div>
                <div style={{ fontSize: 13, color: "#9ca3af" }}>Update specialty & availability</div>
              </div>
              <div style={{ marginLeft: "auto" }}>→</div>
            </div>
          </div>
          <div className="card" style={{ cursor: "pointer" }} onClick={() => onNavigate("create-workout")}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>✏️</div>
              <div>
                <div style={{ fontWeight: 700, color: "#111827" }}>Create Workout Plan</div>
                <div style={{ fontSize: 13, color: "#9ca3af" }}>Build a plan for an assigned member</div>
              </div>
              <div style={{ marginLeft: "auto" }}>→</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
