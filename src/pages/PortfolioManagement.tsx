
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import DashboardCard from '@/components/DashboardCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  IndianRupee, 
  PieChart as PieChartIcon,
  BarChart3,
  Target,
  Calendar,
  Users,
  CreditCard
} from 'lucide-react';

const PortfolioManagement = () => {
  const portfolioKpis = [
    { 
      title: 'Total Portfolio Value', 
      value: '₹2,847 Cr', 
      subtitle: 'Gross loan portfolio', 
      trend: { value: '12% YoY growth', isPositive: true }, 
      icon: <IndianRupee size={20} /> 
    },
    { 
      title: 'Active Accounts', 
      value: '125,847', 
      subtitle: 'Total loan accounts', 
      trend: { value: '8.5% increase', isPositive: true }, 
      icon: <Users size={20} /> 
    },
    { 
      title: 'Portfolio Yield', 
      value: '18.2%', 
      subtitle: 'Weighted average yield', 
      trend: { value: '0.5% improvement', isPositive: true }, 
      icon: <TrendingUp size={20} /> 
    },
    { 
      title: 'Disbursements MTD', 
      value: '₹145 Cr', 
      subtitle: 'Month to date', 
      trend: { value: '15% above target', isPositive: true }, 
      icon: <Target size={20} /> 
    },
  ];

  const productPortfolio = [
    { product: 'Personal Loans', outstanding: 998, percentage: 35.1, yield: 19.5, count: 45200 },
    { product: 'Home Loans', outstanding: 796, percentage: 28.0, yield: 9.2, count: 12800 },
    { product: 'Business Loans', outstanding: 512, percentage: 18.0, yield: 16.8, count: 28500 },
    { product: 'Vehicle Loans', outstanding: 312, percentage: 11.0, yield: 13.5, count: 18200 },
    { product: 'Gold Loans', outstanding: 142, percentage: 5.0, yield: 14.2, count: 15600 },
    { product: 'Others', outstanding: 87, percentage: 2.9, yield: 15.8, count: 5547 },
  ];

  const portfolioTrends = [
    { month: 'Jan', outstanding: 2650, disbursements: 125, collections: 145, growth: 2.1 },
    { month: 'Feb', outstanding: 2698, disbursements: 132, collections: 142, growth: 1.8 },
    { month: 'Mar', outstanding: 2745, disbursements: 128, collections: 148, growth: 1.7 },
    { month: 'Apr', outstanding: 2782, disbursements: 135, collections: 152, growth: 1.3 },
    { month: 'May', outstanding: 2821, disbursements: 142, collections: 155, growth: 1.4 },
    { month: 'Jun', outstanding: 2847, disbursements: 145, collections: 158, growth: 0.9 },
  ];

  const tenorDistribution = [
    { tenor: '0-12 months', amount: 425, color: '#ef4444' },
    { tenor: '1-2 years', amount: 568, color: '#f59e0b' },
    { tenor: '2-3 years', amount: 612, color: '#eab308' },
    { tenor: '3-5 years', amount: 754, color: '#22c55e' },
    { tenor: '5+ years', amount: 488, color: '#14b8a6' },
  ];

  const rateDistribution = [
    { range: '8-12%', amount: 312, accounts: 8500 },
    { range: '12-16%', amount: 568, accounts: 15200 },
    { range: '16-20%', amount: 985, accounts: 45800 },
    { range: '20-24%', amount: 742, accounts: 38200 },
    { range: '24%+', amount: 240, accounts: 18147 },
  ];

  const topPerformers = [
    { branch: 'Mumbai Central', portfolio: 145, growth: 22.5, yield: 19.8 },
    { branch: 'Delhi CP', portfolio: 132, growth: 18.3, yield: 18.9 },
    { branch: 'Bangalore HSR', portfolio: 128, growth: 20.1, yield: 19.2 },
    { branch: 'Pune FC Road', portfolio: 115, growth: 16.8, yield: 18.7 },
    { branch: 'Chennai T Nagar', portfolio: 108, growth: 19.4, yield: 19.1 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Portfolio Management</h1>
          <p className="text-gray-600">Monitor and analyze loan portfolio performance</p>
        </div>
      </div>

      {/* Portfolio KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {portfolioKpis.map((kpi, index) => (
          <DashboardCard
            key={index}
            title={kpi.title}
            value={kpi.value}
            subtitle={kpi.subtitle}
            icon={kpi.icon}
            trend={kpi.trend}
          />
        ))}
      </div>

      {/* Portfolio Analytics Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Portfolio Overview</TabsTrigger>
          <TabsTrigger value="products">Product Mix</TabsTrigger>
          <TabsTrigger value="analysis">Risk Analysis</TabsTrigger>
          <TabsTrigger value="performance">Branch Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Growth Trends (₹ Crores)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={portfolioTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="outstanding" stackId="1" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="disbursements" stackId="2" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tenor Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={tenorDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="amount"
                      label={({ tenor, amount }) => `${tenor}: ₹${amount}Cr`}
                    >
                      {tenorDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Portfolio Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {productPortfolio.map((product, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium">{product.product}</h3>
                      <Badge variant="outline">{product.percentage}% of portfolio</Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Outstanding: </span>
                        <span className="font-medium">₹{product.outstanding}Cr</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Yield: </span>
                        <span className="font-medium">{product.yield}%</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Accounts: </span>
                        <span className="font-medium">{product.count.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Avg Size: </span>
                        <span className="font-medium">₹{Math.round((product.outstanding * 10000000) / product.count / 1000)}K</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Interest Rate Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={rateDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [
                    name === 'amount' ? `₹${value}Cr` : `${value} accounts`,
                    name === 'amount' ? 'Outstanding Amount' : 'Number of Accounts'
                  ]} />
                  <Bar dataKey="amount" fill="#14b8a6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Branches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformers.map((branch, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                        <span className="text-teal-700 font-bold text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <div className="font-medium">{branch.branch}</div>
                        <div className="text-sm text-gray-600">Portfolio: ₹{branch.portfolio}Cr</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">
                        <span className="text-green-600">+{branch.growth}%</span> growth
                      </div>
                      <div className="text-sm text-gray-600">{branch.yield}% yield</div>
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

export default PortfolioManagement;
