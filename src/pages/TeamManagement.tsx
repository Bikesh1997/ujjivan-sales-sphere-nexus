
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  UserPlus, 
  Search,
  Filter,
  Download,
  BarChart3,
  Activity
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import TeamMemberCard from '@/components/team/TeamMemberCard';
import AddTeamMemberModal from '@/components/team/AddTeamMemberModal';
import EditTeamMemberModal from '@/components/team/EditTeamMemberModal';
import SetTargetsModal from '@/components/team/SetTargetsModal';
import ScheduleReviewModal from '@/components/team/ScheduleReviewModal';
import TeamPerformanceChart from '@/components/team/TeamPerformanceChart';
import TeamActivityFeed from '@/components/team/TeamActivityFeed';
import RealTimeTeamMonitor from '@/components/supervisor/RealTimeTeamMonitor';

const TeamManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showTargetsModal, setShowTargetsModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const [teamMembers, setTeamMembers] = useState([
    {
      id: '1',
      name: 'Rahul Sharma',
      role: 'Senior Sales Executive',
      email: 'rahul.sharma@bank.com',
      phone: '+91 98765 43210',
      department: 'Field Sales',
      joiningDate: '2023-01-15',
      status: 'active' as const,
      performance: { target: 50000, achieved: 38000, percentage: 76 },
      location: 'Mumbai - Andheri',
      lastActivity: '2 hours ago'
    },
    {
      id: '2',
      name: 'Anjali Patel',
      role: 'Sales Executive',
      email: 'anjali.patel@bank.com',
      phone: '+91 87654 32109',
      department: 'Inbound Sales',
      joiningDate: '2023-03-10',
      status: 'active' as const,
      performance: { target: 45000, achieved: 41000, percentage: 91 },
      location: 'Mumbai - Bandra',
      lastActivity: '1 hour ago'
    },
    {
      id: '3',
      name: 'Vikash Kumar',
      role: 'Sales Executive',
      email: 'vikash.kumar@bank.com',
      phone: '+91 76543 21098',
      department: 'Field Sales',
      joiningDate: '2023-02-20',
      status: 'active' as const,
      performance: { target: 40000, achieved: 28000, percentage: 70 },
      location: 'Mumbai - Kurla',
      lastActivity: '3 hours ago'
    },
    {
      id: '4',
      name: 'Priya Singh',
      role: 'Senior Sales Executive',
      email: 'priya.singh@bank.com',
      phone: '+91 65432 10987',
      department: 'Outbound Sales',
      joiningDate: '2022-11-05',
      status: 'active' as const,
      performance: { target: 42000, achieved: 35000, percentage: 83 },
      location: 'Mumbai - Powai',
      lastActivity: '45 minutes ago'
    }
  ]);

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMember = (memberData: any) => {
    const newMember = {
      id: Date.now().toString(),
      ...memberData,
      status: 'active' as const,
      performance: { target: 40000, achieved: 0, percentage: 0 },
      lastActivity: 'Just added'
    };
    setTeamMembers([...teamMembers, newMember]);
  };

  const handleEditMember = (member: any) => {
    setSelectedMember(member);
    setShowEditModal(true);
  };

  const handleUpdateMember = (memberId: string, updates: any) => {
    setTeamMembers(teamMembers.map(member => 
      member.id === memberId ? { ...member, ...updates } : member
    ));
  };

  const handleRemoveMember = (memberId: string) => {
    setTeamMembers(teamMembers.filter(member => member.id !== memberId));
    toast({
      title: "Member Removed",
      description: "Team member has been successfully removed",
    });
  };

  const handleSetTargets = (member: any) => {
    setSelectedMember(member);
    setShowTargetsModal(true);
  };

  const handleScheduleReview = (member: any) => {
    setSelectedMember(member);
    setShowReviewModal(true);
  };

  const teamStats = {
    total: teamMembers.length,
    active: teamMembers.filter(m => m.status === 'active').length,
    avgPerformance: Math.round(teamMembers.reduce((acc, m) => acc + m.performance.percentage, 0) / teamMembers.length),
    totalTarget: teamMembers.reduce((acc, m) => acc + m.performance.target, 0),
    totalAchieved: teamMembers.reduce((acc, m) => acc + m.performance.achieved, 0)
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Team Management</h1>
          <p className="text-gray-600">Manage your team members and track performance</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="bg-teal-600 hover:bg-teal-700">
          <UserPlus size={16} className="mr-2" />
          Add Team Member
        </Button>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Members</p>
                <p className="text-2xl font-bold">{teamStats.total}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Members</p>
                <p className="text-2xl font-bold">{teamStats.active}</p>
              </div>
              <Activity className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Performance</p>
                <p className="text-2xl font-bold">{teamStats.avgPerformance}%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Team Performance</p>
                <p className="text-2xl font-bold">
                  {Math.round((teamStats.totalAchieved / teamStats.totalTarget) * 100)}%
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-teal-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-2 px-1 border-b-2 transition-colors ${
            activeTab === 'overview' 
              ? 'border-teal-500 text-teal-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Team Overview
        </button>
        <button
          onClick={() => setActiveTab('performance')}
          className={`pb-2 px-1 border-b-2 transition-colors ${
            activeTab === 'performance' 
              ? 'border-teal-500 text-teal-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Performance Analytics
        </button>
        <button
          onClick={() => setActiveTab('realtime')}
          className={`pb-2 px-1 border-b-2 transition-colors ${
            activeTab === 'realtime' 
              ? 'border-teal-500 text-teal-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Real-time Monitor
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <>
          {/* Search and Filters */}
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                placeholder="Search team members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter size={16} className="mr-2" />
              Filters
            </Button>
            <Button variant="outline">
              <Download size={16} className="mr-2" />
              Export
            </Button>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                onEdit={handleEditMember}
                onRemove={handleRemoveMember}
                onSetTargets={handleSetTargets}
                onScheduleReview={handleScheduleReview}
              />
            ))}
          </div>

          {/* Activity Feed */}
          <TeamActivityFeed />
        </>
      )}

      {activeTab === 'performance' && (
        <TeamPerformanceChart teamData={teamMembers} />
      )}

      {activeTab === 'realtime' && (
        <RealTimeTeamMonitor />
      )}

      {/* Modals */}
      <AddTeamMemberModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddMember={handleAddMember}
      />

      <EditTeamMemberModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        member={selectedMember}
        onUpdateMember={handleUpdateMember}
      />

      <SetTargetsModal
        isOpen={showTargetsModal}
        onClose={() => setShowTargetsModal(false)}
        preSelectedMember={selectedMember}
      />

      <ScheduleReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
      />
    </div>
  );
};

export default TeamManagement;
