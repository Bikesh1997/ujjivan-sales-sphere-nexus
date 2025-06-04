
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import DashboardCard from '@/components/DashboardCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Target, 
  TrendingUp, 
  IndianRupee, 
  Phone, 
  UserCheck,
  Calendar,
  MapPin,
  Bell
} from 'lucide-react';

const Dashboard = () => {
  const salesData = [
    { month: 'Jan', target: 100, achieved: 85 },
    { month: 'Feb', target: 120, achieved: 110 },
    { month: 'Mar', target: 110, achieved: 95 },
    { month: 'Apr', target: 130, achieved: 140 },
    { month: 'May', target: 125, achieved: 118 },
    { month: 'Jun', target: 135, achieved: 125 },
  ];

  const pipelineData = [
    { name: 'Leads', value: 120, color: '#06b6d4' },
    { name: 'Prospects', value: 85, color: '#14b8a6' },
    { name: 'Qualified', value: 45, color: '#f59e0b' },
    { name: 'Converted', value: 25, color: '#10b981' },
  ];

  const recentTasks = [
    { id: 1, title: 'Follow up with Mrs. Priya Sharma', type: 'Call', priority: 'High', time: '10:00 AM' },
    { id: 2, title: 'Visit Rajesh Enterprises', type: 'Visit', priority: 'Medium', time: '2:00 PM' },
    { id: 3, title: 'Submit loan documentation', type: 'Task', priority: 'High', time: '4:00 PM' },
    { id: 4, title: 'Present insurance products to ABC Ltd', type: 'Meeting', priority: 'Low', time: '5:30 PM' },
  ];

  const kpis = [
    { title: 'Monthly Target', value: '₹12.5L', subtitle: 'Target vs Achievement', trend: { value: '8% above', isPositive: true }, icon: <Target size={20} /> },
    { title: 'Total Customers', value: '1,247', subtitle: 'Active customer base', trend: { value: '12% growth', isPositive: true }, icon: <Users size={20} /> },
    { title: 'Conversion Rate', value: '18.5%', subtitle: 'Lead to customer', trend: { value: '3% up', isPositive: true }, icon: <TrendingUp size={20} /> },
    { title: 'Revenue Generated', value: '₹13.2L', subtitle: 'This month', trend: { value: '15% above target', isPositive: true }, icon: <IndianRupee size={20} /> },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales Dashboard</h1>
          <p className="text-gray-600">Welcome back, Rahul! Here's your performance overview.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Calendar size={16} className="mr-2" />
            Today's Plan
          </Button>
          <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
            <Bell size={16} className="mr-2" />
            Alerts (3)
          </Button>
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
            <CardTitle>Sales Performance</CardTitle>
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

      {/* Tasks and Nudges Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar size={18} className="mr-2" />
              Today's Priority Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm text-gray-900">{task.title}</p>
                    <p className="text-xs text-gray-500 flex items-center mt-1">
                      {task.type === 'Call' && <Phone size={12} className="mr-1" />}
                      {task.type === 'Visit' && <MapPin size={12} className="mr-1" />}
                      {task.type === 'Meeting' && <UserCheck size={12} className="mr-1" />}
                      {task.time}
                    </p>
                  </div>
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Smart Nudges */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell size={18} className="mr-2" />
              Smart Nudges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-900">Portfolio Opportunity</h4>
                <p className="text-sm text-blue-700 mt-1">
                  You have 12 senior citizens eligible for FD products. Average ticket size: ₹2.5L
                </p>
                <Button size="sm" className="mt-2 bg-blue-600 hover:bg-blue-700">
                  View Prospects
                </Button>
              </div>
              
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <h4 className="font-medium text-orange-900">KRA Alert</h4>
                <p className="text-sm text-orange-700 mt-1">
                  Complete 3 more loan disbursals to achieve 100% KRA and unlock ₹25K incentive
                </p>
                <Button size="sm" className="mt-2 bg-orange-600 hover:bg-orange-700">
                  View Pipeline
                </Button>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-900">Beat Plan Optimization</h4>
                <p className="text-sm text-green-700 mt-1">
                  Visit customers in Bandra area today. 8 high-value prospects within 2km radius.
                </p>
                <Button size="sm" className="mt-2 bg-green-600 hover:bg-green-700">
                  Plan Route
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
