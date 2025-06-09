
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, Area, AreaChart } from 'recharts';
import { TrendingUp, Target, IndianRupee, Calendar, ArrowUpRight, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ProjectionSectionProps {
  currentPerformance: {
    convertedLeads: number;
    totalRevenue: number;
    monthlyTarget: number;
  };
}

const ProjectionSection = ({ currentPerformance }: ProjectionSectionProps) => {
  // Calculate projections based on current performance
  const currentDate = new Date();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const daysPassed = currentDate.getDate();
  const daysRemaining = daysInMonth - daysPassed;
  
  // Calculate daily conversion rate
  const dailyConversionRate = currentPerformance.convertedLeads / daysPassed;
  const projectedMonthlyConversions = Math.round(dailyConversionRate * daysInMonth);
  const projectedRevenue = Math.round((currentPerformance.totalRevenue / currentPerformance.convertedLeads) * projectedMonthlyConversions);
  
  // Generate projection data for charts
  const projectionData = [
    { month: 'Current', actual: currentPerformance.convertedLeads, projected: projectedMonthlyConversions, target: currentPerformance.monthlyTarget },
    { month: 'Next', actual: 0, projected: projectedMonthlyConversions + 2, target: currentPerformance.monthlyTarget },
    { month: 'Month+2', actual: 0, projected: projectedMonthlyConversions + 4, target: currentPerformance.monthlyTarget },
    { month: 'Month+3', actual: 0, projected: projectedMonthlyConversions + 3, target: currentPerformance.monthlyTarget }
  ];

  const revenueProjectionData = [
    { month: 'Current', revenue: currentPerformance.totalRevenue, projected: projectedRevenue },
    { month: 'Next', revenue: 0, projected: projectedRevenue + 5 },
    { month: 'Month+2', revenue: 0, projected: projectedRevenue + 12 },
    { month: 'Month+3', revenue: 0, projected: projectedRevenue + 8 }
  ];

  // Performance indicators
  const targetAchievementRate = (projectedMonthlyConversions / currentPerformance.monthlyTarget) * 100;
  const isOnTrack = targetAchievementRate >= 90;
  const growthRate = ((projectedMonthlyConversions - currentPerformance.convertedLeads) / currentPerformance.convertedLeads) * 100;

  const chartConfig = {
    actual: {
      label: "Actual",
      color: "#0d9488",
    },
    projected: {
      label: "Projected",
      color: "#06b6d4",
    },
    target: {
      label: "Target",
      color: "#e2e8f0",
    },
    revenue: {
      label: "Revenue",
      color: "#8b5cf6",
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-teal-600" />
            Sales Projections & Forecasts
          </h2>
          <p className="text-sm text-gray-600">AI-powered insights based on your current performance</p>
        </div>
        <Button variant="outline" size="sm">
          <Calendar className="h-4 w-4 mr-2" />
          Adjust Timeline
        </Button>
      </div>

      {/* Key Projection Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Month-End Projection</p>
                <p className="text-2xl font-bold text-gray-900">{projectedMonthlyConversions}</p>
                <p className="text-xs text-gray-500 mt-1">
                  <ArrowUpRight size={14} className="inline-block mr-1" />
                  {Math.round(growthRate)}% growth rate
                </p>
              </div>
              <Target size={48} className="text-blue-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Target Achievement</p>
                <p className="text-2xl font-bold text-gray-900">{Math.round(targetAchievementRate)}%</p>
                <Badge variant={isOnTrack ? "default" : "destructive"} className="text-xs mt-1">
                  {isOnTrack ? "On Track" : "Below Target"}
                </Badge>
              </div>
              <div className={`p-2 rounded-full ${isOnTrack ? 'bg-green-100' : 'bg-red-100'}`}>
                {isOnTrack ? (
                  <TrendingUp className="h-6 w-6 text-green-600" />
                ) : (
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Projected Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹{projectedRevenue}L</p>
                <p className="text-xs text-gray-500 mt-1">
                  Based on current avg. deal size
                </p>
              </div>
              <IndianRupee size={48} className="text-green-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Days to Target</p>
                <p className="text-2xl font-bold text-gray-900">{daysRemaining}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Need {currentPerformance.monthlyTarget - currentPerformance.convertedLeads} more conversions
                </p>
              </div>
              <Calendar size={48} className="text-purple-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projection Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Conversion Trend Projection</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={projectionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="var(--color-target)" 
                    strokeDasharray="5 5" 
                    strokeWidth={2}
                    name="Target"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="var(--color-actual)" 
                    strokeWidth={3}
                    name="Actual"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="projected" 
                    stroke="var(--color-projected)" 
                    strokeWidth={2}
                    strokeDasharray="3 3"
                    name="Projected"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Projection</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueProjectionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area 
                    type="monotone" 
                    dataKey="projected" 
                    stroke="var(--color-revenue)" 
                    fill="var(--color-revenue)"
                    fillOpacity={0.3}
                    strokeWidth={2}
                    name="Projected Revenue (₹L)"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="var(--color-actual)" 
                    fill="var(--color-actual)"
                    fillOpacity={0.6}
                    strokeWidth={2}
                    name="Current Revenue (₹L)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            AI-Powered Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-medium text-blue-900 mb-2">Performance Analysis</h4>
              <p className="text-sm text-blue-800">
                Based on your current conversion rate of {dailyConversionRate.toFixed(1)} leads per day, 
                you're {isOnTrack ? 'on track to exceed' : 'likely to fall short of'} your monthly target by{' '}
                {Math.abs(projectedMonthlyConversions - currentPerformance.monthlyTarget)} conversions.
              </p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <h4 className="font-medium text-green-900 mb-2">Optimization Opportunity</h4>
              <p className="text-sm text-green-800">
                To reach your target, focus on {daysRemaining} high-priority leads in the next {daysRemaining} days. 
                Increasing your daily conversion rate by just 0.5 leads could boost your month-end projection by{' '}
                {Math.round(0.5 * daysRemaining)} conversions.
              </p>
            </div>
            
            {!isOnTrack && (
              <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <h4 className="font-medium text-orange-900 mb-2">Action Required</h4>
                <p className="text-sm text-orange-800">
                  Consider prioritizing follow-ups with qualified leads and scheduling additional customer visits 
                  to bridge the gap of {currentPerformance.monthlyTarget - projectedMonthlyConversions} conversions.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectionSection;
