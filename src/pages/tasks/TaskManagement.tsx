import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, MapPin, Phone, Mail, Plus, Filter, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import TaskDetailsModal from '@/components/tasks/TaskDetailsModal';
import CampaignDetailsModal from '@/components/campaigns/CampaignDetailsModal';

const TaskManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('today');
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [campaignModalOpen, setCampaignModalOpen] = useState(false);

  const tasks = [
    {
      id: '1',
      title: 'Follow up with Rajesh Enterprises',
      type: 'Call',
      customer: 'Rajesh Kumar',
      priority: 'High',
      dueDate: '2024-06-04',
      dueTime: '10:00 AM',
      status: 'pending',
      location: 'Phone Call',
      description: 'Discuss loan requirements and documentation'
    },
    {
      id: '2',
      title: 'Site visit to Tech Solutions Ltd',
      type: 'Visit',
      customer: 'Priya Patel',
      priority: 'Medium',
      dueDate: '2024-06-04',
      dueTime: '2:00 PM',
      status: 'pending',
      location: 'Andheri East, Mumbai',
      description: 'Present banking solutions and assess requirements'
    },
    {
      id: '3',
      title: 'Submit loan documentation',
      type: 'Documentation',
      customer: 'Manufacturing Co',
      priority: 'High',
      dueDate: '2024-06-04',
      dueTime: '4:00 PM',
      status: 'in_progress',
      location: 'Branch Office',
      description: 'Complete and submit loan application documents'
    },
    {
      id: '4',
      title: 'Email follow-up for insurance products',
      type: 'Email',
      customer: 'Retail Chain',
      priority: 'Low',
      dueDate: '2024-06-05',
      dueTime: '11:00 AM',
      status: 'pending',
      location: 'Email',
      description: 'Send detailed insurance product brochure'
    }
  ];

  const campaigns = [
    {
      id: '1',
      name: 'FD Renewal Campaign - Q2',
      type: 'SMS + Call',
      target: 'Senior Citizens',
      status: 'active',
      startDate: '2024-06-01',
      endDate: '2024-06-30',
      progress: 65,
      leads: 234,
      conversions: 12
    },
    {
      id: '2',
      name: 'Home Loan Promotion',
      type: 'Visit + Email',
      target: 'Young Professionals',
      status: 'planned',
      startDate: '2024-06-15',
      endDate: '2024-07-15',
      progress: 0,
      leads: 0,
      conversions: 0
    },
    {
      id: '3',
      name: 'Credit Card Upsell',
      type: 'WhatsApp + Call',
      target: 'Existing Customers',
      status: 'completed',
      startDate: '2024-05-01',
      endDate: '2024-05-31',
      progress: 100,
      leads: 189,
      conversions: 23
    }
  ];

  const handleAddTask = () => {
    toast({
      title: "Add Task",
      description: "Opening task creation form",
    });
  };

  const handleAddCampaign = () => {
    toast({
      title: "Add Campaign",  
      description: "Opening campaign creation form",
    });
  };

  const handleMarkComplete = (taskId: string) => {
    toast({
      title: "Task Completed",
      description: "Task marked as completed successfully",
    });
  };

  const handleViewTask = (task: any) => {
    setSelectedTask(task);
    setTaskModalOpen(true);
  };

  const handleViewCampaign = (campaign: any) => {
    setSelectedCampaign(campaign);
    setCampaignModalOpen(true);
  };

  const handleFilterTasks = () => {
    toast({
      title: "Filter Applied",
      description: "Task filters have been applied",
    });
  };

  const handleTaskAction = (taskId: string, action: string) => {
    switch (action) {
      case 'edit':
        toast({
          title: "Edit Task",
          description: `Opening edit form for task ${taskId}`,
        });
        break;
      case 'delete':
        toast({
          title: "Delete Task",
          description: `Task ${taskId} has been deleted`,
        });
        break;
      case 'assign':
        toast({
          title: "Assign Task",
          description: `Assigning task ${taskId} to team member`,
        });
        break;
      default:
        toast({
          title: "Task Action",
          description: `${action} performed on task ${taskId}`,
        });
    }
  };

  const handleCampaignAction = (campaignId: string, action: string) => {
    switch (action) {
      case 'start':
        toast({
          title: "Campaign Started",
          description: `Campaign ${campaignId} has been activated`,
        });
        break;
      case 'pause':
        toast({
          title: "Campaign Paused",
          description: `Campaign ${campaignId} has been paused`,
        });
        break;
      case 'edit':
        toast({
          title: "Edit Campaign",
          description: `Opening edit form for campaign ${campaignId}`,
        });
        break;
      case 'duplicate':
        toast({
          title: "Campaign Duplicated",
          description: `Campaign ${campaignId} has been duplicated`,
        });
        break;
      default:
        toast({
          title: "Campaign Action",
          description: `${action} performed on campaign ${campaignId}`,
        });
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'Call': return <Phone size={16} className="text-blue-600" />;
      case 'Visit': return <MapPin size={16} className="text-green-600" />;
      case 'Email': return <Mail size={16} className="text-purple-600" />;
      default: return <Clock size={16} className="text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'planned': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Task & Campaign Management</h1>
          <p className="text-gray-600">Manage daily tasks and marketing campaigns</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="bg-blue-600 text-white hover:bg-blue-700" onClick={handleAddCampaign}>
            <Plus size={16} className="mr-2" />
            New Campaign
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700" onClick={handleAddTask}>
            <Plus size={16} className="mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      <Tabs defaultValue="tasks" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="space-y-6">
          {/* Task Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleFilterTasks()}>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">8</div>
                  <div className="text-sm text-gray-600">Today's Tasks</div>
                </div>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleFilterTasks()}>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">3</div>
                  <div className="text-sm text-gray-600">Pending</div>
                </div>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleFilterTasks()}>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">5</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleFilterTasks()}>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">2</div>
                  <div className="text-sm text-gray-600">Overdue</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tasks List */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Today's Tasks</CardTitle>
                <Button variant="outline" size="sm" onClick={handleFilterTasks}>
                  <Filter size={16} className="mr-2" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="mt-1">
                          {getTaskIcon(task.type)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{task.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar size={14} className="mr-1" />
                              {task.dueDate} at {task.dueTime}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin size={14} className="mr-1" />
                              {task.location}
                            </div>
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            Customer: <span className="font-medium">{task.customer}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                        <Badge className={getStatusColor(task.status)}>
                          {task.status.replace('_', ' ')}
                        </Badge>
                        <Button size="sm" variant="outline" onClick={() => handleViewTask(task)}>
                          <Eye size={14} className="mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleMarkComplete(task.id)}>
                          Complete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          {/* Campaign Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleCampaignAction('all', 'view-active')}>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">2</div>
                  <div className="text-sm text-gray-600">Active Campaigns</div>
                </div>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleCampaignAction('all', 'view-planned')}>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">1</div>
                  <div className="text-sm text-gray-600">Planned</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">₹45L</div>
                  <div className="text-sm text-gray-600">Revenue Generated</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">18.5%</div>
                  <div className="text-sm text-gray-600">Conversion Rate</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Campaigns List */}
          <Card>
            <CardHeader>
              <CardTitle>Marketing Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{campaign.name}</h3>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <span>Type: {campaign.type}</span>
                          <span>Target: {campaign.target}</span>
                          <span>{campaign.startDate} - {campaign.endDate}</span>
                        </div>
                        <div className="mt-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-gray-600">Progress</span>
                            <span className="text-sm font-medium">{campaign.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-teal-600 h-2 rounded-full" 
                              style={{ width: `${campaign.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex space-x-6 mt-3 text-sm">
                          <span>Leads: <span className="font-medium">{campaign.leads}</span></span>
                          <span>Conversions: <span className="font-medium">{campaign.conversions}</span></span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(campaign.status)}>
                          {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                        </Badge>
                        <Button size="sm" variant="outline" onClick={() => handleViewCampaign(campaign)}>
                          View Details
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleCampaignAction(campaign.id, campaign.status === 'active' ? 'pause' : 'start')}>
                          {campaign.status === 'active' ? 'Pause' : 'Start'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <TaskDetailsModal
        task={selectedTask}
        isOpen={taskModalOpen}
        onOpenChange={setTaskModalOpen}
      />

      <CampaignDetailsModal
        campaign={selectedCampaign}
        isOpen={campaignModalOpen}
        onOpenChange={setCampaignModalOpen}
      />
    </div>
  );
};

export default TaskManagement;
