
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Plus,
  Calendar,
  Target,
  Users
} from 'lucide-react';

const TeamTasks = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const teamTasks = [
    {
      id: '1',
      title: 'Q2 Sales Campaign Launch',
      description: 'Launch new personal loan campaign for Q2',
      assignedTo: 'Rahul Sharma',
      assigneeId: '1',
      priority: 'High',
      status: 'In Progress',
      progress: 75,
      dueDate: '2024-06-15',
      category: 'Campaign'
    },
    {
      id: '2',
      title: 'Customer Satisfaction Survey',
      description: 'Conduct monthly customer satisfaction survey',
      assignedTo: 'Anjali Patel',
      assigneeId: '2',
      priority: 'Medium',
      status: 'Pending',
      progress: 25,
      dueDate: '2024-06-20',
      category: 'Research'
    },
    {
      id: '3',
      title: 'Territory Analysis Report',
      description: 'Analyze territory performance and provide recommendations',
      assignedTo: 'Vikash Kumar',
      assigneeId: '3',
      priority: 'Medium',
      status: 'Completed',
      progress: 100,
      dueDate: '2024-06-10',
      category: 'Analysis'
    },
    {
      id: '4',
      title: 'Lead Qualification Training',
      description: 'Train team on new lead qualification processes',
      assignedTo: 'Priya Singh',
      assigneeId: '4',
      priority: 'High',
      status: 'In Progress',
      progress: 60,
      dueDate: '2024-06-18',
      category: 'Training'
    },
    {
      id: '5',
      title: 'Monthly Performance Review',
      description: 'Review and document monthly performance metrics',
      assignedTo: 'Rahul Sharma',
      assigneeId: '1',
      priority: 'Low',
      status: 'Overdue',
      progress: 40,
      dueDate: '2024-06-05',
      category: 'Review'
    }
  ];

  const teamMembers = [
    { id: '1', name: 'Rahul Sharma', activeTasks: 2, completedTasks: 8 },
    { id: '2', name: 'Anjali Patel', activeTasks: 1, completedTasks: 6 },
    { id: '3', name: 'Vikash Kumar', activeTasks: 1, completedTasks: 4 },
    { id: '4', name: 'Priya Singh', activeTasks: 1, completedTasks: 7 }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-gray-100 text-gray-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle size={16} className="text-green-600" />;
      case 'In Progress': return <Clock size={16} className="text-blue-600" />;
      case 'Overdue': return <AlertTriangle size={16} className="text-red-600" />;
      default: return <Clock size={16} className="text-gray-600" />;
    }
  };

  const taskStats = {
    total: teamTasks.length,
    completed: teamTasks.filter(t => t.status === 'Completed').length,
    inProgress: teamTasks.filter(t => t.status === 'In Progress').length,
    overdue: teamTasks.filter(t => t.status === 'Overdue').length
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Tasks</h1>
          <p className="text-gray-600">Monitor and manage team task progress</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <Plus size={16} className="mr-2" />
          Assign New Task
        </Button>
      </div>

      {/* Task Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                <p className="text-2xl font-bold">{taskStats.total}</p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold">{taskStats.inProgress}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold">{taskStats.completed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold">{taskStats.overdue}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Task Overview</TabsTrigger>
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="calendar">Task Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamTasks.map((task) => (
                  <div key={task.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {getStatusIcon(task.status)}
                          <h4 className="font-medium">{task.title}</h4>
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                          <Badge className={getStatusColor(task.status)}>
                            {task.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>Assigned to: {task.assignedTo}</span>
                          <span>Due: {task.dueDate}</span>
                          <span>Category: {task.category}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{task.progress}%</span>
                      </div>
                      <Progress value={task.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Member Task Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="border rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-teal-100 text-teal-700">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{member.name}</h4>
                        <p className="text-sm text-gray-500">Team Member</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Active Tasks</p>
                        <p className="text-lg font-bold text-blue-600">{member.activeTasks}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Completed</p>
                        <p className="text-lg font-bold text-green-600">{member.completedTasks}</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="text-sm text-gray-600 mb-2">Current Tasks:</div>
                      <div className="space-y-1">
                        {teamTasks
                          .filter(task => task.assigneeId === member.id && task.status !== 'Completed')
                          .map(task => (
                            <div key={task.id} className="text-xs bg-gray-50 p-2 rounded">
                              {task.title} - {task.status}
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Task Calendar View
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Calendar Integration</h3>
                <p className="text-gray-600 mb-4">View tasks in calendar format with due dates and milestones</p>
                <Button>Open Calendar View</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamTasks;
