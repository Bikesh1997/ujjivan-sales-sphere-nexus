
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  CheckCircle, 
  Users, 
  TrendingUp, 
  Target,
  Phone,
  MapPin,
  Clock,
  DollarSign
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DashboardStats {
  leadsToday: number;
  callsCompleted: number;
  visitsScheduled: number;
  targetProgress: number;
  revenue: number;
  conversionRate: number;
}

interface RecentActivity {
  id: string;
  type: 'call' | 'visit' | 'lead' | 'task';
  title: string;
  time: string;
  status: 'completed' | 'pending' | 'in_progress';
}

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState<DashboardStats>({
    leadsToday: 12,
    callsCompleted: 8,
    visitsScheduled: 5,
    targetProgress: 68,
    revenue: 145000,
    conversionRate: 24
  });

  const [recentActivities] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'call',
      title: 'Called Priya Sharma - Home Loan Discussion',
      time: '2 hours ago',
      status: 'completed'
    },
    {
      id: '2',
      type: 'visit',
      title: 'Visit scheduled with Rajesh Kumar',
      time: '3 hours ago',
      status: 'pending'
    },
    {
      id: '3',
      type: 'lead',
      title: 'New lead: Anita Patel - Investment Advisory',
      time: '4 hours ago',
      status: 'in_progress'
    }
  ]);

  const quickActions = [
    { name: 'Add New Lead', href: '/leads', icon: Users, color: 'bg-blue-500' },
    { name: 'Schedule Visit', href: '/plan-my-day', icon: Calendar, color: 'bg-green-500' },
    { name: 'Make Call', href: '/customers', icon: Phone, color: 'bg-purple-500' },
    { name: 'View Tasks', href: '/tasks', icon: CheckCircle, color: 'bg-orange-500' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleQuickAction = (action: string) => {
    toast({
      title: "Action Initiated",
      description: `${action} has been initiated`,
    });
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-1">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <Badge className="bg-teal-100 text-teal-800">
          {user?.role === 'sales_executive' ? 'Sales Executive' : 'Supervisor'}
        </Badge>
      </div>

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Leads Today</p>
                <p className="text-2xl font-bold">{stats.leadsToday}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <Phone className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Calls Done</p>
                <p className="text-2xl font-bold">{stats.callsCompleted}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Visits</p>
                <p className="text-2xl font-bold">{stats.visitsScheduled}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-bold">₹{(stats.revenue / 1000).toFixed(0)}K</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Target Progress & Conversion Rate */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Monthly Target Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Target Achievement</span>
                <span>{stats.targetProgress}%</span>
              </div>
              <Progress value={stats.targetProgress} className="h-3" />
              <p className="text-sm text-gray-600">
                Keep going! You're on track to exceed your monthly target.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Conversion Rate</span>
                <span className="text-2xl font-bold text-green-600">{stats.conversionRate}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Avg Deal Size</span>
                <span className="text-lg font-semibold">₹{(stats.revenue / stats.leadsToday / 1000).toFixed(0)}K</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.name}
                  variant="outline"
                  className="h-auto p-4 flex-col space-y-2"
                  onClick={() => handleQuickAction(action.name)}
                >
                  <div className={`${action.color} p-2 rounded-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm font-medium">{action.name}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Recent Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-sm">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <Badge className={getStatusColor(activity.status)}>
                  {activity.status.replace('_', ' ')}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
