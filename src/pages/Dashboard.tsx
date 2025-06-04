
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
import PermissionGate from '@/components/rbac/PermissionGate';

const Dashboard = () => {
  const { user } = useAuth();
  
  // Calculate user-specific or team data based on role
  const userLeads = user?.role === 'supervisor' ? allLeads : allLeads.filter(lead => lead.assignedToId === user?.id);
  const convertedLeads = userLeads.filter(lead => lead.status === 'converted');
  const convertedValue = convertedLeads.reduce((sum, lead) => {
    const value = parseFloat(lead.value.replace('₹', '').replace('L', ''));
    return sum + value;
  }, 0);

  // Sales data - filtered by role
  const salesData = user?.role === 'supervisor' ? [
    { month: 'Jan', target: 250, achieved: 285 },
    { month: 'Feb', target: 280, achieved: 310 },
    { month: 'Mar', target: 300, achieved: 295 },
    { month: 'Apr', target: 320, achieved: 340 },
    { month: 'May', target: 350, achieved: 368 },
    { month: 'Jun', target: 380, achieved: 425 },
  ] : [
    { month: 'Jan', target: 50, achieved: 45 },
    { month: 'Feb', target: 55, achieved: 62 },
    { month: 'Mar', target: 60, achieved: 58 },
    { month: 'Apr', target: 65, achieved: 71 },
    { month: 'May', target: 70, achieved: 75 },
    { month: 'Jun', target: 75, achieved: 82 },
  ];

  // Pipeline data - filtered by role
  const pipelineData = user?.role === 'supervisor' ? [
    { name: 'Leads', value: 185, color: '#06b6d4' },
    { name: 'Prospects', value: 128, color: '#14b8a6' },
    { name: 'Qualified', value: 85, color: '#f59e0b' },
    { name: 'Converted', value: 62, color: '#10b981' },
  ] : [
    { name: 'Leads', value: userLeads.filter(l => l.status === 'new').length, color: '#06b6d4' },
    { name: 'Prospects', value: userLeads.filter(l => l.status === 'qualified').length, color: '#14b8a6' },
    { name: 'Qualified', value: userLeads.filter(l => l.status === 'proposal').length, color: '#f59e0b' },
    { name: 'Converted', value: convertedLeads.length, color: '#10b981' },
  ];

  const kpis = user?.role === 'supervisor' ? [
    { 
      title: 'Team Target', 
      value: '₹380L', 
      subtitle: 'Monthly team target', 
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
      title: 'Team Conversion Rate', 
      value: '24.5%', 
      subtitle: 'Team average', 
      trend: { value: '5% up', isPositive: true }, 
      icon: <TrendingUp size={20} /> 
    },
    { 
      title: 'Team Revenue', 
      value: '₹425L', 
      subtitle: 'This month', 
      trend: { value: '22% above target', isPositive: true }, 
      icon: <IndianRupee size={20} /> 
    },
  ] : [
    { 
      title: 'My Target', 
      value: '₹75L', 
      subtitle: 'Personal monthly target', 
      trend: { value: '9% above', isPositive: true }, 
      icon: <Target size={20} /> 
    },
    { 
      title: 'My Leads', 
      value: userLeads.length.toString(), 
      subtitle: 'Assigned leads', 
      trend: { value: '3 new this week', isPositive: true }, 
      icon: <Users size={20} /> 
    },
    { 
      title: 'My Conversion Rate', 
      value: userLeads.length > 0 ? `${Math.round((convertedLeads.length / userLeads.length) * 100)}%` : '0%', 
      subtitle: 'Personal conversion', 
      trend: { value: '2% up', isPositive: true }, 
      icon: <TrendingUp size={20} /> 
    },
    { 
      title: 'My Revenue', 
      value: `₹${convertedValue}L`, 
      subtitle: 'Personal achievement', 
      trend: { value: '15% above target', isPositive: true }, 
      icon: <IndianRupee size={20} /> 
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {user?.role === 'supervisor' ? 'Team Dashboard' : 'My Sales Dashboard'}
          </h1>
          <p className="text-gray-600">
            {user?.role === 'supervisor' 
              ? `Welcome back, ${user?.name}! Here's your team's performance overview.`
              : `Welcome back, ${user?.name}! Here's your personal performance overview.`
            }
          </p>
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
            <CardTitle>
              {user?.role === 'supervisor' ? 'Team Sales Performance (₹L)' : 'My Sales Performance (₹L)'}
            </CardTitle>
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
            <CardTitle>
              {user?.role === 'supervisor' ? 'Team Sales Pipeline' : 'My Sales Pipeline'}
            </CardTitle>
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
