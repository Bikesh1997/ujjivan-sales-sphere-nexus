
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  FunnelChart,
  Funnel
} from 'recharts';
import { RefreshCw, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { allLeads } from '@/data/leadsData';

const InteractiveFunnelChart = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('30d');
  const [chartType, setChartType] = useState('funnel');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter leads based on user role
  const userLeads = user?.role === 'supervisor' ? allLeads : allLeads.filter(lead => lead.assignedToId === user?.id);

  // Process funnel data
  const funnelStages = [
    { stage: 'Leads', status: ['new'], color: '#6366f1' },
    { stage: 'Qualified', status: ['qualified'], color: '#3b82f6' },
    { stage: 'Proposal', status: ['proposal'], color: '#f59e0b' },
    { stage: 'Negotiation', status: ['negotiation'], color: '#ef4444' },
    { stage: 'Closed Won', status: ['converted'], color: '#10b981' },
  ];

  const funnelData = funnelStages.map((stage, index) => {
    const stageLeads = userLeads.filter(lead => stage.status.includes(lead.status));
    const totalValue = stageLeads.reduce((sum, lead) => {
      const value = parseFloat(lead.value.replace('₹', '').replace('L', ''));
      return sum + value;
    }, 0);
    
    return {
      stage: stage.stage,
      count: stageLeads.length,
      value: totalValue,
      color: stage.color,
      conversion: index === 0 ? 100 : Math.round((stageLeads.length / userLeads.filter(l => funnelStages.slice(0, index + 1).some(s => s.status.includes(l.status))).length) * 100),
      fill: stage.color
    };
  });

  // Conversion trend data (simulated with more realistic data)
  const conversionTrendData = [
    { week: 'Week 1', conversion: 18, target: 25, leads: 45 },
    { week: 'Week 2', conversion: 22, target: 25, leads: 52 },
    { week: 'Week 3', conversion: 28, target: 25, leads: 48 },
    { week: 'Week 4', conversion: 25, target: 25, leads: 58 },
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const renderChart = () => {
    switch (chartType) {
      case 'funnel':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={funnelData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stage" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'count' ? `${value} leads` : `₹${value}L`,
                  name === 'count' ? 'Lead Count' : 'Total Value'
                ]}
                labelStyle={{ color: '#374151' }}
                contentStyle={{ 
                  backgroundColor: '#f9fafb', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="count" 
                fill="#14b8a6" 
                name="count"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={funnelData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
                label={({ stage, count, conversion }) => `${stage}: ${count} (${conversion}%)`}
              >
                {funnelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value} leads`, 'Count']}
                contentStyle={{ 
                  backgroundColor: '#f9fafb', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );
      case 'trend':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={conversionTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#f9fafb', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="conversion" 
                stroke="#14b8a6" 
                strokeWidth={3} 
                name="Actual Conversion %" 
                dot={{ fill: '#14b8a6', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#ef4444" 
                strokeDasharray="5 5" 
                name="Target %" 
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="leads" 
                stroke="#6366f1" 
                strokeWidth={2} 
                name="Total Leads" 
                dot={{ fill: '#6366f1', strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Interactive Sales Pipeline
          </CardTitle>
          <div className="flex gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="90d">Last 90 Days</SelectItem>
                <SelectItem value="1y">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Select value={chartType} onValueChange={setChartType}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="funnel">Funnel Chart</SelectItem>
                <SelectItem value="pie">Pie Chart</SelectItem>
                <SelectItem value="trend">Trend Analysis</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {renderChart()}
        
        {/* Enhanced Funnel Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
          {funnelData.map((stage, index) => (
            <div key={stage.stage} className="text-center p-4 rounded-lg border hover:shadow-md transition-shadow">
              <div className="text-2xl font-bold mb-1" style={{ color: stage.color }}>
                {stage.count}
              </div>
              <div className="text-sm font-medium text-gray-700 mb-1">{stage.stage}</div>
              <div className="text-xs text-teal-600 font-medium mb-1">₹{stage.value}L</div>
              <div className="text-xs text-gray-500">{stage.conversion}% conversion</div>
              {index > 0 && (
                <div className="text-xs text-orange-600 mt-1">
                  {stage.conversion < funnelData[index-1].conversion ? '↓' : '↑'} 
                  {Math.abs(stage.conversion - funnelData[index-1].conversion)}%
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveFunnelChart;
