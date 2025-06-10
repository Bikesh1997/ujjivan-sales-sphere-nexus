
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, 
  Navigation, 
  Clock, 
  MapPin,
  CheckCircle,
  Target
} from 'lucide-react';

interface CustomerVisit {
  id: string;
  name: string;
  address: string;
  phone: string;
  priority: 'High' | 'Medium' | 'Low';
  purpose: string;
  estimatedDuration: number;
  eta: string;
  distance: string;
  status: 'pending' | 'in_progress' | 'completed' | 'skipped';
}

interface MobileCustomerCardProps {
  visit: CustomerVisit;
  onStatusChange: (visitId: string, status: CustomerVisit['status']) => void;
  onCall: (visit: CustomerVisit) => void;
  onNavigate: (visit: CustomerVisit) => void;
  isSelected?: boolean;
  onClick?: () => void;
}

const MobileCustomerCard = ({
  visit,
  onStatusChange,
  onCall,
  onNavigate,
  isSelected,
  onClick
}: MobileCustomerCardProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'skipped': return 'bg-gray-100 text-gray-800';
      default: return 'bg-orange-100 text-orange-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in_progress': return <Clock className="h-4 w-4 text-blue-600" />;
      default: return <Target className="h-4 w-4 text-orange-600" />;
    }
  };

  return (
    <Card 
      className={`${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'} transition-colors cursor-pointer`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 flex-1">
            {getStatusIcon(visit.status)}
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm truncate">{visit.name}</h4>
              <p className="text-xs text-gray-600 truncate">{visit.purpose}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge className={`text-xs ${getPriorityColor(visit.priority)}`}>
              {visit.priority}
            </Badge>
            <Badge className={`text-xs ${getStatusColor(visit.status)}`}>
              {visit.status.replace('_', ' ')}
            </Badge>
          </div>
        </div>

        {/* Address and Contact */}
        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <MapPin className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">{visit.address}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3" />
              <span>ETA: {visit.eta}</span>
            </div>
            <span>{visit.distance} • {visit.estimatedDuration} min</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {visit.status === 'pending' && (
            <>
              <Button 
                size="sm" 
                onClick={(e) => {
                  e.stopPropagation();
                  onStatusChange(visit.id, 'in_progress');
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-xs h-8"
              >
                Start
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onCall(visit);
                }}
                className="text-xs h-8 px-3"
              >
                <Phone className="h-3 w-3" />
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate(visit);
                }}
                className="text-xs h-8 px-3"
              >
                <Navigation className="h-3 w-3" />
              </Button>
            </>
          )}
          
          {visit.status === 'in_progress' && (
            <>
              <Button 
                size="sm" 
                onClick={(e) => {
                  e.stopPropagation();
                  onStatusChange(visit.id, 'completed');
                }}
                className="flex-1 bg-green-600 hover:bg-green-700 text-xs h-8"
              >
                Complete
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onStatusChange(visit.id, 'skipped');
                }}
                className="text-xs h-8"
              >
                Skip
              </Button>
            </>
          )}
          
          {visit.status === 'completed' && (
            <div className="flex items-center justify-center text-green-600 text-xs py-2 flex-1">
              <CheckCircle className="h-4 w-4 mr-1" />
              Visit Completed
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MobileCustomerCard;
