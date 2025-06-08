
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Eye, Target } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  status: string;
  revenue: number;
  target: number;
}

interface SupervisorTeamPerformanceProps {
  teamMembers: TeamMember[];
  onViewDetails: (member: TeamMember) => void;
  onAssignLeads: (member: TeamMember) => void;
}

const SupervisorTeamPerformance = ({ 
  teamMembers, 
  onViewDetails, 
  onAssignLeads 
}: SupervisorTeamPerformanceProps) => {
  const teamPerformanceData = teamMembers.map(member => ({
    name: member.name.split(' ')[0],
    target: member.target,
    achieved: member.revenue,
    conversion: Math.round((member.revenue / member.target) * 100)
  }));

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
      <Card>
        <CardHeader>
          <CardTitle>Team Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={teamPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="target" fill="#e2e8f0" name="Target" />
              <Bar dataKey="achieved" fill="#0d9488" name="Achieved" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback className="bg-teal-100 text-teal-700">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.role}</p>
                    <Badge className={getStatusColor(member.status)}>
                      {member.status}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    ₹{member.revenue}L / ₹{member.target}L
                  </p>
                  <p className={`text-lg font-bold ${getPerformanceColor(member.revenue, member.target)}`}>
                    {Math.round((member.revenue / member.target) * 100)}%
                  </p>
                  <div className="flex space-x-2 mt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onViewDetails(member)}
                    >
                      <Eye size={14} className="mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onAssignLeads(member)}
                    >
                      <Target size={14} className="mr-1" />
                      Assign
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupervisorTeamPerformance;
