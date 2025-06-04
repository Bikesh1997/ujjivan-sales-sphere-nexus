
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import DashboardCard from '@/components/DashboardCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Target, 
  TrendingUp, 
  IndianRupee, 
  Calendar
} from 'lucide-react';
import AlertSystem from '@/components/alerts/AlertSystem';
import TodaysPlan from '@/components/dashboard/TodaysPlan';
import SmartNudges from '@/components/dashboard/SmartNudges';
import { useAuth } from '@/contexts/AuthContext';
import { allLeads } from '@/data/leadsData';

const Dashboard = () => {
  const { user } = useAuth();
  
  const salesData = [
    { month: 'Jan', target: 250, achieved: 285 },
    { month: 'Feb', target: 280, achieved: 310 },
    { month: 'Mar', target: 300, achieved: 295 },
    { month: 'Apr', target: 320, achieved: 340 },
    { month: 'May', target: 350, achieved: 368 },
    { month: 'Jun', target: 380, achieved: 425 },
  ];

  const pipelineData = [
    { name: 'Leads', value: 185, color: '#06b6d4' },
    { name: 'Prospects', value: 128, color: '#14b8a6' },
    { name: 'Qualified', value: 85, color: '#f59e0b' },
    { name: 'Converted', value: 62, color: '#10b981' },
  ];

  // Calculate user-specific metrics
  const userLeads = user?.role === 'supervisor' ? allLeads : allLeads.filter(lead => lead.assignedToId === user?.id);
  const convertedLeads = userLeads.filter(lead => lead.status === 'converted');
  const convertedValue = convertedLeads.reduce((sum, lead) => {
    const value = parseFloat(lead.value.replace('₹', '').replace('L', ''));
    return sum + value;
  }, 0);

  const totalValue = userLeads.reduce((sum, lead) => {
    const value = parseFloat(lead.value.replace('₹', '').replace('L', ''));
    return sum + value;
  }, 0);

  const kpis = [
    { 
      title: 'Monthly Target', 
      value: '₹380L', 
      subtitle: 'Target vs Achievement', 
      trend: { value: '12% above', isPositive: true }, 
      icon: <Target size={20} /> 
    },
    { 
      title: 'Total Customers', 
      value: '2,847', 
      subtitle: 'Active customer base', 
      trend: { value: '18% growth', isPositive: true }, 
      icon: <Users size={20} /> 
    },
    { 
      title: 'Conversion Rate', 
      value: '24.5%', 
      subtitle: 'Lead to customer', 
      trend: { value: '5% up', isPositive: true }, 
      icon: <TrendingUp size={20} /> 
    },
    { 
      title: 'Revenue Generated', 
      value: `₹${convertedValue}L`, 
      subtitle: 'This month', 
      trend: { value: '22% above target', isPositive: true }, 
      icon: <IndianRupee size={20} /> 
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}! Here's your performance overview.</p>
        </div>
        <div className="flex space-x-3">
          <TodaysPlan />
          <AlertSystem />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <DashboardCard
            key={index}
            title={kpi.title}
            value={kpi.value}
            subtitle={kpi.subtitle}
            icon={kpi.icon}
            trend={kpi.trend}
          />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Performance (₹L)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="target" fill="#e5e7eb" name="Target" />
                <Bar dataKey="achieved" fill="#14b8a6" name="Achieved" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sales Pipeline */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pipelineData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {pipelineData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Smart Nudges */}
      <SmartNudges />
    </div>
  );
};

export default Dashboard;
