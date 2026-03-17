import { useApp } from "../../context/AppContext";

export default function AdminHome({ onNavigate }) {
  const { members, trainers, subscriptionPlans, assignments, workoutPlans } = useApp();
  const subscribedMembers = members.filter(m => m.subscription);
  const today = new Date().toLocaleDateString("en-IN", { weekday:"long", day:"numeric", month:"long", year:"numeric" });

  const stats = [
    { icon:"👥", label:"Total Members",    value:members.length,            color:"#2563eb", bg:"#eff6ff", change:"+2 this week" },
    { icon:"🏋️", label:"Total Trainers",   value:trainers.length,           color:"#0891b2", bg:"#ecfeff", change:"All available" },
    { icon:"💳", label:"Subscribed",       value:subscribedMembers.length,  color:"#7c3aed", bg:"#f5f3ff", change:`${Math.round(subscribedMembers.length/Math.max(members.length,1)*100)}% of members` },
    { icon:"🔗", label:"Assignments",      value:assignments.length,        color:"#10b981", bg:"#f0fdf4", change:`${workoutPlans.length} plans created` },
  ];

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>{today} · Platform overview and management controls</p>
        </div>
        <button onClick={() => onNavigate("assign-trainer")} className="btn btn-primary">
          🔗 Assign Trainer
        </button>
      </div>

      {/* Stats */}
      <div className="grid-4" style={{ marginBottom:28 }}>
        {stats.map(s => (
          <div key={s.label} className="stat-card" style={{ borderTop:`3px solid ${s.color}` }}>
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:12 }}>
              <div style={{ width:42, height:42, background:s.bg, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:19 }}>{s.icon}</div>
            </div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div style={{ fontSize:12, color:"#9ca3af", marginTop:6 }}>{s.change}</div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        {/* Members Table */}
        <div className="card">
          <div className="section-title">
            All Members
            <span className="badge badge-gray">{members.length} total</span>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Subscription</th>
                  <th>Trainer</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {members.map(m => {
                  const assignment = assignments.find(a => a.memberId === m.id);
                  const plan = subscriptionPlans.find(p => p.id === m.subscription);
                  const trainer = assignment ? `#${assignment.trainerId}` : null;
                  return (
                    <tr key={m.id}>
                      <td>
                        <div style={{ display:"flex", alignItems:"center", gap:9 }}>
                          <div style={{ width:32, height:32, borderRadius:"50%", background:"#eff6ff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:"#2563eb" }}>{m.username.charAt(0).toUpperCase()}</div>
                          <strong>{m.username}</strong>
                        </div>
                      </td>
                      <td>{plan ? <span className="badge badge-green">{plan.name}</span> : <span className="badge badge-gray">No Plan</span>}</td>
                      <td style={{ color:"#6b7280" }}>{trainer || <span style={{ color:"#d1d5db" }}>—</span>}</td>
                      <td><span className={`badge ${m.subscription ? "badge-blue" : "badge-yellow"}`}>{m.subscription ? "Active" : "Inactive"}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {/* Assign Trainer */}
          <div className="card card-hover" onClick={() => onNavigate("assign-trainer")} style={{ cursor:"pointer" }}>
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <div style={{ width:48, height:48, borderRadius:14, background:"#eff6ff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>🔗</div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, color:"#111827", fontSize:15, marginBottom:3 }}>Assign Trainer to Member</div>
                <div style={{ fontSize:13, color:"#9ca3af" }}>Pair members with their personal trainer</div>
              </div>
              <span style={{ color:"#9ca3af", fontSize:18 }}>→</span>
            </div>
          </div>

          {/* Reports */}
          <div className="card card-hover" onClick={() => onNavigate("reports")} style={{ cursor:"pointer" }}>
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <div style={{ width:48, height:48, borderRadius:14, background:"#f5f3ff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>📊</div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, color:"#111827", fontSize:15, marginBottom:3 }}>View Reports</div>
                <div style={{ fontSize:13, color:"#9ca3af" }}>Revenue summaries and platform analytics</div>
              </div>
              <span style={{ color:"#9ca3af", fontSize:18 }}>→</span>
            </div>
          </div>

          {/* Trainers list */}
          <div className="card">
            <div className="section-title">Available Trainers</div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {trainers.map(t => {
                const count = assignments.filter(a => a.trainerId === t.id).length;
                return (
                  <div key={t.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:"1px solid #f3f4f6" }}>
                    <div style={{ width:36, height:36, borderRadius:"50%", background:"#ecfeff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{t.photo}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:600, fontSize:14, color:"#111827" }}>{t.username}</div>
                      <div style={{ fontSize:12, color:"#9ca3af" }}>{t.specialty || "General Fitness"}</div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontWeight:700, color:"#0891b2", fontSize:14 }}>{count}</div>
                      <div style={{ fontSize:11, color:"#9ca3af" }}>members</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}