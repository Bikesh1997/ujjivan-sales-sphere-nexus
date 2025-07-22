import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import DashboardCard from '@/components/DashboardCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import KPASetupModal from '@/components/kpa/KPASetupModal';
import { 
  Target, 
  TrendingUp, 
  Users,
  Award,
  Calendar,
  Plus,
  Edit,
  Eye,
  Trophy
} from 'lucide-react';

const KPAManagement = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Q1 2024');
  const { toast } = useToast();

  const kpaOverview = [
    { 
      title: 'Total KPAs Assigned', 
      value: '48', 
      subtitle: 'Across all teams', 
      trend: { value: '12% increase', isPositive: true }, 
      icon: <Target size={20} /> 
    },
    { 
      title: 'Avg. Achievement Rate', 
      value: '87.3%', 
      subtitle: 'Current quarter', 
      trend: { value: '5.2% improvement', isPositive: true }, 
      icon: <TrendingUp size={20} /> 
    },
    { 
      title: 'Active KRAs', 
      value: '156', 
      subtitle: 'In progress', 
      trend: { value: '8 new this month', isPositive: true }, 
      icon: <Award size={20} /> 
    },
    { 
      title: 'Team Members', 
      value: '24', 
      subtitle: 'With assigned KPAs', 
      trend: { value: '100% coverage', isPositive: true }, 
      icon: <Users size={20} /> 
    },
  ];

  const kpaCategories = [
    { category: 'Sales Performance', count: 12, avgAchievement: 89.5, color: '#10b981' },
    { category: 'Customer Acquisition', count: 8, avgAchievement: 92.1, color: '#3b82f6' },
    { category: 'Customer Retention', count: 6, avgAchievement: 85.3, color: '#f59e0b' },
    { category: 'Process Improvement', count: 10, avgAchievement: 78.9, color: '#ef4444' },
    { category: 'Team Development', count: 7, avgAchievement: 94.2, color: '#8b5cf6' },
    { category: 'Risk Management', count: 5, avgAchievement: 88.7, color: '#06b6d4' },
  ];

  const employeePerformance = [
    { name: 'Rajesh Kumar', role: 'Sales Executive', kpasAssigned: 5, krasCompleted: 12, achievement: 94.5, status: 'Exceeding' },
    { name: 'Priya Sharma', role: 'Relationship Manager', kpasAssigned: 4, krasCompleted: 10, achievement: 88.2, status: 'Meeting' },
    { name: 'Amit Singh', role: 'Sales Executive', kpasAssigned: 6, krasCompleted: 8, achievement: 76.8, status: 'Below Target' },
    { name: 'Sneha Patel', role: 'Team Lead', kpasAssigned: 3, krasCompleted: 15, achievement: 96.3, status: 'Exceeding' },
    { name: 'Vikram Joshi', role: 'Relationship Manager', kpasAssigned: 4, krasCompleted: 11, achievement: 82.1, status: 'Meeting' },
  ];

  const monthlyTrends = [
    { month: 'Jan', achievement: 82.5, krasCompleted: 28 },
    { month: 'Feb', achievement: 85.1, krasCompleted: 32 },
    { month: 'Mar', achievement: 87.3, krasCompleted: 35 },
    { month: 'Apr', achievement: 89.7, krasCompleted: 38 },
    { month: 'May', achievement: 88.9, krasCompleted: 41 },
    { month: 'Jun', achievement: 91.2, krasCompleted: 44 },
  ];

  const handlePeriodChange = () => {
    const periods = ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'H1 2024', 'H2 2024', 'Annual 2024'];
    const currentIndex = periods.indexOf(selectedPeriod);
    const nextPeriod = periods[(currentIndex + 1) % periods.length];
    setSelectedPeriod(nextPeriod);
    
    toast({
      title: "Period Updated",
      description: `Switched to ${nextPeriod}`,
    });
  };

  const handleKPASave = (kpaData: any) => {
    console.log('KPA Data saved:', kpaData);
    toast({
      title: "KPA Created Successfully",
      description: `${kpaData.title} has been created with ${kpaData.kras.length} KRAs`,
    });
  };

  const handleViewCategory = (categoryName: string) => {
    toast({
      title: "Category Details",
      description: `Viewing detailed analytics for ${categoryName}`,
    });
  };

  const handleViewEmployee = (employeeName: string) => {
    toast({
      title: "Employee Profile",
      description: `Opening detailed profile for ${employeeName}`,
    });
  };

  const handleEditEmployee = (employeeName: string) => {
    toast({
      title: "Edit KPAs",
      description: `Opening KPA editor for ${employeeName}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Exceeding': return 'bg-green-100 text-green-800';
      case 'Meeting': return 'bg-blue-100 text-blue-800';
      case 'Below Target': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">KPA & KRA Management</h1>
          <p className="text-gray-600">Set, track, and manage Key Performance Areas and Key Result Areas</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handlePeriodChange}>
            <Calendar className="mr-2 h-4 w-4" />
            {selectedPeriod}
          </Button>
          <KPASetupModal
            trigger={
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New KPA
              </Button>
            }
            onSave={handleKPASave}
          />
        </div>
      </div>

      {/* KPA Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpaOverview.map((kpi, index) => (
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

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="employees">Employee Performance</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="gamification">🏆 Gamification</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>KPA Achievement by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={kpaCategories}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, 'Achievement Rate']} />
                    <Bar dataKey="avgAchievement" fill="#14b8a6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>KPA Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={kpaCategories}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                      label={({ category, count }) => `${category}: ${count}`}
                    >
                      {kpaCategories.map((entry, index) => (
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

        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>KPA Categories Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {kpaCategories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: category.color }}></div>
                      <div>
                        <h3 className="font-medium">{category.category}</h3>
                        <p className="text-sm text-gray-500">{category.count} KPAs assigned</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-semibold">{category.avgAchievement}%</p>
                        <p className="text-sm text-gray-500">Avg. Achievement</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewCategory(category.category)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employees" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Employee Performance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Employee</th>
                      <th className="text-left p-3">Role</th>
                      <th className="text-center p-3">KPAs</th>
                      <th className="text-center p-3">KRAs Completed</th>
                      <th className="text-center p-3">Achievement</th>
                      <th className="text-center p-3">Status</th>
                      <th className="text-center p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeePerformance.map((employee, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div className="font-medium">{employee.name}</div>
                        </td>
                        <td className="p-3 text-gray-600">{employee.role}</td>
                        <td className="p-3 text-center">{employee.kpasAssigned}</td>
                        <td className="p-3 text-center">{employee.krasCompleted}</td>
                        <td className="p-3 text-center font-semibold">{employee.achievement}%</td>
                        <td className="p-3 text-center">
                          <Badge className={getStatusColor(employee.status)}>
                            {employee.status}
                          </Badge>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex justify-center space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewEmployee(employee.name)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <KPASetupModal
                              trigger={
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              }
                              employeeName={employee.name}
                              onSave={handleKPASave}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Achievement Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar yAxisId="right" dataKey="krasCompleted" fill="#14b8a6" name="KRAs Completed" />
                  <Line yAxisId="left" type="monotone" dataKey="achievement" stroke="#3b82f6" strokeWidth={3} name="Achievement %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
            </Card>
          </TabsContent>
        
        <TabsContent value="gamification" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* KPA Performance Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                  <span>KPA Champions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {employeePerformance
                    .sort((a, b) => b.achievement - a.achievement)
                    .slice(0, 5)
                    .map((employee, index) => (
                    <div key={employee.name} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                      <div className="flex items-center space-x-3">
                        <div className="text-lg font-bold w-8 text-center">
                          {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                        </div>
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-sm text-muted-foreground">{employee.role}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">{employee.achievement}%</div>
                        <div className="text-sm text-muted-foreground">{employee.kpasAssigned} KPAs</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievement Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-purple-600" />
                  <span>Achievement Badges</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 border rounded-lg text-center">
                    <div className="text-2xl mb-2">🎯</div>
                    <div className="font-medium text-sm">KPA Master</div>
                    <div className="text-xs text-muted-foreground">95%+ on all KPAs</div>
                  </div>
                  <div className="p-3 border rounded-lg text-center">
                    <div className="text-2xl mb-2">⚖️</div>
                    <div className="font-medium text-sm">Balanced Achiever</div>
                    <div className="text-xs text-muted-foreground">Equal KRA & KPA performance</div>
                  </div>
                  <div className="p-3 border rounded-lg text-center">
                    <div className="text-2xl mb-2">🔥</div>
                    <div className="font-medium text-sm">Consistent Performer</div>
                    <div className="text-xs text-muted-foreground">3 months 90%+</div>
                  </div>
                  <div className="p-3 border rounded-lg text-center">
                    <div className="text-2xl mb-2">👑</div>
                    <div className="font-medium text-sm">Top Performer</div>
                    <div className="text-xs text-muted-foreground">Monthly rank #1</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Challenges */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  <span>Active KPA Challenges</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="default" className="bg-green-100 text-green-800">Daily</Badge>
                      <span className="text-sm text-muted-foreground">Today</span>
                    </div>
                    <h3 className="font-medium mb-2">KPA Progress Boost</h3>
                    <p className="text-sm text-muted-foreground mb-3">Make progress on all assigned KPAs today</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>65/100%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                      <div className="text-sm font-medium text-green-600">+25 points</div>
                    </div>
                  </div>

                  <div className="p-4 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">Weekly</Badge>
                      <span className="text-sm text-muted-foreground">6 days left</span>
                    </div>
                    <h3 className="font-medium mb-2">KPA Excellence Week</h3>
                    <p className="text-sm text-muted-foreground mb-3">Achieve 95%+ on all KPAs this week</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>87/95%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                      </div>
                      <div className="text-sm font-medium text-blue-600">+150 points + 🎯 Badge</div>
                    </div>
                  </div>

                  <div className="p-4 border border-purple-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="bg-purple-100 text-purple-800">Monthly</Badge>
                      <span className="text-sm text-muted-foreground">28 days left</span>
                    </div>
                    <h3 className="font-medium mb-2">Balanced Excellence</h3>
                    <p className="text-sm text-muted-foreground mb-3">Achieve 90%+ on both KRAs and KPAs</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>82/90%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                      </div>
                      <div className="text-sm font-medium text-purple-600">+400 points + ⚖️ Badge</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KPAManagement;
