// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import HomePage from "./components/Homepage";
import NutritionPage from "./components/NutritionPage";
import LogNutritionPage from "./components/LogNutritionPage";
import AddGoal from "./components/AddGoal";
import DashboardPage from "./components/Dashboard";
import GoalsDashboardPage from "./components/GoalsDashboardPage";
import GoalProgressPage from "./components/GoalProgressPage";
import NotFoundPage from "./components/NotFound";
import LogActivityPage from "./components/LogActivityPage";
import Activity from "./components/activity";
import AddExercisePage from "./components/Admin/AddExercisePage";
import AddWorkoutPage from "./components/Admin/AddWorkoutPage";
import AddAiPromptPage from "./components/Admin/AddAiPromptPage";
import AdminHome from "./components/Admin/AdminHome";
import Login from "./components/NewComponents/Login";
import Signup from "./components/NewComponents/Signup";
import ProfileSettings from "./components/NewComponents/ProfileSettings";
import AccountSettings from "./components/NewComponents/AccountSettings";
import DisplaySettings from "./components/NewComponents/DisplaySettings";
import HomeNav from "./components/NewComponents/HomeNav";
import RestNav from "./components/NewComponents/RestNav";
import AdminNav from "./components/NewComponents/AdminNav";

const Layout = ({ children }) => {
  const location = useLocation();
  // Use HomeNav for specific routes, AdminNav for admin routes, otherwise use RestNav
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
