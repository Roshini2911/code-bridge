import { useApp } from "../../context/AppContext";

export default function AdminHome({ onNavigate }) {
  const { members, trainers, subscriptionPlans, assignments, workoutPlans } = useApp();
  const subscribedMembers = members.filter(m => m.subscription);

  return (
    <div>
      <div className="page-header">
        <h1>Admin Dashboard</h1>
        <p>Platform overview and management controls.</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18, marginBottom: 32 }}>
        {[
          { icon: "👥", label: "Total Members", value: members.length, color: "#2563eb" },
          { icon: "🏋️", label: "Total Trainers", value: trainers.length, color: "#0891b2" },
          { icon: "💳", label: "Subscribed", value: subscribedMembers.length, color: "#7c3aed" },
          { icon: "🔗", label: "Assignments", value: assignments.length, color: "#10b981" },
        ].map(s => (
          <div key={s.label} className="stat-card" style={{ borderTop: `4px solid ${s.color}` }}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Members table */}
        <div className="card">
          <h3 style={{ marginBottom: 18 }}>All Members</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                {["Username", "Subscription", "Trainer"].map(h => (
                  <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", border: "none" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {members.map(m => {
                const assignment = assignments.find(a => a.memberId === m.id);
                return (
                  <tr key={m.id} style={{ borderTop: "1px solid #f3f4f6" }}>
                    <td style={{ padding: "12px 12px", fontSize: 14, fontWeight: 600, color: "#111827" }}>{m.username}</td>
                    <td style={{ padding: "12px 12px" }}>
                      {m.subscription
                        ? <span className="badge badge-green">{subscriptionPlans.find(p => p.id === m.subscription)?.name}</span>
                        : <span className="badge badge-gray">None</span>}
                    </td>
                    <td style={{ padding: "12px 12px", fontSize: 14, color: "#6b7280" }}>
                      {assignment ? `#${assignment.trainerId}` : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Quick actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div className="card" style={{ cursor: "pointer" }} onClick={() => onNavigate("assign-trainer")}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>🔗</div>
              <div>
                <div style={{ fontWeight: 700, color: "#111827", marginBottom: 2 }}>Assign Trainer to Member</div>
                <div style={{ fontSize: 13, color: "#9ca3af" }}>Pair members with their personal trainer</div>
              </div>
              <div style={{ marginLeft: "auto", color: "#9ca3af" }}>→</div>
            </div>
          </div>
          <div className="card" style={{ cursor: "pointer" }} onClick={() => onNavigate("reports")}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: "#f5f3ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>📊</div>
              <div>
                <div style={{ fontWeight: 700, color: "#111827", marginBottom: 2 }}>View Reports</div>
                <div style={{ fontSize: 13, color: "#9ca3af" }}>Revenue summaries and attendance stats</div>
              </div>
              <div style={{ marginLeft: "auto", color: "#9ca3af" }}>→</div>
            </div>
          </div>
          <div className="card">
            <h4 style={{ marginBottom: 14, fontSize: 14, color: "#374151" }}>Workout Plans Created</h4>
            <div style={{ fontSize: 40, fontWeight: 800, color: "#10b981" }}>{workoutPlans.length}</div>
            <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 4 }}>plans assigned to members</div>
          </div>
        </div>
      </div>
    </div>
  );
}
