import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  TrendingUp, 
  Target, 
  Award, 
  Users,
  IndianRupee,
  Calendar
} from 'lucide-react';

const TeamPerformance = () => {
  const teamPerformanceData = [
    { name: 'Rahul', target: 15, achieved: 12, conversion: 32, calls: 95 },
    { name: 'Anjali', target: 12, achieved: 11, conversion: 28, calls: 78 },
    { name: 'Vikash', target: 14, achieved: 8, conversion: 18, calls: 65 },
    { name: 'Priya', target: 18, achieved: 17, conversion: 35, calls: 102 }
  ];

  const monthlyTrends = [
    { month: 'Jan', teamTarget: 59, teamAchieved: 52, avgConversion: 28 },
    { month: 'Feb', teamTarget: 61, teamAchieved: 58, avgConversion: 31 },
    { month: 'Mar', teamTarget: 63, teamAchieved: 59, avgConversion: 29 },
    { month: 'Apr', teamTarget: 65, teamAchieved: 62, avgConversion: 33 },
    { month: 'May', teamTarget: 67, teamAchieved: 48, avgConversion: 28 },
    { month: 'Jun', teamTarget: 69, teamAchieved: 48, avgConversion: 29 }
  ];

  const productPerformance = [
    { product: 'Personal Loans', value: 18.5, color: '#14b8a6' },
    { product: 'Home Loans', value: 12.3, color: '#3b82f6' },
    { product: 'Business Loans', value: 8.7, color: '#f59e0b' },
    { product: 'Credit Cards', value: 5.2, color: '#ef4444' },
    { product: 'Others', value: 3.3, color: '#8b5cf6' }
  ];

  const teamMembers = [
    {
      id: '1',
      name: 'Rahul Sharma',
      position: 'Senior Sales Executive',
      target: 15,
      achieved: 12,
      conversion: 32,
      rank: 2,
      improvement: '+5%'
    },
    {
      id: '2',
      name: 'Anjali Patel',
      position: 'Sales Executive',
      target: 12,
      achieved: 11,
      conversion: 28,
      rank: 3,
      improvement: '+8%'
    },
    {
      id: '3',
      name: 'Vikash Kumar',
      position: 'Sales Executive',
      target: 14,
      achieved: 8,
      conversion: 18,
      rank: 4,
      improvement: '-3%'
    },
    {
      id: '4',
      name: 'Priya Singh',
      position: 'Senior Sales Executive',
      target: 18,
      achieved: 17,
      conversion: 35,
      rank: 1,
      improvement: '+12%'
    }
  ];

  const getPerformanceColor = (achieved: number, target: number) => {
    const percentage = (achieved / target) * 100;
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 75) return 'text-blue-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRankBadge = (rank: number) => {
    const colors = {
      1: 'bg-yellow-100 text-yellow-800',
      2: 'bg-gray-100 text-gray-800',
      3: 'bg-orange-100 text-orange-800',
      4: 'bg-blue-100 text-blue-800'
    };
    return colors[rank as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const teamKpis = [
    {
      title: 'Team Target',
      value: '₹59L',
      subtitle: 'Monthly collective target',
      trend: { value: '8% above last month', isPositive: true },
      icon: <Target size={20} />
    },
    {
      title: 'Team Achievement',
      value: '₹48L',
      subtitle: 'Current month revenue',
      trend: { value: '81% of target', isPositive: true },
      icon: <TrendingUp size={20} />
    },
    {
      title: 'Average Conversion',
      value: '28.25%',
      subtitle: 'Team conversion rate',
      trend: { value: '3% improvement', isPositive: true },
      icon: <Award size={20} />
    },
    {
      title: 'Top Performer',
      value: 'Priya Singh',
      subtitle: '94% target achievement',
      trend: { value: 'Leading this month', isPositive: true },
      icon: <Users size={20} />
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Performance Analytics</h1>
          <p className="text-gray-600">Team performance metrics and analytics</p>
        </div>
      </div>

      {/* Team KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamKpis.map((kpi, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-teal-100 rounded-lg">
                  {kpi.icon}
                </div>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  kpi.trend.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {kpi.trend.value}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                <p className="text-sm text-gray-500">{kpi.subtitle}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trends">Monthly Trends</TabsTrigger>
          <TabsTrigger value="products">Product Performance</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="teamTarget" stroke="#8884d8" strokeWidth={2} name="Team Target" />
                  <Line type="monotone" dataKey="teamAchieved" stroke="#14b8a6" strokeWidth={2} name="Team Achieved" />
                  <Line type="monotone" dataKey="avgConversion" stroke="#f59e0b" strokeWidth={2} name="Avg Conversion %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product-wise Performance (₹ Lakhs)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={productPerformance}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ product, value }) => `${product}: ₹${value}L`}
                  >
                    {productPerformance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers
                  .sort((a, b) => a.rank - b.rank)
                  .map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Badge className={getRankBadge(member.rank)}>
                          #{member.rank}
                        </Badge>
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-teal-100 text-teal-700">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{member.name}</h4>
                          <p className="text-sm text-gray-500">{member.position}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="text-center">
                          <p className="text-gray-600">Achievement</p>
                          <p className={`font-bold ${getPerformanceColor(member.achieved, member.target)}`}>
                            ₹{member.achieved}L / ₹{member.target}L
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-600">Conversion</p>
                          <p className="font-bold">{member.conversion}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-600">Improvement</p>
                          <p className={`font-bold ${member.improvement.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {member.improvement}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamPerformance;
