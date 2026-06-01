// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import BasketTrackingPage from './pages/BasketTrackingPage';
import CourseHistoryPage from './pages/CourseHistoryPage';
import SemesterPlannerPage from './pages/SemesterPlannerPage';
import ProgramSetupPage from './pages/ProgramSetupPage';
import HonoursMinorPage from './pages/HonoursMinorPage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/setup" element={
              <ProtectedRoute>
                <ProgramSetupPage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/basket-tracking" element={
              <ProtectedRoute>
                <BasketTrackingPage />
              </ProtectedRoute>
            } />
            <Route path="/course-history" element={
              <ProtectedRoute>
                <CourseHistoryPage />
              </ProtectedRoute>
            } />
            <Route path="/semester-planner" element={
              <ProtectedRoute>
                <SemesterPlannerPage />
              </ProtectedRoute>
            } />
            <Route path="/honours-minor" element={
              <ProtectedRoute>
                <HonoursMinorPage />
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
