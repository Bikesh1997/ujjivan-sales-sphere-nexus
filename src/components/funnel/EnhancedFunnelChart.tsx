
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, BarChart, Bar } from 'recharts';
import { RefreshCw, TrendingUp, Target, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { allLeads } from '@/data/leadsData';

const EnhancedFunnelChart = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('30d');
  const [chartType, setChartType] = useState('area');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const userLeads = user?.role === 'supervisor' ? allLeads : allLeads.filter(lead => lead.assignedToId === user?.id);

  const funnelStages = [
    { stage: 'Leads', status: ['new'], color: '#229E82', icon: '👥' },
    { stage: 'Qualified', status: ['qualified'], color: '#FCB53E', icon: '✅' },
    { stage: 'Proposal', status: ['proposal'], color: '#F78F35', icon: '📋' },
    { stage: 'Negotiation', status: ['negotiation'], color: '#229E82', icon: '🤝' },
    { stage: 'Closed Won', status: ['converted'], color: '#FCB53E', icon: '🏆' },
  ];

  const funnelData = funnelStages.map((stage, index) => {
    const stageLeads = userLeads.filter(lead => stage.status.includes(lead.status));
    const totalValue = stageLeads.reduce((sum, lead) => {
      const value = parseFloat(lead.value.replace('₹', '').replace('L', ''));
      return sum + value;
    }, 0);
    
    const prevStageLeads = index === 0 ? userLeads : userLeads.filter(lead => funnelStages[index - 1].status.includes(lead.status));
    const conversionRate = prevStageLeads.length > 0 ? Math.round((stageLeads.length / prevStageLeads.length) * 100) : 100;
    
    return {
      stage: stage.stage,
      count: stageLeads.length,
      value: totalValue,
      color: stage.color,
      icon: stage.icon,
      conversion: index === 0 ? 100 : conversionRate,
      fill: stage.color
    };
  });

  const pipelineProgressData = [
    { month: 'Jan', leads: 45, qualified: 32, proposals: 18, closed: 8, target: 15 },
    { month: 'Feb', leads: 52, qualified: 38, proposals: 22, closed: 12, target: 15 },
    { month: 'Mar', leads: 38, qualified: 28, proposals: 16, closed: 9, target: 15 },
    { month: 'Apr', leads: 47, qualified: 35, proposals: 20, closed: 11, target: 15 },
    { month: 'May', leads: 55, qualified: 42, proposals: 25, closed: 14, target: 15 },
    { month: 'Jun', leads: 49, qualified: 36, proposals: 21, closed: 13, target: 15 },
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const renderChart = () => {
    switch (chartType) {
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={pipelineProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="leads" stackId="1" stroke="#229E82" fill="#229E82" name="Leads" />
              <Area type="monotone" dataKey="qualified" stackId="1" stroke="#FCB53E" fill="#FCB53E" name="Qualified" />
              <Area type="monotone" dataKey="proposals" stackId="1" stroke="#F78F35" fill="#F78F35" name="Proposals" />
              <Area type="monotone" dataKey="closed" stackId="1" stroke="#229E82" fill="#229E82" name="Closed Won" />
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={funnelData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stage" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'count' ? `${value} leads` : `₹${value}L`,
                  name === 'count' ? 'Lead Count' : 'Total Value'
                ]}
              />
              <Bar dataKey="count" fill="#229E82" name="count" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={pipelineProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="closed" stroke="#229E82" strokeWidth={3} name="Closed Deals" dot={{ fill: '#229E82', strokeWidth: 2, r: 6 }} />
              <Line type="monotone" dataKey="target" stroke="#F78F35" strokeDasharray="5 5" name="Target" dot={{ fill: '#F78F35', strokeWidth: 2, r: 6 }} />
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
            <TrendingUp className="h-5 w-5 text-bank-primary" />
            My Sales Pipeline
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
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="area">Area Chart</SelectItem>
                <SelectItem value="bar">Bar Chart</SelectItem>
                <SelectItem value="line">Trend Line</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="border-bank-primary text-bank-primary hover:bg-bank-primary hover:text-white"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {renderChart()}
        
        {/* Pipeline Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
          {funnelData.map((stage, index) => (
            <Card key={stage.stage} className="text-center p-4 hover:shadow-lg transition-shadow border-l-4" style={{ borderLeftColor: stage.color }}>
              <div className="text-2xl mb-2">{stage.icon}</div>
              <div className="text-lg font-bold" style={{ color: stage.color }}>
                {stage.count}
              </div>
              <div className="text-sm text-gray-600 mb-1">{stage.stage}</div>
              <div className="text-xs font-medium" style={{ color: stage.color }}>₹{stage.value}L</div>
              {index > 0 && (
                <div className="flex items-center justify-center mt-2">
                  {stage.conversion >= 25 ? (
                    <div className="flex items-center text-bank-primary text-xs">
                      <Target size={10} className="mr-1" />
                      {stage.conversion}%
                    </div>
                  ) : (
                    <div className="flex items-center text-bank-accent text-xs">
                      <AlertCircle size={10} className="mr-1" />
                      {stage.conversion}%
                    </div>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedFunnelChart;
