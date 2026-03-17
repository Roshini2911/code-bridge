import { useApp } from "../../context/AppContext";

export default function TrainerMembersPage({ onNavigate }) {
  const { currentUser, getTrainerAssignments, members, getTrainerWorkoutPlans, subscriptionPlans } = useApp();
  const myAssignments = getTrainerAssignments(currentUser?.id);
  const myPlans       = getTrainerWorkoutPlans(currentUser?.id);

  return (
    <div>
      <div className="page-header">
        <div><h1>Assigned Members</h1><p>Members the admin has assigned to you.</p></div>
        <button className="btn btn-primary" onClick={() => onNavigate("create-workout")}>✏️ Create Plan</button>
      </div>

      {myAssignments.length === 0 ? (
        <div className="card"><div className="empty-state">
          <div className="empty-icon">👥</div>
          <h3>No Members Assigned Yet</h3>
          <p>The admin will assign members to you. You'll be able to create workout plans for them here.</p>
        </div></div>
      ) : (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(310px,1fr))", gap:18 }}>
          {myAssignments.map(a => {
            const member       = members.find(m => m.id === a.memberId);
            if (!member) return null;
            const plan         = myPlans.find(p => p.memberId === member.id);
            const subscription = member.subscription ? subscriptionPlans.find(p => p.id === member.subscription) : null;
            const diffMap      = { Easy:"badge-green", Medium:"badge-yellow", Hard:"badge-red" };
            return (
              <div key={member.id} className="card" style={{ border:plan?"1px solid #a7f3d0":"1px solid #e5e7eb" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <div style={{ width:44, height:44, borderRadius:"50%", background:"linear-gradient(135deg,#eff6ff,#dbeafe)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:17, color:"#2563eb" }}>{member.username.charAt(0).toUpperCase()}</div>
                    <div>
                      <div style={{ fontWeight:700, color:"#111827", fontSize:15 }}>{member.username}</div>
                      <div style={{ fontSize:12, color:"#9ca3af" }}>Assigned {a.date}</div>
                    </div>
                  </div>
                  {subscription ? <span className="badge badge-blue">{subscription.name}</span> : <span className="badge badge-gray">No Plan</span>}
                </div>
                <div style={{ background:"#f9fafb", borderRadius:10, padding:"12px 14px", marginBottom:14 }}>
                  <div style={{ fontSize:11, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:6 }}>Workout Plan</div>
                  {plan ? (
                    <div>
                      <div style={{ fontWeight:600, color:"#111827", fontSize:14, marginBottom:4 }}>{plan.title}</div>
                      <span className={`badge ${diffMap[plan.difficulty]||"badge-gray"}`}>{plan.difficulty}</span>
                    </div>
                  ) : <div style={{ color:"#9ca3af", fontSize:13 }}>No plan assigned yet</div>}
                </div>
                {!plan && (
                  <button className="btn btn-primary btn-full btn-sm" onClick={() => onNavigate("create-workout")}>
                    ✏️ Create Workout Plan
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}