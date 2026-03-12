import { useApp } from "../../context/AppContext";

export default function TrainerMembersPage({ onNavigate }) {
  const { currentUser, getTrainerAssignments, members, getTrainerWorkoutPlans, subscriptionPlans } = useApp();
  const myAssignments = getTrainerAssignments(currentUser?.id);
  const myPlans = getTrainerWorkoutPlans(currentUser?.id);

  return (
    <div>
      <div className="page-header">
        <h1>Assigned Members</h1>
        <p>Members the admin has assigned to you.</p>
      </div>

      {myAssignments.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: 64 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>👥</div>
          <h3 style={{ color: "#111827", marginBottom: 8 }}>No Members Assigned Yet</h3>
          <p style={{ color: "#9ca3af" }}>The admin will assign members to you. You'll be able to create workout plans for them.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {myAssignments.map(a => {
            const member = members.find(m => m.id === a.memberId);
            if (!member) return null;
            const plan = myPlans.find(p => p.memberId === member.id);
            const subscription = member.subscription ? subscriptionPlans.find(p => p.id === member.subscription) : null;
            return (
              <div key={member.id} className="card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: "50%",
                      background: "linear-gradient(135deg, #eff6ff, #e0f2fe)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 700, fontSize: 16, color: "#2563eb"
                    }}>{member.username.charAt(0).toUpperCase()}</div>
                    <div>
                      <div style={{ fontWeight: 700, color: "#111827" }}>{member.username}</div>
                      <div style={{ fontSize: 12, color: "#9ca3af" }}>Assigned {a.date}</div>
                    </div>
                  </div>
                  {subscription
                    ? <span className="badge badge-blue">{subscription.name}</span>
                    : <span className="badge badge-gray">No Plan</span>}
                </div>

                <div style={{ background: "#f9fafb", borderRadius: 10, padding: 14, marginBottom: 14 }}>
                  <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Workout Plan</div>
                  {plan
                    ? <div>
                        <div style={{ fontWeight: 600, color: "#111827", fontSize: 14 }}>{plan.title}</div>
                        <span className={`badge badge-${plan.difficulty === "Easy" ? "green" : plan.difficulty === "Medium" ? "yellow" : "gray"}`} style={{ marginTop: 4, display: "inline-block" }}>{plan.difficulty}</span>
                      </div>
                    : <div style={{ color: "#9ca3af", fontSize: 14 }}>No plan assigned yet</div>
                  }
                </div>

                {!plan && (
                  <button onClick={() => onNavigate("create-workout")} style={{
                    width: "100%", padding: "10px",
                    background: "linear-gradient(135deg, #0891b2, #0ea5e9)",
                    color: "white", border: "none", borderRadius: 10,
                    fontFamily: "'Outfit',sans-serif", fontSize: 14, fontWeight: 600, cursor: "pointer"
                  }}>✏️ Create Workout Plan</button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
