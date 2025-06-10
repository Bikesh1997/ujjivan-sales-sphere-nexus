
import { CheckCircle, Clock, Target } from 'lucide-react';

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'High': return 'bg-red-100 text-red-800 border-red-200';
    case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Low': return 'bg-green-100 text-green-800 border-green-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-800';
    case 'in_progress': return 'bg-blue-100 text-blue-800';
    case 'skipped': return 'bg-gray-100 text-gray-800';
    default: return 'bg-orange-100 text-orange-800';
  }
};

export const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'in_progress': return <Clock className="h-4 w-4 text-blue-600" />;
    default: return <Target className="h-4 w-4 text-orange-600" />;
  }
};
