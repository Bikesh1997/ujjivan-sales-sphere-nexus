import { useAuth } from '@/contexts/AuthContext';
import { MetricsTable } from '@/components/metrics/MetricsTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useMetrics } from '@/hooks/useMetrics';
import { BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react';

export default function InsightDash() {
  const { user } = useAuth();
  const { metrics } = useMetrics();

  // Calculate summary stats
  const totalMetrics = metrics.length;
  const activeMetrics = metrics.filter(m => m.status === 'active').length;
  const warningMetrics = metrics.filter(m => m.status === 'warning').length;
  const criticalMetrics = metrics.filter(m => m.status === 'critical').length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome to InsightDash, {user?.email?.split('@')[0] || 'User'}!
          </h1>
          <p className="text-muted-foreground">
            Monitor your key metrics and performance indicators in real-time.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Metrics</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMetrics}</div>
              <p className="text-xs text-muted-foreground">
                Tracked metrics
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{activeMetrics}</div>
              <p className="text-xs text-muted-foreground">
                Performing well
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Warning</CardTitle>
              <Users className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{warningMetrics}</div>
              <p className="text-xs text-muted-foreground">
                Needs attention
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical</CardTitle>
              <DollarSign className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{criticalMetrics}</div>
              <p className="text-xs text-muted-foreground">
                Immediate action required
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Status Overview */}
        {totalMetrics > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg">Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Badge variant="default" className="text-green-600">
                    Active
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {activeMetrics} metrics performing well
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-yellow-600">
                    Warning
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {warningMetrics} metrics need attention
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="destructive" className="text-red-600">
                    Critical
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {criticalMetrics} metrics require immediate action
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Metrics Table */}
        <MetricsTable />
      </div>
    </div>
  );
}