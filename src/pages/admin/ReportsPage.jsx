import { useApp } from "../../context/AppContext";

export default function ReportsPage() {
  const { members, trainers, assignments, subscriptionPlans, workoutPlans } = useApp();
  const subscribedMembers = members.filter(m => m.subscription);
  const planBreakdown = subscriptionPlans.map(p => ({
    ...p,
    count:   members.filter(m => m.subscription === p.id).length,
    revenue: members.filter(m => m.subscription === p.id).length * p.price,
  }));
  const totalRevenue = planBreakdown.reduce((s, p) => s + p.revenue, 0);
  const PLAN_COLORS = ["#2563eb","#7c3aed","#0891b2"];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Platform Reports</h1>
          <p>Revenue, subscription, and activity overview</p>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid-4" style={{ marginBottom:28 }}>
        {[
          { icon:"💰", label:"Monthly Revenue",  value:`₹${totalRevenue.toLocaleString()}`, color:"#10b981", bg:"#f0fdf4", sub:`from ${subscribedMembers.length} subscribers` },
          { icon:"👥", label:"Active Members",   value:subscribedMembers.length,            color:"#2563eb", bg:"#eff6ff", sub:`${members.length - subscribedMembers.length} inactive` },
          { icon:"🏋️", label:"Active Trainers",  value:trainers.filter(t=>t.available).length, color:"#0891b2", bg:"#ecfeff", sub:"Available for assignment" },
          { icon:"📋", label:"Workout Plans",    value:workoutPlans.length,                 color:"#7c3aed", bg:"#f5f3ff", sub:`${assignments.length} assignments made` },
        ].map(s => (
          <div key={s.label} className="stat-card" style={{ borderTop:`3px solid ${s.color}` }}>
            <div style={{ width:42, height:42, background:s.bg, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:19, marginBottom:12 }}>{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div style={{ fontSize:12, color:"#9ca3af", marginTop:6 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        {/* Subscription Breakdown */}
        <div className="card">
          <div className="section-title">Subscription Breakdown</div>
          {planBreakdown.map((p,i) => {
            const pct = subscribedMembers.length > 0 ? (p.count/subscribedMembers.length)*100 : 0;
            return (
              <div key={p.id} style={{ marginBottom:20 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ width:10, height:10, borderRadius:"50%", background:PLAN_COLORS[i] }} />
                    <span style={{ fontWeight:600, color:"#111827", fontSize:14 }}>{p.name} Plan</span>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <span style={{ fontSize:14, fontWeight:700, color:PLAN_COLORS[i] }}>₹{p.revenue.toLocaleString()}</span>
                    <span style={{ fontSize:12, color:"#9ca3af", marginLeft:8 }}>{p.count} members</span>
                  </div>
                </div>
                <div style={{ background:"#f3f4f6", borderRadius:99, height:8, overflow:"hidden" }}>
                  <div style={{ height:"100%", borderRadius:99, background:PLAN_COLORS[i], width:`${pct}%`, transition:"width 0.5s ease" }} />
                </div>
                <div style={{ fontSize:11, color:"#9ca3af", marginTop:4 }}>₹{p.price}/month · {p.duration} month commitment</div>
              </div>
            );
          })}
          <div className="divider" />
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontWeight:700, color:"#111827", fontSize:15 }}>Total Revenue</span>
            <span style={{ fontWeight:800, color:"#10b981", fontSize:18 }}>₹{totalRevenue.toLocaleString()}</span>
          </div>
        </div>

        {/* Trainer Workload */}
        <div className="card">
          <div className="section-title">Trainer Workload</div>
          {trainers.length === 0 ? (
            <div className="empty-state"><div className="empty-icon">🏋️</div><p>No trainers registered yet.</p></div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
              {trainers.map(t => {
                const count = assignments.filter(a => a.trainerId === t.id).length;
                const max = 10;
                return (
                  <div key={t.id} style={{ padding:"14px 0", borderBottom:"1px solid #f3f4f6" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8 }}>
                      <div style={{ width:38, height:38, borderRadius:"50%", background:"#ecfeff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{t.photo}</div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontWeight:600, fontSize:14, color:"#111827" }}>{t.username}</div>
                        <div style={{ fontSize:12, color:"#9ca3af" }}>{t.specialty || "General Fitness"}</div>
                      </div>
                      <div style={{ textAlign:"right" }}>
                        <div style={{ fontWeight:700, color:"#0891b2", fontSize:15 }}>{count}</div>
                        <div style={{ fontSize:11, color:"#9ca3af" }}>members</div>
                      </div>
                    </div>
                    <div style={{ background:"#f3f4f6", borderRadius:99, height:5, overflow:"hidden" }}>
                      <div style={{ height:"100%", borderRadius:99, background:"#0891b2", width:`${Math.min((count/max)*100,100)}%`, transition:"width 0.5s" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}