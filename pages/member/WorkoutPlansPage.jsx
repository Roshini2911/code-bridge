import { useApp } from "../../context/AppContext";

export default function WorkoutPlansPage() {
  const { currentUser, getMemberWorkoutPlan, getTrainer } = useApp();
  const plan    = getMemberWorkoutPlan(currentUser?.id);
  const trainer = plan ? getTrainer(plan.trainerId) : null;

  if (!plan) return (
    <div>
      <div className="page-header"><div><h1>My Workout Plan</h1><p>Your personalised training programme.</p></div></div>
      <div className="card"><div className="empty-state">
        <div className="empty-icon">📋</div>
        <h3>No Workout Plan Yet</h3>
        <p>Once an admin assigns you a trainer and they create a plan, it will appear here.</p>
      </div></div>
    </div>
  );

  const diffMap = { Easy:{ color:"#10b981", bg:"#f0fdf4" }, Medium:{ color:"#f59e0b", bg:"#fffbeb" }, Hard:{ color:"#ef4444", bg:"#fef2f2" } };
  const diff = diffMap[plan.difficulty] || diffMap.Medium;

  return (
    <div>
      <div className="page-header"><div><h1>My Workout Plan</h1><p>Personalised by your trainer.</p></div></div>
      <div className="grid-2">
        <div className="card">
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:18 }}>
            <div>
              <h2 style={{ fontSize:22, color:"#111827", marginBottom:4 }}>{plan.title}</h2>
              <p style={{ fontSize:13, color:"#9ca3af" }}>Created on {plan.createdAt}</p>
            </div>
            <span style={{ background:diff.bg, color:diff.color, padding:"5px 13px", borderRadius:99, fontSize:12, fontWeight:700 }}>{plan.difficulty}</span>
          </div>
          <div className="divider" />
          <div style={{ background:"#f9fafb", borderRadius:12, padding:18 }}>
            <div style={{ fontSize:12, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:10 }}>Plan Description</div>
            <p style={{ color:"#374151", lineHeight:1.8, fontSize:14 }}>{plan.description}</p>
          </div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {trainer && (
            <div className="card">
              <div style={{ fontSize:12, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:14 }}>Your Trainer</div>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:48, height:48, borderRadius:"50%", background:"#ecfeff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>{trainer.photo}</div>
                <div>
                  <div style={{ fontWeight:700, color:"#111827", fontSize:15 }}>{trainer.username}</div>
                  <div style={{ fontSize:13, color:"#0891b2" }}>{trainer.specialty}</div>
                </div>
              </div>
            </div>
          )}
          <div className="card">
            <div style={{ fontSize:12, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:14 }}>Plan Details</div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:14 }}>
                <span style={{ color:"#6b7280" }}>Difficulty</span>
                <span style={{ fontWeight:600, color:diff.color }}>{plan.difficulty}</span>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:14 }}>
                <span style={{ color:"#6b7280" }}>Status</span>
                <span className="badge badge-green">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}