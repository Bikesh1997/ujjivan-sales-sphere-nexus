
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Calendar, CheckCircle, Route, Clock } from 'lucide-react';

interface DesktopStatsOverviewProps {
  totalVisits: number;
  completedVisits: number;
  totalDistance: number;
  estimatedTotalTime: number;
  progressPercentage: number;
  currentTime: Date;
}

const DesktopStatsOverview = ({
  totalVisits,
  completedVisits,
  totalDistance,
  estimatedTotalTime,
  progressPercentage,
  currentTime
}: DesktopStatsOverviewProps) => {
  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Plan My Day</h1>
          <p className="text-gray-600">
            Optimized route planning for {currentTime.toLocaleDateString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Current Time</p>
          <p className="text-lg font-semibold">{currentTime.toLocaleTimeString()}</p>
        </div>
      </div>

      {/* Daily Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Visits</p>
                <p className="text-2xl font-bold">{totalVisits}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold">{completedVisits}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Route className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Distance</p>
                <p className="text-2xl font-bold">{totalDistance.toFixed(1)} km</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-orange-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Est. Time</p>
                <p className="text-2xl font-bold">{Math.floor(estimatedTotalTime / 60)}h {estimatedTotalTime % 60}m</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Daily Progress</h3>
            <span className="text-sm text-gray-600">{completedVisits}/{totalVisits} visits completed</span>
          </div>
          <Progress value={progressPercentage} className="w-full h-3" />
          <p className="text-sm text-gray-600 mt-2">{progressPercentage.toFixed(0)}% of daily visits completed</p>
        </CardContent>
      </Card>
    </>
  );
};

export default DesktopStatsOverview;
