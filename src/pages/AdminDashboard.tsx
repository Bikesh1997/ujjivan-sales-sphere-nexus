
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import DashboardCard from '@/components/DashboardCard';
import { 
  Shield, 
  Users,
  Activity,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const systemKpis = [
    { 
      title: 'Active Users', 
      value: '245', 
      subtitle: 'System users', 
      trend: { value: '12 new this month', isPositive: true }, 
      icon: <Users size={20} /> 
    },
    { 
      title: 'Data Accuracy', 
      value: '98.5%', 
      subtitle: 'System-wide accuracy', 
      trend: { value: '2.1% improvement', isPositive: true }, 
      icon: <AlertTriangle size={20} /> 
    },
    { 
      title: 'Rule Violations', 
      value: '3', 
      subtitle: 'Requiring attention', 
      trend: { value: '5 resolved today', isPositive: true }, 
      icon: <Shield size={20} /> 
    },
    { 
      title: 'System Health', 
      value: '99.8%', 
      subtitle: 'Uptime this month', 
      trend: { value: 'All systems operational', isPositive: true }, 
      icon: <CheckCircle size={20} /> 
    },
  ];

  const configurationModules = [
    {
      title: 'User Management',
      description: 'Manage users, roles and permissions',
      icon: <Users size={32} className="text-purple-600" />,
      action: '/user-management'
    },
    {
      title: 'Rule Configuration',
      description: 'Manage business rules and automation mappings',
      icon: <Shield size={32} className="text-green-600" />,
      action: '/rule-management'
    }
  ];

  const recentActivities = [
    { action: 'Rule Updated', description: 'Lead routing rule for Mumbai region updated', time: '2 hours ago', status: 'success' },
    { action: 'KRA Target Set', description: 'Q4 targets configured for Sales team', time: '4 hours ago', status: 'success' },
    { action: 'Data Sync', description: 'Customer database synchronized', time: '6 hours ago', status: 'success' },
    { action: 'User Added', description: 'New sales executive onboarded', time: '1 day ago', status: 'info' },
    { action: 'System Alert', description: 'Data accuracy threshold alert resolved', time: '2 days ago', status: 'warning' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">System configuration and operations management</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Activity size={16} className="mr-2" />
            System Health
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemKpis.map((kpi, index) => (
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

      {/* Configuration Modules */}
      <Card>
        <CardHeader>
          <CardTitle>Configuration Modules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {configurationModules.map((module, index) => (
              <Link to={module.action} key={index}>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    {module.icon}
                    <h3 className="font-medium mb-2 mt-3">{module.title}</h3>
                    <p className="text-sm text-gray-600">{module.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent System Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent System Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{activity.action}</span>
                    <Badge className={`text-xs ${getStatusColor(activity.status)}`}>
                      {activity.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{activity.description}</p>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
