
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock, TrendingUp, Users, Phone, Plus, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [todaysTasks] = useState([
    {
      id: '1',
      title: 'Follow up with Rajesh Enterprises',
      time: '10:00 AM',
      type: 'Call',
      priority: 'High'
    },
    {
      id: '2',
      title: 'Site visit to Tech Solutions Ltd',
      time: '2:00 PM',
      type: 'Visit',
      priority: 'Medium'
    }
  ]);

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'add-lead':
        navigate('/leads');
        toast({
          title: "Navigating to Leads",
          description: "You can add a new lead from the leads page.",
        });
        break;
      case 'add-task':
        navigate('/tasks');
        toast({
          title: "Navigating to Tasks",
          description: "You can add a new task from the tasks page.",
        });
        break;
      case 'view-funnel':
        navigate('/funnel');
        break;
      case 'view-customers':
        navigate('/customers');
        break;
      default:
        toast({
          title: "Action Triggered",
          description: `${action} functionality will be implemented`,
        });
    }
  };

  const handleTaskAction = (taskId: string, action: string) => {
    toast({
      title: "Task Action",
      description: `${action} for task ${taskId}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your daily overview</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => handleQuickAction('add-lead')} className="bg-blue-600 hover:bg-blue-700">
            <Plus size={16} className="mr-2" />
            Add Lead
          </Button>
          <Button onClick={() => handleQuickAction('add-task')} variant="outline">
            <Plus size={16} className="mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleQuickAction('view-funnel')}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Leads</p>
                <p className="text-2xl font-bold text-gray-900">234</p>
                <p className="text-xs text-green-600 mt-1">+12% from last month</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleQuickAction('view-customers')}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversions</p>
                <p className="text-2xl font-bold text-gray-900">45</p>
                <p className="text-xs text-green-600 mt-1">+8% from last month</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹23.4L</p>
                <p className="text-xs text-green-600 mt-1">+15% from last month</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Tasks</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
                <p className="text-xs text-red-600 mt-1">2 overdue</p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Today's Tasks</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate('/tasks')}>
              View All
              <ArrowRight size={14} className="ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaysTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                    <div>
                      <h4 className="font-medium text-sm">{task.title}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock size={12} className="text-gray-500" />
                        <span className="text-xs text-gray-500">{task.time}</span>
                        <Badge variant="outline" className="text-xs">
                          {task.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={task.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}>
                      {task.priority}
                    </Badge>
                    <Button size="sm" variant="ghost" onClick={() => handleTaskAction(task.id, 'complete')}>
                      Complete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Lead Conversion Rate</span>
                  <span className="text-sm">65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Monthly Target</span>
                  <span className="text-sm">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Customer Satisfaction</span>
                  <span className="text-sm">92%</span>
                </div>
                <Progress value={92} className="h-2" />
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col" onClick={() => handleQuickAction('schedule-call')}>
              <Phone size={20} className="mb-2" />
              Schedule Call
            </Button>
            <Button variant="outline" className="h-20 flex flex-col" onClick={() => handleQuickAction('add-lead')}>
              <Users size={20} className="mb-2" />
              Add Lead
            </Button>
            <Button variant="outline" className="h-20 flex flex-col" onClick={() => handleQuickAction('view-calendar')}>
              <Calendar size={20} className="mb-2" />
              View Calendar
            </Button>
            <Button variant="outline" className="h-20 flex flex-col" onClick={() => handleQuickAction('generate-report')}>
              <TrendingUp size={20} className="mb-2" />
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
