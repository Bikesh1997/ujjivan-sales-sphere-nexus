
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Target, 
  Users, 
  DollarSign,
  Calendar,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const PerformanceMetrics = () => {
  const { user } = useAuth();

  // Sample metrics data based on role
  const getMetricsForRole = () => {
    switch (user?.role) {
      case 'field_sales_officer':
        return [
          { label: 'Daily Visits', current: 8, target: 10, color: 'bg-emerald-500' },
          { label: 'Leads Converted', current: 3, target: 5, color: 'bg-blue-500' },
          { label: 'Beat Coverage', current: 75, target: 100, color: 'bg-purple-500' },
          { label: 'Monthly Target', current: 180000, target: 250000, color: 'bg-orange-500' }
        ];
      case 'relationship_manager':
        return [
          { label: 'Portfolio Value', current: 8500000, target: 10000000, color: 'bg-emerald-500' },
          { label: 'Cross-sell Success', current: 12, target: 20, color: 'bg-blue-500' },
          { label: 'Customer Retention', current: 95, target: 98, color: 'bg-purple-500' },
          { label: 'Monthly Revenue', current: 450000, target: 600000, color: 'bg-orange-500' }
        ];
      default:
        return [
          { label: 'Daily Tasks', current: 6, target: 8, color: 'bg-emerald-500' },
          { label: 'Leads Processed', current: 15, target: 20, color: 'bg-blue-500' },
          { label: 'Response Rate', current: 85, target: 90, color: 'bg-purple-500' },
          { label: 'Quality Score', current: 92, target: 95, color: 'bg-orange-500' }
        ];
    }
  };

  const metrics = getMetricsForRole();

  const formatValue = (value: number, label: string) => {
    if (label.includes('Value') || label.includes('Revenue') || label.includes('Target')) {
      return `₹${(value / 100000).toFixed(1)}L`;
    }
    if (label.includes('Rate') || label.includes('Coverage') || label.includes('Retention') || label.includes('Score')) {
      return `${value}%`;
    }
    return value.toString();
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {metrics.map((metric, index) => {
              const progress = calculateProgress(metric.current, metric.target);
              const isOnTrack = progress >= 80;
              
              return (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      {metric.label}
                    </span>
                    <Badge variant={isOnTrack ? "default" : "secondary"} className="text-xs">
                      {formatValue(metric.current, metric.label)} / {formatValue(metric.target, metric.label)}
                    </Badge>
                  </div>
                  <Progress 
                    value={progress} 
                    className="h-2" 
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{progress.toFixed(0)}% Complete</span>
                    <span className={isOnTrack ? 'text-green-600' : 'text-orange-600'}>
                      {isOnTrack ? 'On Track' : 'Needs Attention'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-emerald-600" />
              <div>
                <p className="text-xs text-gray-500">Today's Tasks</p>
                <p className="text-lg font-semibold">6/8</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-xs text-gray-500">Active Leads</p>
                <p className="text-lg font-semibold">23</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-xs text-gray-500">This Week</p>
                <p className="text-lg font-semibold">+12%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-xs text-gray-500">Completed</p>
                <p className="text-lg font-semibold">18</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
