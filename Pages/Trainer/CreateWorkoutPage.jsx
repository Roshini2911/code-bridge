import { useState } from "react";
import { useApp } from "../../context/AppContext";

export default function CreateWorkoutPage() {
  const { currentUser, getTrainerAssignments, members, createWorkoutPlan, getTrainerWorkoutPlans } = useApp();
  const myAssignments = getTrainerAssignments(currentUser?.id);
  const myPlans = getTrainerWorkoutPlans(currentUser?.id);

  const [form, setForm] = useState({ memberId: "", title: "", description: "", difficulty: "Medium" });
  const [success, setSuccess] = useState("");

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    if (!form.memberId || !form.title || !form.description) return;
    createWorkoutPlan({ ...form, memberId: parseInt(form.memberId), trainerId: currentUser.id });
    setSuccess(`Workout plan "${form.title}" created and sent to member!`);
    setForm({ memberId: "", title: "", description: "", difficulty: "Medium" });
    setTimeout(() => setSuccess(""), 4000);
  };

  const assignedWithoutPlan = myAssignments.filter(a => !myPlans.find(p => p.memberId === a.memberId));

  return (
    <div>
      <div className="page-header">
        <h1>Create Workout Plan</h1>
        <p>Build a personalised plan for an assigned member.</p>
      </div>

      {success && <div className="alert alert-success">✅ {success}</div>}

      {assignedWithoutPlan.length === 0 && myAssignments.length > 0 && (
        <div className="alert" style={{ background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}>
          ✅ All your members already have workout plans!
        </div>
      )}

      {myAssignments.length === 0 && (
        <div className="card" style={{ textAlign: "center", padding: 48 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>👥</div>
          <p style={{ color: "#9ca3af" }}>You need assigned members before creating workout plans.</p>
        </div>
      )}

      {myAssignments.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 24 }}>
          <div className="card">
            <h3 style={{ marginBottom: 22 }}>New Workout Plan</h3>

            <div className="input-group">
              <label>Member</label>
              <select name="memberId" value={form.memberId} onChange={handleChange}>
                <option value="">Select a member...</option>
                {myAssignments.map(a => {
                  const member = members.find(m => m.id === a.memberId);
                  const hasPlan = myPlans.find(p => p.memberId === a.memberId);
                  return member ? (
                    <option key={member.id} value={member.id}>
                      {member.username} {hasPlan ? "(has plan)" : ""}
                    </option>
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
              <textarea name="description" value={form.description} onChange={handleChange}
                placeholder="Describe the exercises, schedule, sets, reps, and goals..."
                rows={5} style={{ padding: "11px 16px", border: "1.5px solid #e5e7eb", borderRadius: 12, fontFamily: "'Outfit',sans-serif", fontSize: 15, resize: "vertical", outline: "none" }} />
            </div>

            <div className="input-group">
              <label>Difficulty Level</label>
              <select name="difficulty" value={form.difficulty} onChange={handleChange}>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!form.memberId || !form.title || !form.description}
              style={{
                padding: "13px 28px",
                background: form.memberId && form.title && form.description ? "linear-gradient(135deg, #0891b2, #0ea5e9)" : "#f3f4f6",
                color: form.memberId && form.title && form.description ? "white" : "#9ca3af",
                border: "none", borderRadius: 12,
                fontFamily: "'Outfit',sans-serif", fontSize: 15, fontWeight: 600,
                cursor: form.memberId && form.title && form.description ? "pointer" : "not-allowed"
              }}
            >✏️ Create & Send Plan</button>
          </div>

          {/* Existing plans */}
          <div className="card">
            <h3 style={{ marginBottom: 18 }}>Plans Created</h3>
            {myPlans.length === 0 ? (
              <div style={{ textAlign: "center", padding: 32, color: "#9ca3af" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>📋</div>
                No plans yet.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {myPlans.map(plan => {
                  const member = members.find(m => m.id === plan.memberId);
                  return (
                    <div key={plan.id} style={{ background: "#f9fafb", borderRadius: 12, padding: 14 }}>
                      <div style={{ fontWeight: 700, color: "#111827", fontSize: 14, marginBottom: 4 }}>{plan.title}</div>
                      <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 6 }}>For: {member?.username}</div>
                      <span className={`badge badge-${plan.difficulty === "Easy" ? "green" : plan.difficulty === "Medium" ? "yellow" : "gray"}`}>{plan.difficulty}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
