import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Role } from '@/types/rbac';

interface ReportChartsProps {
  filters: any;
  userRole: Role | null;
  type: 'overview' | 'performance' | 'team' | 'system';
}

// Use theme colors for charts
const getThemeColor = (cssVar: string) => {
  if (typeof window === 'undefined') return '#000';
  const root = document.documentElement;
  const hsl = getComputedStyle(root).getPropertyValue(cssVar).trim();
  return `hsl(${hsl})`;
};

const COLORS = [
  getThemeColor('--primary'),
  getThemeColor('--sidebar-primary'),
  '#0072BC', // Ujjivan Light Blue
  '#F58220', // Ujjivan Orange
  '#10B981', // Success green
  '#EF4444'  // Error red
];

export const ReportCharts = ({ filters, userRole, type }: ReportChartsProps) => {
  // Sample data - in real app, this would come from API based on filters
  const performanceData = [
    { month: 'Jan', conversions: 45, leads: 120, revenue: 380000 },
    { month: 'Feb', conversions: 52, leads: 135, revenue: 420000 },
    { month: 'Mar', conversions: 48, leads: 128, revenue: 395000 },
    { month: 'Apr', conversions: 61, leads: 145, revenue: 485000 },
    { month: 'May', conversions: 55, leads: 138, revenue: 445000 },
    { month: 'Jun', conversions: 67, leads: 152, revenue: 520000 },
  ];

  const categoryData = [
    { name: 'Leads', value: 342 },
    { name: 'Tasks', value: 289 },
    { name: 'Conversions', value: 156 },
    { name: 'Follow-ups', value: 421 },
  ];

  const teamData = [
    { name: 'Rahul S.', performance: 92, conversions: 28 },
    { name: 'Priya M.', performance: 88, conversions: 24 },
    { name: 'Amit K.', performance: 85, conversions: 22 },
    { name: 'Sneha P.', performance: 90, conversions: 26 },
    { name: 'Vikram R.', performance: 82, conversions: 20 },
  ];

  const getChartsForType = () => {
    switch (type) {
      case 'team':
        return userRole && userRole.level >= 2 ? (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Team Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={teamData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="performance" fill={getThemeColor('--primary')} name="Performance %" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="conversions" fill={getThemeColor('--sidebar-primary')} name="Conversions" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </>
        ) : null;

      case 'system':
        return userRole && userRole.level >= 2 ? (
          <>
            <Card>
              <CardHeader>
                <CardTitle>System Activity Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </>
        ) : null;

      default:
        return (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Legend />
                    <Line type="monotone" dataKey="conversions" stroke={getThemeColor('--primary')} strokeWidth={3} name="Conversions" dot={{ fill: getThemeColor('--primary'), r: 4 }} />
                    <Line type="monotone" dataKey="leads" stroke={getThemeColor('--sidebar-primary')} strokeWidth={3} name="Leads" dot={{ fill: getThemeColor('--sidebar-primary'), r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      formatter={(value: number) => `₹${(value / 1000).toFixed(0)}K`}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="revenue" fill={getThemeColor('--primary')} name="Revenue (₹)" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {getChartsForType()}
    </div>
  );
};
