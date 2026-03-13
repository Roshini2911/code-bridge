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
    setSuccess(`Successfully assigned trainer to member!`);
    setTimeout(() => setSuccess(""), 3000);
    setSelectedMember(""); setSelectedTrainer("");
  };

  return (
    <div>
      <div className="page-header">
        <h1>Assign Trainer to Member</h1>
        <p>Pair members with their personal trainer. The trainer will be notified.</p>
      </div>

      {success && <div className="alert alert-success">✅ {success}</div>}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Assignment form */}
        <div className="card">
          <h3 style={{ marginBottom: 22, fontSize: 18 }}>Create Assignment</h3>

          <div className="input-group">
            <label>Select Member</label>
            <select value={selectedMember} onChange={e => setSelectedMember(e.target.value)}>
              <option value="">Choose a member...</option>
              {members.map(m => (
                <option key={m.id} value={m.id}>{m.username} {m.subscription ? `(${subscriptionPlans.find(p => p.id === m.subscription)?.name})` : "(No Plan)"}</option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label>Select Trainer</label>
            <select value={selectedTrainer} onChange={e => setSelectedTrainer(e.target.value)}>
              <option value="">Choose a trainer...</option>
              {trainers.filter(t => t.available).map(t => (
                <option key={t.id} value={t.id}>{t.username} — {t.specialty || "General"}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleAssign}
            disabled={!selectedMember || !selectedTrainer}
            style={{
              marginTop: 8, width: "100%", padding: "13px",
              background: selectedMember && selectedTrainer ? "linear-gradient(135deg, #2563eb, #0ea5e9)" : "#f3f4f6",
              color: selectedMember && selectedTrainer ? "white" : "#9ca3af",
              border: "none", borderRadius: 12,
              fontFamily: "'Outfit',sans-serif", fontSize: 15, fontWeight: 600,
              cursor: selectedMember && selectedTrainer ? "pointer" : "not-allowed"
            }}
          >
            🔗 Assign Trainer
          </button>
        </div>

        {/* Current assignments */}
        <div className="card">
          <h3 style={{ marginBottom: 18, fontSize: 18 }}>Current Assignments</h3>
          {assignments.length === 0 ? (
            <div style={{ textAlign: "center", padding: 40, color: "#9ca3af" }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>🔗</div>
              No assignments yet.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {assignments.map((a, i) => {
                const member = members.find(m => m.id === a.memberId);
                const trainer = trainers.find(t => t.id === a.trainerId);
                return (
                  <div key={i} style={{ background: "#f9fafb", borderRadius: 12, padding: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: 600, color: "#111827", fontSize: 14 }}>
                        {member?.username} <span style={{ color: "#9ca3af", fontWeight: 400 }}>→</span> {trainer?.username}
                      </div>
                      <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>Assigned {a.date}</div>
                    </div>
                    <span className="badge badge-green">Active</span>
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
