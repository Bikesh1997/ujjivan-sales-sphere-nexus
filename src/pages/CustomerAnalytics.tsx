
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, ScatterChart, Scatter } from 'recharts';
import DashboardCard from '@/components/DashboardCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  TrendingUp, 
  Heart,
  UserPlus,
  CreditCard,
  Clock,
  Target,
  Star
} from 'lucide-react';

const CustomerAnalytics = () => {
  const customerKpis = [
    { 
      title: 'Customer Acquisition', 
      value: '2,847', 
      subtitle: 'New customers this month', 
      trend: { value: '23% increase', isPositive: true }, 
      icon: <UserPlus size={20} /> 
    },
    { 
      title: 'Customer Retention', 
      value: '94.2%', 
      subtitle: 'Annual retention rate', 
      trend: { value: '2.1% improvement', isPositive: true }, 
      icon: <Heart size={20} /> 
    },
    { 
      title: 'Avg. Customer Value', 
      value: '₹3.2L', 
      subtitle: 'Per customer annually', 
      trend: { value: '15% growth', isPositive: true }, 
      icon: <TrendingUp size={20} /> 
    },
    { 
      title: 'Customer Satisfaction', 
      value: '4.6/5', 
      subtitle: 'Average rating', 
      trend: { value: '0.3 points up', isPositive: true }, 
      icon: <Star size={20} /> 
    },
  ];

  const customerSegments = [
    { segment: 'Premium', count: 12500, value: 850, color: '#10b981' },
    { segment: 'Gold', count: 28300, value: 425, color: '#f59e0b' },
    { segment: 'Silver', count: 45200, value: 220, color: '#6b7280' },
    { segment: 'Basic', count: 39800, value: 85, color: '#ef4444' },
  ];

  const ageDistribution = [
    { ageGroup: '18-25', count: 15400, percentage: 15.2 },
    { ageGroup: '26-35', count: 28900, percentage: 28.5 },
    { ageGroup: '36-45', count: 32200, percentage: 31.8 },
    { ageGroup: '46-55', count: 18700, percentage: 18.4 },
    { ageGroup: '55+', count: 6100, percentage: 6.1 },
  ];

  const customerJourney = [
    { stage: 'Awareness', customers: 10000, conversion: 100 },
    { stage: 'Interest', customers: 6500, conversion: 65 },
    { stage: 'Consideration', customers: 4200, conversion: 42 },
    { stage: 'Intent', customers: 2800, conversion: 28 },
    { stage: 'Purchase', customers: 1850, conversion: 18.5 },
    { stage: 'Retention', customers: 1650, conversion: 16.5 },
  ];

  const productAdoption = [
    { product: 'Savings Account', adoption: 85, satisfaction: 4.5 },
    { product: 'Personal Loan', adoption: 45, satisfaction: 4.2 },
    { product: 'Credit Card', adoption: 35, satisfaction: 4.0 },
    { product: 'Home Loan', adoption: 25, satisfaction: 4.6 },
    { product: 'Investment', adoption: 20, satisfaction: 4.3 },
    { product: 'Insurance', adoption: 15, satisfaction: 3.8 },
  ];

  const customerLifetime = [
    { tenure: '0-1 Year', count: 25400, avgValue: 45000 },
    { tenure: '1-3 Years', count: 35200, avgValue: 125000 },
    { tenure: '3-5 Years', count: 28500, avgValue: 285000 },
    { tenure: '5-10 Years', count: 22800, avgValue: 465000 },
    { tenure: '10+ Years', count: 14100, avgValue: 725000 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Analytics</h1>
          <p className="text-gray-600">Deep insights into customer behavior and segmentation</p>
        </div>
      </div>

      {/* Customer KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {customerKpis.map((kpi, index) => (
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

      {/* Customer Analytics Tabs */}
      <Tabs defaultValue="segments" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="segments">Segmentation</TabsTrigger>
          <TabsTrigger value="journey">Customer Journey</TabsTrigger>
          <TabsTrigger value="products">Product Adoption</TabsTrigger>
          <TabsTrigger value="lifetime">Lifetime Value</TabsTrigger>
        </TabsList>

        <TabsContent value="segments" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Segments by Value</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={customerSegments}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="segment" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => [
                      name === 'count' ? `${value} customers` : `₹${value}K avg value`,
                      name === 'count' ? 'Customer Count' : 'Average Value'
                    ]} />
                    <Bar dataKey="count" fill="#14b8a6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Age Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={ageDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                      label={({ ageGroup, percentage }) => `${ageGroup}: ${percentage}%`}
                    >
                      {ageDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(${index * 60}, 70%, 50%)`} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="journey" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Journey Funnel</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={customerJourney} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="stage" type="category" />
                  <Tooltip />
                  <Bar dataKey="customers" fill="#14b8a6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Adoption vs Satisfaction</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart data={productAdoption}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="adoption" name="Adoption Rate" unit="%" />
                  <YAxis dataKey="satisfaction" name="Satisfaction" domain={[3.5, 5]} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter dataKey="satisfaction" fill="#14b8a6" />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lifetime" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Lifetime Value by Tenure</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={customerLifetime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="tenure" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [
                    name === 'count' ? `${value} customers` : `₹${Math.round(Number(value)/1000)}K`,
                    name === 'count' ? 'Customer Count' : 'Average Lifetime Value'
                  ]} />
                  <Bar dataKey="avgValue" fill="#3b82f6" name="avgValue" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerAnalytics;
