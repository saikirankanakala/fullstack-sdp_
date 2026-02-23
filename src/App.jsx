import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AppLayout } from './layouts/AppLayout';

// Pages
import LoginPage from './pages/auth/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import PostJobPage from './pages/admin/PostJobPage';
import ManageApplicationsPage from './pages/admin/ManageApplicationsPage';
import TrackHoursPage from './pages/admin/TrackHoursPage';
import BrowseJobsPage from './pages/student/BrowseJobsPage';
import MyApplicationsPage from './pages/student/MyApplicationsPage';
import LogHoursPage from './pages/student/LogHoursPage';
import FeedbackPage from './pages/student/FeedbackPage';

function ProtectedRoute({ children, requiredRole }) {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/login" replace />;
  if (requiredRole && currentUser.role !== requiredRole) {
    return <Navigate to={currentUser.role === 'admin' ? '/admin/dashboard' : '/student/jobs'} replace />;
  }
  return children;
}

function RootRedirect() {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/login" replace />;
  return <Navigate to={currentUser.role === 'admin' ? '/admin/dashboard' : '/student/jobs'} replace />;
}

function AppRoutes() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<RootRedirect />} />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="post-job" element={<PostJobPage />} />
          <Route path="applications" element={<ManageApplicationsPage />} />
          <Route path="hours" element={<TrackHoursPage />} />
        </Route>

        {/* Student routes */}
        <Route
          path="/student"
          element={
            <ProtectedRoute requiredRole="student">
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/student/jobs" replace />} />
          <Route path="jobs" element={<BrowseJobsPage />} />
          <Route path="applications" element={<MyApplicationsPage />} />
          <Route path="log-hours" element={<LogHoursPage />} />
          <Route path="feedback" element={<FeedbackPage />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <AppProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </AppProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
