import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import ErrorBoundary from "@/components/ErrorBoundary";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import SupervisorDashboard from "./pages/SupervisorDashboard";
import SalesFunnel from "./pages/SalesFunnel";
import Customer360 from "./pages/Customer360";
import LeadManagement from "./pages/leads/LeadManagement";
import LeadDetail from "./pages/leads/LeadDetail";
import Tasks from "./pages/Tasks";
import TaskManagement from "./pages/tasks/TaskManagement";
import GeoLocation from "./pages/GeoLocation";
import ExecutiveDashboard from "./pages/ExecutiveDashboard";
import CustomerAnalytics from "./pages/CustomerAnalytics";
import PortfolioManagement from "./pages/PortfolioManagement";
import KPAManagement from "./pages/KPAManagement";
import TeamPerformance from "./pages/TeamPerformance";
import TerritoryManagement from "./pages/TerritoryManagement";
import Reports from "./pages/Reports";
import RuleManagement from "./pages/RuleManagement";
import NotFound from "./pages/NotFound";
import { useAuth } from "@/contexts/AuthContext";
import { useRoleFeatures } from "@/hooks/useRoleFeatures";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const DashboardRouter = () => {
  const { user } = useAuth();
  
  if (user?.role === 'supervisor') {
    return <SupervisorDashboard />;
  }
  
  return <Dashboard />;
};

// Role-based route wrapper
const RoleBasedRoute = ({ children, featureId }: { children: React.ReactNode; featureId: string }) => {
  const { canAccessFeature } = useRoleFeatures();
  
  if (!canAccessFeature(featureId)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this feature.</p>
        </div>
      </div>
    );
  }
  
  return <>{children}</>;
};

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<div>Login Page</div>} />
              <Route path="/*" element={
                <ProtectedRoute>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<DashboardRouter />} />
                      
                      {/* Sales Executive Only Features */}
                      <Route path="/funnel" element={
                        <RoleBasedRoute featureId="sales_funnel">
                          <SalesFunnel />
                        </RoleBasedRoute>
                      } />
                      <Route path="/leads" element={
                        <RoleBasedRoute featureId="my_leads">
                          <LeadManagement />
                        </RoleBasedRoute>
                      } />
                      <Route path="/leads/:id" element={
                        <RoleBasedRoute featureId="my_leads">
                          <LeadDetail />
                        </RoleBasedRoute>
                      } />
                      <Route path="/tasks" element={
                        <RoleBasedRoute featureId="my_tasks">
                          <Tasks />
                        </RoleBasedRoute>
                      } />
                      <Route path="/task-management" element={
                        <RoleBasedRoute featureId="my_tasks">
                          <TaskManagement />
                        </RoleBasedRoute>
                      } />
                      <Route path="/customers" element={
                        <RoleBasedRoute featureId="customer_360">
                          <Customer360 />
                        </RoleBasedRoute>
                      } />
                      <Route path="/geo-location" element={
                        <RoleBasedRoute featureId="geo_location">
                          <GeoLocation />
                        </RoleBasedRoute>
                      } />
                      
                      {/* Supervisor Only Features */}
                      <Route path="/portfolio" element={
                        <RoleBasedRoute featureId="portfolio_management">
                          <PortfolioManagement />
                        </RoleBasedRoute>
                      } />
                      <Route path="/kpa-management" element={
                        <RoleBasedRoute featureId="kpa_management">
                          <KPAManagement />
                        </RoleBasedRoute>
                      } />
                      <Route path="/team-performance" element={
                        <RoleBasedRoute featureId="team_performance">
                          <TeamPerformance />
                        </RoleBasedRoute>
                      } />
                      <Route path="/territory-management" element={
                        <RoleBasedRoute featureId="territory_management">
                          <TerritoryManagement />
                        </RoleBasedRoute>
                      } />
                      <Route path="/reports" element={
                        <RoleBasedRoute featureId="reports">
                          <Reports />
                        </RoleBasedRoute>
                      } />
                      <Route path="/rule-management" element={
                        <RoleBasedRoute featureId="rule_management">
                          <RuleManagement />
                        </RoleBasedRoute>
                      } />
                      
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Layout>
                </ProtectedRoute>
              } />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
