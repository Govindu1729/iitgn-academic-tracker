// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';

// Lazy load pages - only loaded when needed
const LandingPage = lazy(() => import('./pages/LandingPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const BasketTrackingPage = lazy(() => import('./pages/BasketTrackingPage'));
const CourseHistoryPage = lazy(() => import('./pages/CourseHistoryPage'));
const SemesterPlannerPage = lazy(() => import('./pages/SemesterPlannerPage'));
const ProgramSetupPage = lazy(() => import('./pages/ProgramSetupPage'));
const HonoursMinorPage = lazy(() => import('./pages/HonoursMinorPage'));

// Loading component
const PageLoader = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Toaster position="top-right" />
          <Suspense fallback={<PageLoader />}>
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
          </Suspense>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;