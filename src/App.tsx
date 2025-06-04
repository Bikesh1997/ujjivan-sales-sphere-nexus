
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import SalesFunnel from "./pages/SalesFunnel";
import Customer360 from "./pages/Customer360";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/funnel" element={<SalesFunnel />} />
            <Route path="/customers" element={<Customer360 />} />
            <Route path="/portfolio" element={<Dashboard />} />
            <Route path="/beat-plan" element={<Dashboard />} />
            <Route path="/calendar" element={<Dashboard />} />
            <Route path="/communications" element={<Dashboard />} />
            <Route path="/reports" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
