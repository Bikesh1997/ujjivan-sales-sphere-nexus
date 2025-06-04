
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import SupervisorDashboard from "./pages/SupervisorDashboard";
import SalesFunnel from "./pages/SalesFunnel";
import Customer360 from "./pages/Customer360";
import LeadManagement from "./pages/leads/LeadManagement";
import TaskManagement from "./pages/tasks/TaskManagement";
import GeoLocation from "./pages/GeoLocation";
import ExecutiveDashboard from "./pages/ExecutiveDashboard";
import CustomerAnalytics from "./pages/CustomerAnalytics";
import RiskManagement from "./pages/RiskManagement";
import PortfolioManagement from "./pages/PortfolioManagement";
import NotFound from "./pages/NotFound";
import KPAManagement from "./pages/KPAManagement";
import { useAuth } from "@/contexts/AuthContext";
import { useRoleFeatures } from "@/hooks/useRoleFeatures";

const queryClient = new QueryClient();

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
                    <Route path="/tasks" element={
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
                    <Route path="/executive-dashboard" element={
                      <RoleBasedRoute featureId="executive_dashboard">
                        <ExecutiveDashboard />
                      </RoleBasedRoute>
                    } />
                    <Route path="/customer-analytics" element={
                      <RoleBasedRoute featureId="customer_analytics">
                        <CustomerAnalytics />
                      </RoleBasedRoute>
                    } />
                    <Route path="/kpa-management" element={
                      <RoleBasedRoute featureId="kpa_management">
                        <KPAManagement />
                      </RoleBasedRoute>
                    } />
                    <Route path="/risk-management" element={
                      <RoleBasedRoute featureId="risk_management">
                        <RiskManagement />
                      </RoleBasedRoute>
                    } />
                    <Route path="/portfolio" element={
                      <RoleBasedRoute featureId="portfolio_management">
                        <PortfolioManagement />
                      </RoleBasedRoute>
                    } />
                    
                    {/* Placeholder routes for supervisor features */}
                    <Route path="/team-management" element={
                      <RoleBasedRoute featureId="team_management">
                        <div className="text-center py-20">
                          <h2 className="text-2xl font-bold mb-4">Team Management</h2>
                          <p className="text-gray-600">Manage your team members and their assignments</p>
                        </div>
                      </RoleBasedRoute>
                    } />
                    <Route path="/lead-allocation" element={
                      <RoleBasedRoute featureId="lead_allocation">
                        <div className="text-center py-20">
                          <h2 className="text-2xl font-bold mb-4">Lead Allocation</h2>
                          <p className="text-gray-600">Assign and distribute leads to team members</p>
                        </div>
                      </RoleBasedRoute>
                    } />
                    <Route path="/team-tasks" element={
                      <RoleBasedRoute featureId="team_tasks">
                        <div className="text-center py-20">
                          <h2 className="text-2xl font-bold mb-4">Team Tasks</h2>
                          <p className="text-gray-600">Monitor and manage team task progress</p>
                        </div>
                      </RoleBasedRoute>
                    } />
                    <Route path="/team-performance" element={
                      <RoleBasedRoute featureId="team_performance">
                        <div className="text-center py-20">
                          <h2 className="text-2xl font-bold mb-4">Performance Analytics</h2>
                          <p className="text-gray-600">Analyze team performance metrics</p>
                        </div>
                      </RoleBasedRoute>
                    } />
                    <Route path="/territory-management" element={
                      <RoleBasedRoute featureId="territory_management">
                        <div className="text-center py-20">
                          <h2 className="text-2xl font-bold mb-4">Territory Management</h2>
                          <p className="text-gray-600">Manage sales territories and assignments</p>
                        </div>
                      </RoleBasedRoute>
                    } />
                    <Route path="/reports" element={
                      <RoleBasedRoute featureId="reports">
                        <div className="text-center py-20">
                          <h2 className="text-2xl font-bold mb-4">Reports & Analytics</h2>
                          <p className="text-gray-600">Generate comprehensive team reports</p>
                        </div>
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
);

export default App;
