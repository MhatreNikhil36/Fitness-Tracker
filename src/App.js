// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import HomePage from './components/Homepage';
import AuthForm from './components/AuthForm';
import NutritionPage from './components/NutritionPage';
import LogNutritionPage from './components/LogNutritionPage';
import AddGoal from './components/AddGoal';
import DashboardPage from './components/Dashboard';
import GoalsDashboardPage from './components/GoalsDashboardPage'; 
import GoalProgressPage from './components/GoalProgressPage';

const Layout = ({ children }) => {
  const location = useLocation();
  // Hide NavigationBar on the homepage ("/" or "/Homepage")
  const hideNavbar = location.pathname === '/' || location.pathname === '/Homepage' || location.pathname === '/login' || location.pathname === '/signup';
  
  return (
    <>
      {!hideNavbar && <NavigationBar />}
      {children}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/Homepage" element={<HomePage />} />
          <Route path="/login" element={<AuthForm isLogin={true} />} />
          <Route path="/signup" element={<AuthForm isLogin={false} />} />
          <Route path="/nutrition" element={<NutritionPage />} />
          <Route path="/log-nutrition" element={<LogNutritionPage />} />
          <Route path="/goals" element={<GoalsDashboardPage />} />
          <Route path="/addGoal" element={<AddGoal />} />
          <Route path="/goal-progress/:goalId" element={<GoalProgressPage />} />
          <Route path="/Dash" element={<DashboardPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
