
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Phone, Mail, Calendar, Plus } from 'lucide-react';

interface FollowUpAction {
  id: string;
  type: string;
  scheduledDate: string;
  description: string;
  priority: string;
  status: string;
}

interface FollowUpActionsProps {
  followUpActions: FollowUpAction[];
  onAddFollowUp: () => void;
}

const FollowUpActions = ({ followUpActions, onAddFollowUp }: FollowUpActionsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-base sm:text-lg">Follow-up Actions</span>
          <Button 
            size="sm" 
            onClick={onAddFollowUp}
            className="flex items-center gap-2 bg-[#056262] hover:bg-[#045050] text-xs sm:text-sm"
          >
            <Plus size={16} />
            Add Follow-up
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {followUpActions.map((action) => (
            <div key={action.id} className="border rounded-lg p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  {action.type === 'Call' ? (
                    <Phone size={16} className="text-blue-600 flex-shrink-0" />
                  ) : action.type === 'Meeting' ? (
                    <Calendar size={16} className="text-green-600 flex-shrink-0" />
                  ) : (
                    <Mail size={16} className="text-purple-600 flex-shrink-0" />
                  )}
                  <span className="font-medium text-sm">{action.type}</span>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      action.priority === 'High' ? 'text-red-700 border-red-200' :
                      action.priority === 'Medium' ? 'text-yellow-700 border-yellow-200' :
                      'text-green-700 border-green-200'
                    }`}
                  >
                    {action.priority}
                  </Badge>
                </div>
                <Badge 
                  variant={action.status === 'Completed' ? 'default' : 'secondary'}
                  className={`text-xs ${action.status === 'Completed' ? 'bg-green-100 text-green-800' : ''}`}
                >
                  {action.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-700 mb-1">{action.description}</p>
              <p className="text-xs text-gray-500">Scheduled: {action.scheduledDate}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FollowUpActions;
