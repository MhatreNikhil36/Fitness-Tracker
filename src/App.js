// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import NutritionPage from './components/NutritionPage';
import LogNutritionPage from './components/LogNutritionPage';
import GoalsPage from './components/AddGoal';
import DashboardPage from './components/Dashboard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthForm isLogin={true} />} />
        <Route path="/signup" element={<AuthForm isLogin={false} />} />
        <Route path="/nutrition" element={<NutritionPage />} />
        <Route path="/log-nutrition" element={<LogNutritionPage />} />
        <Route path="/addGoal" element={<GoalsPage />} />
        <Route path="/Dash" element={<DashboardPage />} />
        <Route path="/" element={<AuthForm isLogin={true} />} />
      </Routes>
    </Router>
  );
}

export default App;
