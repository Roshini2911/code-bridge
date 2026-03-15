export default function RoleSelectPage({ onNavigate }) {
  const roles = [
    { key:"member",  label:"Member",  icon:"🧑‍💪", desc:"Access your subscription, assigned trainer, and personalised workout plans.", color:"#2563eb", bg:"#eff6ff", border:"#bfdbfe", features:["View Subscription","Browse Trainers","Workout Plans"] },
    { key:"admin",   label:"Admin",   icon:"🛡️",  desc:"Full platform control — manage members, trainers, reports and assignments.",   color:"#7c3aed", bg:"#f5f3ff", border:"#ddd6fe", features:["Manage Members","Assign Trainers","View Reports"] },
    { key:"trainer", label:"Trainer", icon:"🏋️",  desc:"Manage your profile, view assigned members, and create workout plans.",         color:"#0891b2", bg:"#ecfeff", border:"#a5f3fc", features:["Edit Profile","View Members","Create Plans"] },
  ];

  return (
    <div style={{ minHeight:"100vh", background:"#f3f4f6", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24 }}>
      {/* Header */}
      <div style={{ textAlign:"center", marginBottom:40 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10, marginBottom:24 }}>
          <span style={{ fontSize:32 }}>🏟️</span>
          <span style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:700, color:"#111827" }}>GymFlow</span>
        </div>
        <button onClick={() => onNavigate("welcome")} style={{ background:"none", border:"none", cursor:"pointer", color:"#6b7280", fontSize:14, marginBottom:20, display:"flex", alignItems:"center", gap:5, margin:"0 auto 20px" }}>← Back to Home</button>
        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:32, color:"#111827", marginBottom:8 }}>Who are you?</h1>
        <p style={{ color:"#9ca3af", fontSize:15 }}>Select your role to sign in or create an account</p>
      </div>

      {/* Role Cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20, maxWidth:760, width:"100%" }}>
        {roles.map(role => (
          <button key={role.key} onClick={() => onNavigate(`${role.key}-login`)}
            style={{ background:"white", border:`1.5px solid #e5e7eb`, borderRadius:20, padding:"28px 22px", cursor:"pointer", textAlign:"left", transition:"all 0.2s", display:"flex", flexDirection:"column", gap:0 }}
            onMouseEnter={e => { e.currentTarget.style.borderColor=role.color; e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow=`0 12px 28px rgba(0,0,0,0.10)`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor="#e5e7eb"; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}>

            <div style={{ width:58, height:58, borderRadius:16, background:role.bg, border:`1px solid ${role.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, marginBottom:16 }}>{role.icon}</div>
            <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:18, color:"#111827", marginBottom:8 }}>{role.label}</div>
            <div style={{ fontSize:13, color:"#6b7280", lineHeight:1.6, marginBottom:18 }}>{role.desc}</div>

            <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:20 }}>
              {role.features.map(f => (
                <div key={f} style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, color:"#374151" }}>
                  <span style={{ width:18, height:18, borderRadius:"50%", background:role.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, color:role.color, fontWeight:700, flexShrink:0 }}>✓</span>
                  {f}
                </div>
              ))}
            </div>

            <div style={{ marginTop:"auto", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <span style={{ fontSize:13, fontWeight:600, color:role.color }}>Continue as {role.label}</span>
              <span style={{ color:role.color, fontSize:16 }}>→</span>
            </div>
          </button>
        ))}
      </div>

      <p style={{ marginTop:28, fontSize:13, color:"#9ca3af" }}>Demo: alice/pass (Member) · admin/admin123 (Admin) · bob/pass (Trainer)</p>
    </div>
  );
}