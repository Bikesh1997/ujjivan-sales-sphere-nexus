
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import SalesFunnel from "./pages/SalesFunnel";
import Customer360 from "./pages/Customer360";
import LeadManagement from "./pages/leads/LeadManagement";
import TaskManagement from "./pages/tasks/TaskManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

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
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/funnel" element={<SalesFunnel />} />
                    <Route path="/leads" element={<LeadManagement />} />
                    <Route path="/tasks" element={<TaskManagement />} />
                    <Route path="/customers" element={<Customer360 />} />
                    <Route path="/portfolio" element={<Dashboard />} />
                    <Route path="/beat-plan" element={<Dashboard />} />
                    <Route path="/calendar" element={<Dashboard />} />
                    <Route path="/communications" element={<Dashboard />} />
                    <Route path="/reports" element={<Dashboard />} />
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
