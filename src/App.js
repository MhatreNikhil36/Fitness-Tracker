import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
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
import AccessDeniedPage from "./modules/AccessDenied";
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
import ResetPassword from "./modules/ResetPassword";
import ForgotPassword from "./modules/ForgotPassword";
import ResetPasswordToken from "./modules/ResetPasswordToken";
import HomeNav from "./components/HomeNav";
import RestNav from "./components/RestNav";
import AdminNav from "./components/AdminNav";
import Contact from "./modules/Contact";
import AboutUs from "./modules/About";
import ScrollToTop from "./components/ScrollToTop";
import Messages from "./modules/Messages";
import AdminMessagesPage from "./modules/Admin/AdminMessagesPage";

const getUserFromLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch {
    return null;
  }
};

const PrivateRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem("token");
  const user = getUserFromLocalStorage();

  if (!token) return <Navigate to="/login" replace />;
  if (adminOnly && !user?.is_admin) return <Navigate to="/denied" replace />;

  return children;
};

const PublicOnlyRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = getUserFromLocalStorage();

  if (token && user?.is_admin) return <Navigate to="/admin" replace />;
  if (token) return <Navigate to="/settings/profile" replace />;

  return children;
};

const Layout = ({ children }) => {
  const location = useLocation();
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  const token = localStorage.getItem("token");
  const isAdmin = token && user?.is_admin;

  useEffect(() => {
    const storedUser = (() => {
      try {
        return JSON.parse(localStorage.getItem("user")) || null;
      } catch {
        return null;
      }
    })();
    setUser(storedUser);
  }, [location.pathname]);

  const navToRender = isAdmin ? (
    <AdminNav />
  ) : token ? (
    <RestNav />
  ) : (
    <HomeNav />
  );

  return (
    <>
      {navToRender}
      {children}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              <PublicOnlyRoute>
                <Login isLogin={true} />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicOnlyRoute>
                <Signup isLogin={false} />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicOnlyRoute>
                <ForgotPassword />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <PublicOnlyRoute>
                <ResetPasswordToken />
              </PublicOnlyRoute>
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/messages" element={<Messages />} />
          <Route
            path="/settings/profile"
            element={
              <PrivateRoute>
                <ProfileSettings />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings/account"
            element={
              <PrivateRoute>
                <AccountSettings />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings/display"
            element={
              <PrivateRoute>
                <DisplaySettings />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings/reset-password"
            element={
              <PrivateRoute>
                <ResetPassword />
              </PrivateRoute>
            }
          />
          <Route
            path="/nutrition"
            element={
              <PrivateRoute>
                <NutritionPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/log-nutrition"
            element={
              <PrivateRoute>
                <LogNutritionPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/goals"
            element={
              <PrivateRoute>
                <GoalsDashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/addGoal"
            element={
              <PrivateRoute>
                <AddGoal />
              </PrivateRoute>
            }
          />
          <Route
            path="/goal-progress/:goalId"
            element={
              <PrivateRoute>
                <GoalProgressPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/dash"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/logactivity"
            element={
              <PrivateRoute>
                <LogActivityPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/activity"
            element={
              <PrivateRoute>
                <Activity />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute adminOnly>
                <AdminHome />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/messages"
            element={
              <PrivateRoute adminOnly>
                <AdminMessagesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/add-exercise"
            element={
              <PrivateRoute adminOnly>
                <AddExercisePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/add-workout"
            element={
              <PrivateRoute adminOnly>
                <AddWorkoutPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/add-Ai"
            element={
              <PrivateRoute adminOnly>
                <AddAiPromptPage />
              </PrivateRoute>
            }
          />
          <Route path="/denied" element={<AccessDeniedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
