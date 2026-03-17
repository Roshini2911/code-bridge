import { useState } from "react";
import { useApp } from "../../context/AppContext";

export default function CreateWorkoutPage() {
  const { currentUser, getTrainerAssignments, members, createWorkoutPlan, getTrainerWorkoutPlans } = useApp();
  const myAssignments = getTrainerAssignments(currentUser?.id);
  const myPlans       = getTrainerWorkoutPlans(currentUser?.id);
  const [form, setForm]       = useState({ memberId:"", title:"", description:"", difficulty:"Medium" });
  const [success, setSuccess] = useState("");

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    if (!form.memberId || !form.title || !form.description) return;
    createWorkoutPlan({ ...form, memberId:parseInt(form.memberId), trainerId:currentUser.id });
    setSuccess(`Workout plan "${form.title}" created and sent to member!`);
    setForm({ memberId:"", title:"", description:"", difficulty:"Medium" });
    setTimeout(() => setSuccess(""), 4000);
  };

  const canSubmit = form.memberId && form.title && form.description;

  if (myAssignments.length === 0) return (
    <div>
      <div className="page-header"><div><h1>Create Workout Plan</h1><p>Build a personalised plan for an assigned member.</p></div></div>
      <div className="card"><div className="empty-state">
        <div className="empty-icon">👥</div>
        <h3>No Members Assigned</h3>
        <p>You need members assigned to you before creating workout plans. Contact your admin.</p>
      </div></div>
    </div>
  );

  return (
    <div>
      <div className="page-header">
        <div><h1>Create Workout Plan</h1><p>Build a personalised plan for an assigned member.</p></div>
      </div>

      {success && <div className="alert alert-success">✅ {success}</div>}

      <div className="grid-2">
        {/* Form */}
        <div className="card">
          <div className="section-title">New Workout Plan</div>

          <div className="input-group">
            <label>Assign to Member</label>
            <select name="memberId" value={form.memberId} onChange={handleChange}>
              <option value="">Select a member...</option>
              {myAssignments.map(a => {
                const member = members.find(m => m.id === a.memberId);
                const hasPlan = myPlans.find(p => p.memberId === a.memberId);
                return member ? (
                  <option key={member.id} value={member.id}>{member.username} {hasPlan ? "(already has plan)" : ""}</option>
                ) : null;
              })}
            </select>
          </div>

          <div className="input-group">
            <label>Plan Title</label>
            <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. 8-Week Strength Builder" />
          </div>

          <div className="input-group">
            <label>Plan Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={5}
              placeholder="Describe exercises, schedule, sets, reps, rest days and goals..."
              style={{ padding:"10px 13px", border:"1.5px solid #e5e7eb", borderRadius:12, fontFamily:"'Outfit',sans-serif", fontSize:14, resize:"vertical", outline:"none", transition:"border-color 0.18s", width:"100%" }}
              onFocus={e => e.target.style.borderColor="#2563eb"}
              onBlur={e => e.target.style.borderColor="#e5e7eb"} />
          </div>

          <div className="input-group">
            <label>Difficulty Level</label>
            <select name="difficulty" value={form.difficulty} onChange={handleChange}>
              <option value="Easy">Easy — Suitable for beginners</option>
              <option value="Medium">Medium — Intermediate level</option>
              <option value="Hard">Hard — Advanced athletes</option>
            </select>
          </div>

          <button onClick={handleSubmit} disabled={!canSubmit}
            className={`btn btn-lg btn-full ${canSubmit?"btn-primary":""}`}
            style={!canSubmit ? { background:"#f3f4f6", color:"#9ca3af", cursor:"not-allowed" } : {}}>
            ✏️ Create & Send Plan
          </button>
        </div>

        {/* Existing Plans */}
        <div className="card">
          <div className="section-title">Plans Created <span className="badge badge-green">{myPlans.length}</span></div>
          {myPlans.length === 0 ? (
            <div className="empty-state"><div className="empty-icon">📋</div><h3>No plans yet</h3><p>Create your first workout plan using the form.</p></div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {myPlans.map(plan => {
                const member = members.find(m => m.id === plan.memberId);
                const diffMap = { Easy:"badge-green", Medium:"badge-yellow", Hard:"badge-red" };
                return (
                  <div key={plan.id} style={{ background:"#f9fafb", borderRadius:12, padding:"14px 16px", border:"1px solid #e5e7eb" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6 }}>
                      <div style={{ fontWeight:700, color:"#111827", fontSize:14 }}>{plan.title}</div>
                      <span className={`badge ${diffMap[plan.difficulty]||"badge-gray"}`}>{plan.difficulty}</span>
                    </div>
                    <div style={{ fontSize:12, color:"#9ca3af" }}>For: <strong style={{ color:"#374151" }}>{member?.username}</strong> · {plan.createdAt}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}