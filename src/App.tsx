
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import SupervisorDashboard from '@/pages/SupervisorDashboard';
import ProtectedRoute from '@/components/ProtectedRoute';
import Layout from '@/components/Layout';
import NotFound from '@/pages/NotFound';
import Unauthorized from '@/pages/Unauthorized';
import RuleManagement from '@/pages/RuleManagement';
import { useAuth } from '@/contexts/AuthContext';

function App() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} 
        />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/supervisor" 
          element={
            <ProtectedRoute requiredRole="supervisor">
              <Layout>
                <SupervisorDashboard />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/rules" 
          element={
            <ProtectedRoute requiredRole="supervisor">
              <Layout>
                <RuleManagement />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
