
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  Target,
  TrendingUp,
  MoreVertical,
  Edit,
  UserX,
  Award
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TeamMemberCardProps {
  member: {
    id: string;
    name: string;
    role: string;
    email: string;
    phone: string;
    department: string;
    joiningDate: string;
    status: 'active' | 'inactive' | 'on_leave';
    performance: {
      target: number;
      achieved: number;
      percentage: number;
    };
    location?: string;
    lastActivity?: string;
  };
  onEdit: (member: any) => void;
  onRemove: (memberId: string) => void;
  onSetTargets: (member: any) => void;
  onScheduleReview: (member: any) => void;
}

const TeamMemberCard = ({ member, onEdit, onRemove, onSetTargets, onScheduleReview }: TeamMemberCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'on_leave': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 70) return 'text-blue-600';
    if (percentage >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-teal-100 text-teal-700">
                {member.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-medium">{member.name}</h4>
                <Badge className={getStatusColor(member.status)}>
                  {member.status.replace('_', ' ')}
                </Badge>
              </div>
              
              <p className="text-sm text-gray-600 mb-1">{member.role}</p>
              <p className="text-xs text-gray-500">{member.department}</p>
              
              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                <span className="flex items-center">
                  <Mail size={12} className="mr-1" />
                  {member.email}
                </span>
                <span className="flex items-center">
                  <Phone size={12} className="mr-1" />
                  {member.phone}
                </span>
              </div>
              
              {member.location && (
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <MapPin size={12} className="mr-1" />
                  {member.location}
                </div>
              )}
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(member)}>
                <Edit size={14} className="mr-2" />
                Edit Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSetTargets(member)}>
                <Target size={14} className="mr-2" />
                Set Targets
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onScheduleReview(member)}>
                <Calendar size={14} className="mr-2" />
                Schedule Review
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onRemove(member.id)} className="text-red-600">
                <UserX size={14} className="mr-2" />
                Remove Member
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Performance Section */}
        <div className="mt-4 pt-3 border-t">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Performance</span>
            <span className={`text-sm font-bold ${getPerformanceColor(member.performance.percentage)}`}>
              {member.performance.percentage}%
            </span>
          </div>
          
          <Progress value={member.performance.percentage} className="h-2 mb-2" />
          
          <div className="flex justify-between text-xs text-gray-500">
            <span>₹{(member.performance.achieved / 1000).toFixed(0)}k achieved</span>
            <span>₹{(member.performance.target / 1000).toFixed(0)}k target</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-2 mt-4">
          <Button size="sm" variant="outline" onClick={() => onSetTargets(member)}>
            <Target size={14} className="mr-1" />
            Set Targets
          </Button>
          <Button size="sm" variant="outline" onClick={() => onScheduleReview(member)}>
            <Calendar size={14} className="mr-1" />
            Review
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamMemberCard;
