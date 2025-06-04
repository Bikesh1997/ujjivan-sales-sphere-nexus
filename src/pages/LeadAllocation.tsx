
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  UserPlus, 
  Users, 
  Target,
  Clock,
  CheckCircle,
  AlertCircle,
  RotateCcw,
  Filter
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LeadAllocation = () => {
  const { toast } = useToast();
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [assignmentHistory, setAssignmentHistory] = useState<Array<{id: string, leadName: string, memberName: string, timestamp: string}>>([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    priority: 'all',
    source: 'all',
    value: 'all'
  });

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

  // Enhanced dummy data for unassigned leads
  const unassignedLeads = [
    {
      id: '1',
      name: 'TechCorp Solutions',
      contact: 'Ravi Kumar',
      phone: '+91 98765 43210',
      email: 'ravi@techcorp.com',
      priority: 'High',
      source: 'Website',
      value: '₹25L',
      type: 'Business Loan'
    },
    {
      id: '2',
      name: 'Sunrise Enterprises',
      contact: 'Meera Patel',
      phone: '+91 98765 43211',
      email: 'meera@sunrise.com',
      priority: 'Medium',
      source: 'Referral',
      value: '₹15L',
      type: 'MSME Loan'
    },
    {
      id: '3',
      name: 'Green Valley Farms',
      contact: 'Suresh Singh',
      phone: '+91 98765 43212',
      email: 'suresh@greenvalley.com',
      priority: 'High',
      source: 'Cold Call',
      value: '₹30L',
      type: 'Agricultural Loan'
    },
    {
      id: '4',
      name: 'Urban Developers',
      contact: 'Priya Sharma',
      phone: '+91 98765 43213',
      email: 'priya@urban.com',
      priority: 'Low',
      source: 'Website',
      value: '₹50L',
      type: 'Real Estate Loan'
    },
    {
      id: '5',
      name: 'Quick Transport',
      contact: 'Amit Gupta',
      phone: '+91 98765 43214',
      email: 'amit@quicktransport.com',
      priority: 'Medium',
      source: 'Social Media',
      value: '₹20L',
      type: 'Vehicle Loan'
    },
    {
      id: '6',
      name: 'Bright Future School',
      contact: 'Sunita Rani',
      phone: '+91 98765 43215',
      email: 'sunita@brightfuture.com',
      priority: 'High',
      source: 'Referral',
      value: '₹35L',
      type: 'Education Loan'
    },
    {
      id: '7',
      name: 'Medical Care Center',
      contact: 'Dr. Rajesh',
      phone: '+91 98765 43216',
      email: 'rajesh@medicalcare.com',
      priority: 'Medium',
      source: 'Website',
      value: '₹40L',
      type: 'Healthcare Loan'
    },
    {
      id: '8',
      name: 'Fashion Hub',
      contact: 'Neha Agarwal',
      phone: '+91 98765 43217',
      email: 'neha@fashionhub.com',
      priority: 'Low',
      source: 'Cold Call',
      value: '₹12L',
      type: 'Retail Loan'
    },
    {
      id: '9',
      name: 'Steel Works',
      contact: 'Vikram Singh',
      phone: '+91 98765 43218',
      email: 'vikram@steelworks.com',
      priority: 'High',
      source: 'Referral',
      value: '₹60L',
      type: 'Industrial Loan'
    },
    {
      id: '10',
      name: 'Fresh Foods',
      contact: 'Kavita Devi',
      phone: '+91 98765 43219',
      email: 'kavita@freshfoods.com',
      priority: 'Medium',
      source: 'Social Media',
      value: '₹18L',
      type: 'Food Business Loan'
    }
  ];

  const filteredLeads = unassignedLeads.filter(lead => {
    if (filters.priority !== 'all' && lead.priority !== filters.priority) return false;
    if (filters.source !== 'all' && lead.source !== filters.source) return false;
    return true;
  });

  const handleLeadSelection = (leadId: string) => {
    setSelectedLeads(prev => 
      prev.includes(leadId) 
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  const handleSelectAll = () => {
    if (selectedLeads.length === filteredLeads.length) {
      setSelectedLeads([]);
      toast({
        title: "Selection Cleared",
        description: "All leads have been deselected",
      });
    } else {
      setSelectedLeads(filteredLeads.map(lead => lead.id));
      toast({
        title: "All Leads Selected",
        description: `${filteredLeads.length} leads selected for assignment`,
      });
    }
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
    if (!member) return;

    if (member.currentLeads + selectedLeads.length > member.capacity) {
      toast({
        title: "Capacity Exceeded",
        description: `${member.name} would exceed capacity with this assignment`,
        variant: "destructive"
      });
      return;
    }

    // Create assignment history entries
    const newAssignments = selectedLeads.map(leadId => {
      const lead = filteredLeads.find(l => l.id === leadId);
      return {
        id: Date.now() + Math.random().toString(),
        leadName: lead?.name || 'Unknown Lead',
        memberName: member.name,
        timestamp: new Date().toLocaleString()
      };
    });

    setAssignmentHistory(prev => [...newAssignments, ...prev].slice(0, 10));
    
    // Update member capacity
    const memberIndex = teamMembers.findIndex(m => m.id === memberId);
    if (memberIndex !== -1) {
      teamMembers[memberIndex].currentLeads += selectedLeads.length;
    }
    
    toast({
      title: "Leads Assigned Successfully",
      description: `${selectedLeads.length} leads assigned to ${member.name}`,
    });
    setSelectedLeads([]);
  };

  const handleAutoAssign = () => {
    if (filteredLeads.length === 0) {
      toast({
        title: "No Unassigned Leads",
        description: "All leads have been assigned",
      });
      return;
    }

    const availableMembers = teamMembers.filter(m => m.currentLeads < m.capacity);
    
    if (availableMembers.length === 0) {
      toast({
        title: "No Available Capacity",
        description: "All team members are at capacity",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Auto-assignment Started",
      description: `${filteredLeads.length} leads are being auto-assigned based on capacity and performance`,
    });

    setTimeout(() => {
      const assignments = filteredLeads.slice(0, 5).map(lead => ({
        id: Date.now() + Math.random().toString(),
        leadName: lead.name,
        memberName: availableMembers[Math.floor(Math.random() * availableMembers.length)].name,
        timestamp: new Date().toLocaleString()
      }));

      setAssignmentHistory(prev => [...assignments, ...prev].slice(0, 10));
      
      toast({
        title: "Auto-assignment Complete",
        description: `${assignments.length} leads have been successfully auto-assigned`,
      });
    }, 2000);
  };

  const handleManualAssignment = () => {
    toast({
      title: "Manual Assignment Mode",
      description: "Select leads and assign them to specific team members using the assignment panel",
    });
  };

  const handleResetAssignments = () => {
    setSelectedLeads([]);
    setAssignmentHistory([]);
    toast({
      title: "Assignments Reset",
      description: "All selections and assignment history have been cleared",
    });
  };

  const handleFilterLeads = () => {
    setIsFilterModalOpen(true);
  };

  const handleApplyFilters = () => {
    setIsFilterModalOpen(false);
    toast({
      title: "Filters Applied",
      description: `Showing leads filtered by: ${filters.priority !== 'all' ? filters.priority + ' priority' : ''} ${filters.source !== 'all' ? filters.source + ' source' : ''}`,
    });
  };

  const handleClearFilters = () => {
    setFilters({
      priority: 'all',
      source: 'all',
      value: 'all'
    });
    toast({
      title: "Filters Cleared",
      description: "All filters have been reset",
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
            onClick={handleFilterLeads}
            className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
          >
            <Filter size={16} className="mr-2" />
            Filter Leads
          </Button>
          <Button 
            variant="outline" 
            onClick={handleAutoAssign}
            className="bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100"
          >
            <Target size={16} className="mr-2" />
            Auto-Assign All
          </Button>
          <Button 
            className="bg-teal-600 hover:bg-teal-700"
            onClick={handleManualAssignment}
          >
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
                Unassigned Leads ({filteredLeads.length})
              </CardTitle>
              <div className="flex items-center space-x-2">
                {selectedLeads.length > 0 && (
                  <Badge variant="secondary">{selectedLeads.length} selected</Badge>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleSelectAll}
                >
                  {selectedLeads.length === filteredLeads.length ? 'Deselect All' : 'Select All'}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleResetAssignments}
                >
                  <RotateCcw size={14} className="mr-1" />
                  Reset
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredLeads.map((lead) => (
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
                      <p className="text-xs text-gray-500">{lead.contact} • {lead.phone}</p>
                      <p className="text-xs text-gray-500">{lead.email}</p>
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
                    <span>{lead.source} • {lead.type}</span>
                    <span className="font-medium">{lead.value}</span>
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
                            {member.currentLeads}/{member.capacity} capacity • {member.performance}% performance
                          </p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => handleBulkAssign(member.id)}
                        disabled={member.currentLeads + selectedLeads.length > member.capacity}
                        className={member.currentLeads + selectedLeads.length > member.capacity ? 'opacity-50' : ''}
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

            {/* Recent Assignment History */}
            {assignmentHistory.length > 0 && (
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Recent Assignments</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {assignmentHistory.slice(0, 5).map((assignment) => (
                    <div key={assignment.id} className="text-xs bg-gray-50 p-2 rounded">
                      <div className="flex justify-between">
                        <span className="font-medium">{assignment.leadName}</span>
                        <span className="text-gray-500">{assignment.timestamp}</span>
                      </div>
                      <div className="text-gray-600">→ {assignment.memberName}</div>
                    </div>
                  ))}
                </div>
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

      {/* Filter Modal */}
      <Dialog open={isFilterModalOpen} onOpenChange={setIsFilterModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Filter Leads</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select value={filters.priority} onValueChange={(value) => 
                setFilters(prev => ({ ...prev, priority: value }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Source</Label>
              <Select value={filters.source} onValueChange={(value) => 
                setFilters(prev => ({ ...prev, source: value }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="Website">Website</SelectItem>
                  <SelectItem value="Referral">Referral</SelectItem>
                  <SelectItem value="Cold Call">Cold Call</SelectItem>
                  <SelectItem value="Social Media">Social Media</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-2 pt-4">
              <Button onClick={handleApplyFilters} className="flex-1">
                Apply Filters
              </Button>
              <Button variant="outline" onClick={handleClearFilters}>
                Clear
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeadAllocation;
