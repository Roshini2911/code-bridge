import { useApp } from "../../context/AppContext";

export default function TrainerHome({ onNavigate }) {
  const { currentUser, getTrainerAssignments, members, getTrainerWorkoutPlans } = useApp();
  const myAssignments = getTrainerAssignments(currentUser?.id);
  const myPlans       = getTrainerWorkoutPlans(currentUser?.id);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Trainer Dashboard</h1>
          <p>Welcome back, {currentUser?.username}. Manage your members and workout programmes.</p>
        </div>
        <button className="btn btn-primary" onClick={() => onNavigate("create-workout")}>✏️ Create Plan</button>
      </div>

      {/* Stats */}
      <div className="grid-3" style={{ marginBottom:24 }}>
        {[
          { icon:"👥", label:"Assigned Members", value:myAssignments.length, color:"#0891b2", bg:"#ecfeff", sub:"Active assignments" },
          { icon:"📋", label:"Workout Plans",    value:myPlans.length,       color:"#10b981", bg:"#f0fdf4", sub:"Plans created" },
          { icon:"✅", label:"Availability",     value:currentUser?.available?"Available":"Unavailable", color:currentUser?.available?"#10b981":"#ef4444", bg:currentUser?.available?"#f0fdf4":"#fef2f2", sub:"Toggle in profile" },
        ].map(s => (
          <div key={s.label} className="stat-card" style={{ borderTop:`3px solid ${s.color}` }}>
            <div style={{ width:42, height:42, background:s.bg, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:19, marginBottom:12 }}>{s.icon}</div>
            <div className="stat-value" style={{ fontSize:22 }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div style={{ fontSize:12, color:"#9ca3af", marginTop:6 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        {/* Members */}
        <div className="card">
          <div className="section-title">My Members <span className="badge badge-cyan">{myAssignments.length}</span></div>
          {myAssignments.length === 0 ? (
            <div className="empty-state"><div className="empty-icon">👥</div><h3>No members assigned</h3><p>The admin will assign members to you soon.</p></div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
              {myAssignments.map(a => {
                const member  = members.find(m => m.id === a.memberId);
                const hasPlan = myPlans.find(p => p.memberId === a.memberId);
                if (!member) return null;
                return (
                  <div key={a.memberId} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 0", borderBottom:"1px solid #f3f4f6" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{ width:34, height:34, borderRadius:"50%", background:"#eff6ff", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:13, color:"#2563eb" }}>{member.username.charAt(0).toUpperCase()}</div>
                      <div>
                        <div style={{ fontWeight:600, fontSize:14, color:"#111827" }}>{member.username}</div>
                        <div style={{ fontSize:12, color:"#9ca3af" }}>Since {a.date}</div>
                      </div>
                    </div>
                    {hasPlan
                      ? <span className="badge badge-green">Plan ✓</span>
                      : <button className="btn btn-sm btn-outline" onClick={() => onNavigate("create-workout")}>Create Plan</button>
                    }
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div className="card card-hover" onClick={() => onNavigate("trainer-profile")}>
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <div style={{ width:46, height:46, borderRadius:12, background:"#ecfeff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>👤</div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, color:"#111827", fontSize:15, marginBottom:2 }}>Edit My Profile</div>
                <div style={{ fontSize:13, color:"#9ca3af" }}>Update specialty, bio & availability</div>
              </div>
              <span style={{ color:"#9ca3af" }}>→</span>
            </div>
          </div>
          <div className="card card-hover" onClick={() => onNavigate("create-workout")}>
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <div style={{ width:46, height:46, borderRadius:12, background:"#f0fdf4", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>✏️</div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, color:"#111827", fontSize:15, marginBottom:2 }}>Create Workout Plan</div>
                <div style={{ fontSize:13, color:"#9ca3af" }}>Build a plan for an assigned member</div>
              </div>
              <span style={{ color:"#9ca3af" }}>→</span>
            </div>
          </div>
          <div className="card card-hover" onClick={() => onNavigate("trainer-members")}>
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <div style={{ width:46, height:46, borderRadius:12, background:"#eff6ff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>👥</div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, color:"#111827", fontSize:15, marginBottom:2 }}>View All Members</div>
                <div style={{ fontSize:13, color:"#9ca3af" }}>See detailed member information</div>
              </div>
              <span style={{ color:"#9ca3af" }}>→</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}