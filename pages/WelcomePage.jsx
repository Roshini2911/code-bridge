import { useState } from "react";

const WORKOUTS = [
  { emoji:"🏋️", name:"Deadlift", muscle:"Hamstrings, Glutes, Back", tag1:"Strength", tag2:"Intermediate", sets:"4 × 6 reps", cal:"~300 kcal/hr", tip:"Keep your back flat and drive through your heels. Engage your lats before pulling — imagine bending the bar around your legs for maximum tension and spine safety." },
  { emoji:"🔥", name:"HIIT Circuit", muscle:"Full Body", tag1:"Cardio", tag2:"Advanced", sets:"20 min", cal:"~450 kcal/hr", tip:"Work at 90% effort during every interval. Rest exactly 30 seconds — a timer is non-negotiable to get real HIIT benefits and avoid overtraining." },
  { emoji:"🧘", name:"Yoga Flow", muscle:"Core, Hip Flexors", tag1:"Flexibility", tag2:"Beginner", sets:"30 min", cal:"~150 kcal/hr", tip:"Breathe into every pose — hold each stretch for 5 full breaths. Never force a joint; flexibility is earned gradually, not forced." },
  { emoji:"🚴", name:"Spin Class", muscle:"Quads, Calves, Glutes", tag1:"Cardio", tag2:"Intermediate", sets:"45 min", cal:"~500 kcal/hr", tip:"Increase resistance on climbs — spinning at zero resistance burns fewer calories than walking. Keep cadence between 60–100 RPM." },
  { emoji:"💪", name:"Bench Press", muscle:"Chest, Triceps, Shoulders", tag1:"Strength", tag2:"Intermediate", sets:"4 × 8 reps", cal:"~250 kcal/hr", tip:"Retract your scapula and keep feet flat. Lower the bar to your lower chest — not your neck — for maximum pec activation and shoulder safety." },
  { emoji:"🥊", name:"Boxing", muscle:"Arms, Core, Shoulders", tag1:"Combat", tag2:"All Levels", sets:"3 × 3 min", cal:"~400 kcal/hr", tip:"Power comes from hip rotation, not just arms. Stay light on your feet and always keep your guard up between combinations." },
];

const HEALTH_TIPS = [
  { icon:"💧", title:"Hydration", body:"Drink 3–4 litres of water daily. Sip before, during, and after your workout to maintain peak performance and speed up muscle recovery." },
  { icon:"😴", title:"Sleep & Recovery", body:"Muscles grow during rest, not during the workout. Aim for 7–9 hours of quality sleep. Skipping rest days leads to plateaus and injuries." },
  { icon:"🥗", title:"Nutrition Timing", body:"Eat a protein-rich meal within 45 minutes post-workout. Lean meats, eggs, paneer, and legumes are excellent choices for muscle protein synthesis." },
  { icon:"🫀", title:"Warm-Up Always", body:"Spend 10 minutes warming up before every session. Dynamic stretches or a light jog prime your joints and reduce injury risk by up to 50%." },
  { icon:"📈", title:"Progressive Overload", body:"Increase weight, reps, or sets by 5–10% every 2 weeks. Muscles only grow when consistently challenged beyond their current capacity." },
  { icon:"🧠", title:"Mental Fitness", body:"Consistency beats intensity. Even 20-minute daily workouts compound into extraordinary physical and mental results over 6 months." },
];

const MACROS = [
  { emoji:"🍖", name:"Protein",       dose:"1.6–2.2G", unit:"per kg bodyweight", desc:"Builds and repairs muscle tissue after resistance training.",                color:"#ef4444", bg:"#fef2f2" },
  { emoji:"🍚", name:"Carbohydrates", dose:"3–5G",     unit:"per kg bodyweight", desc:"Primary fuel for high-intensity workouts and brain function.",                color:"#f59e0b", bg:"#fffbeb" },
  { emoji:"🥑", name:"Healthy Fats",  dose:"0.5–1G",   unit:"per kg bodyweight", desc:"Supports hormone production including testosterone for muscle growth.",      color:"#10b981", bg:"#f0fdf4" },
  { emoji:"🥦", name:"Fibre",         dose:"25–35G",   unit:"daily",             desc:"Improves gut health, digestion, and nutrient absorption from every meal.",   color:"#2563eb", bg:"#eff6ff" },
];

const todayNum = new Date().getDay();
const WEEK = [
  { abbr:"MON", name:"Push Day",    type:"STRENGTH",  color:"#2563eb", bg:"#eff6ff", exs:["Bench Press","Shoulder Press","Triceps Dips"],  d:1 },
  { abbr:"TUE", name:"Cardio Day",  type:"CARDIO",    color:"#0891b2", bg:"#ecfeff", exs:["Spin Class","HIIT Circuit","Jump Rope"],          d:2 },
  { abbr:"WED", name:"Pull Day",    type:"STRENGTH",  color:"#2563eb", bg:"#eff6ff", exs:["Deadlift","Bent-Over Row","Biceps Curl"],          d:3 },
  { abbr:"THU", name:"Active Rest", type:"RECOVERY",  color:"#10b981", bg:"#f0fdf4", exs:["Yoga Flow","Foam Rolling","Stretching"],           d:4 },
  { abbr:"FRI", name:"Leg Day",     type:"STRENGTH",  color:"#2563eb", bg:"#eff6ff", exs:["Squats","Lunges","Calf Raises"],                   d:5 },
  { abbr:"SAT", name:"Functional",  type:"MIXED",     color:"#7c3aed", bg:"#f5f3ff", exs:["Boxing","TRX","Core Circuit"],                     d:6 },
  { abbr:"SUN", name:"Full Rest",   type:"REST DAY",  color:"#9ca3af", bg:"#f3f4f6", exs:["Sleep well","Hydrate","Meal prep"],                d:0 },
];

const FEATURES = [
  { icon:"👥", title:"Member Management",    desc:"Track sign-ups, renewals, and member activity in real time with detailed profiles.",  color:"#2563eb", bg:"#eff6ff" },
  { icon:"🏋️", title:"Trainer Assignment",   desc:"Assign certified trainers, manage their profiles, specialties, and availability.",    color:"#0891b2", bg:"#ecfeff" },
  { icon:"📋", title:"Workout Plans",        desc:"Trainers create personalised plans for each member with difficulty levels.",           color:"#10b981", bg:"#f0fdf4" },
  { icon:"💳", title:"Subscriptions",        desc:"Basic, Standard, and Premium plans with automated renewal and payment tracking.",      color:"#7c3aed", bg:"#f5f3ff" },
  { icon:"📊", title:"Reports & Analytics",  desc:"Clear financial insights with subscription breakdowns and revenue trend analysis.",    color:"#f59e0b", bg:"#fffbeb" },
  { icon:"🔐", title:"Role-Based Access",    desc:"Separate dashboards for Admins, Trainers, and Members with granular access control.", color:"#ef4444", bg:"#fef2f2" },
];

const s = {
  navBtn: { background:"none", border:"none", cursor:"pointer", padding:"7px 13px", borderRadius:8, fontSize:14, fontWeight:500, color:"#6b7280", fontFamily:"'Outfit',sans-serif", transition:"all 0.15s" },
  pill: (color, bg) => ({ display:"inline-flex", alignItems:"center", background:bg, color, fontSize:11, fontWeight:700, letterSpacing:"1.3px", textTransform:"uppercase", padding:"5px 13px", borderRadius:99 }),
  metaChip: { fontSize:12, fontWeight:600, color:"#374151", background:"#f9fafb", padding:"4px 10px", borderRadius:99, border:"1px solid #e5e7eb", display:"inline-flex", alignItems:"center", gap:4 },
};

export default function WelcomePage({ onNavigate }) {
  const [openCard, setOpenCard] = useState(null);

  const scroll = (id) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });

  return (
    <div style={{ fontFamily:"'Outfit',sans-serif", background:"#f3f4f6", minHeight:"100vh" }}>

      {/* ── NAV ── */}
      <nav style={{ position:"sticky", top:0, zIndex:100, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 40px", height:64, background:"white", borderBottom:"1px solid #e5e7eb", boxShadow:"0 1px 3px rgba(0,0,0,0.06)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:24 }}>🏟️</span>
          <span style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, color:"#111827" }}>GymFlow</span>
        </div>
        <div style={{ display:"flex", gap:2 }}>
          {[["Exercises","exercises"],["Health","health"],["Nutrition","nutrition"],["Schedule","schedule"],["Features","features"]].map(([l,id]) => (
            <button key={id} style={s.navBtn} onClick={() => scroll(id)}
              onMouseEnter={e => { e.currentTarget.style.background="#eff6ff"; e.currentTarget.style.color="#2563eb"; }}
              onMouseLeave={e => { e.currentTarget.style.background="none"; e.currentTarget.style.color="#6b7280"; }}>{l}</button>
          ))}
        </div>
        <button onClick={() => onNavigate("role-select")} style={{ background:"#2563eb", color:"white", border:"none", borderRadius:10, padding:"9px 20px", fontFamily:"'Outfit',sans-serif", fontSize:14, fontWeight:600, cursor:"pointer", boxShadow:"0 2px 6px rgba(37,99,235,0.3)", transition:"all 0.18s" }}
          onMouseEnter={e => { e.currentTarget.style.background="#1d4ed8"; e.currentTarget.style.transform="translateY(-1px)"; }}
          onMouseLeave={e => { e.currentTarget.style.background="#2563eb"; e.currentTarget.style.transform="translateY(0)"; }}>
          Get Started →
        </button>
      </nav>

      {/* ── HERO ── */}
      <section style={{ background:"linear-gradient(135deg,#1e3a8a 0%,#2563eb 55%,#0ea5e9 100%)", padding:"80px 64px 72px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", right:-80, top:-80, width:400, height:400, borderRadius:"50%", background:"rgba(255,255,255,0.05)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", left:-60, bottom:-60, width:300, height:300, borderRadius:"50%", background:"rgba(255,255,255,0.04)", pointerEvents:"none" }} />
        <div style={{ position:"relative", zIndex:1, maxWidth:640 }}>
          <div style={{ ...s.pill("white","rgba(255,255,255,0.15)"), border:"1px solid rgba(255,255,255,0.22)", marginBottom:24 }}>⚡ Gym Management Platform</div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(38px,5vw,60px)", color:"white", lineHeight:1.1, marginBottom:16 }}>
            Manage Your Gym<br />The Smart Way
          </h1>
          <p style={{ fontSize:16, color:"rgba(255,255,255,0.8)", lineHeight:1.75, maxWidth:480, marginBottom:32 }}>
            GymFlow helps you track members, assign trainers, create workout plans, and monitor revenue — all from one powerful platform.
          </p>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:40 }}>
            <button onClick={() => onNavigate("role-select")} style={{ background:"white", color:"#2563eb", fontWeight:700, fontSize:15, padding:"12px 26px", borderRadius:12, border:"none", cursor:"pointer", fontFamily:"'Outfit',sans-serif", boxShadow:"0 4px 14px rgba(0,0,0,0.15)", transition:"all 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.transform="translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform="translateY(0)"}>→ Get Started Free</button>
            <button onClick={() => scroll("features")} style={{ background:"rgba(255,255,255,0.1)", color:"white", fontWeight:600, fontSize:15, padding:"12px 26px", borderRadius:12, cursor:"pointer", border:"1.5px solid rgba(255,255,255,0.35)", fontFamily:"'Outfit',sans-serif", transition:"all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.18)"; }}
              onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.1)"; }}>Explore Features</button>
          </div>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            {["🏋️ Trainer Management","💳 Subscriptions","📋 Workout Plans","📊 Reports"].map(f => (
              <span key={f} style={{ padding:"5px 13px", background:"rgba(255,255,255,0.12)", borderRadius:99, fontSize:13, color:"rgba(255,255,255,0.9)", border:"1px solid rgba(255,255,255,0.2)" }}>{f}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", background:"white", borderBottom:"1px solid #e5e7eb", boxShadow:"0 1px 3px rgba(0,0,0,0.04)" }}>
        {[
          { icon:"🏋️", num:"120+", lbl:"Active Members",  color:"#2563eb" },
          { icon:"👩‍🏫", num:"12",   lbl:"Expert Trainers", color:"#0891b2" },
          { icon:"💰",  num:"₹45K", lbl:"Monthly Revenue", color:"#10b981" },
          { icon:"⭐",  num:"4.9",  lbl:"Avg. Rating",     color:"#f59e0b" },
        ].map((s,i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:14, padding:"22px 28px", borderRight:i<3?"1px solid #e5e7eb":"none" }}>
            <div style={{ width:46, height:46, background:"#eff6ff", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>{s.icon}</div>
            <div>
              <div style={{ fontSize:26, fontWeight:700, color:s.color, fontFamily:"'Outfit',sans-serif", lineHeight:1 }}>{s.num}</div>
              <div style={{ fontSize:11, fontWeight:600, color:"#9ca3af", textTransform:"uppercase", letterSpacing:"0.08em", marginTop:3 }}>{s.lbl}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── EXERCISES ── */}
      <section id="exercises" style={{ padding:"60px 40px", background:"#f3f4f6" }}>
        <div style={{ marginBottom:20 }}>
          <span style={{ ...s.pill("#2563eb","#eff6ff"), marginBottom:12, display:"inline-flex" }}>💪 Exercise Library</span>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(22px,3vw,34px)", color:"#111827", marginTop:10, marginBottom:6 }}>Popular Workouts at GymFlow</h2>
          <p style={{ fontSize:14, color:"#6b7280", maxWidth:480, lineHeight:1.7 }}>Tap any card to reveal expert technique tips from our certified trainers.</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(265px,1fr))", gap:16, marginTop:28 }}>
          {WORKOUTS.map((w,i) => (
            <div key={i} onClick={() => setOpenCard(openCard===i?null:i)}
              style={{ background:"white", borderRadius:16, padding:"22px 20px 18px", border:openCard===i?"2px solid #2563eb":"1px solid #e5e7eb", boxShadow:openCard===i?"0 0 0 3px rgba(37,99,235,0.08),0 4px 14px rgba(0,0,0,0.08)":"0 1px 3px rgba(0,0,0,0.06)", cursor:"pointer", transition:"all 0.2s" }}
              onMouseEnter={e => { if(openCard!==i){e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 8px 20px rgba(0,0,0,0.09)";} }}
              onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow=openCard===i?"0 0 0 3px rgba(37,99,235,0.08)":"0 1px 3px rgba(0,0,0,0.06)"; }}>
              <span style={{ fontSize:30, marginBottom:12, display:"block" }}>{w.emoji}</span>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:10 }}>
                <span style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.5px", padding:"3px 9px", borderRadius:99, background:"#eff6ff", color:"#1d4ed8" }}>{w.tag1}</span>
                <span style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.5px", padding:"3px 9px", borderRadius:99, background:"#f3f4f6", color:"#6b7280" }}>{w.tag2}</span>
              </div>
              <div style={{ fontSize:17, fontWeight:700, color:"#111827", marginBottom:4 }}>{w.name}</div>
              <div style={{ fontSize:13, color:"#9ca3af", marginBottom:12 }}>🎯 {w.muscle}</div>
              <div style={{ display:"flex", gap:7, flexWrap:"wrap", marginBottom:12 }}>
                <span style={{ ...s.metaChip }}>⏱ {w.sets}</span>
                <span style={{ ...s.metaChip }}>🔥 {w.cal}</span>
              </div>
              <span style={{ fontSize:13, fontWeight:600, color:openCard===i?"#6b7280":"#2563eb" }}>{openCard===i?"Hide tip ↑":"Tap for tip →"}</span>
              {openCard===i && (
                <div style={{ marginTop:12, padding:13, background:"#eff6ff", borderRadius:10, borderLeft:"3px solid #2563eb", fontSize:13, color:"#1e40af", lineHeight:1.65 }}>
                  💡 <strong>Pro Tip:</strong> {w.tip}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── HEALTH ── */}
      <section id="health" style={{ padding:"60px 40px", background:"#1e3a8a" }}>
        <span style={{ ...s.pill("rgba(255,255,255,0.8)","rgba(255,255,255,0.12)"), border:"1px solid rgba(255,255,255,0.2)", marginBottom:12, display:"inline-flex" }}>🌿 Health & Wellness</span>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(22px,3vw,34px)", color:"white", marginTop:10, marginBottom:6 }}>Train Smarter, Recover Better</h2>
        <p style={{ fontSize:14, color:"rgba(255,255,255,0.65)", maxWidth:480, lineHeight:1.7, marginBottom:32 }}>Science-backed tips every GymFlow member swears by.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(252px,1fr))", gap:14 }}>
          {HEALTH_TIPS.map((t,i) => (
            <div key={i} style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:14, padding:"22px 18px", transition:"all 0.18s" }}
              onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.13)"; e.currentTarget.style.transform="translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.07)"; e.currentTarget.style.transform="translateY(0)"; }}>
              <span style={{ fontSize:26, marginBottom:12, display:"block" }}>{t.icon}</span>
              <div style={{ fontSize:15, fontWeight:700, color:"white", marginBottom:7 }}>{t.title}</div>
              <div style={{ fontSize:13, color:"rgba(255,255,255,0.62)", lineHeight:1.7 }}>{t.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── NUTRITION ── */}
      <section id="nutrition" style={{ padding:"60px 40px", background:"#f3f4f6" }}>
        <span style={{ ...s.pill("#2563eb","#eff6ff"), marginBottom:12, display:"inline-flex" }}>🥗 Nutrition Guide</span>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(22px,3vw,34px)", color:"#111827", marginTop:10, marginBottom:6 }}>Fuel Your Performance</h2>
        <p style={{ fontSize:14, color:"#6b7280", maxWidth:480, lineHeight:1.7, marginBottom:32 }}>Daily macro targets to complement your training intensity.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(228px,1fr))", gap:14, marginBottom:24 }}>
          {MACROS.map((m,i) => (
            <div key={i} style={{ background:"white", borderRadius:14, padding:"18px 16px", border:"1px solid #e5e7eb", boxShadow:"0 1px 3px rgba(0,0,0,0.05)", display:"flex", gap:13, alignItems:"flex-start", borderLeft:`4px solid ${m.color}`, transition:"all 0.18s" }}
              onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 6px 16px rgba(0,0,0,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)"; }}>
              <span style={{ fontSize:26, flexShrink:0, marginTop:2 }}>{m.emoji}</span>
              <div>
                <div style={{ fontSize:14, fontWeight:700, color:"#111827", marginBottom:3 }}>{m.name}</div>
                <div style={{ fontSize:13, fontWeight:700, color:m.color, marginBottom:5 }}>{m.dose} <span style={{ fontSize:11, fontWeight:400, color:"#9ca3af" }}>{m.unit}</span></div>
                <div style={{ fontSize:12, color:"#6b7280", lineHeight:1.6 }}>{m.desc}</div>
              </div>
            </div>
          ))}
        </div>
        {/* BMI */}
        <div style={{ background:"white", borderRadius:16, padding:"28px 32px", border:"1px solid #e5e7eb", boxShadow:"0 1px 3px rgba(0,0,0,0.05)", display:"grid", gridTemplateColumns:"1fr 1fr", gap:32, alignItems:"center" }}>
          <div>
            <div style={{ fontSize:17, fontWeight:700, color:"#111827", marginBottom:8 }}>🗂️ Know Your BMI</div>
            <p style={{ fontSize:14, color:"#6b7280", lineHeight:1.65 }}>Body Mass Index measures if your weight is healthy for your height. BMI 18.5–24.9 is the ideal range. Track it monthly to monitor progress.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {[{l:"Underweight",v:"< 18.5",c:"#3b82f6",bg:"#eff6ff"},{l:"Normal",v:"18.5–24.9",c:"#10b981",bg:"#f0fdf4"},{l:"Overweight",v:"25–29.9",c:"#f59e0b",bg:"#fffbeb"},{l:"Obese",v:"≥ 30",c:"#ef4444",bg:"#fef2f2"}].map((r,i) => (
              <div key={i} style={{ background:r.bg, border:`1px solid ${r.c}33`, borderRadius:10, padding:"12px 13px", display:"flex", alignItems:"center", gap:9 }}>
                <div style={{ width:9, height:9, borderRadius:"50%", background:r.c, flexShrink:0 }} />
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:"#111827" }}>{r.l}</div>
                  <div style={{ fontSize:11, color:"#6b7280", marginTop:1 }}>{r.v}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCHEDULE ── */}
      <section id="schedule" style={{ padding:"60px 40px", background:"white" }}>
        <span style={{ ...s.pill("#2563eb","#eff6ff"), marginBottom:12, display:"inline-flex" }}>🗓️ Weekly Schedule</span>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(22px,3vw,34px)", color:"#111827", marginTop:10, marginBottom:6 }}>A Week of Balanced Training</h2>
        <p style={{ fontSize:14, color:"#6b7280", maxWidth:480, lineHeight:1.7, marginBottom:32 }}>A proven split that balances strength, cardio, and recovery for all levels.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:10 }}>
          {WEEK.map((d,i) => (
            <div key={i} style={{ background:"white", borderRadius:14, padding:"16px 12px", border:d.d===todayNum?`2px solid ${d.color}`:"1px solid #e5e7eb", borderTop:`3px solid ${d.color}`, boxShadow:d.d===todayNum?`0 0 0 3px ${d.color}22`:"0 1px 3px rgba(0,0,0,0.05)", transition:"all 0.18s" }}
              onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 8px 18px rgba(0,0,0,0.09)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow=d.d===todayNum?`0 0 0 3px ${d.color}22`:"0 1px 3px rgba(0,0,0,0.05)"; }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:17, color:d.color, marginBottom:3, fontWeight:700 }}>{d.abbr}</div>
              <div style={{ fontSize:12, fontWeight:700, color:"#111827", marginBottom:6 }}>{d.name}</div>
              <span style={{ display:"inline-block", fontSize:9, fontWeight:700, letterSpacing:"0.5px", textTransform:"uppercase", padding:"3px 7px", borderRadius:99, marginBottom:9, background:d.bg, color:d.color }}>{d.type}</span>
              <ul style={{ listStyle:"none", padding:0, display:"flex", flexDirection:"column", gap:4 }}>
                {d.exs.map((ex,j) => (
                  <li key={j} style={{ fontSize:11, color:"#9ca3af", paddingLeft:11, position:"relative" }}>
                    <span style={{ position:"absolute", left:0, color:d.color, fontWeight:700 }}>•</span>{ex}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding:"60px 40px", background:"#f3f4f6" }}>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(22px,3vw,34px)", color:"#111827", textAlign:"center", marginBottom:8 }}>Everything you need to run your gym</h2>
        <p style={{ fontSize:14, color:"#6b7280", textAlign:"center", maxWidth:440, margin:"0 auto 36px", lineHeight:1.7 }}>One platform. Every tool. Manage your gym efficiently from day one.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(255px,1fr))", gap:16 }}>
          {FEATURES.map((f,i) => (
            <div key={i} style={{ background:"white", borderRadius:16, padding:"24px 20px", border:"1px solid #e5e7eb", boxShadow:"0 1px 3px rgba(0,0,0,0.05)", transition:"all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 8px 20px rgba(0,0,0,0.09)"; e.currentTarget.style.borderColor="#bfdbfe"; }}
              onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)"; e.currentTarget.style.borderColor="#e5e7eb"; }}>
              <div style={{ width:48, height:48, background:f.bg, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, marginBottom:14 }}>{f.icon}</div>
              <h3 style={{ fontSize:15, fontWeight:700, color:"#111827", marginBottom:7, fontFamily:"'Outfit',sans-serif" }}>{f.title}</h3>
              <p style={{ fontSize:13, color:"#6b7280", lineHeight:1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background:"linear-gradient(135deg,#1e3a8a 0%,#2563eb 55%,#0ea5e9 100%)", padding:"68px 40px", textAlign:"center" }}>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(26px,4vw,46px)", color:"white", lineHeight:1.15, marginBottom:12 }}>Ready to Transform Your Gym?</h2>
        <p style={{ fontSize:15, color:"rgba(255,255,255,0.75)", marginBottom:32 }}>Join hundreds of gym owners who manage smarter with GymFlow.</p>
        <div style={{ display:"flex", justifyContent:"center", gap:12, flexWrap:"wrap" }}>
          <button onClick={() => onNavigate("role-select")} style={{ background:"white", color:"#2563eb", fontWeight:700, fontSize:15, padding:"12px 26px", borderRadius:12, border:"none", cursor:"pointer", fontFamily:"'Outfit',sans-serif", boxShadow:"0 4px 14px rgba(0,0,0,0.15)", transition:"all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.transform="translateY(-2px)"}
            onMouseLeave={e => e.currentTarget.style.transform="translateY(0)"}>Get Started Free →</button>
          <button onClick={() => onNavigate("role-select")} style={{ background:"rgba(255,255,255,0.1)", color:"white", fontWeight:600, fontSize:15, padding:"12px 26px", borderRadius:12, cursor:"pointer", border:"1.5px solid rgba(255,255,255,0.4)", fontFamily:"'Outfit',sans-serif", transition:"all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.18)"}
            onMouseLeave={e => e.currentTarget.style.background="rgba(255,255,255,0.1)"}>Sign In</button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:"#111827", padding:"22px 40px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:18 }}>🏟️</span>
          <span style={{ fontFamily:"'Playfair Display',serif", fontSize:17, fontWeight:700, color:"white" }}>GymFlow</span>
        </div>
        <div style={{ display:"flex", gap:18 }}>
          {["Exercises","Health","Nutrition","Schedule","Features"].map(l => (
            <button key={l} onClick={() => scroll(l.toLowerCase())} style={{ fontSize:13, color:"rgba(255,255,255,0.45)", cursor:"pointer", background:"none", border:"none", fontFamily:"'Outfit',sans-serif", transition:"color 0.18s" }}
              onMouseEnter={e => e.currentTarget.style.color="rgba(255,255,255,0.9)"}
              onMouseLeave={e => e.currentTarget.style.color="rgba(255,255,255,0.45)"}>{l}</button>
          ))}
        </div>
        <div style={{ fontSize:12, color:"rgba(255,255,255,0.3)" }}>© 2026 GymFlow. Built for modern gym management.</div>
      </footer>
    </div>
  );
}