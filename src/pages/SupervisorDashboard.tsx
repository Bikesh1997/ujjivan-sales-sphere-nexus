import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  TrendingUp, 
  Target, 
  Award,
  MapPin,
  Calendar,
  Activity,
  BarChart3
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  target: number;
  achieved: number;
  status: 'active' | 'on_leave' | 'inactive';
  location: string;
}

interface KPI {
  name: string;
  value: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
}

const SupervisorDashboard = () => {
  const { toast } = useToast();
  
  const [teamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Priya Sharma',
      role: 'Sales Executive',
      target: 50,
      achieved: 38,
      status: 'active',
      location: 'Bandra Branch'
    },
    {
      id: '2',
      name: 'Rajesh Kumar',
      role: 'Sales Executive',
      target: 45,
      achieved: 42,
      status: 'active',
      location: 'Andheri Branch'
    },
    {
      id: '3',
      name: 'Anita Patel',
      role: 'Relationship Manager',
      target: 60,
      achieved: 35,
      status: 'on_leave',
      location: 'Powai Branch'
    }
  ]);

  const [kpis] = useState<KPI[]>([
    { name: 'Team Conversion Rate', value: 28, target: 25, trend: 'up' },
    { name: 'Average Deal Size', value: 185000, target: 150000, trend: 'up' },
    { name: 'Customer Satisfaction', value: 4.6, target: 4.5, trend: 'stable' },
    { name: 'Lead Response Time', value: 2.3, target: 3.0, trend: 'up' }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'on_leave': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      case 'stable': return '→';
      default: return '→';
    }
  };

  const handleTeamAction = (action: string, memberId?: string) => {
    toast({
      title: "Action Initiated",
      description: `${action} has been initiated${memberId ? ` for team member` : ''}`,
    });
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Supervisor Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Team Performance Overview - {new Date().toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => handleTeamAction('Generate Report')} variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button onClick={() => handleTeamAction('Team Meeting')} size="sm">
            <Users className="h-4 w-4 mr-2" />
            Team Meeting
          </Button>
        </div>
      </div>

      {/* Team Overview KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Team Size</p>
                <p className="text-2xl font-bold">{teamMembers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Achievement</p>
                <p className="text-2xl font-bold">
                  {Math.round(teamMembers.reduce((acc, member) => acc + (member.achieved / member.target * 100), 0) / teamMembers.length)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Team Revenue</p>
                <p className="text-2xl font-bold">₹{(teamMembers.reduce((acc, member) => acc + member.achieved, 0) * 1000 / 100000).toFixed(1)}L</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Top Performer</p>
                <p className="text-sm font-bold">{teamMembers.sort((a, b) => (b.achieved/b.target) - (a.achieved/a.target))[0]?.name}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Performance Indicators */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Key Performance Indicators
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((kpi, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-600">{kpi.name}</p>
                  <span className="text-lg">{getTrendIcon(kpi.trend)}</span>
                </div>
                <p className="text-xl font-bold">
                  {kpi.name.includes('Rate') || kpi.name.includes('Satisfaction') 
                    ? `${kpi.value}${kpi.name.includes('Satisfaction') ? '/5' : '%'}`
                    : kpi.name.includes('Size') 
                      ? `₹${(kpi.value / 1000).toFixed(0)}K`
                      : `${kpi.value}h`
                  }
                </p>
                <p className="text-xs text-gray-500">
                  Target: {kpi.name.includes('Rate') || kpi.name.includes('Satisfaction') 
                    ? `${kpi.target}${kpi.name.includes('Satisfaction') ? '/5' : '%'}`
                    : kpi.name.includes('Size') 
                      ? `₹${(kpi.target / 1000).toFixed(0)}K`
                      : `${kpi.target}h`
                  }
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Team Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => {
              const achievementPercentage = (member.achieved / member.target) * 100;
              return (
                <div key={member.id} className="p-4 border rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{member.name}</h4>
                        <Badge className={getStatusColor(member.status)}>
                          {member.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{member.role} • {member.location}</p>
                      <div className="mt-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Target Achievement</span>
                          <span>{achievementPercentage.toFixed(1)}%</span>
                        </div>
                        <Progress value={achievementPercentage} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">
                          {member.achieved} / {member.target} deals
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleTeamAction('View Details', member.id)}
                      >
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleTeamAction('Schedule 1:1', member.id)}
                      >
                        Schedule 1:1
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions for Supervisor */}
      <Card>
        <CardHeader>
          <CardTitle>Supervisor Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-auto p-4 flex-col space-y-2"
              onClick={() => handleTeamAction('Assign Leads')}
            >
              <Users className="h-6 w-6" />
              <span className="text-sm">Assign Leads</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex-col space-y-2"
              onClick={() => handleTeamAction('Set Targets')}
            >
              <Target className="h-6 w-6" />
              <span className="text-sm">Set Targets</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex-col space-y-2"
              onClick={() => handleTeamAction('Territory Review')}
            >
              <MapPin className="h-6 w-6" />
              <span className="text-sm">Territory Review</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex-col space-y-2"
              onClick={() => handleTeamAction('Performance Review')}
            >
              <Activity className="h-6 w-6" />
              <span className="text-sm">Performance Review</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupervisorDashboard;
