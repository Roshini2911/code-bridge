import { useState } from "react";
import Sidebar from "../components/Sidebar";
import SubscriptionPage from "./member/SubscriptionPage";
import TrainerListPage from "./member/TrainerListPage";
import WorkoutPlansPage from "./member/WorkoutPlansPage";
import MemberHome from "./member/MemberHome";

export default function MemberDashboard() {
  const [page, setPage] = useState("member-dashboard");

  const renderPage = () => {
    switch (page) {
      case "subscription": return <SubscriptionPage />;
      case "trainers": return <TrainerListPage />;
      case "workout": return <WorkoutPlansPage />;
      default: return <MemberHome onNavigate={setPage} />;
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