import { useState } from "react";
import { useApp } from "../../context/AppContext";

export default function AssignTrainerPage() {
  const { members, trainers, assignments, assignTrainer, subscriptionPlans } = useApp();
  const [selectedMember, setSelectedMember] = useState("");
  const [selectedTrainer, setSelectedTrainer] = useState("");
  const [success, setSuccess] = useState("");

  const handleAssign = () => {
    if (!selectedMember || !selectedTrainer) return;
    assignTrainer(parseInt(selectedMember), parseInt(selectedTrainer));
    const m = members.find(m => m.id === parseInt(selectedMember));
    const t = trainers.find(t => t.id === parseInt(selectedTrainer));
    setSuccess(`✅ ${t?.username} has been assigned to ${m?.username} successfully.`);
    setTimeout(() => setSuccess(""), 4000);
    setSelectedMember(""); setSelectedTrainer("");
  };

  const canAssign = selectedMember && selectedTrainer;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Assign Trainer</h1>
          <p>Pair members with a personal trainer. Members will see their trainer in their dashboard.</p>
        </div>
      </div>

      {success && <div className="alert alert-success">{success}</div>}

      <div className="grid-2">
        {/* Form */}
        <div className="card">
          <div className="section-title">Create Assignment</div>

          <div className="input-group">
            <label>Select Member</label>
            <select value={selectedMember} onChange={e => setSelectedMember(e.target.value)}>
              <option value="">Choose a member...</option>
              {members.map(m => {
                const plan = subscriptionPlans.find(p => p.id === m.subscription);
                const existing = assignments.find(a => a.memberId === m.id);
                return (
                  <option key={m.id} value={m.id}>
                    {m.username} {plan ? `(${plan.name})` : "(No Plan)"} {existing ? "· Assigned" : ""}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="input-group">
            <label>Select Trainer</label>
            <select value={selectedTrainer} onChange={e => setSelectedTrainer(e.target.value)}>
              <option value="">Choose a trainer...</option>
              {trainers.filter(t => t.available).map(t => (
                <option key={t.id} value={t.id}>{t.username} — {t.specialty || "General Fitness"} ({t.experience}y exp)</option>
              ))}
            </select>
          </div>

          {/* Preview */}
          {canAssign && (() => {
            const m = members.find(x => x.id === parseInt(selectedMember));
            const t = trainers.find(x => x.id === parseInt(selectedTrainer));
            return (
              <div style={{ background:"#f0fdf4", border:"1px solid #a7f3d0", borderRadius:12, padding:"14px 16px", marginBottom:18 }}>
                <div style={{ fontSize:12, fontWeight:700, color:"#065f46", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:8 }}>Assignment Preview</div>
                <div style={{ display:"flex", alignItems:"center", gap:8, fontSize:14, color:"#111827" }}>
                  <span style={{ fontWeight:600 }}>{m?.username}</span>
                  <span style={{ color:"#9ca3af" }}>→</span>
                  <span style={{ fontWeight:600 }}>{t?.username}</span>
                  <span style={{ fontSize:12, color:"#10b981" }}>({t?.specialty})</span>
                </div>
              </div>
            );
          })()}

          <button onClick={handleAssign} disabled={!canAssign} className={`btn btn-lg btn-full ${canAssign?"btn-primary":""}`}
            style={!canAssign ? { background:"#f3f4f6", color:"#9ca3af", cursor:"not-allowed" } : {}}>
            🔗 Assign Trainer
          </button>
        </div>

        {/* Current Assignments */}
        <div className="card">
          <div className="section-title">
            Current Assignments
            <span className="badge badge-blue">{assignments.length}</span>
          </div>
          {assignments.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔗</div>
              <h3>No assignments yet</h3>
              <p>Use the form to assign trainers to members.</p>
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {assignments.map((a, i) => {
                const member  = members.find(m => m.id === a.memberId);
                const trainer = trainers.find(t => t.id === a.trainerId);
                return (
                  <div key={i} style={{ background:"#f9fafb", borderRadius:12, padding:"14px 16px", border:"1px solid #e5e7eb" }}>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                        <div style={{ width:32, height:32, borderRadius:"50%", background:"#eff6ff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:"#2563eb" }}>
                          {member?.username?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontSize:14, fontWeight:600, color:"#111827" }}>
                            {member?.username} <span style={{ color:"#9ca3af", fontWeight:400 }}>→</span> {trainer?.username}
                          </div>
                          <div style={{ fontSize:12, color:"#9ca3af" }}>Assigned on {a.date}</div>
                        </div>
                      </div>
                      <span className="badge badge-green">Active</span>
                    </div>
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