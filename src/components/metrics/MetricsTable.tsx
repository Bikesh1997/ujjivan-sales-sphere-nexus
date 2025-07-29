import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loading } from '@/components/ui/loading';
import { useMetrics } from '@/hooks/useMetrics';
import { Metric } from '@/services/metricsService';
import { format } from 'date-fns';
import { BarChart3, Plus, RefreshCw } from 'lucide-react';

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'active':
      return 'default';
    case 'warning':
      return 'secondary';
    case 'critical':
      return 'destructive';
    default:
      return 'outline';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'text-green-600';
    case 'warning':
      return 'text-yellow-600';
    case 'critical':
      return 'text-red-600';
    default:
      return 'text-muted-foreground';
  }
};

export const MetricsTable = () => {
  const { metrics, isLoading, seedMetrics, isSeeding, refetch } = useMetrics();

  if (isLoading) {
    return <Loading text="Loading metrics..." />;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          <CardTitle>Metrics Overview</CardTitle>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="h-8"
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
          {metrics.length === 0 && (
            <Button
              size="sm"
              onClick={() => seedMetrics()}
              disabled={isSeeding}
              className="h-8"
            >
              <Plus className="h-4 w-4 mr-1" />
              {isSeeding ? 'Adding...' : 'Add Sample Data'}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {metrics.length === 0 ? (
          <div className="text-center py-8">
            <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No metrics data available</p>
            <Button onClick={() => seedMetrics()} disabled={isSeeding}>
              <Plus className="h-4 w-4 mr-2" />
              {isSeeding ? 'Adding Sample Data...' : 'Add Sample Data'}
            </Button>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Metric Name</TableHead>
                  <TableHead className="w-[120px]">Value</TableHead>
                  <TableHead className="w-[140px]">Date</TableHead>
                  <TableHead className="w-[120px]">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {metrics.map((metric: Metric) => (
                  <TableRow key={metric.id}>
                    <TableCell className="font-medium">
                      {metric.metric_name}
                    </TableCell>
                    <TableCell className="font-mono">
                      {typeof metric.value === 'number' 
                        ? metric.value.toLocaleString()
                        : metric.value}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {format(new Date(metric.date), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={getStatusVariant(metric.status)}
                        className={getStatusColor(metric.status)}
                      >
                        {metric.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};