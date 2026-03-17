import { useState } from "react";
import Sidebar from "../components/Sidebar";
import TrainerHome from "./trainer/TrainerHome";
import TrainerProfilePage from "./trainer/TrainerProfilePage";
import TrainerMembersPage from "./trainer/TrainerMembersPage";
import CreateWorkoutPage from "./trainer/CreateWorkoutPage";

export default function TrainerDashboard() {
  const [page, setPage] = useState("trainer-dashboard");

  const renderPage = () => {
    switch (page) {
      case "trainer-profile": return <TrainerProfilePage />;
      case "trainer-members": return <TrainerMembersPage onNavigate={setPage} />;
      case "create-workout": return <CreateWorkoutPage />;
      default: return <TrainerHome onNavigate={setPage} />;
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