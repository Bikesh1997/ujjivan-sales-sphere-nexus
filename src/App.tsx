import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import LoginForm from './components/auth/LoginForm';
import Dashboard from './pages/Dashboard';
import SupervisorDashboard from './pages/SupervisorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import LeadManagement from './pages/leads/LeadManagement';
import Tasks from './pages/Tasks';
import Customer360 from './pages/Customer360';
import GeoLocation from './pages/GeoLocation';
import SalesFunnel from './pages/SalesFunnel';
import TeamPerformance from './pages/TeamPerformance';
import TerritoryManagement from './pages/TerritoryManagement';
import Reports from './pages/Reports';
import RuleManagement from './pages/RuleManagement';
import ExecutiveDashboard from './pages/ExecutiveDashboard';
import CustomerAnalytics from './pages/CustomerAnalytics';
import KPAManagement from './pages/KPAManagement';
import PortfolioManagement from './pages/PortfolioManagement';
import RiskManagement from './pages/RiskManagement';
import UserManagement from './pages/UserManagement';
import NotFound from './pages/NotFound';
import { Toaster } from '@/components/ui/toaster';
import { useAuth } from './contexts/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';

function AppContent() {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  // Route based on user role
  const getDashboardComponent = () => {
    switch (user?.role) {
      case 'supervisor':
        return <SupervisorDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            {getDashboardComponent()}
          </ProtectedRoute>
        } />
        <Route path="/leads" element={
          <ProtectedRoute>
            <LeadManagement />
          </ProtectedRoute>
        } />
        <Route path="/user-management" element={
          <ProtectedRoute>
            <UserManagement />
          </ProtectedRoute>
        } />
        <Route path="/tasks" element={
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        } />
        <Route path="/customers" element={
          <ProtectedRoute>
            <Customer360 />
          </ProtectedRoute>
        } />
        <Route path="/geo-location" element={
          <ProtectedRoute>
            <GeoLocation />
          </ProtectedRoute>
        } />
        <Route path="/funnel" element={
          <ProtectedRoute>
            <SalesFunnel />
          </ProtectedRoute>
        } />
        <Route path="/team-performance" element={
          <ProtectedRoute>
            <TeamPerformance />
          </ProtectedRoute>
        } />
        <Route path="/territory-management" element={
          <ProtectedRoute>
            <TerritoryManagement />
          </ProtectedRoute>
        } />
        <Route path="/reports" element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        } />
        <Route path="/rule-management" element={
          <ProtectedRoute>
            <RuleManagement />
          </ProtectedRoute>
        } />
        <Route path="/executive-dashboard" element={
          <ProtectedRoute>
            <ExecutiveDashboard />
          </ProtectedRoute>
        } />
        <Route path="/customer-analytics" element={
          <ProtectedRoute>
            <CustomerAnalytics />
          </ProtectedRoute>
        } />
        <Route path="/kpa-management" element={
          <ProtectedRoute>
            <KPAManagement />
          </ProtectedRoute>
        } />
        <Route path="/portfolio" element={
          <ProtectedRoute>
            <PortfolioManagement />
          </ProtectedRoute>
        } />
        <Route path="/risk-management" element={
          <ProtectedRoute>
            <RiskManagement />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <AppContent />
          <Toaster />
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
