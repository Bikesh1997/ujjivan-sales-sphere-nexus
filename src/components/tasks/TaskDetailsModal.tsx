
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, User } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  type: string;
  customer: string;
  priority: string;
  dueDate: string;
  dueTime: string;
  status: string;
  location: string;
  description: string;
}

interface TaskDetailsModalProps {
  task: Task | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const TaskDetailsModal = ({ task, isOpen, onOpenChange }: TaskDetailsModalProps) => {
  if (!task) {
    return null;
  }

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
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Task Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-lg">{task.title}</h3>
            <p className="text-gray-600 mt-1">{task.description}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <User size={16} className="text-gray-500" />
              <span className="text-sm">Customer: {task.customer}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">Type: {task.type}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar size={16} className="text-gray-500" />
              <span className="text-sm">{task.dueDate}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={16} className="text-gray-500" />
              <span className="text-sm">{task.dueTime}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <MapPin size={16} className="text-gray-500" />
            <span className="text-sm">{task.location}</span>
          </div>

          <div className="flex space-x-2">
            <Badge className={getPriorityColor(task.priority)}>
              {task.priority}
            </Badge>
            <Badge className={getStatusColor(task.status)}>
              {task.status.replace('_', ' ')}
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetailsModal;
