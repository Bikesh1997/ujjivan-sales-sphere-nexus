
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import Dashboard from '@/pages/Dashboard';
import LeadManagement from '@/pages/leads/LeadManagement';
import Customer360 from '@/pages/Customer360';
import Tasks from '@/pages/Tasks';
import Reports from '@/pages/Reports';
import ProtectedRoute from '@/components/ProtectedRoute';
import Layout from '@/components/Layout';
import TeamManagement from '@/pages/TeamManagement';
import TerritoryManagement from '@/pages/TerritoryManagement';
import PortfolioManagement from '@/pages/PortfolioManagement';
import RiskManagement from '@/pages/RiskManagement';
import PlanMyDay from '@/pages/PlanMyDay';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
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
              <Route path="/customers" element={
                <ProtectedRoute>
                  <Layout>
                    <Customer360 />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/plan-my-day" element={
                <ProtectedRoute>
                  <Layout>
                    <PlanMyDay />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/tasks" element={
                <ProtectedRoute>
                  <Layout>
                    <Tasks />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/reports" element={
                <ProtectedRoute>
                  <Layout>
                    <Reports />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/team" element={
                <ProtectedRoute>
                  <Layout>
                    <TeamManagement />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/territory" element={
                <ProtectedRoute>
                  <Layout>
                    <TerritoryManagement />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/portfolio" element={
                <ProtectedRoute>
                  <Layout>
                    <PortfolioManagement />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/risk" element={
                <ProtectedRoute>
                  <Layout>
                    <RiskManagement />
                  </Layout>
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
