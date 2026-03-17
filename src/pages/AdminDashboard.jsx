import { useState } from "react";
import Sidebar from "../components/Sidebar";
import AdminHome from "./admin/AdminHome";
import AssignTrainerPage from "./admin/AssignTrainerPage";
import ReportsPage from "./admin/ReportsPage";
import AdminClassSchedulePage from "./AdminClassSchedulePage";

export default function AdminDashboard() {
  const [page, setPage] = useState("admin-dashboard");

  const renderPage = () => {
    switch (page) {
      case "assign-trainer": return <AssignTrainerPage />;
      case "reports": return <ReportsPage />;
      case "fitness-create": return <AdminClassSchedulePage />;
      case "fitness-view": return <AdminClassSchedulePage />;
      case "fitness-classes": return <AdminClassSchedulePage />;
      default: return <AdminHome onNavigate={setPage} />;
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar currentPage={page} onNavigate={setPage} />
      <main style={{ marginLeft: 240, flex: 1, padding: "36px 40px", minHeight: "100vh", background: "#f9fafb" }}>
        {renderPage()}
      </main>
    </div>
  );
}