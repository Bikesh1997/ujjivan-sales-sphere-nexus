
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar,
  CheckCircle,
  Route,
  Clock,
  Target,
  TrendingUp
} from 'lucide-react';

interface MobileStatsCardsProps {
  totalVisits: number;
  completedVisits: number;
  totalDistance: number;
  estimatedTime: number;
  currentTime: Date;
}

const MobileStatsCards = ({
  totalVisits,
  completedVisits,
  totalDistance,
  estimatedTime,
  currentTime
}: MobileStatsCardsProps) => {
  const progressPercentage = (completedVisits / totalVisits) * 100;

  return (
    <div className="space-y-4">
      {/* Current Time and Date */}
      <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Today</p>
              <p className="text-xl font-bold">{currentTime.toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <p className="text-blue-100 text-sm">Current Time</p>
              <p className="text-xl font-bold">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Overview */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center mb-3">
            <Target className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="font-semibold">Daily Progress</h3>
            <span className="ml-auto text-sm text-gray-600">{completedVisits}/{totalVisits}</span>
          </div>
          <Progress value={progressPercentage} className="h-3 mb-2" />
          <div className="flex justify-between text-xs text-gray-600">
            <span>{progressPercentage.toFixed(0)}% Complete</span>
            <span>{totalVisits - completedVisits} Remaining</span>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center">
              <Calendar className="h-6 w-6 text-blue-600 mr-2" />
              <div>
                <p className="text-xs text-gray-600">Total Visits</p>
                <p className="text-xl font-bold">{totalVisits}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
              <div>
                <p className="text-xs text-gray-600">Completed</p>
                <p className="text-xl font-bold text-green-600">{completedVisits}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center">
              <Route className="h-6 w-6 text-purple-600 mr-2" />
              <div>
                <p className="text-xs text-gray-600">Distance</p>
                <p className="text-xl font-bold">{totalDistance.toFixed(1)}km</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center">
              <Clock className="h-6 w-6 text-orange-600 mr-2" />
              <div>
                <p className="text-xs text-gray-600">Est. Time</p>
                <p className="text-xl font-bold">{Math.floor(estimatedTime / 60)}h {estimatedTime % 60}m</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gray-50">
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
              <div>
                <p className="text-sm font-medium">Performance</p>
                <p className="text-xs text-gray-600">On track for daily target</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-green-600">{progressPercentage.toFixed(0)}%</p>
              <p className="text-xs text-gray-600">Efficiency</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MobileStatsCards;
