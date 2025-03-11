// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import HomePage from "./modules/Homepage";
import NutritionPage from "./modules/NutritionPage";
import LogNutritionPage from "./modules/LogNutritionPage";
import AddGoal from "./modules/AddGoal";
import DashboardPage from "./modules/Dashboard";
import GoalsDashboardPage from "./modules/GoalsDashboardPage";
import GoalProgressPage from "./modules/GoalProgressPage";
import NotFoundPage from "./modules/NotFound";
import LogActivityPage from "./modules/LogActivityPage";
import Activity from "./modules/activity";
import AddExercisePage from "./modules/Admin/AddExercisePage";
import AddWorkoutPage from "./modules/Admin/AddWorkoutPage";
import AddAiPromptPage from "./modules/Admin/AddAiPromptPage";
import AdminHome from "./modules/Admin/AdminHome";
import Login from "./modules/Login";
import Signup from "./modules/Signup";
import ProfileSettings from "./modules/ProfileSettings";
import AccountSettings from "./modules/AccountSettings";
import DisplaySettings from "./modules/DisplaySettings";
import HomeNav from "./components/HomeNav";
import RestNav from "./components/RestNav";
import AdminNav from "./components/AdminNav";

const Layout = ({ children }) => {
  const location = useLocation();
  const useHomeNav =
    location.pathname === "/" ||
    location.pathname === "/Homepage" ||
    location.pathname === "/login" ||
    location.pathname === "/signup";
  const useAdminNav = location.pathname.startsWith("/admin");

  return (
    <>
      {useHomeNav ? <HomeNav /> : useAdminNav ? <AdminNav /> : <RestNav />}
      {children}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login isLogin={true} />} />
          <Route path="/signup" element={<Signup isLogin={false} />} />
          <Route path="/settings/profile" element={<ProfileSettings />} />
          <Route path="/settings/account" element={<AccountSettings />} />
          <Route path="/settings/display" element={<DisplaySettings />} />
          <Route path="/nutrition" element={<NutritionPage />} />
          <Route path="/log-nutrition" element={<LogNutritionPage />} />
          <Route path="/goals" element={<GoalsDashboardPage />} />
          <Route path="/addGoal" element={<AddGoal />} />
          <Route path="/goal-progress/:goalId" element={<GoalProgressPage />} />
          <Route path="/dash" element={<DashboardPage />} />
          <Route path="/logactivity" element={<LogActivityPage />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/admin/add-exercise" element={<AddExercisePage />} />
          <Route path="/admin/add-workout" element={<AddWorkoutPage />} />
          <Route path="/admin/add-Ai" element={<AddAiPromptPage />} />
          <Route path="/admin" element={<AdminHome />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
