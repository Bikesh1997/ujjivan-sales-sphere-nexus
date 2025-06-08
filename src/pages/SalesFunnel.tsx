import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Search,
  Eye,
  Edit,
  ArrowRight,
  Kanban,
  Phone
} from 'lucide-react';
import KanbanBoard from '@/components/tasks/KanbanBoard';
import DragDropKanbanBoard from '@/components/tasks/DragDropKanbanBoard';
import AddTaskModal from '@/components/tasks/AddTaskModal';
import LeadActionsMenu from '@/components/leads/LeadActionsMenu';
import CallInProgressModal from '@/components/leads/CallInProgressModal';
import LeadViewModal from '@/components/leads/LeadViewModal';
import LeadsPagination from '@/components/leads/LeadsPagination';
import { useAuth } from '@/contexts/AuthContext';
import { allLeads } from '@/data/leadsData';

const SalesFunnel = () => {
  const { user } = useAuth();
  const [selectedStage, setSelectedStage] = useState('all');
  const [leadsData, setLeadsData] = useState(allLeads);
  const [callInProgressOpen, setCallInProgressOpen] = useState(false);
  const [selectedProspect, setSelectedProspect] = useState<any>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const prospectsPerPage = 10;

  // Filter leads based on user role
  const userLeads = user?.role === 'supervisor' ? leadsData : leadsData.filter(lead => lead.assignedToId === user?.id);

  // Check if current user has drag and drop enabled (Vikram Singh, Rahul Sharma, Neha Gupta)
  const isDragDropEnabled = user?.name === 'Vikram Singh' || user?.name === 'Rahul Sharma' || user?.name === 'Neha Gupta';

  const funnelData = [
    { stage: 'Leads', count: userLeads.filter(l => l.status === 'new').length, value: '₹48L', conversion: 100 },
    { stage: 'Logging', count: userLeads.filter(l => l.status === 'qualified').length, value: '₹38L', conversion: 71 },
    { stage: 'Approved Mentioned', count: userLeads.filter(l => l.status === 'proposal').length, value: '₹28L', conversion: 38 },
    { stage: 'Approved Disbursed/Account Open', count: userLeads.filter(l => l.status === 'converted').length, value: '₹18L', conversion: 21 },
  ];

  // Extended real names and business names for 40+ prospects
  const realNames = [
    'Amit Sharma', 'Priya Patel', 'Rahul Kumar', 'Sneha Singh', 'Arjun Mehta', 'Kavya Reddy',
    'Vikash Gupta', 'Anjali Joshi', 'Rohit Agarwal', 'Deepika Verma', 'Sanjay Yadav', 'Meera Nair',
    'Arun Krishnan', 'Pooja Tiwari', 'Karan Malhotra', 'Ritu Saxena', 'Suresh Chandra', 'Nisha Kapoor',
    'Varun Sinha', 'Swati Bhatt', 'Manoj Pandey', 'Shweta Agrawal', 'Rajesh Jain', 'Anita Desai',
    'Harish Bhatia', 'Sunita Rai', 'Ashish Dubey', 'Preeti Goyal', 'Naveen Choudhary', 'Richa Mittal',
    'Gaurav Srivastava', 'Neha Bansal', 'Ajay Mishra', 'Divya Prasad', 'Vivek Tyagi', 'Shilpa Modi',
    'Rajeev Sharma', 'Kritika Jain', 'Abhishek Gupta', 'Pallavi Singh', 'Mukesh Agarwal', 'Simran Kohli',
    'Sandeep Rana', 'Tanvi Joshi', 'Nitin Verma', 'Rashmi Patel'
  ];

  const businessNames = [
    'TechCorp Solutions', 'Innovative Enterprises', 'Global Dynamics', 'Smart Systems', 'Digital Ventures', 'Future Industries',
    'Alpha Technologies', 'Beta Consulting', 'Gamma Manufacturing', 'Delta Services', 'Epsilon Group', 'Zeta Corp',
    'Theta Solutions', 'Lambda Tech', 'Sigma Industries', 'Omega Systems', 'Phoenix Corp', 'Orion Enterprises',
    'Nexus Solutions', 'Vertex Technologies', 'Matrix Systems', 'Quantum Dynamics', 'Infinity Corp', 'Stellar Industries',
    'Horizon Group', 'Pinnacle Solutions', 'Summit Technologies', 'Apex Systems', 'Prime Ventures', 'Elite Corp',
    'Zenith Industries', 'Nova Enterprises', 'Catalyst Solutions', 'Velocity Systems', 'Momentum Corp', 'Synergy Group',
    'Fusion Technologies', 'Nexus Innovations', 'Quantum Solutions', 'Stellar Dynamics', 'Horizon Enterprises', 'Prime Systems',
    'Elite Technologies', 'Zenith Ventures', 'Nova Industries', 'Catalyst Corp'
  ];

  // Create extended prospects list with 40+ entries
  const allProspects = userLeads.filter(lead => ['qualified', 'proposal'].includes(lead.status));
  const extendedProspects = [];

  // Add original prospects
  allProspects.forEach((lead, index) => {
    extendedProspects.push({
      id: lead.id,
      name: realNames[index % realNames.length],
      company: lead.name,
      stage: lead.status.charAt(0).toUpperCase() + lead.status.slice(1),
      value: lead.value,
      probability: lead.status === 'qualified' ? 65 : lead.status === 'proposal' ? 75 : 85,
      lastContact: lead.lastContact,
      nextAction: lead.status === 'qualified' ? 'Proposal presentation' : 
                  lead.status === 'proposal' ? 'Follow-up call' : 'Contract review',
      leadData: lead,
      businessName: businessNames[index % businessNames.length]
    });
  });

  // Add 40 more prospects
  for (let i = 0; i < 40; i++) {
    const statusOptions = ['qualified', 'proposal'];
    const status = statusOptions[i % statusOptions.length];
    const value = `₹${Math.floor(Math.random() * 50) + 10}L`;
    
    extendedProspects.push({
      id: `ext-${i + 1}`,
      name: realNames[(allProspects.length + i) % realNames.length],
      company: businessNames[(allProspects.length + i) % businessNames.length],
      stage: status.charAt(0).toUpperCase() + status.slice(1),
      value: value,
      probability: status === 'qualified' ? Math.floor(Math.random() * 20) + 55 : 
                   status === 'proposal' ? Math.floor(Math.random() * 20) + 65 : 
                   Math.floor(Math.random() * 20) + 75,
      lastContact: ['2 days ago', '1 week ago', '3 days ago', '5 days ago'][i % 4],
      nextAction: status === 'qualified' ? 'Proposal presentation' : 
                  status === 'proposal' ? 'Follow-up call' : 'Contract review',
      leadData: {
        id: `ext-${i + 1}`,
        name: businessNames[(allProspects.length + i) % businessNames.length],
        status: status,
        value: value,
        phone: `+91 98765${(43210 + i).toString().slice(-5)}`,
        email: `contact${i + 1}@${businessNames[(allProspects.length + i) % businessNames.length].toLowerCase().replace(/\s+/g, '')}.com`,
        lastContact: ['2 days ago', '1 week ago', '3 days ago', '5 days ago'][i % 4]
      },
      businessName: businessNames[(allProspects.length + i) % businessNames.length]
    });
  }

  const prospects = extendedProspects;

  // Pagination calculations
  const totalProspects = prospects.length;
  const totalPages = Math.ceil(totalProspects / prospectsPerPage);
  const startIndex = (currentPage - 1) * prospectsPerPage;
  const paginatedProspects = prospects.slice(startIndex, startIndex + prospectsPerPage);

  const handleEditLead = (leadId: string, updatedData: Partial<typeof allLeads[0]>) => {
    setLeadsData(prevLeads => 
      prevLeads.map(lead => 
        lead.id === leadId 
          ? { ...lead, ...updatedData, lastContact: 'Just updated' }
          : lead
      )
    );
  };

  const handleCall = (prospect: any) => {
    console.log('Calling prospect:', prospect);
    setSelectedProspect(prospect);
    setCallInProgressOpen(true);
  };

  const handleViewProspect = (prospect: any) => {
    setSelectedLead(prospect.leadData);
    setViewModalOpen(true);
  };

  const handleStageChange = (prospectId: string, newStage: string) => {
    const statusMap: { [key: string]: string } = {
      'Logging': 'qualified',
      'Approved Mentioned': 'proposal'
    };
    
    const newStatus = statusMap[newStage];
    if (newStatus) {
      handleEditLead(prospectId, { status: newStatus });
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Leads': return 'bg-gray-100 text-gray-800';
      case 'Logging': return 'bg-blue-100 text-blue-800';
      case 'Approved Mentioned': return 'bg-yellow-100 text-yellow-800';
      case 'Approved Disbursed/Account Open': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return 'text-green-600 bg-green-50';
    if (probability >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Sales Pipeline</h1>
          <p className="text-gray-600">Track your sales pipeline and manage tasks efficiently</p>
        </div>
      </div>

      {/* Tabs for different views */}
      <Tabs defaultValue="pipeline" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pipeline" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Sales Pipeline
          </TabsTrigger>
          <TabsTrigger value="tasks" className="flex items-center gap-2">
            <Kanban className="h-4 w-4" />
            Task Board
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline" className="space-y-6">
          {/* Pipeline Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {funnelData.map((stage, index) => (
              <Card key={stage.stage} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-700">{stage.stage}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {stage.conversion}%
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stage.count}</div>
                  <div className="text-sm text-teal-600 font-medium">{stage.value}</div>
                  {index < funnelData.length - 1 && (
                    <div className="flex justify-center mt-3">
                      <ArrowRight size={16} className="text-gray-400" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Prospects Table */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Active Prospects ({totalProspects} total)</CardTitle>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search prospects..."
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={selectedStage} onValueChange={setSelectedStage}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Stages</SelectItem>
                      <SelectItem value="qualified">Logging</SelectItem>
                      <SelectItem value="proposal">Approved Mentioned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Prospect</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Stage</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Value</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Probability</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Last Contact</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Next Action</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedProspects.map((prospect, index) => (
                      <tr key={prospect.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium text-gray-900">{prospect.name}</div>
                            <div className="text-sm text-gray-500">{prospect.company}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Select 
                            value={prospect.stage} 
                            onValueChange={(value) => handleStageChange(prospect.leadData.id, value)}
                          >
                            <SelectTrigger className="w-40">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Logging">Logging</SelectItem>
                              <SelectItem value="Approved Mentioned">Approved Mentioned</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="py-3 px-4 font-medium text-gray-900">{prospect.value}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getProbabilityColor(prospect.probability)}`}>
                            {prospect.probability}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{prospect.lastContact}</td>
                        <td className="py-3 px-4 text-sm text-gray-900">{prospect.nextAction}</td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-1">
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => handleViewProspect(prospect)}
                            >
                              <Eye size={14} />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="default" 
                              onClick={() => handleCall(prospect)}
                              className="bg-green-600 hover:bg-green-700 text-white shadow-lg"
                            >
                              <Phone size={14} className="mr-1" />
                              Call
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="mt-4">
                <LeadsPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  startIndex={startIndex}
                  leadsPerPage={prospectsPerPage}
                  totalLeads={totalProspects}
                  onPageChange={setCurrentPage}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Task Management</h2>
              <AddTaskModal onAddTask={(task) => {
                console.log('New task added:', task);
              }} />
            </div>
            {isDragDropEnabled ? <DragDropKanbanBoard /> : <KanbanBoard />}
          </div>
        </TabsContent>
      </Tabs>

      {/* Call In Progress Modal */}
      {selectedProspect && (
        <CallInProgressModal 
          prospectName={selectedProspect.name}
          businessName={selectedProspect.businessName}
          phoneNumber={selectedProspect.leadData.phone}
          isOpen={callInProgressOpen}
          onOpenChange={setCallInProgressOpen}
        />
      )}

      {/* Lead View Modal */}
      {selectedLead && (
        <LeadViewModal 
          lead={selectedLead}
          isOpen={viewModalOpen}
          onOpenChange={setViewModalOpen}
        />
      )}
    </div>
  );
};

export default SalesFunnel;
