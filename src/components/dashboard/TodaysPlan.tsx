
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, Clock, Phone, MapPin, UserCheck, CheckCircle, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Task {
  id: string;
  title: string;
  type: 'call' | 'visit' | 'meeting' | 'task';
  time: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
  location?: string;
  contact?: string;
  description?: string;
}

const TodaysPlan = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Follow up with Mrs. Priya Sharma',
      type: 'call',
      time: '10:00 AM',
      priority: 'High',
      completed: false,
      contact: '+91 98765 43210',
      description: 'Discuss FD renewal options and new investment products'
    },
    {
      id: '2',
      title: 'Visit Rajesh Enterprises',
      type: 'visit',
      time: '2:00 PM',
      priority: 'Medium',
      completed: false,
      location: 'Bandra West, Mumbai',
      description: 'Present business loan proposal and collect documents'
    },
    {
      id: '3',
      title: 'Submit loan documentation',
      type: 'task',
      time: '4:00 PM',
      priority: 'High',
      completed: true,
      description: 'Complete and submit loan files for 3 pending applications'
    },
    {
      id: '4',
      title: 'Present insurance products to ABC Ltd',
      type: 'meeting',
      time: '5:30 PM',
      priority: 'Low',
      completed: false,
      location: 'Client Office, Andheri',
      description: 'Group insurance presentation for 200+ employees'
    },
    {
      id: '5',
      title: 'Call Dr. Rajiv Khanna - Pharma Industries',
      type: 'call',
      time: '11:30 AM',
      priority: 'High',
      completed: false,
      contact: '+91 87654 23456',
      description: 'Follow up on ₹38L business loan proposal'
    },
    {
      id: '6',
      title: 'Route Planning - Bandra Area',
      type: 'task',
      time: '9:00 AM',
      priority: 'Medium',
      completed: true,
      description: 'Plan optimal route for 4 client visits in Bandra area'
    }
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
    
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      toast({
        title: task.completed ? "Task Unmarked" : "Task Completed!",
        description: task.completed ? "Task moved back to pending" : "Great job completing this task!",
      });
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'call': return <Phone size={16} className="text-green-600" />;
      case 'visit': return <MapPin size={16} className="text-blue-600" />;
      case 'meeting': return <UserCheck size={16} className="text-purple-600" />;
      case 'task': return <CheckCircle size={16} className="text-orange-600" />;
      default: return <Clock size={16} />;
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

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionRate = Math.round((completedTasks / totalTasks) * 100);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Calendar size={16} className="mr-2" />
          Today's Plan
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar size={20} className="mr-2" />
              Today's Action Plan
            </div>
            <Badge className="bg-blue-100 text-blue-800">
              {completedTasks}/{totalTasks} completed ({completionRate}%)
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Progress Summary */}
          <Card className="bg-gradient-to-r from-blue-50 to-teal-50">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-gray-900">Daily Progress</h3>
                  <p className="text-sm text-gray-600">Keep up the great work!</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-teal-600">{completionRate}%</div>
                  <div className="text-sm text-gray-600">{completedTasks} of {totalTasks} tasks</div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div 
                  className="bg-teal-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Tasks List */}
          <div className="space-y-3">
            {tasks.map((task) => (
              <Card 
                key={task.id} 
                className={`${task.completed ? 'bg-gray-50 opacity-75' : 'bg-white'} hover:shadow-md transition-shadow`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                            {task.title}
                          </h4>
                          {task.description && (
                            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                          )}
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-500 flex items-center">
                              <Clock size={12} className="mr-1" />
                              {task.time}
                            </span>
                            {task.contact && (
                              <span className="text-sm text-gray-500 flex items-center">
                                <Phone size={12} className="mr-1" />
                                {task.contact}
                              </span>
                            )}
                            {task.location && (
                              <span className="text-sm text-gray-500 flex items-center">
                                <MapPin size={12} className="mr-1" />
                                {task.location}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          {getTaskIcon(task.type)}
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add New Task */}
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => {
              toast({
                title: "Add New Task",
                description: "Task creation form would open here.",
              });
            }}
          >
            <Plus size={16} className="mr-2" />
            Add New Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TodaysPlan;
