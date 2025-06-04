
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import DashboardCard from '@/components/DashboardCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Users, 
  Target, 
  TrendingUp, 
  IndianRupee, 
  UserCheck,
  AlertTriangle,
  Award,
  Clock,
  Settings,
  UserPlus,
  BarChart3,
  Calendar
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { allLeads } from '@/data/leadsData';

const SupervisorDashboard = () => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Team data
  const teamMembers = [
    { 
      id: '1', 
      name: 'Rahul Sharma', 
      role: 'Sales Executive',
      leads: 25, 
      converted: 8, 
      revenue: 12.5, 
      target: 15,
      lastActivity: '2 hours ago',
      status: 'active'
    },
    { 
      id: '3', 
      name: 'Anjali Patel', 
      role: 'Sales Executive',
      leads: 18, 
      converted: 5, 
      revenue: 8.2, 
      target: 12,
      lastActivity: '30 min ago',
      status: 'active'
    },
    { 
      id: '4', 
      name: 'Vikash Kumar', 
      role: 'Sales Executive',
      leads: 22, 
      converted: 6, 
      revenue: 9.8, 
      target: 14,
      lastActivity: '1 day ago',
      status: 'inactive'
    },
    { 
      id: '5', 
      name: 'Priya Singh', 
      role: 'Sales Executive',
      leads: 30, 
      converted: 12, 
      revenue: 18.5, 
      target: 20,
      lastActivity: '1 hour ago',
      status: 'active'
    }
  ];

  // Unassigned leads requiring allocation
  const unassignedLeads = allLeads.filter(lead => !lead.assignedToId).slice(0, 8);

  // Team performance data
  const teamPerformanceData = teamMembers.map(member => ({
    name: member.name.split(' ')[0],
    target: member.target,
    achieved: member.revenue,
    conversion: Math.round((member.converted / member.leads) * 100)
  }));

  const kpis = [
    { 
      title: 'Team Size', 
      value: teamMembers.length.toString(), 
      subtitle: 'Active team members', 
      trend: { value: '1 new this month', isPositive: true }, 
      icon: <Users size={20} /> 
    },
    { 
      title: 'Team Target', 
      value: '₹61L', 
      subtitle: 'Monthly collective target', 
      trend: { value: '12% above last month', isPositive: true }, 
      icon: <Target size={20} /> 
    },
    { 
      title: 'Team Achievement', 
      value: '₹49L', 
      subtitle: 'Current month revenue', 
      trend: { value: '80% of target', isPositive: true }, 
      icon: <TrendingUp size={20} /> 
    },
    { 
      title: 'Unassigned Leads', 
      value: unassignedLeads.length.toString(), 
      subtitle: 'Require allocation', 
      trend: { value: '5 new today', isPositive: false }, 
      icon: <AlertTriangle size={20} /> 
    },
  ];

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getPerformanceColor = (achieved: number, target: number) => {
    const percentage = (achieved / target) * 100;
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Supervisor Dashboard</h1>
          <p className="text-gray-600">Team management and performance oversight</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <UserPlus size={16} className="mr-2" />
            Add Team Member
          </Button>
          <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
            <Settings size={16} className="mr-2" />
            Team Settings
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
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

      {/* Team Performance & Lead Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Team Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={teamPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="target" fill="#e5e7eb" name="Target (₹L)" />
                <Bar dataKey="achieved" fill="#14b8a6" name="Achieved (₹L)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Unassigned Leads */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Lead Allocation Required</CardTitle>
              <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                Auto-Assign
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {unassignedLeads.map((lead, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{lead.name}</p>
                    <p className="text-xs text-gray-500">{lead.contact} • {lead.value}</p>
                  </div>
                  <div className="flex space-x-2">
                    <select className="text-xs border rounded px-2 py-1">
                      <option value="">Assign to...</option>
                      {teamMembers.filter(m => m.status === 'active').map(member => (
                        <option key={member.id} value={member.id}>{member.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Members Management */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teamMembers.map((member) => (
              <Card key={member.id} className="border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-teal-100 text-teal-700">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{member.name}</h4>
                        <p className="text-sm text-gray-500">{member.role}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(member.status)}>
                      {member.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Leads</p>
                      <p className="font-medium">{member.leads}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Converted</p>
                      <p className="font-medium">{member.converted}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Revenue</p>
                      <p className={`font-medium ${getPerformanceColor(member.revenue, member.target)}`}>
                        ₹{member.revenue}L / ₹{member.target}L
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Last Active</p>
                      <p className="font-medium">{member.lastActivity}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-3">
                    <Button size="sm" variant="outline" className="flex-1">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Assign Leads
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <BarChart3 size={32} className="mx-auto text-blue-600 mb-3" />
            <h3 className="font-medium mb-2">Performance Reports</h3>
            <p className="text-sm text-gray-600">Generate team performance analytics</p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Calendar size={32} className="mx-auto text-green-600 mb-3" />
            <h3 className="font-medium mb-2">Schedule Review</h3>
            <p className="text-sm text-gray-600">One-on-one team member reviews</p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Award size={32} className="mx-auto text-purple-600 mb-3" />
            <h3 className="font-medium mb-2">Set Targets</h3>
            <p className="text-sm text-gray-600">Define goals and KPIs for team</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupervisorDashboard;
