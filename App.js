import { useState } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import "./styles/global.css";

import WelcomePage      from "./pages/WelcomePage";
import RoleSelectPage   from "./pages/RoleSelectPage";
import AuthPage         from "./pages/AuthPage";
import MemberDashboard  from "./pages/MemberDashboard";
import AdminDashboard   from "./pages/AdminDashboard";
import TrainerDashboard from "./pages/TrainerDashboard";

function AppRouter() {
  const { currentUser } = useApp();
  const [page, setPage] = useState("welcome");

  if (currentUser) {
    if (currentUser.role === "MEMBER")  return <MemberDashboard />;
    if (currentUser.role === "ADMIN")   return <AdminDashboard />;
    if (currentUser.role === "TRAINER") return <TrainerDashboard />;
  }

  switch (page) {
    case "role-select":   return <RoleSelectPage onNavigate={setPage} />;
    case "member-login":  return <AuthPage role="MEMBER"  onNavigate={setPage} onLoginSuccess={() => {}} />;
    case "admin-login":   return <AuthPage role="ADMIN"   onNavigate={setPage} onLoginSuccess={() => {}} />;
    case "trainer-login": return <AuthPage role="TRAINER" onNavigate={setPage} onLoginSuccess={() => {}} />;
    default:              return <WelcomePage onNavigate={setPage} />;
  }
}

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}