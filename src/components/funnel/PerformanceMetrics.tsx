
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Target, 
  Users, 
  DollarSign,
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
          { label: 'Daily Visits', current: 8, target: 10, color: '#229E82' },
          { label: 'Leads Converted', current: 3, target: 5, color: '#FCB53E' },
          { label: 'Beat Coverage', current: 75, target: 100, color: '#F78F35' },
          { label: 'Monthly Target', current: 180000, target: 250000, color: '#229E82' }
        ];
      case 'relationship_manager':
        return [
          { label: 'Portfolio Value', current: 8500000, target: 10000000, color: '#229E82' },
          { label: 'Cross-sell Success', current: 12, target: 20, color: '#FCB53E' },
          { label: 'Customer Retention', current: 95, target: 98, color: '#F78F35' },
          { label: 'Monthly Revenue', current: 450000, target: 600000, color: '#229E82' }
        ];
      default:
        return [
          { label: 'Daily Tasks', current: 6, target: 8, color: '#229E82' },
          { label: 'Leads Processed', current: 15, target: 20, color: '#FCB53E' },
          { label: 'Response Rate', current: 85, target: 90, color: '#F78F35' },
          { label: 'Quality Score', current: 92, target: 95, color: '#229E82' }
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
            <Target className="h-5 w-5 text-bank-primary" />
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
                    <Badge 
                      variant={isOnTrack ? "default" : "secondary"} 
                      className="text-xs"
                      style={{ backgroundColor: isOnTrack ? metric.color : '#e5e7eb' }}
                    >
                      {formatValue(metric.current, metric.label)} / {formatValue(metric.target, metric.label)}
                    </Badge>
                  </div>
                  <Progress 
                    value={progress} 
                    className="h-2" 
                    style={{ 
                      '--progress-background': metric.color 
                    } as React.CSSProperties}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{progress.toFixed(0)}% Complete</span>
                    <span style={{ color: isOnTrack ? metric.color : '#F78F35' }}>
                      {isOnTrack ? 'On Track' : 'Needs Attention'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Achievement Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-bank-primary" />
            Today's Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg border border-bank-primary/20 bg-bank-primary/5">
              <div className="text-2xl font-bold text-bank-primary">6/8</div>
              <div className="text-sm text-gray-600">Tasks Completed</div>
            </div>
            <div className="text-center p-4 rounded-lg border border-bank-secondary/20 bg-bank-secondary/5">
              <div className="text-2xl font-bold text-bank-secondary">23</div>
              <div className="text-sm text-gray-600">Active Leads</div>
            </div>
            <div className="text-center p-4 rounded-lg border border-bank-accent/20 bg-bank-accent/5">
              <div className="text-2xl font-bold text-bank-accent">+12%</div>
              <div className="text-sm text-gray-600">This Week</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceMetrics;
