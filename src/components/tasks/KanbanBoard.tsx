import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Plus, Clock, User, Calendar, Edit } from 'lucide-react';
import AddTaskModal from './AddTaskModal';
import EditTaskModal from './EditTaskModal';

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  status: 'todo' | 'in_progress' | 'review' | 'completed';
  leadId?: string;
}

const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Follow up with Rajesh Enterprises',
      description: 'Schedule product demo meeting',
      assignee: 'Rahul Sharma',
      priority: 'high',
      dueDate: '2024-06-05',
      status: 'todo',
      leadId: '1'
    },
    {
      id: '2',
      title: 'Prepare proposal for Tech Solutions',
      description: 'Create detailed loan proposal',
      assignee: 'Rahul Sharma',
      priority: 'high',
      dueDate: '2024-06-06',
      status: 'in_progress',
      leadId: '2'
    },
    {
      id: '3',
      title: 'Submit documentation review',
      description: 'Review and submit customer documents',
      assignee: 'Rahul Sharma',
      priority: 'medium',
      dueDate: '2024-06-04',
      status: 'review',
      leadId: '4'
    },
    {
      id: '4',
      title: 'Close deal with Construction Corp',
      description: 'Finalize contract signing',
      assignee: 'Rahul Sharma',
      priority: 'high',
      dueDate: '2024-06-03',
      status: 'completed',
      leadId: '6'
    }
  ]);

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-50' },
    { id: 'in_progress', title: 'In Progress', color: 'bg-blue-50' },
    { id: 'review', title: 'Review', color: 'bg-yellow-50' },
    { id: 'completed', title: 'Completed', color: 'bg-green-50' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const moveTask = (taskId: string, newStatus: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const handleAddTask = (newTaskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...newTaskData,
      id: (tasks.length + 1).toString()
    };
    setTasks(prev => [...prev, newTask]);
  };

  const handleEditTask = (taskId: string, updatedData: Partial<Task>) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { ...task, ...updatedData }
          : task
      )
    );
  };

  const handleTaskEdit = (task: Task) => {
    setEditingTask(task);
    setEditModalOpen(true);
  };

  const TaskCard = ({ task }: { task: Task }) => (
    <Card className="mb-3 cursor-pointer hover:shadow-md transition-shadow">
      <CardContent className="p-3">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-medium text-sm">{task.title}</h4>
          <div className="flex items-center gap-1">
            <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </Badge>
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-6 w-6 p-0"
              onClick={() => handleTaskEdit(task)}
            >
              <Edit size={12} />
            </Button>
          </div>
        </div>
        <p className="text-xs text-gray-600 mb-3">{task.description}</p>
        
        <div className="flex justify-between items-center text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {task.dueDate}
          </div>
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {task.assignee.split(' ')[0]}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Task Management</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map(column => (
          <div key={column.id} className={`rounded-lg p-4 ${column.color}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-700">{column.title}</h3>
              <Badge variant="secondary" className="text-xs">
                {tasks.filter(task => task.status === column.id).length}
              </Badge>
            </div>
            
            <div className="space-y-2">
              {tasks
                .filter(task => task.status === column.id)
                .map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
            </div>
            
            <Button 
              variant="ghost" 
              className="w-full mt-3 text-gray-500 hover:text-gray-700"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>
        ))}
      </div>

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          isOpen={editModalOpen}
          onOpenChange={setEditModalOpen}
          onEditTask={handleEditTask}
        />
      )}
    </div>
  );
};

export default KanbanBoard;
