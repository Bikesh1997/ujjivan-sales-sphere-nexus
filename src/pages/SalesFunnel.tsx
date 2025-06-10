
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Users, 
  Target, 
  DollarSign,
  Filter,
  Download
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, FunnelChart, Funnel, Cell } from 'recharts';
import { useToast } from '@/hooks/use-toast';

interface FunnelStage {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

interface ConversionData {
  stage: string;
  count: number;
  revenue: number;
}

const SalesFunnel = () => {
  const { toast } = useToast();
  
  const [funnelData] = useState<FunnelStage[]>([
    { name: 'Leads Generated', value: 1000, percentage: 100, color: '#3b82f6' },
    { name: 'Qualified Leads', value: 750, percentage: 75, color: '#10b981' },
    { name: 'Proposals Sent', value: 400, percentage: 40, color: '#f59e0b' },
    { name: 'Negotiations', value: 200, percentage: 20, color: '#ef4444' },
    { name: 'Closed Won', value: 150, percentage: 15, color: '#8b5cf6' }
  ]);

  const [conversionData] = useState<ConversionData[]>([
    { stage: 'Lead Gen', count: 1000, revenue: 0 },
    { stage: 'Qualified', count: 750, revenue: 2250000 },
    { stage: 'Proposal', count: 400, revenue: 6000000 },
    { stage: 'Negotiation', count: 200, revenue: 8000000 },
    { stage: 'Closed', count: 150, revenue: 12000000 }
  ]);

  const [timeFilter, setTimeFilter] = useState('this_month');

  const handleExport = () => {
    toast({
      title: "Export Initiated",
      description: "Sales funnel data is being exported to CSV",
    });
  };

  const handleFilter = (filter: string) => {
    setTimeFilter(filter);
    toast({
      title: "Filter Applied",
      description: `Showing data for ${filter.replace('_', ' ')}`,
    });
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Sales Funnel
          </h1>
          <p className="text-gray-600 mt-1">
            Track your sales pipeline and conversion rates
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleFilter('this_week')}>
            <Filter className="h-4 w-4 mr-2" />
            This Week
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleFilter('this_month')}>
            This Month
          </Button>
          <Button onClick={handleExport} size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Leads</p>
                <p className="text-2xl font-bold">{funnelData[0]?.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold">{funnelData[4]?.percentage}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-bold">₹{(conversionData[4]?.revenue / 1000000).toFixed(1)}M</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Deal Size</p>
                <p className="text-2xl font-bold">₹{(conversionData[4]?.revenue / funnelData[4]?.value / 1000).toFixed(0)}K</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Funnel Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Funnel Stages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {funnelData.map((stage, index) => (
                <div key={stage.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{stage.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">{stage.value}</span>
                      <Badge style={{ backgroundColor: stage.color, color: 'white' }}>
                        {stage.percentage}%
                      </Badge>
                    </div>
                  </div>
                  <Progress 
                    value={stage.percentage} 
                    className="h-3"
                    style={{ '--progress-background': stage.color } as React.CSSProperties}
                  />
                  {index < funnelData.length - 1 && (
                    <p className="text-xs text-gray-500">
                      Drop-off: {funnelData[index].value - funnelData[index + 1].value} leads
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion by Stage</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'count' ? value : `₹${(value as number / 1000000).toFixed(1)}M`,
                    name === 'count' ? 'Leads' : 'Revenue'
                  ]}
                />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Stage Details */}
      <Card>
        <CardHeader>
          <CardTitle>Stage Performance Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Stage</th>
                  <th className="text-left p-2">Count</th>
                  <th className="text-left p-2">Conversion Rate</th>
                  <th className="text-left p-2">Revenue</th>
                  <th className="text-left p-2">Avg Time</th>
                </tr>
              </thead>
              <tbody>
                {funnelData.map((stage, index) => (
                  <tr key={stage.name} className="border-b">
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: stage.color }}
                        />
                        {stage.name}
                      </div>
                    </td>
                    <td className="p-2 font-medium">{stage.value}</td>
                    <td className="p-2">
                      <Badge variant="secondary">{stage.percentage}%</Badge>
                    </td>
                    <td className="p-2">₹{(conversionData[index]?.revenue / 1000000).toFixed(1)}M</td>
                    <td className="p-2 text-gray-600">{Math.floor(Math.random() * 7) + 1} days</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Action Items */}
      <Card>
        <CardHeader>
          <CardTitle>Optimization Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Improve Lead Quality</h4>
              <p className="text-sm text-gray-600 mb-3">
                Focus on lead scoring to improve qualification rate from 75% to 85%
              </p>
              <Button size="sm" variant="outline">
                View Strategy
              </Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Reduce Drop-off</h4>
              <p className="text-sm text-gray-600 mb-3">
                Optimize proposal process to increase conversion from 40% to 50%
              </p>
              <Button size="sm" variant="outline">
                Analyze Issues
              </Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Faster Closing</h4>
              <p className="text-sm text-gray-600 mb-3">
                Implement negotiation best practices to improve closing rate
              </p>
              <Button size="sm" variant="outline">
                Training Plan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesFunnel;
