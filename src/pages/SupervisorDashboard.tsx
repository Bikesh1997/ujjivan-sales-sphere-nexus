
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
  DollarSign,
  Calculator,
  Zap,
  Eye
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { allLeads } from '@/data/leadsData';
import { useToast } from '@/hooks/use-toast';
import AddTeamMemberModal from '@/components/team/AddTeamMemberModal';
import TeamSettingsModal from '@/components/team/TeamSettingsModal';
import ViewDetailsModal from '@/components/team/ViewDetailsModal';
import IndiaRegionMap from '@/components/supervisor/IndiaRegionMap';

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

  // Incentive data structure
  const incentiveData = [
    {
      id: '1',
      name: 'Rahul Sharma',
      currentEarnings: 45000,
      projectedEarnings: 62000,
      nextThreshold: 75000,
      progressToNext: 82.7,
      krasCompleted: 7,
      totalKras: 10,
      potentialBonus: 15000,
      isCloseToThreshold: true,
      thresholdName: 'Gold Tier',
      remainingAmount: 13000
    },
    {
      id: '3',
      name: 'Anjali Patel',
      currentEarnings: 38000,
      projectedEarnings: 48000,
      nextThreshold: 50000,
      progressToNext: 96.0,
      krasCompleted: 8,
      totalKras: 10,
      potentialBonus: 8000,
      isCloseToThreshold: true,
      thresholdName: 'Silver Plus',
      remainingAmount: 2000
    },
    {
      id: '4',
      name: 'Vikram Singh',
      currentEarnings: 28000,
      projectedEarnings: 35000,
      nextThreshold: 50000,
      progressToNext: 70.0,
      krasCompleted: 5,
      totalKras: 10,
      potentialBonus: 12000,
      isCloseToThreshold: false,
      thresholdName: 'Silver Plus',
      remainingAmount: 15000
    },
    {
      id: '5',
      name: 'Neha Gupta',
      currentEarnings: 52000,
      projectedEarnings: 68000,
      nextThreshold: 75000,
      progressToNext: 90.7,
      krasCompleted: 9,
      totalKras: 10,
      potentialBonus: 18000,
      isCloseToThreshold: true,
      thresholdName: 'Gold Tier',
      remainingAmount: 7000
    }
  ];

  const incentiveTiers = [
    { name: 'Bronze', threshold: 25000, color: '#CD7F32' },
    { name: 'Silver', threshold: 50000, color: '#C0C0C0' },
    { name: 'Silver Plus', threshold: 50000, color: '#E5E5E5' },
    { name: 'Gold Tier', threshold: 75000, color: '#FFD700' },
    { name: 'Platinum', threshold: 100000, color: '#E5E4E2' }
  ];

  const simulateKRACompletion = (memberId: string) => {
    const member = incentiveData.find(m => m.id === memberId);
    if (member) {
      const remainingKras = member.totalKras - member.krasCompleted;
      const additionalEarnings = remainingKras * 5000; // ₹5k per KRA
      const newProjected = member.projectedEarnings + additionalEarnings;
      
      toast({
        title: "KRA Simulation Complete",
        description: `If ${member.name} completes all remaining KRAs, projected earnings would be ₹${newProjected.toLocaleString()}`,
      });
    }
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

      {/* Regional Sales & Lead Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* India Region Map */}
        <IndiaRegionMap />

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

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="team-performance">Team Performance</TabsTrigger>
          <TabsTrigger value="incentive-management">Incentive Management</TabsTrigger>
          <TabsTrigger value="quick-actions">Quick Actions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Regional Sales & Lead Allocation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* India Region Map */}
            <IndiaRegionMap />

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
        </TabsContent>

        <TabsContent value="team-performance" className="space-y-6">
          {/* Team Performance Chart */}
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

          {/* Team Members List */}
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
                          onClick={() => handleViewDetails(member)}
                        >
                          <Eye size={14} className="mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAssignLeads(member)}
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
        </TabsContent>

        <TabsContent value="incentive-management" className="space-y-6">
          {/* Incentive Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Team Incentives</p>
                    <p className="text-2xl font-bold">₹{incentiveData.reduce((sum, member) => sum + member.currentEarnings, 0).toLocaleString()}</p>
                    <p className="text-sm text-green-600">Current Earnings</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Projected Total</p>
                    <p className="text-2xl font-bold">₹{incentiveData.reduce((sum, member) => sum + member.projectedEarnings, 0).toLocaleString()}</p>
                    <p className="text-sm text-blue-600">Month-end Projection</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Potential Bonus</p>
                    <p className="text-2xl font-bold">₹{incentiveData.reduce((sum, member) => sum + member.potentialBonus, 0).toLocaleString()}</p>
                    <p className="text-sm text-purple-600">If KRAs Met</p>
                  </div>
                  <Award className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Close to Threshold</p>
                    <p className="text-2xl font-bold">{incentiveData.filter(m => m.isCloseToThreshold).length}</p>
                    <p className="text-sm text-orange-600">Team Members</p>
                  </div>
                  <Zap className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Team Incentive Details */}
          <Card>
            <CardHeader>
              <CardTitle>Team Incentive Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incentiveData.map((member) => (
                  <div key={member.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback className="bg-teal-100 text-teal-700">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{member.name}</h4>
                          {member.isCloseToThreshold && (
                            <Badge className="bg-orange-100 text-orange-800 mt-1">
                              Close to {member.thresholdName}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => simulateKRACompletion(member.id)}
                      >
                        <Calculator size={14} className="mr-1" />
                        Simulate KRAs
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Current Earnings</p>
                        <p className="font-bold text-green-600">₹{member.currentEarnings.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Projected</p>
                        <p className="font-bold text-blue-600">₹{member.projectedEarnings.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Next Threshold</p>
                        <p className="font-bold">₹{member.nextThreshold.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">KRAs Completed</p>
                        <p className="font-bold">{member.krasCompleted}/{member.totalKras}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Potential Bonus</p>
                        <p className="font-bold text-purple-600">₹{member.potentialBonus.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Progress to Next Threshold */}
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress to {member.thresholdName}</span>
                        <span>{member.progressToNext}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${member.isCloseToThreshold ? 'bg-orange-500' : 'bg-blue-500'}`}
                          style={{ width: `${member.progressToNext}%` }}
                        ></div>
                      </div>
                      {member.isCloseToThreshold && (
                        <p className="text-sm text-orange-600 mt-1">
                          Only ₹{member.remainingAmount.toLocaleString()} away from next tier!
                        </p>
                      )}
                    </div>

                    {/* KRA Progress */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>KRA Completion</span>
                        <span>{Math.round((member.krasCompleted / member.totalKras) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-green-500"
                          style={{ width: `${(member.krasCompleted / member.totalKras) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Incentive Tiers Reference */}
          <Card>
            <CardHeader>
              <CardTitle>Incentive Tiers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {incentiveTiers.map((tier, index) => (
                  <div key={index} className="text-center p-3 border rounded-lg">
                    <div 
                      className="w-8 h-8 rounded-full mx-auto mb-2"
                      style={{ backgroundColor: tier.color }}
                    ></div>
                    <p className="font-medium">{tier.name}</p>
                    <p className="text-sm text-gray-600">₹{tier.threshold.toLocaleString()}+</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quick-actions" className="space-y-6">
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
      </Tabs>
    </div>
  );
};

export default SupervisorDashboard;
