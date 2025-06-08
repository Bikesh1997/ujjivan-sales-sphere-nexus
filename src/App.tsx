
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import Dashboard from '@/pages/Dashboard';
import LeadManagement from '@/pages/leads/LeadManagement';
import SupervisorDashboard from '@/pages/SupervisorDashboard';
import ProtectedRoute from '@/components/ProtectedRoute';
import Layout from '@/components/Layout';
import MyKRA from '@/pages/MyKRA';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginForm />} />
          
          {/* Protected routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/my-kra" element={
            <ProtectedRoute>
              <Layout>
                <MyKRA />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/leads" element={
            <ProtectedRoute>
              <Layout>
                <LeadManagement />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/supervisor" element={
            <ProtectedRoute>
              <Layout>
                <SupervisorDashboard />
              </Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
