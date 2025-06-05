
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import SupervisorDashboard from '@/pages/SupervisorDashboard';
import ProtectedRoute from '@/components/ProtectedRoute';
import Layout from '@/components/Layout';
import NotFound from '@/pages/NotFound';
import Unauthorized from '@/pages/Unauthorized';
import RuleManagement from '@/pages/RuleManagement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
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
