
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  UserPlus, 
  Users, 
  Target,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { allLeads } from '@/data/leadsData';

const LeadAllocation = () => {
  const { toast } = useToast();
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);

  const teamMembers = [
    { 
      id: '1', 
      name: 'Rahul Sharma', 
      currentLeads: 25,
      capacity: 30,
      performance: 92,
      specialization: 'MSME Loans'
    },
    { 
      id: '2', 
      name: 'Anjali Patel', 
      currentLeads: 18,
      capacity: 25,
      performance: 88,
      specialization: 'Personal Loans'
    },
    { 
      id: '3', 
      name: 'Vikash Kumar', 
      currentLeads: 22,
      capacity: 28,
      performance: 76,
      specialization: 'Home Loans'
    },
    { 
      id: '4', 
      name: 'Priya Singh', 
      currentLeads: 30,
      capacity: 35,
      performance: 95,
      specialization: 'Business Loans'
    }
  ];

  const unassignedLeads = allLeads.filter(lead => !lead.assignedToId).slice(0, 12);

  const handleLeadSelection = (leadId: string) => {
    setSelectedLeads(prev => 
      prev.includes(leadId) 
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  const handleBulkAssign = (memberId: string) => {
    if (selectedLeads.length === 0) {
      toast({
        title: "No leads selected",
        description: "Please select leads to assign",
        variant: "destructive"
      });
      return;
    }

    const member = teamMembers.find(m => m.id === memberId);
    toast({
      title: "Leads Assigned",
      description: `${selectedLeads.length} leads assigned to ${member?.name}`,
    });
    setSelectedLeads([]);
  };

  const handleAutoAssign = () => {
    toast({
      title: "Auto-assignment Started",
      description: `${unassignedLeads.length} leads are being auto-assigned based on capacity and performance`,
    });
  };

  const getCapacityColor = (current: number, capacity: number) => {
    const percentage = (current / capacity) * 100;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lead Allocation</h1>
          <p className="text-gray-600">Assign and distribute leads to team members</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            onClick={handleAutoAssign}
            className="bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100"
          >
            <Target size={16} className="mr-2" />
            Auto-Assign All
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700">
            <UserPlus size={16} className="mr-2" />
            Manual Assignment
          </Button>
        </div>
      </div>

      {/* Team Capacity Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {teamMembers.map((member) => (
          <Card key={member.id}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 mb-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-teal-100 text-teal-700">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium text-sm">{member.name}</h4>
                  <p className="text-xs text-gray-500">{member.specialization}</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Capacity:</span>
                  <span className={`font-medium ${getCapacityColor(member.currentLeads, member.capacity)}`}>
                    {member.currentLeads}/{member.capacity}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Performance:</span>
                  <span className="font-medium">{member.performance}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-teal-600 h-2 rounded-full" 
                    style={{ width: `${(member.currentLeads / member.capacity) * 100}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Unassigned Leads */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                Unassigned Leads ({unassignedLeads.length})
              </CardTitle>
              {selectedLeads.length > 0 && (
                <Badge variant="secondary">{selectedLeads.length} selected</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {unassignedLeads.map((lead) => (
                <div 
                  key={lead.id} 
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedLeads.includes(lead.id) ? 'bg-teal-50 border-teal-200' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleLeadSelection(lead.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-sm">{lead.name}</h4>
                      <p className="text-xs text-gray-500">{lead.contact}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getPriorityColor(lead.priority)}>
                        {lead.priority}
                      </Badge>
                      {selectedLeads.includes(lead.id) && (
                        <CheckCircle size={16} className="text-teal-600" />
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>{lead.source}</span>
                    <span>{lead.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Assignment Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Assignment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedLeads.length > 0 ? (
              <div>
                <p className="text-sm text-gray-600 mb-4">
                  Assign {selectedLeads.length} selected lead(s) to:
                </p>
                <div className="space-y-3">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex justify-between items-center p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-teal-100 text-teal-700 text-xs">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{member.name}</p>
                          <p className="text-xs text-gray-500">
                            {member.currentLeads}/{member.capacity} capacity
                          </p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => handleBulkAssign(member.id)}
                        disabled={member.currentLeads >= member.capacity}
                      >
                        Assign
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Users size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select Leads to Assign</h3>
                <p className="text-gray-600">Choose leads from the list to assign them to team members</p>
              </div>
            )}

            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Assignment Rules</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Auto-assignment considers member capacity and performance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>High priority leads get assigned first</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Specialization matching is preferred</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LeadAllocation;
