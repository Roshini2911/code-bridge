import { useApp } from "../../context/AppContext";

export default function ReportsPage() {
  const { members, trainers, assignments, subscriptionPlans, workoutPlans } = useApp();
  const subscribedMembers = members.filter(m => m.subscription);

  const planBreakdown = subscriptionPlans.map(p => ({
    ...p,
    count: members.filter(m => m.subscription === p.id).length,
    revenue: members.filter(m => m.subscription === p.id).length * p.price
  }));

  const totalRevenue = planBreakdown.reduce((sum, p) => sum + p.revenue, 0);

  return (
    <div>
      <div className="page-header">
        <h1>Platform Reports</h1>
        <p>Revenue, subscription, and activity summaries.</p>
      </div>

      {/* KPI row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18, marginBottom: 32 }}>
        {[
          { icon: "💰", label: "Monthly Revenue", value: `₹${totalRevenue}`, color: "#10b981" },
          { icon: "👥", label: "Active Members", value: subscribedMembers.length, color: "#2563eb" },
          { icon: "🏋️", label: "Active Trainers", value: trainers.filter(t => t.available).length, color: "#0891b2" },
          { icon: "📋", label: "Workout Plans", value: workoutPlans.length, color: "#7c3aed" },
        ].map(s => (
          <div key={s.label} className="stat-card" style={{ borderTop: `4px solid ${s.color}` }}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Subscription breakdown */}
        <div className="card">
          <h3 style={{ marginBottom: 20 }}>Subscription Breakdown</h3>
          {planBreakdown.map(p => (
            <div key={p.id} style={{ marginBottom: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontWeight: 600, color: "#374151", fontSize: 15 }}>{p.name}</span>
                <span style={{ fontSize: 14, color: "#6b7280" }}>{p.count} members · ₹{p.revenue}</span>
              </div>
              <div style={{ background: "#f3f4f6", borderRadius: 99, height: 8, overflow: "hidden" }}>
                <div style={{
                  height: "100%", borderRadius: 99,
                  background: "linear-gradient(90deg, #2563eb, #0ea5e9)",
                  width: `${subscribedMembers.length > 0 ? (p.count / subscribedMembers.length) * 100 : 0}%`,
                  transition: "width 0.5s ease"
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* Trainer workload */}
        <div className="card">
          <h3 style={{ marginBottom: 20 }}>Trainer Workload</h3>
          {trainers.map(t => {
            const assignedCount = assignments.filter(a => a.trainerId === t.id).length;
            return (
              <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: "1px solid #f3f4f6" }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: "linear-gradient(135deg, #eff6ff, #e0f2fe)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18
                }}>{t.photo}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "#111827" }}>{t.username}</div>
                  <div style={{ fontSize: 12, color: "#9ca3af" }}>{t.specialty}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 700, color: "#2563eb" }}>{assignedCount}</div>
                  <div style={{ fontSize: 11, color: "#9ca3af" }}>members</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
