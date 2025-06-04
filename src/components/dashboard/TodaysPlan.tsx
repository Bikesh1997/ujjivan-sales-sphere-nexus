import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, Clock, Phone, MapPin, UserCheck, CheckCircle, Plus, Timer, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AddTaskForm from './AddTaskForm';
import TaskTimeTracker from '../tasks/TaskTimeTracker';

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
  estimatedDuration?: number; // in minutes
  actualDuration?: number; // in minutes
  reminderSet?: boolean;
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
      description: 'Discuss FD renewal options and new investment products',
      estimatedDuration: 30,
      actualDuration: 25,
      reminderSet: true
    },
    {
      id: '2',
      title: 'Visit Rajesh Enterprises',
      type: 'visit',
      time: '2:00 PM',
      priority: 'Medium',
      completed: false,
      location: 'Bandra West, Mumbai',
      description: 'Present business loan proposal and collect documents',
      estimatedDuration: 90,
      reminderSet: true
    },
    {
      id: '3',
      title: 'Submit loan documentation',
      type: 'task',
      time: '4:00 PM',
      priority: 'High',
      completed: true,
      description: 'Complete and submit loan files for 3 pending applications',
      estimatedDuration: 60,
      actualDuration: 45
    },
    {
      id: '4',
      title: 'Present insurance products to ABC Ltd',
      type: 'meeting',
      time: '5:30 PM',
      priority: 'Low',
      completed: false,
      location: 'Client Office, Andheri',
      description: 'Group insurance presentation for 200+ employees',
      estimatedDuration: 120,
      reminderSet: false
    },
    {
      id: '5',
      title: 'Call Dr. Rajiv Khanna - Pharma Industries',
      type: 'call',
      time: '11:30 AM',
      priority: 'High',
      completed: false,
      contact: '+91 87654 23456',
      description: 'Follow up on ₹38L business loan proposal',
      estimatedDuration: 20,
      reminderSet: true
    },
    {
      id: '6',
      title: 'Route Planning - Bandra Area',
      type: 'task',
      time: '9:00 AM',
      priority: 'Medium',
      completed: true,
      description: 'Plan optimal route for 4 client visits in Bandra area',
      estimatedDuration: 30,
      actualDuration: 35
    }
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
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

  const addTask = (newTask: Omit<Task, 'id' | 'completed'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      completed: false
    };
    
    setTasks(prev => [...prev, task]);
    setShowAddForm(false);
    
    toast({
      title: "Task Added!",
      description: `"${task.title}" has been added to your plan.`,
    });
  };

  const toggleReminder = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, reminderSet: !task.reminderSet } : task
    ));
    
    const task = tasks.find(t => t.id === taskId);
    toast({
      title: task?.reminderSet ? "Reminder Removed" : "Reminder Set",
      description: task?.reminderSet ? "Reminder has been removed" : "You'll be notified 15 minutes before this task",
    });
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

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionRate = Math.round((completedTasks / totalTasks) * 100);
  const totalEstimatedTime = tasks.reduce((sum, task) => sum + (task.estimatedDuration || 0), 0);
  const totalActualTime = tasks.reduce((sum, task) => sum + (task.actualDuration || 0), 0);

  // Sort tasks by time for better organization
  const sortedTasks = [...tasks].sort((a, b) => {
    const timeA = new Date(`1970-01-01 ${a.time}`).getTime();
    const timeB = new Date(`1970-01-01 ${b.time}`).getTime();
    return timeA - timeB;
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Calendar size={16} className="mr-2" />
          Today's Plan
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar size={20} className="mr-2" />
              Enhanced Daily Action Plan
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-blue-100 text-blue-800">
                {completedTasks}/{totalTasks} completed ({completionRate}%)
              </Badge>
              <Badge className="bg-purple-100 text-purple-800">
                <Timer size={12} className="mr-1" />
                {formatDuration(totalEstimatedTime)} planned
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Enhanced Progress Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-r from-blue-50 to-teal-50">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-900">Task Progress</h3>
                    <p className="text-2xl font-bold text-teal-600">{completionRate}%</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-teal-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-900">Time Planned</h3>
                    <p className="text-2xl font-bold text-purple-600">{formatDuration(totalEstimatedTime)}</p>
                  </div>
                  <Timer className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-900">Reminders Set</h3>
                    <p className="text-2xl font-bold text-green-600">{tasks.filter(t => t.reminderSet).length}</p>
                  </div>
                  <Bell className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Add Task Form */}
          {showAddForm && (
            <AddTaskForm 
              onAddTask={addTask}
              onCancel={() => setShowAddForm(false)}
            />
          )}

          {/* Enhanced Tasks List */}
          <div className="space-y-3">
            {sortedTasks.map((task) => (
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
                            {task.estimatedDuration && (
                              <span className="text-sm text-gray-500 flex items-center">
                                <Timer size={12} className="mr-1" />
                                Est: {formatDuration(task.estimatedDuration)}
                              </span>
                            )}
                          </div>

                          {/* Time tracking info */}
                          {task.actualDuration && (
                            <div className="mt-2 text-xs text-gray-500">
                              Actual time: {formatDuration(task.actualDuration)}
                              {task.estimatedDuration && (
                                <span className={task.actualDuration > task.estimatedDuration ? 'text-red-600 ml-2' : 'text-green-600 ml-2'}>
                                  ({task.actualDuration > task.estimatedDuration ? '+' : ''}{task.actualDuration - task.estimatedDuration}m vs estimate)
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          {getTaskIcon(task.type)}
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                          <Button
                            size="sm"
                            variant={task.reminderSet ? "default" : "outline"}
                            onClick={() => toggleReminder(task.id)}
                            className="h-6 px-2"
                          >
                            <Bell size={12} className={task.reminderSet ? "text-white" : "text-gray-500"} />
                          </Button>
                        </div>
                      </div>

                      {/* Time Tracker Integration */}
                      {!task.completed && (
                        <div className="mt-3 pt-2 border-t">
                          <TaskTimeTracker taskId={task.id} taskTitle={task.title} />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add New Task Button */}
          {!showAddForm && (
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setShowAddForm(true)}
            >
              <Plus size={16} className="mr-2" />
              Add New Task
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TodaysPlan;
