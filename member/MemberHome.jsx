import { useApp } from "../../context/AppContext";

export default function MemberHome({ onNavigate }) {
  const { currentUser, getPlan, getTrainer, getMemberWorkoutPlan, getMemberAssignment } = useApp();
  const plan = currentUser?.subscription ? getPlan(currentUser.subscription) : null;
  const assignment = getMemberAssignment(currentUser?.id);
  const trainer = assignment ? getTrainer(assignment.trainerId) : null;
  const workoutPlan = getMemberWorkoutPlan(currentUser?.id);

  return (
    <div>
      <div className="page-header">
        <h1>Welcome back, {currentUser?.username}! 👋</h1>
        <p>Here's your fitness overview for today.</p>
      </div>

      {/* Status cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 32 }}>
        <div className="stat-card" style={{ borderTop: "4px solid #2563eb" }}>
          <div className="stat-icon">💳</div>
          <div className="stat-value" style={{ fontSize: 22 }}>{plan ? plan.name : "None"}</div>
          <div className="stat-label">Active Subscription</div>
          {!plan && <button onClick={() => onNavigate("subscription")} style={{ marginTop: 10, fontSize: 13, color: "#2563eb", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>Subscribe now →</button>}
        </div>
        <div className="stat-card" style={{ borderTop: "4px solid #0891b2" }}>
          <div className="stat-icon">🏋️</div>
          <div className="stat-value" style={{ fontSize: 22 }}>{trainer ? trainer.username : "None"}</div>
          <div className="stat-label">Assigned Trainer</div>
          {trainer && <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 4 }}>{trainer.specialty}</div>}
        </div>
        <div className="stat-card" style={{ borderTop: "4px solid #10b981" }}>
          <div className="stat-icon">📋</div>
          <div className="stat-value" style={{ fontSize: 22 }}>{workoutPlan ? workoutPlan.title : "None"}</div>
          <div className="stat-label">Workout Plan</div>
          {workoutPlan && <span className={`badge badge-${workoutPlan.difficulty === "Hard" ? "yellow" : "green"}`} style={{ marginTop: 8, display: "inline-block" }}>{workoutPlan.difficulty}</span>}
        </div>
      </div>

      {/* Quick links */}
      <div className="card">
        <h3 style={{ marginBottom: 18, fontSize: 18 }}>Quick Actions</h3>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <button onClick={() => onNavigate("subscription")} style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 20px", background: "#eff6ff", color: "#2563eb", border: "1.5px solid #bfdbfe", borderRadius: 12, fontFamily: "'Outfit',sans-serif", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>💳 Manage Subscription</button>
          <button onClick={() => onNavigate("trainers")} style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 20px", background: "#ecfeff", color: "#0891b2", border: "1.5px solid #a5f3fc", borderRadius: 12, fontFamily: "'Outfit',sans-serif", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>🏋️ Browse Trainers</button>
          <button onClick={() => onNavigate("workout")} style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 20px", background: "#f0fdf4", color: "#10b981", border: "1.5px solid #a7f3d0", borderRadius: 12, fontFamily: "'Outfit',sans-serif", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>📋 View Workout Plan</button>
        </div>
      </div>
    </div>
  );
}
