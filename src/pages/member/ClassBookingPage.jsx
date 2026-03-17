import { useState } from "react";

const mockClasses = [
  { id: 1, className: "Morning Yoga", schedule: "2026-03-20T07:00:00", capacity: 20, availableSlots: 8, trainerName: "Priya Sharma", classStatus: "OPEN" },
  { id: 2, className: "HIIT Blast", schedule: "2026-03-20T09:00:00", capacity: 15, availableSlots: 0, trainerName: "Rahul Verma", classStatus: "FULL" },
  { id: 3, className: "Zumba Dance", schedule: "2026-03-21T10:00:00", capacity: 25, availableSlots: 12, trainerName: "Sneha Patil", classStatus: "OPEN" },
  { id: 4, className: "Core Strength", schedule: "2026-03-21T17:00:00", capacity: 10, availableSlots: 5, trainerName: "Arjun Nair", classStatus: "OPEN" },
  { id: 5, className: "Spinning", schedule: "2026-03-22T06:30:00", capacity: 12, availableSlots: 0, trainerName: "Rahul Verma", classStatus: "FULL" },
  { id: 6, className: "Pilates", schedule: "2026-03-22T11:00:00", capacity: 15, availableSlots: 7, trainerName: "Priya Sharma", classStatus: "OPEN" },
  { id: 7, className: "Boxing Basics", schedule: "2026-03-23T18:00:00", capacity: 10, availableSlots: 3, trainerName: "Arjun Nair", classStatus: "OPEN" },
  { id: 8, className: "Stretch & Flex", schedule: "2026-03-24T08:00:00", capacity: 20, availableSlots: 0, trainerName: "Sneha Patil", classStatus: "CANCELLED" },
];

const ClassBookingPage = () => {
  const [classes, setClasses] = useState(mockClasses);
  const [filter, setFilter] = useState("ALL");
  const [bookedIds, setBookedIds] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleBook = (cls) => {
    setSuccessMsg("");
    setErrorMsg("");

    if (bookedIds.includes(cls.id)) {
      setErrorMsg(`You've already booked "${cls.className}".`);
      return;
    }

    setBookedIds((prev) => [...prev, cls.id]);
    setClasses((prev) =>
      prev.map((c) =>
        c.id === cls.id
          ? {
              ...c,
              availableSlots: c.availableSlots - 1,
              classStatus: c.availableSlots - 1 === 0 ? "FULL" : c.classStatus,
            }
          : c
      )
    );
    setSuccessMsg(`Successfully booked "${cls.className}"! 🎉`);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const filtered =
    filter === "ALL" ? classes : classes.filter((c) => c.classStatus === filter);

  const formatDateTime = (dt) =>
    new Date(dt).toLocaleString("en-IN", {
      weekday: "short", month: "short", day: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

  const statusBadge = (status) => {
    const map = {
      OPEN: { bg: "#d1fae5", color: "#065f46" },
      FULL: { bg: "#fee2e2", color: "#991b1b" },
      CANCELLED: { bg: "#f3f4f6", color: "#6b7280" },
    };
    const s = map[status] || map["OPEN"];
    return (
      <span style={{ backgroundColor: s.bg, color: s.color, padding: "3px 12px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 600 }}>
        {status}
      </span>
    );
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", padding: "28px", maxWidth: "1100px", margin: "0 auto", background: "#f8fafc", minHeight: "100vh" }}>

      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "1.9rem", fontWeight: 800, color: "#1e293b", margin: 0 }}>🗓️ Fitness Classes</h2>
        <p style={{ color: "#64748b", marginTop: "6px", fontSize: "0.95rem" }}>Browse and book upcoming fitness classes</p>
      </div>

      {successMsg && (
        <div style={{ background: "#d1fae5", color: "#065f46", padding: "12px 16px", borderRadius: "10px", marginBottom: "16px", fontWeight: 600 }}>
          ✅ {successMsg}
        </div>
      )}
      {errorMsg && (
        <div style={{ background: "#fff7ed", color: "#c2410c", padding: "12px 16px", borderRadius: "10px", marginBottom: "16px", fontWeight: 600 }}>
          ⚠️ {errorMsg}
        </div>
      )}

      <div style={{ display: "flex", gap: "14px", marginBottom: "24px", flexWrap: "wrap" }}>
        {[
          { label: "Total Classes", value: classes.length, color: "#6366f1" },
          { label: "Open", value: classes.filter((c) => c.classStatus === "OPEN").length, color: "#10b981" },
          { label: "Full", value: classes.filter((c) => c.classStatus === "FULL").length, color: "#ef4444" },
          { label: "My Bookings", value: bookedIds.length, color: "#f59e0b" },
        ].map((s) => (
          <div key={s.label} style={{ background: "#fff", borderRadius: "12px", padding: "16px 22px", border: "1px solid #e2e8f0", minWidth: "130px" }}>
            <div style={{ fontSize: "1.6rem", fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: "0.8rem", color: "#94a3b8", fontWeight: 600, marginTop: "2px" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
        {["ALL", "OPEN", "FULL", "CANCELLED"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "7px 20px", borderRadius: "20px", border: filter === f ? "none" : "1px solid #e2e8f0",
              cursor: "pointer", fontWeight: 600, fontSize: "0.85rem",
              background: filter === f ? "#6366f1" : "#fff",
              color: filter === f ? "#fff" : "#475569",
              boxShadow: filter === f ? "0 2px 8px rgba(99,102,241,0.3)" : "none",
              transition: "all 0.2s",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#94a3b8" }}>
          <div style={{ fontSize: "3rem" }}>📭</div>
          <p style={{ marginTop: "12px" }}>No classes found for this filter.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "18px" }}>
          {filtered.map((cls) => {
            const isBooked = bookedIds.includes(cls.id);
            const fillPct = ((cls.capacity - cls.availableSlots) / cls.capacity) * 100;
            return (
              <div
                key={cls.id}
                style={{
                  background: "#fff", borderRadius: "14px", padding: "22px",
                  border: isBooked ? "2px solid #6366f1" : "1px solid #e2e8f0",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  position: "relative",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.06)"; }}
              >
                {isBooked && (
                  <div style={{ position: "absolute", top: "14px", right: "14px", background: "#6366f1", color: "#fff", fontSize: "0.7rem", fontWeight: 700, padding: "2px 8px", borderRadius: "10px" }}>
                    BOOKED
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
                  <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700, color: "#1e293b", paddingRight: isBooked ? "64px" : "0" }}>
                    {cls.className}
                  </h3>
                  {!isBooked && statusBadge(cls.classStatus)}
                </div>
                <div style={{ color: "#64748b", fontSize: "0.875rem", lineHeight: "2" }}>
                  <div>🕐 {formatDateTime(cls.schedule)}</div>
                  <div>👤 <strong>{cls.trainerName}</strong></div>
                  <div>
                    🪑 <strong style={{ color: cls.availableSlots === 0 ? "#ef4444" : "#10b981" }}>
                      {cls.availableSlots}
                    </strong> / {cls.capacity} slots available
                  </div>
                </div>
                <div style={{ marginTop: "12px", background: "#f1f5f9", borderRadius: "6px", height: "6px", overflow: "hidden" }}>
                  <div style={{
                    height: "100%", borderRadius: "6px",
                    width: `${fillPct}%`,
                    background: fillPct === 100 ? "#ef4444" : "#6366f1",
                    transition: "width 0.4s ease",
                  }} />
                </div>
                <button
                  onClick={() => handleBook(cls)}
                  disabled={cls.classStatus !== "OPEN" || isBooked}
                  style={{
                    marginTop: "16px", width: "100%", padding: "10px", borderRadius: "8px",
                    border: "none",
                    cursor: cls.classStatus === "OPEN" && !isBooked ? "pointer" : "not-allowed",
                    fontWeight: 600, fontSize: "0.9rem",
                    background: isBooked ? "#ede9fe" : cls.classStatus === "OPEN" ? "#6366f1" : "#f1f5f9",
                    color: isBooked ? "#6366f1" : cls.classStatus === "OPEN" ? "#fff" : "#94a3b8",
                    transition: "background 0.2s",
                  }}
                >
                  {isBooked ? "✓ Booked" : cls.classStatus === "OPEN" ? "Book Spot" : cls.classStatus === "FULL" ? "Class Full" : "Unavailable"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ClassBookingPage;