import { useApp } from "../../context/AppContext";

export default function TrainerListPage() {
  const { trainers, getMemberAssignment, currentUser } = useApp();
  const assignment = getMemberAssignment(currentUser?.id);
  const available  = trainers.filter(t => t.available);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Browse Trainers</h1>
          <p>Explore our certified trainers. Your trainer is assigned by the admin.</p>
        </div>
      </div>

      {assignment && (
        <div className="alert alert-success">
          🎯 <strong>You have an assigned trainer!</strong> Assigned on {assignment.date}.
        </div>
      )}

      {available.length === 0 ? (
        <div className="card"><div className="empty-state"><div className="empty-icon">😔</div><h3>No trainers available</h3><p>Check back soon — new trainers are being added.</p></div></div>
      ) : (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))", gap:20 }}>
          {available.map(trainer => {
            const isAssigned = assignment?.trainerId === trainer.id;
            return (
              <div key={trainer.id} style={{ background:"white", borderRadius:20, padding:"26px 22px", border:isAssigned?"2px solid #10b981":"1px solid #e5e7eb", boxShadow:"0 1px 3px rgba(0,0,0,0.06)", position:"relative", transition:"all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 10px 24px rgba(0,0,0,0.09)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.06)"; }}>
                {isAssigned && <div style={{ position:"absolute", top:14, right:14 }}><span className="badge badge-green">Your Trainer</span></div>}
                <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:16 }}>
                  <div style={{ width:58, height:58, borderRadius:"50%", background:"#ecfeff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, border:"2px solid #a5f3fc" }}>{trainer.photo}</div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:17, color:"#111827" }}>{trainer.username}</div>
                    <div style={{ fontSize:13, color:"#0891b2", fontWeight:600 }}>{trainer.specialty || "General Fitness"}</div>
                  </div>
                </div>
                <p style={{ fontSize:13, color:"#6b7280", lineHeight:1.6, marginBottom:14 }}>{trainer.bio || "Passionate trainer dedicated to helping members reach their fitness goals."}</p>
                <div style={{ display:"flex", gap:8 }}>
                  <span className="badge badge-cyan">⭐ {trainer.experience}y exp</span>
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