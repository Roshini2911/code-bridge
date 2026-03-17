import { useApp } from "../../context/AppContext";

export default function MemberHome({ onNavigate }) {
  const { currentUser, getPlan, getTrainer, getMemberWorkoutPlan, getMemberAssignment } = useApp();
  const plan        = currentUser?.subscription ? getPlan(currentUser.subscription) : null;
  const assignment  = getMemberAssignment(currentUser?.id);
  const trainer     = assignment ? getTrainer(assignment.trainerId) : null;
  const workoutPlan = getMemberWorkoutPlan(currentUser?.id);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>{greeting}, {currentUser?.username}! 👋</h1>
          <p>Here's your fitness overview for today.</p>
        </div>
        {!plan && (
          <button className="btn btn-primary" onClick={() => onNavigate("subscription")}>
            💳 Subscribe Now
          </button>
        )}
      </div>

      {/* Status Banner - no subscription */}
      {!plan && (
        <div style={{ background:"#fffbeb", border:"1px solid #fcd34d", borderRadius:12, padding:"16px 20px", marginBottom:24, display:"flex", alignItems:"center", gap:14 }}>
          <span style={{ fontSize:24 }}>⚠️</span>
          <div>
            <div style={{ fontWeight:700, color:"#92400e", fontSize:15 }}>No active subscription</div>
            <div style={{ fontSize:13, color:"#b45309" }}>Subscribe to a plan to unlock trainers, workout plans, and full gym access.</div>
          </div>
          <button className="btn btn-sm" onClick={() => onNavigate("subscription")}
            style={{ marginLeft:"auto", background:"#f59e0b", color:"white", border:"none" }}>
            View Plans →
          </button>
        </div>
      )}

      {/* Status Cards */}
      <div className="grid-3" style={{ marginBottom:24 }}>
        {/* Subscription */}
        <div className="stat-card" style={{ borderTop:"3px solid #2563eb" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
            <div style={{ width:42, height:42, background:"#eff6ff", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>💳</div>
            {plan && <span className="badge badge-blue">{plan.duration}mo</span>}
          </div>
          <div className="stat-value" style={{ fontSize:20 }}>{plan ? plan.name : "None"}</div>
          <div className="stat-label">Subscription Plan</div>
          {plan ? (
            <div style={{ fontSize:12, color:"#9ca3af", marginTop:6 }}>₹{plan.price}/month</div>
          ) : (
            <button className="btn btn-sm btn-outline" style={{ marginTop:10 }} onClick={() => onNavigate("subscription")}>
              Subscribe →
            </button>
          )}
        </div>

        {/* Trainer */}
        <div className="stat-card" style={{ borderTop:"3px solid #0891b2" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
            <div style={{ width:42, height:42, background:"#ecfeff", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>🏋️</div>
            {trainer && <span className="badge badge-cyan">Assigned</span>}
          </div>
          <div className="stat-value" style={{ fontSize:20 }}>{trainer ? trainer.username : "Not Assigned"}</div>
          <div className="stat-label">Personal Trainer</div>
          {trainer ? (
            <div style={{ fontSize:12, color:"#9ca3af", marginTop:6 }}>{trainer.specialty || "General Fitness"}</div>
          ) : (
            <div style={{ fontSize:12, color:"#9ca3af", marginTop:6 }}>Contact admin for assignment</div>
          )}
        </div>

        {/* Workout Plan */}
        <div className="stat-card" style={{ borderTop:"3px solid #10b981" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
            <div style={{ width:42, height:42, background:"#f0fdf4", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>📋</div>
            {workoutPlan && <span className={`badge badge-${workoutPlan.difficulty==="Hard"?"red":workoutPlan.difficulty==="Medium"?"yellow":"green"}`}>{workoutPlan.difficulty}</span>}
          </div>
          <div className="stat-value" style={{ fontSize:16, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{workoutPlan ? workoutPlan.title : "None"}</div>
          <div className="stat-label">Workout Plan</div>
          {workoutPlan ? (
            <div style={{ fontSize:12, color:"#9ca3af", marginTop:6 }}>Created {workoutPlan.createdAt}</div>
          ) : (
            <div style={{ fontSize:12, color:"#9ca3af", marginTop:6 }}>Awaiting trainer assignment</div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card" style={{ marginBottom:20 }}>
        <div className="section-title">Quick Actions</div>
        <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
          <button className="btn btn-outline" onClick={() => onNavigate("subscription")}>💳 Manage Subscription</button>
          <button className="btn btn-outline" style={{ color:"#0891b2", borderColor:"#a5f3fc", background:"transparent" }} onClick={() => onNavigate("trainers")}>🏋️ Browse Trainers</button>
          <button className="btn btn-outline" style={{ color:"#10b981", borderColor:"#a7f3d0", background:"transparent" }} onClick={() => onNavigate("workout")}>📋 View Workout Plan</button>
        </div>
      </div>

      {/* Trainer card if assigned */}
      {trainer && (
        <div className="card">
          <div className="section-title">Your Trainer</div>
          <div style={{ display:"flex", alignItems:"center", gap:16 }}>
            <div style={{ width:54, height:54, borderRadius:"50%", background:"#ecfeff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26 }}>{trainer.photo}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:700, fontSize:16, color:"#111827" }}>{trainer.username}</div>
              <div style={{ fontSize:13, color:"#0891b2", fontWeight:600 }}>{trainer.specialty}</div>
              <div style={{ fontSize:13, color:"#6b7280", marginTop:4 }}>{trainer.bio}</div>
            </div>
            <div style={{ textAlign:"right" }}>
              <span className="badge badge-green">Available</span>
              <div style={{ fontSize:12, color:"#9ca3af", marginTop:6 }}>⭐ {trainer.experience}y experience</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}