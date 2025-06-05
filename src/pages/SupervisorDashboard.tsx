import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import DashboardCard from '@/components/DashboardCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Calendar,
  Shield
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { allLeads } from '@/data/leadsData';
import { useToast } from '@/hooks/use-toast';
import AddTeamMemberModal from '@/components/team/AddTeamMemberModal';
import TeamSettingsModal from '@/components/team/TeamSettingsModal';
import ViewDetailsModal from '@/components/team/ViewDetailsModal';
import RuleManagement from '@/components/supervisor/RuleManagement';

const SupervisorDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [isTeamSettingsModalOpen, setIsTeamSettingsModalOpen] = useState(false);
  const [isViewDetailsModalOpen, setIsViewDetailsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [assignedLeads, setAssignedLeads] = useState<string[]>([]);
  const [showTaskModal, setShowTaskModal] = useState(false);

  // Team data with proper structure for ViewDetailsModal
  const [teamMembers, setTeamMembers] = useState([
    { 
      id: '1', 
      name: 'Rahul Sharma', 
      email: 'rahul.sharma@company.com',
      role: 'Sales Executive',
      department: 'Sales',
      status: 'active',
      joinDate: '2023-01-15',
      performance: 92,
      targets: { monthly: 15, achieved: 12.5 },
      lastActive: '2 hours ago',
      leads: 25, 
      converted: 8, 
      revenue: 12.5, 
      target: 15,
      lastActivity: '2 hours ago',
      capacity: 30
    },
    { 
      id: '3', 
      name: 'Anjali Patel', 
      email: 'anjali.patel@company.com',
      role: 'Sales Executive',
      department: 'Sales',
      status: 'active',
      joinDate: '2023-03-10',
      performance: 88,
      targets: { monthly: 12, achieved: 8.2 },
      lastActive: '30 min ago',
      leads: 18, 
      converted: 5, 
      revenue: 8.2, 
      target: 12,
      lastActivity: '30 min ago',
      capacity: 25
    },
    { 
      id: '4', 
      name: 'Vikram Singh', 
      email: 'vikram.singh@company.com',
      role: 'Inbound Contact Center Agent',
      department: 'Inbound',
      status: 'active',
      joinDate: '2022-11-20',
      performance: 85,
      targets: { monthly: 18, achieved: 15.3 },
      lastActive: '45 min ago',
      leads: 32, 
      converted: 11, 
      revenue: 15.3, 
      target: 18,
      lastActivity: '45 min ago',
      capacity: 35
    },
    { 
      id: '5', 
      name: 'Neha Gupta', 
      email: 'neha.gupta@company.com',
      role: 'Relationship Manager',
      department: 'Branch',
      status: 'active',
      joinDate: '2023-05-05',
      performance: 95,
      targets: { monthly: 20, achieved: 18.5 },
      lastActive: '1 hour ago',
      leads: 30, 
      converted: 12, 
      revenue: 18.5, 
      target: 20,
      lastActivity: '1 hour ago',
      capacity: 35
    }
  ]);

  // Unassigned leads requiring allocation (filter out already assigned leads)
  const unassignedLeads = allLeads.filter(lead => !lead.assignedToId && !assignedLeads.includes(lead.id)).slice(0, 8);
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
      value: '₹65L', 
      subtitle: 'Monthly collective target', 
      trend: { value: '12% above last month', isPositive: true }, 
      icon: <Target size={20} /> 
    },
    { 
      title: 'Team Achievement', 
      value: '₹54.5L', 
      subtitle: 'Current month revenue', 
      trend: { value: '84% of target', isPositive: true }, 
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

  const handleAutoAssign = () => {
    if (unassignedLeads.length === 0) {
      toast({
        title: "No Unassigned Leads",
        description: "All leads have been assigned",
      });
      return;
    }

    const availableMembers = teamMembers
      .filter(m => m.status === 'active' && m.leads < m.capacity)
      .sort((a, b) => {
        const aCapacity = a.capacity - a.leads;
        const bCapacity = b.capacity - b.leads;
        return bCapacity - aCapacity;
      });
    
    if (availableMembers.length === 0) {
      toast({
        title: "No Available Capacity",
        description: "All active team members are at capacity",
        variant: "destructive"
      });
      return;
    }

    const prioritySortedLeads = [...unassignedLeads].sort((a, b) => {
      const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    const assignments: { leadId: string; memberId: string; leadName: string; memberName: string }[] = [];
    const updatedMembers = [...teamMembers];
    const newlyAssignedLeads: string[] = [];

    for (const lead of prioritySortedLeads) {
      const bestMember = availableMembers.find(member => member.leads < member.capacity);

      if (bestMember) {
        assignments.push({
          leadId: lead.id,
          memberId: bestMember.id,
          leadName: lead.name,
          memberName: bestMember.name
        });

        const memberIndex = updatedMembers.findIndex(m => m.id === bestMember.id);
        if (memberIndex !== -1) {
          updatedMembers[memberIndex].leads++;
        }

        const availableMemberIndex = availableMembers.findIndex(m => m.id === bestMember.id);
        if (availableMemberIndex !== -1) {
          availableMembers[availableMemberIndex].leads++;
          if (availableMembers[availableMemberIndex].leads >= availableMembers[availableMemberIndex].capacity) {
            availableMembers.splice(availableMemberIndex, 1);
          }
        }

        newlyAssignedLeads.push(lead.id);

        if (availableMembers.length === 0) break;
      }
    }

    setTeamMembers(updatedMembers);
    setAssignedLeads(prev => [...prev, ...newlyAssignedLeads]);

    toast({
      title: "Auto-Assignment Complete",
      description: `${assignments.length} leads assigned successfully. ${assignments.map(a => `${a.leadName} → ${a.memberName}`).join(', ')}`,
    });
  };

  const handleAssignLead = (leadId: string, memberId: string) => {
    const member = teamMembers.find(m => m.id === memberId);
    const lead = unassignedLeads.find(l => l.id === leadId);
    
    if (member && lead) {
      if (member.leads >= member.capacity) {
        toast({
          title: "Capacity Exceeded",
          description: `${member.name} is already at capacity (${member.capacity} leads)`,
          variant: "destructive"
        });
        return;
      }

      setTeamMembers(prev => prev.map(m => 
        m.id === memberId 
          ? { ...m, leads: m.leads + 1 }
          : m
      ));

      setAssignedLeads(prev => [...prev, leadId]);

      toast({
        title: "Lead Assigned",
        description: `${lead.name} has been assigned to ${member.name}`,
      });
    }
  };

  const handleViewDetails = (member: any) => {
    setSelectedMember(member);
    setIsViewDetailsModalOpen(true);
  };

  const handleAssignLeads = (member: any) => {
    toast({
      title: "Lead Assignment",
      description: `Opening lead assignment interface for ${member.name}`,
    });
  };

  const handleGenerateReports = () => {
    toast({
      title: "Generating Reports",
      description: "Team performance analytics are being compiled...",
    });
    
    setTimeout(() => {
      toast({
        title: "Reports Ready",
        description: "Team performance reports have been generated and are ready for download.",
      });
    }, 3000);
  };

  const handleScheduleReview = () => {
    toast({
      title: "Schedule Review",
      description: "Opening review scheduling interface for team members...",
    });
  };

  const handleSetTargets = () => {
    toast({
      title: "Set Targets",
      description: "Opening target setting interface for team KPIs...",
    });
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getPerformanceColor = (achieved: number, target: number) => {
    const percentage = (achieved / target) * 100;
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddMember = (memberData: any) => {
    const newMember = {
      id: (teamMembers.length + 1).toString(),
      name: memberData.name,
      email: memberData.email,
      role: memberData.role,
      department: memberData.department,
      status: 'active',
      joinDate: memberData.joiningDate || new Date().toISOString().split('T')[0],
      performance: 0,
      targets: { monthly: 0, achieved: 0 },
      lastActive: 'Just joined',
      leads: 0,
      converted: 0,
      revenue: 0,
      target: 0,
      lastActivity: 'Just joined',
      capacity: 25
    };
    
    setTeamMembers(prevMembers => [...prevMembers, newMember]);
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
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsAddMemberModalOpen(true)}
          >
            <UserPlus size={16} className="mr-2" />
            Add Team Member
          </Button>
          <Button 
            size="sm" 
            className="bg-teal-600 hover:bg-teal-700"
            onClick={() => setIsTeamSettingsModalOpen(true)}
          >
            <Settings size={16} className="mr-2" />
            Team Settings
          </Button>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="dashboard">Team Dashboard</TabsTrigger>
          <TabsTrigger value="rules">
            <Shield size={16} className="mr-2" />
            Rule Management
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
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
                  <Button 
                    size="sm" 
                    className="bg-orange-600 hover:bg-orange-700"
                    onClick={handleAutoAssign}
                    disabled={unassignedLeads.length === 0}
                  >
                    Auto-Assign
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {unassignedLeads.length === 0 ? (
                  <div className="text-center py-8">
                    <UserCheck size={48} className="mx-auto text-green-500 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">All Leads Assigned!</h3>
                    <p className="text-gray-600">Great job! All leads have been assigned to team members.</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {unassignedLeads.map((lead, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{lead.name}</p>
                          <p className="text-xs text-gray-500">{lead.contact} • {lead.value}</p>
                          <Badge className={`text-xs mt-1 ${getPriorityColor(lead.priority)}`}>
                            {lead.priority}
                          </Badge>
                        </div>
                        <div className="flex space-x-2">
                          <select 
                            className="text-xs border rounded px-2 py-1"
                            onChange={(e) => e.target.value && handleAssignLead(lead.id, e.target.value)}
                            defaultValue=""
                          >
                            <option value="">Assign to...</option>
                            {teamMembers.filter(m => m.status === 'active' && m.leads < m.capacity).map(member => (
                              <option key={member.id} value={member.id}>
                                {member.name} ({member.capacity - member.leads} slots)
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleGenerateReports}>
              <CardContent className="p-6 text-center">
                <BarChart3 size={32} className="mx-auto text-blue-600 mb-3" />
                <h3 className="font-medium mb-2">Performance Reports</h3>
                <p className="text-sm text-gray-600">Generate team performance analytics</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleScheduleReview}>
              <CardContent className="p-6 text-center">
                <Calendar size={32} className="mx-auto text-green-600 mb-3" />
                <h3 className="font-medium mb-2">Schedule Review</h3>
                <p className="text-sm text-gray-600">One-on-one team member reviews</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleSetTargets}>
              <CardContent className="p-6 text-center">
                <Award size={32} className="mx-auto text-purple-600 mb-3" />
                <h3 className="font-medium mb-2">Set Targets</h3>
                <p className="text-sm text-gray-600">Define goals and KPIs for team</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rules">
          <RuleManagement />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <AddTeamMemberModal 
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        onAddMember={handleAddMember}
      />
      
      <TeamSettingsModal 
        isOpen={isTeamSettingsModalOpen}
        onClose={() => setIsTeamSettingsModalOpen(false)}
      />
      
      {selectedMember && (
        <ViewDetailsModal 
          isOpen={isViewDetailsModalOpen}
          onClose={() => {
            setIsViewDetailsModalOpen(false);
            setSelectedMember(null);
          }}
          member={selectedMember}
        />
      )}
    </div>
  );
};

export default SupervisorDashboard;
