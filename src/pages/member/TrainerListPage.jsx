import { useApp } from "../../context/AppContext";

export default function TrainerListPage() {
  const { trainers, getMemberAssignment, currentUser } = useApp();
  const assignment = getMemberAssignment(currentUser?.id);
  const available = trainers.filter(t => t.available);

  return (
    <div>
      <div className="page-header">
        <h1>Browse Trainers</h1>
        <p>Find your perfect fitness coach. Your trainer is assigned by the admin.</p>
      </div>

      {assignment && (
        <div style={{ background: "#f0fdf4", border: "1.5px solid #a7f3d0", borderRadius: 14, padding: 18, marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 24 }}>🎯</span>
          <div>
            <div style={{ fontWeight: 700, color: "#065f46" }}>You have an assigned trainer!</div>
            <div style={{ fontSize: 14, color: "#10b981" }}>Assigned on {assignment.date}</div>
          </div>
        </div>
      )}

      {available.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: 48 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>😔</div>
          <p style={{ color: "#6b7280" }}>No trainers available right now. Check back soon!</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 22 }}>
          {available.map(trainer => {
            const isAssigned = assignment?.trainerId === trainer.id;
            return (
              <div key={trainer.id} style={{
                background: "white", borderRadius: 18, padding: 28,
                border: isAssigned ? "2px solid #10b981" : "1px solid #e5e7eb",
                boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                position: "relative"
              }}>
                {isAssigned && (
                  <div style={{
                    position: "absolute", top: 14, right: 14,
                    background: "#d1fae5", color: "#065f46",
                    fontSize: 11, fontWeight: 700, padding: "3px 10px",
                    borderRadius: 99
                  }}>YOUR TRAINER</div>
                )}
                <div style={{
                  width: 60, height: 60, borderRadius: "50%",
                  background: "linear-gradient(135deg, #eff6ff, #e0f2fe)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 28, marginBottom: 16
                }}>{trainer.photo}</div>
                <div style={{ fontWeight: 700, fontSize: 18, color: "#111827", marginBottom: 4 }}>{trainer.username}</div>
                <div style={{ fontSize: 13, color: "#2563eb", fontWeight: 600, marginBottom: 8 }}>{trainer.specialty || "General Fitness"}</div>
                <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 12, lineHeight: 1.5 }}>{trainer.bio || "Passionate fitness trainer dedicated to your success."}</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <span className="badge badge-blue">⭐ {trainer.experience || 0}y exp</span>
                  <span className="badge badge-green">Available</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
