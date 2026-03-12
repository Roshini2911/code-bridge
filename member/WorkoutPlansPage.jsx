import { useApp } from "../../context/AppContext";

export default function WorkoutPlansPage() {
  const { currentUser, getMemberWorkoutPlan, getTrainer } = useApp();
  const plan = getMemberWorkoutPlan(currentUser?.id);
  const trainer = plan ? getTrainer(plan.trainerId) : null;

  if (!plan) {
    return (
      <div>
        <div className="page-header">
          <h1>My Workout Plan</h1>
          <p>Your personalised training programme.</p>
        </div>
        <div className="card" style={{ textAlign: "center", padding: 64 }}>
          <div style={{ fontSize: 52, marginBottom: 16 }}>📋</div>
          <h3 style={{ color: "#111827", marginBottom: 8 }}>No Workout Plan Yet</h3>
          <p style={{ color: "#9ca3af", maxWidth: 360, margin: "0 auto" }}>
            Once an admin assigns a trainer to you and your trainer creates a workout plan, it will appear here.
          </p>
        </div>
      </div>
    );
  }

  const difficultyColor = plan.difficulty === "Easy" ? "#10b981" : plan.difficulty === "Medium" ? "#f59e0b" : "#ef4444";
  const difficultyBg = plan.difficulty === "Easy" ? "#d1fae5" : plan.difficulty === "Medium" ? "#fef3c7" : "#fee2e2";

  return (
    <div>
      <div className="page-header">
        <h1>My Workout Plan</h1>
        <p>Personalised by your trainer.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
            <div>
              <h2 style={{ fontSize: 24, color: "#111827", marginBottom: 6 }}>{plan.title}</h2>
              <p style={{ color: "#6b7280" }}>Created on {plan.createdAt}</p>
            </div>
            <span style={{ background: difficultyBg, color: difficultyColor, padding: "6px 14px", borderRadius: 99, fontSize: 13, fontWeight: 700 }}>
              {plan.difficulty}
            </span>
          </div>

          <div style={{ background: "#f9fafb", borderRadius: 12, padding: 20, marginTop: 8 }}>
            <h4 style={{ color: "#374151", marginBottom: 10, fontSize: 14, textTransform: "uppercase", letterSpacing: "0.05em" }}>Plan Description</h4>
            <p style={{ color: "#4b5563", lineHeight: 1.8, fontSize: 15 }}>{plan.description}</p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div className="card">
            <h4 style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.05em", color: "#9ca3af", marginBottom: 14 }}>Your Trainer</h4>
            {trainer ? (
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  background: "linear-gradient(135deg, #eff6ff, #e0f2fe)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22
                }}>{trainer.photo}</div>
                <div>
                  <div style={{ fontWeight: 700, color: "#111827" }}>{trainer.username}</div>
                  <div style={{ fontSize: 13, color: "#6b7280" }}>{trainer.specialty}</div>
                </div>
              </div>
            ) : <p style={{ color: "#9ca3af" }}>—</p>}
          </div>

          <div className="card">
            <h4 style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.05em", color: "#9ca3af", marginBottom: 14 }}>Plan Stats</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 14, color: "#6b7280" }}>Difficulty</span>
                <span style={{ fontWeight: 600, color: difficultyColor }}>{plan.difficulty}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
