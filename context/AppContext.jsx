import { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null); // { id, username, role }

  // Simulated data stores
  const [members, setMembers] = useState([
    { id: 1, username: "alice", password: "pass", email: "alice@email.com", subscription: null, assignedTrainer: null, workoutPlan: null }
  ]);
  const [trainers, setTrainers] = useState([
    { id: 1, username: "bob", password: "pass", email: "bob@email.com", specialty: "Strength & Conditioning", bio: "10 years experience in strength training.", experience: 10, available: true, photo: "💪" },
    { id: 2, username: "carol", password: "pass", email: "carol@email.com", specialty: "Yoga & Flexibility", bio: "Certified yoga instructor.", experience: 6, available: true, photo: "🧘" }
  ]);
  const [admins] = useState([
    { id: 1, username: "admin", password: "admin123", email: "admin@gymflow.com" }
  ]);
  const [subscriptionPlans] = useState([
    { id: 1, name: "Basic", price: 29, duration: 1, features: ["Gym Access", "Locker Room"] },
    { id: 2, name: "Standard", price: 59, duration: 3, features: ["Gym Access", "Locker Room", "Group Classes", "Nutrition Guide"] },
    { id: 3, name: "Premium", price: 99, duration: 6, features: ["Gym Access", "Locker Room", "Group Classes", "Nutrition Guide", "Personal Trainer", "Spa Access"] }
  ]);
  const [assignments, setAssignments] = useState([]); // { memberId, trainerId, date }
  const [workoutPlans, setWorkoutPlans] = useState([]); // { id, trainerId, memberId, title, description, difficulty }

  // Auth functions
  const login = (username, password, role) => {
    let userList = role === "MEMBER" ? members : role === "TRAINER" ? trainers : admins;
    const user = userList.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser({ ...user, role });
      return { success: true };
    }
    return { success: false, error: "Invalid username or password." };
  };

  const register = (data, role) => {
    if (role === "MEMBER") {
      const newMember = { id: members.length + 1, username: data.username, password: data.password, email: data.email || "", subscription: null, assignedTrainer: null, workoutPlan: null };
      setMembers(prev => [...prev, newMember]);
    } else if (role === "TRAINER") {
      const newTrainer = { id: trainers.length + 1, username: data.username, password: data.password, email: data.email || "", specialty: "", bio: "", experience: 0, available: true, photo: "🏋️" };
      setTrainers(prev => [...prev, newTrainer]);
    }
    return { success: true };
  };

  const logout = () => setCurrentUser(null);

  // Member actions
  const subscribePlan = (memberId, planId) => {
    setMembers(prev => prev.map(m => m.id === memberId ? { ...m, subscription: planId } : m));
  };

  // Admin actions
  const assignTrainer = (memberId, trainerId) => {
    setAssignments(prev => {
      const filtered = prev.filter(a => a.memberId !== memberId);
      return [...filtered, { memberId, trainerId, date: new Date().toLocaleDateString() }];
    });
    setMembers(prev => prev.map(m => m.id === memberId ? { ...m, assignedTrainer: trainerId } : m));
  };

  // Trainer actions
  const updateTrainerProfile = (trainerId, data) => {
    setTrainers(prev => prev.map(t => t.id === trainerId ? { ...t, ...data } : t));
    if (currentUser?.id === trainerId) setCurrentUser(prev => ({ ...prev, ...data }));
  };

  const createWorkoutPlan = (plan) => {
    const newPlan = { ...plan, id: workoutPlans.length + 1, createdAt: new Date().toLocaleDateString() };
    setWorkoutPlans(prev => [...prev, newPlan]);
    setMembers(prev => prev.map(m => m.id === plan.memberId ? { ...m, workoutPlan: newPlan.id } : m));
  };

  // Getters
  const getMember = (id) => members.find(m => m.id === id);
  const getTrainer = (id) => trainers.find(t => t.id === id);
  const getPlan = (id) => subscriptionPlans.find(p => p.id === id);
  const getMemberAssignment = (memberId) => assignments.find(a => a.memberId === memberId);
  const getTrainerAssignments = (trainerId) => assignments.filter(a => a.trainerId === trainerId);
  const getMemberWorkoutPlan = (memberId) => workoutPlans.find(wp => wp.memberId === memberId);
  const getTrainerWorkoutPlans = (trainerId) => workoutPlans.filter(wp => wp.trainerId === trainerId);

  return (
    <AppContext.Provider value={{
      currentUser, login, logout, register,
      members, trainers, admins, subscriptionPlans, assignments, workoutPlans,
      subscribePlan, assignTrainer, updateTrainerProfile, createWorkoutPlan,
      getMember, getTrainer, getPlan, getMemberAssignment, getTrainerAssignments,
      getMemberWorkoutPlan, getTrainerWorkoutPlans
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
