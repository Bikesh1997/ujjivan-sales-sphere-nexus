
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Phone, Navigation, CheckCircle } from 'lucide-react';
import { CustomerVisit } from '@/data/sampleVisitsData';
import { getPriorityColor, getStatusColor, getStatusIcon } from '@/utils/planMyDayUtils';

interface DesktopCustomerVisitsListProps {
  visits: CustomerVisit[];
  selectedVisit: string | null;
  onSelectVisit: (visitId: string | null) => void;
  onStatusChange: (visitId: string, status: CustomerVisit['status']) => void;
  onCall: (visit: CustomerVisit) => void;
  onNavigate: (visit: CustomerVisit) => void;
}

const DesktopCustomerVisitsList = ({
  visits,
  selectedVisit,
  onSelectVisit,
  onStatusChange,
  onCall,
  onNavigate
}: DesktopCustomerVisitsListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="h-5 w-5 mr-2" />
          Today's Customer Visits
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {visits.map((visit) => (
            <div 
              key={visit.id} 
              className={`border rounded-lg p-4 transition-colors cursor-pointer ${
                selectedVisit === visit.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onSelectVisit(visit.id === selectedVisit ? null : visit.id)}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {getStatusIcon(visit.status)}
                    <h4 className="font-medium">{visit.name}</h4>
                    <Badge className={`text-xs ${getPriorityColor(visit.priority)}`}>
                      {visit.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{visit.purpose}</p>
                  <p className="text-xs text-gray-500">{visit.address}</p>
                </div>
                <div className="text-right">
                  <Badge className={`text-xs ${getStatusColor(visit.status)}`}>
                    {visit.status.replace('_', ' ')}
                  </Badge>
                  <p className="text-xs text-gray-500 mt-1">ETA: {visit.eta}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <span>{visit.distance} • {visit.estimatedDuration} min</span>
                <span>{visit.phone}</span>
              </div>

              <div className="flex space-x-2">
                {visit.status === 'pending' && (
                  <>
                    <Button 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        onStatusChange(visit.id, 'in_progress');
                      }}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Start Visit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCall(visit);
                      }}
                    >
                      <Phone className="h-3 w-3 mr-1" />
                      Call
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
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Complete
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        onStatusChange(visit.id, 'skipped');
                      }}
                    >
                      Skip
                    </Button>
                  </>
                )}
                
                {(visit.status === 'pending' || visit.status === 'in_progress') && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate(visit);
                    }}
                  >
                    <Navigation className="h-3 w-3 mr-1" />
                    Navigate
                  </Button>
                )}
                
                {visit.status === 'completed' && (
                  <div className="flex items-center text-green-600 text-sm">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Visit Completed
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DesktopCustomerVisitsList;
