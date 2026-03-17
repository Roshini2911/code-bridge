import { useState } from "react";

const mockTrainers = [
  { id: 1, name: "Priya Sharma", specialty: "Yoga" },
  { id: 2, name: "Rahul Verma", specialty: "HIIT & Cardio" },
  { id: 3, name: "Sneha Patil", specialty: "Zumba & Dance" },
  { id: 4, name: "Arjun Nair", specialty: "Strength & Boxing" },
];

const mockClasses = [
  { id: 1, className: "Morning Yoga", schedule: "2026-03-20T07:00:00", capacity: 20, trainerName: "Priya Sharma", classStatus: "OPEN" },
  { id: 2, className: "HIIT Blast", schedule: "2026-03-20T09:00:00", capacity: 15, trainerName: "Rahul Verma", classStatus: "FULL" },
  { id: 3, className: "Zumba Dance", schedule: "2026-03-21T10:00:00", capacity: 25, trainerName: "Sneha Patil", classStatus: "OPEN" },
  { id: 4, className: "Core Strength", schedule: "2026-03-21T17:00:00", capacity: 10, trainerName: "Arjun Nair", classStatus: "OPEN" },
  { id: 5, className: "Spinning", schedule: "2026-03-22T06:30:00", capacity: 12, trainerName: "Rahul Verma", classStatus: "FULL" },
];

const AdminClassSchedulePage = () => {
  const [classes, setClasses] = useState(mockClasses);
  const [showForm, setShowForm] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    className: "",
    schedule: "",
    capacity: "",
    trainerId: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    if (!form.className || !form.schedule || !form.capacity || !form.trainerId) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    const trainer = mockTrainers.find((t) => t.id === parseInt(form.trainerId));
    const newClass = {
      id: classes.length + 1,
      className: form.className,
      schedule: form.schedule,
      capacity: parseInt(form.capacity),
      trainerName: trainer?.name || "Unknown",
      classStatus: "OPEN",
    };

    setClasses((prev) => [newClass, ...prev]);
    setSuccessMsg(`Class "${form.className}" scheduled successfully!`);
    setForm({ className: "", schedule: "", capacity: "", trainerId: "" });
    setShowForm(false);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const formatDateTime = (dt) =>
    new Date(dt).toLocaleString("en-IN", {
      weekday: "short", month: "short", day: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

  const inputStyle = {
    width: "100%", padding: "10px 14px", borderRadius: "8px",
    border: "1px solid #cbd5e1", fontSize: "0.9rem", outline: "none",
    boxSizing: "border-box", background: "#f8fafc",
  };

  const labelStyle = {
    display: "block", marginBottom: "6px", fontSize: "0.85rem", fontWeight: 600, color: "#374151",
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", padding: "28px", maxWidth: "1100px", margin: "0 auto", background: "#f8fafc", minHeight: "100vh" }}>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontSize: "1.9rem", fontWeight: 800, color: "#1e293b", margin: 0 }}>🗓️ Class Scheduling</h2>
          <p style={{ color: "#64748b", marginTop: "6px", fontSize: "0.95rem" }}>Schedule and manage all fitness classes</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setErrorMsg(""); }}
          style={{
            padding: "10px 22px", background: showForm ? "#f1f5f9" : "#6366f1",
            color: showForm ? "#475569" : "#fff", border: "none", borderRadius: "8px",
            fontWeight: 600, cursor: "pointer", fontSize: "0.9rem",
          }}
        >
          {showForm ? "✕ Cancel" : "+ Schedule Class"}
        </button>
      </div>

      <div style={{ display: "flex", gap: "14px", marginBottom: "24px", flexWrap: "wrap" }}>
        {[
          { label: "Total Classes", value: classes.length, color: "#6366f1" },
          { label: "Open", value: classes.filter((c) => c.classStatus === "OPEN").length, color: "#10b981" },
          { label: "Full", value: classes.filter((c) => c.classStatus === "FULL").length, color: "#ef4444" },
          { label: "Trainers", value: mockTrainers.length, color: "#f59e0b" },
        ].map((s) => (
          <div key={s.label} style={{ background: "#fff", borderRadius: "12px", padding: "16px 22px", border: "1px solid #e2e8f0", minWidth: "130px" }}>
            <div style={{ fontSize: "1.6rem", fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: "0.8rem", color: "#94a3b8", fontWeight: 600, marginTop: "2px" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {successMsg && (
        <div style={{ background: "#d1fae5", color: "#065f46", padding: "12px 16px", borderRadius: "10px", marginBottom: "16px", fontWeight: 600 }}>
          ✅ {successMsg}
        </div>
      )}
      {errorMsg && (
        <div style={{ background: "#fee2e2", color: "#991b1b", padding: "12px 16px", borderRadius: "10px", marginBottom: "16px", fontWeight: 600 }}>
          ⚠️ {errorMsg}
        </div>
      )}

      {showForm && (
        <div style={{ background: "#fff", borderRadius: "14px", padding: "24px", marginBottom: "28px", border: "1px solid #e2e8f0", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <h3 style={{ margin: "0 0 20px 0", fontSize: "1.1rem", fontWeight: 700, color: "#1e293b" }}>New Fitness Class</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
              <div>
                <label style={labelStyle}>Class Name</label>
                <input name="className" value={form.className} onChange={handleChange} placeholder="e.g. Morning Yoga" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Date & Time</label>
                <input type="datetime-local" name="schedule" value={form.schedule} onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Capacity</label>
                <input type="number" name="capacity" value={form.capacity} onChange={handleChange} placeholder="Max members" min="1" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Assign Trainer</label>
                <select name="trainerId" value={form.trainerId} onChange={handleChange} style={inputStyle}>
                  <option value="">Select a trainer</option>
                  {mockTrainers.map((t) => (
                    <option key={t.id} value={t.id}>{t.name} — {t.specialty}</option>
                  ))}
                </select>
              </div>
            </div>
            <button type="submit" style={{ marginTop: "20px", padding: "11px 28px", background: "#6366f1", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, cursor: "pointer", fontSize: "0.95rem" }}>
              Schedule Class
            </button>
          </form>
        </div>
      )}

      <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e2e8f0", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9" }}>
          <h3 style={{ margin: 0, fontWeight: 700, color: "#1e293b" }}>
            All Classes <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "#94a3b8" }}>({classes.length} total)</span>
          </h3>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {["#", "Class Name", "Schedule", "Trainer", "Capacity", "Status"].map((h) => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", color: "#64748b", fontWeight: 600, borderBottom: "1px solid #e2e8f0" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {classes.map((cls, i) => (
                <tr key={cls.id} style={{ borderBottom: "1px solid #f1f5f9" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#fafbff")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "13px 16px", color: "#94a3b8" }}>{i + 1}</td>
                  <td style={{ padding: "13px 16px", fontWeight: 700, color: "#1e293b" }}>{cls.className}</td>
                  <td style={{ padding: "13px 16px", color: "#475569" }}>{formatDateTime(cls.schedule)}</td>
                  <td style={{ padding: "13px 16px", color: "#475569" }}>{cls.trainerName}</td>
                  <td style={{ padding: "13px 16px", color: "#475569" }}>{cls.capacity}</td>
                  <td style={{ padding: "13px 16px" }}>
                    <span style={{
                      background: cls.classStatus === "OPEN" ? "#d1fae5" : cls.classStatus === "FULL" ? "#fee2e2" : "#f3f4f6",
                      color: cls.classStatus === "OPEN" ? "#065f46" : cls.classStatus === "FULL" ? "#991b1b" : "#6b7280",
                      padding: "3px 12px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 600,
                    }}>
                      {cls.classStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminClassSchedulePage;