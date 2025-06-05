
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface TeamPerformanceChartProps {
  teamData: any[];
}

const TeamPerformanceChart = ({ teamData }: TeamPerformanceChartProps) => {
  const performanceData = teamData.map(member => ({
    name: member.name.split(' ')[0],
    performance: member.performance.percentage,
    achieved: member.performance.achieved / 1000,
    target: member.performance.target / 1000
  }));

  const departmentData = teamData.reduce((acc, member) => {
    const dept = member.department;
    if (!acc[dept]) {
      acc[dept] = { name: dept, count: 0, avgPerformance: 0, totalPerformance: 0 };
    }
    acc[dept].count += 1;
    acc[dept].totalPerformance += member.performance.percentage;
    acc[dept].avgPerformance = acc[dept].totalPerformance / acc[dept].count;
    return acc;
  }, {} as any);

  const departmentChartData = Object.values(departmentData);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Individual Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'performance' ? `${value}%` : `₹${value}k`,
                  name === 'performance' ? 'Performance' : name === 'achieved' ? 'Achieved' : 'Target'
                ]}
              />
              <Bar dataKey="performance" fill="#8884d8" name="performance" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Department Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={departmentChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, count }) => `${name} (${count})`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {departmentChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamPerformanceChart;
