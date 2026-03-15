import { useApp } from "../../context/AppContext";

const PLAN_ICONS = ["🌱", "⭐", "👑"];
const PLAN_COLORS = ["#2563eb", "#7c3aed", "#0891b2"];

export default function SubscriptionPage() {
  const { currentUser, subscriptionPlans, subscribePlan, getPlan } = useApp();
  const activePlan = currentUser?.subscription ? getPlan(currentUser.subscription) : null;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Membership Plans</h1>
          <p>Choose the plan that best fits your fitness goals.</p>
        </div>
      </div>

      {activePlan && (
        <div className="alert alert-info" style={{ marginBottom:28 }}>
          ✅ <strong>Active Plan: {activePlan.name}</strong> — You're currently subscribed at ₹{activePlan.price}/month.
        </div>
      )}

      <div className="grid-3">
        {subscriptionPlans.map((plan, i) => {
          const isActive  = activePlan?.id === plan.id;
          const isPopular = i === 2;
          return (
            <div key={plan.id} style={{
              background:"white", borderRadius:20, padding:"28px 24px",
              border:isActive ? `2px solid ${PLAN_COLORS[i]}` : isPopular ? `2px solid #e5e7eb` : "1px solid #e5e7eb",
              boxShadow:isActive ? `0 0 0 3px ${PLAN_COLORS[i]}22, 0 8px 24px rgba(0,0,0,0.08)` : "0 1px 3px rgba(0,0,0,0.06)",
              position:"relative",
              transition:"all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow=`0 12px 28px rgba(0,0,0,0.10)`; }}
              onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow=isActive?`0 0 0 3px ${PLAN_COLORS[i]}22, 0 8px 24px rgba(0,0,0,0.08)`:"0 1px 3px rgba(0,0,0,0.06)"; }}
            >
              {isPopular && (
                <div style={{ position:"absolute", top:-12, left:"50%", transform:"translateX(-50%)", background:`linear-gradient(135deg,${PLAN_COLORS[i]},${PLAN_COLORS[i]}cc)`, color:"white", fontSize:10, fontWeight:700, padding:"4px 14px", borderRadius:99, letterSpacing:"0.08em", whiteSpace:"nowrap" }}>
                  MOST POPULAR
                </div>
              )}
              {isActive && (
                <div style={{ position:"absolute", top:14, right:14 }}>
                  <span className="badge badge-blue">Current</span>
                </div>
              )}

              {/* Plan header */}
              <div style={{ marginBottom:20 }}>
                <div style={{ fontSize:32, marginBottom:10 }}>{PLAN_ICONS[i]}</div>
                <div style={{ fontSize:20, fontWeight:700, color:"#111827", marginBottom:4 }}>{plan.name}</div>
                <div style={{ display:"flex", alignItems:"baseline", gap:4, marginBottom:4 }}>
                  <span style={{ fontSize:34, fontWeight:800, color:PLAN_COLORS[i] }}>₹{plan.price}</span>
                  <span style={{ fontSize:14, color:"#9ca3af" }}>/month</span>
                </div>
                <div style={{ fontSize:13, color:"#9ca3af" }}>{plan.duration} month{plan.duration > 1 ? "s" : ""} commitment</div>
              </div>

              {/* Divider */}
              <div className="divider" />

              {/* Features */}
              <ul style={{ listStyle:"none", marginBottom:22, display:"flex", flexDirection:"column", gap:9 }}>
                {plan.features.map(f => (
                  <li key={f} style={{ fontSize:14, color:"#374151", display:"flex", alignItems:"center", gap:9 }}>
                    <span style={{ width:18, height:18, borderRadius:"50%", background:`${PLAN_COLORS[i]}15`, display:"flex", alignItems:"center", justifyContent:"center", color:PLAN_COLORS[i], fontSize:10, fontWeight:700, flexShrink:0 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button onClick={() => subscribePlan(currentUser.id, plan.id)} disabled={isActive}
                style={{ width:"100%", padding:"11px", borderRadius:12, border:"none", cursor:isActive?"not-allowed":"pointer",
                  background:isActive?"#f3f4f6":`linear-gradient(135deg,${PLAN_COLORS[i]},${PLAN_COLORS[i]}cc)`,
                  color:isActive?"#9ca3af":"white", fontFamily:"'Outfit',sans-serif",
                  fontSize:14, fontWeight:600, transition:"all 0.2s",
                  boxShadow:isActive?"none":`0 2px 8px ${PLAN_COLORS[i]}44` }}>
                {isActive ? "✓ Current Plan" : `Choose ${plan.name}`}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}