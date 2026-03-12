import { useApp } from "../../context/AppContext";

export default function SubscriptionPage() {
  const { currentUser, subscriptionPlans, subscribePlan, getPlan } = useApp();
  const activePlan = currentUser?.subscription ? getPlan(currentUser.subscription) : null;

  return (
    <div>
      <div className="page-header">
        <h1>Membership Plans</h1>
        <p>Choose the plan that fits your goals.</p>
      </div>

      {activePlan && (
        <div style={{ background: "#eff6ff", border: "1.5px solid #bfdbfe", borderRadius: 14, padding: 20, marginBottom: 28, display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 28 }}>✅</span>
          <div>
            <div style={{ fontWeight: 700, color: "#1e40af", fontSize: 16 }}>Active Plan: {activePlan.name}</div>
            <div style={{ color: "#3b82f6", fontSize: 14 }}>You're subscribed to the {activePlan.name} plan — ₹{activePlan.price}/month</div>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
        {subscriptionPlans.map((plan, i) => (
          <div key={plan.id} style={{
            background: "white", borderRadius: 18, padding: 28,
            border: activePlan?.id === plan.id ? "2px solid #2563eb" : i === 2 ? "2px solid #e5e7eb" : "1px solid #e5e7eb",
            boxShadow: i === 2 ? "0 8px 28px rgba(37,99,235,0.12)" : "0 2px 8px rgba(0,0,0,0.05)",
            position: "relative"
          }}>
            {i === 2 && (
              <div style={{
                position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                background: "linear-gradient(135deg, #2563eb, #0ea5e9)",
                color: "white", fontSize: 11, fontWeight: 700, padding: "4px 14px",
                borderRadius: 99, letterSpacing: "0.06em"
              }}>MOST POPULAR</div>
            )}
            <div style={{ fontSize: 28, marginBottom: 12 }}>{i === 0 ? "🌱" : i === 1 ? "⭐" : "👑"}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#111827", marginBottom: 4 }}>{plan.name}</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: "#2563eb", marginBottom: 4 }}>
              ₹{plan.price}<span style={{ fontSize: 14, color: "#9ca3af", fontWeight: 400 }}>/mo</span>
            </div>
            <div style={{ fontSize: 13, color: "#9ca3af", marginBottom: 20 }}>{plan.duration} month{plan.duration > 1 ? "s" : ""} commitment</div>
            <ul style={{ listStyle: "none", marginBottom: 24, display: "flex", flexDirection: "column", gap: 8 }}>
              {plan.features.map(f => (
                <li key={f} style={{ fontSize: 14, color: "#4b5563", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "#10b981", fontSize: 16 }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => subscribePlan(currentUser.id, plan.id)}
              disabled={activePlan?.id === plan.id}
              style={{
                width: "100%", padding: "12px",
                background: activePlan?.id === plan.id ? "#f3f4f6" : "linear-gradient(135deg, #2563eb, #0ea5e9)",
                color: activePlan?.id === plan.id ? "#9ca3af" : "white",
                border: "none", borderRadius: 10,
                fontFamily: "'Outfit',sans-serif", fontSize: 15, fontWeight: 600,
                cursor: activePlan?.id === plan.id ? "not-allowed" : "pointer"
              }}
            >
              {activePlan?.id === plan.id ? "Current Plan" : "Subscribe"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
