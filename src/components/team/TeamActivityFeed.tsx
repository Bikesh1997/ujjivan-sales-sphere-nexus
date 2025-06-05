
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Clock, User, Target, Calendar, Award, AlertCircle } from 'lucide-react';

const TeamActivityFeed = () => {
  const activities = [
    {
      id: '1',
      type: 'performance',
      user: 'Rahul Sharma',
      action: 'achieved monthly target',
      details: '105% of target completed',
      timestamp: '2 hours ago',
      icon: Award,
      color: 'text-green-600'
    },
    {
      id: '2',
      type: 'task',
      user: 'Anjali Patel',
      action: 'completed client visit',
      details: 'Tech Solutions Ltd - Loan processing',
      timestamp: '4 hours ago',
      icon: User,
      color: 'text-blue-600'
    },
    {
      id: '3',
      type: 'alert',
      user: 'Vikash Kumar',
      action: 'missed scheduled call',
      details: 'Client follow-up call rescheduled',
      timestamp: '6 hours ago',
      icon: AlertCircle,
      color: 'text-red-600'
    },
    {
      id: '4',
      type: 'target',
      user: 'Priya Singh',
      action: 'new target assigned',
      details: 'Q2 target: ₹45L',
      timestamp: '1 day ago',
      icon: Target,
      color: 'text-purple-600'
    },
    {
      id: '5',
      type: 'meeting',
      user: 'Team Meeting',
      action: 'scheduled for tomorrow',
      details: 'Monthly performance review',
      timestamp: '1 day ago',
      icon: Calendar,
      color: 'text-orange-600'
    }
  ];

  const getActivityBadge = (type: string) => {
    switch (type) {
      case 'performance': return 'bg-green-100 text-green-800';
      case 'task': return 'bg-blue-100 text-blue-800';
      case 'alert': return 'bg-red-100 text-red-800';
      case 'target': return 'bg-purple-100 text-purple-800';
      case 'meeting': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock size={20} className="mr-2" />
          Recent Team Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const IconComponent = activity.icon;
            return (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                <div className={`p-2 rounded-full bg-gray-100 ${activity.color}`}>
                  <IconComponent size={16} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm">{activity.user}</span>
                      <Badge className={getActivityBadge(activity.type)}>
                        {activity.type}
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-500">{activity.timestamp}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-1">
                    {activity.action}
                  </p>
                  
                  {activity.details && (
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.details}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamActivityFeed;
