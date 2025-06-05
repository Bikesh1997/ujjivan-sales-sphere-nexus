
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import PerformanceMetrics from '@/components/funnel/PerformanceMetrics';

const SalesFunnel = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Sales Performance</h1>
      </div>

      <PerformanceMetrics />

      {/* Additional performance insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Performance Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <h3 className="font-medium text-emerald-800 mb-2">Great Progress!</h3>
              <p className="text-sm text-emerald-700">
                You're ahead of schedule this week. Keep up the excellent work on lead conversions.
              </p>
            </div>
            
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h3 className="font-medium text-orange-800 mb-2">Action Required</h3>
              <p className="text-sm text-orange-700">
                Beat coverage is below target. Consider optimizing your daily route planning.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesFunnel;
