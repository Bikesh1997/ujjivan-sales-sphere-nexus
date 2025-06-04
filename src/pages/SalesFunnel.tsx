
import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  TrendingUp, 
  IndianRupee, 
  Filter,
  Search,
  Plus,
  Eye,
  Edit,
  ArrowRight,
  BarChart3,
  Kanban
} from 'lucide-react';
import InteractiveFunnelChart from '@/components/funnel/InteractiveFunnelChart';
import ProspectFilters from '@/components/funnel/ProspectFilters';
import KanbanBoard from '@/components/tasks/KanbanBoard';
import AddTaskModal from '@/components/tasks/AddTaskModal';
import LeadActionsMenu from '@/components/leads/LeadActionsMenu';
import PermissionGate from '@/components/rbac/PermissionGate';
import { useAuth } from '@/contexts/AuthContext';
import { allLeads } from '@/data/leadsData';

const SalesFunnel = () => {
  const { user } = useAuth();
  const [selectedStage, setSelectedStage] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [leadsData, setLeadsData] = useState(allLeads);

  // Filter leads based on user role
  const userLeads = user?.role === 'supervisor' ? leadsData : leadsData.filter(lead => lead.assignedToId === user?.id);

  const funnelData = [
    { stage: 'Leads', count: userLeads.filter(l => l.status === 'new').length, value: '₹48L', conversion: 100 },
    { stage: 'Qualified', count: userLeads.filter(l => l.status === 'qualified').length, value: '₹38L', conversion: 71 },
    { stage: 'Proposal', count: userLeads.filter(l => l.status === 'proposal').length, value: '₹28L', conversion: 38 },
    { stage: 'Negotiation', count: userLeads.filter(l => l.status === 'negotiation').length, value: '₹22L', conversion: 27 },
    { stage: 'Closed Won', count: userLeads.filter(l => l.status === 'converted').length, value: '₹18L', conversion: 21 },
  ];

  // Filter prospects based on search term and stage
  const filteredProspects = useMemo(() => {
    let filtered = userLeads.filter(lead => ['qualified', 'proposal', 'negotiation'].includes(lead.status));
    
    if (searchTerm) {
      filtered = filtered.filter(lead => 
        lead.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedStage !== 'all') {
      filtered = filtered.filter(lead => lead.status === selectedStage);
    }
    
    return filtered.map(lead => ({
      id: lead.id,
      name: lead.contact,
      company: lead.name,
      stage: lead.status.charAt(0).toUpperCase() + lead.status.slice(1),
      value: lead.value,
      probability: lead.status === 'qualified' ? 65 : lead.status === 'proposal' ? 75 : 85,
      lastContact: lead.lastContact,
      nextAction: lead.status === 'qualified' ? 'Proposal presentation' : 
                  lead.status === 'proposal' ? 'Follow-up call' : 'Contract review',
      leadData: lead
    }));
  }, [userLeads, searchTerm, selectedStage]);

  const handleEditLead = (leadId: string, updatedData: Partial<typeof allLeads[0]>) => {
    setLeadsData(prevLeads => 
      prevLeads.map(lead => 
        lead.id === leadId 
          ? { ...lead, ...updatedData, lastContact: 'Just updated' }
          : lead
      )
    );
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedStage('all');
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Leads': return 'bg-gray-100 text-gray-800';
      case 'Qualified': return 'bg-blue-100 text-blue-800';
      case 'Proposal': return 'bg-yellow-100 text-yellow-800';
      case 'Negotiation': return 'bg-orange-100 text-orange-800';
      case 'Closed Won': return 'bg-green-100 text-green-800';
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
          <h1 className="text-2xl font-bold text-gray-900">Sales Funnel & Pipeline</h1>
          <p className="text-gray-600">Track your sales pipeline and manage tasks efficiently</p>
        </div>
      </div>

      {/* Tabs for different views */}
      <Tabs defaultValue="funnel" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="funnel" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Sales Funnel
          </TabsTrigger>
          <TabsTrigger value="tasks" className="flex items-center gap-2">
            <Kanban className="h-4 w-4" />
            Task Board
          </TabsTrigger>
          <TabsTrigger value="prospects" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Prospects ({filteredProspects.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="funnel" className="space-y-6">
          {/* Funnel Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
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

          {/* Interactive Chart */}
          <InteractiveFunnelChart />
        </TabsContent>

        <TabsContent value="tasks">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Task Management</h2>
              <AddTaskModal onAddTask={(task) => {
                console.log('New task added:', task);
              }} />
            </div>
            <KanbanBoard />
          </div>
        </TabsContent>

        <TabsContent value="prospects" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filter Prospects</CardTitle>
            </CardHeader>
            <CardContent>
              <ProspectFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedStage={selectedStage}
                onStageChange={setSelectedStage}
                onResetFilters={handleResetFilters}
              />
            </CardContent>
          </Card>

          {/* Prospects Table */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Active Prospects ({filteredProspects.length})</CardTitle>
                {filteredProspects.length === 0 && searchTerm && (
                  <Badge variant="outline">No results found</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {filteredProspects.length === 0 ? (
                <div className="text-center py-12">
                  <Users size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {searchTerm || selectedStage !== 'all' ? 'No prospects found' : 'No active prospects'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {searchTerm || selectedStage !== 'all' 
                      ? 'Try adjusting your search criteria or filters' 
                      : 'Start adding prospects to track your sales pipeline'
                    }
                  </p>
                  {(searchTerm || selectedStage !== 'all') && (
                    <Button onClick={handleResetFilters} variant="outline">
                      Clear Filters
                    </Button>
                  )}
                </div>
              ) : (
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
                      {filteredProspects.map((prospect) => (
                        <tr key={prospect.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div>
                              <div className="font-medium text-gray-900">{prospect.name}</div>
                              <div className="text-sm text-gray-500">{prospect.company}</div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={getStageColor(prospect.stage)}>
                              {prospect.stage}
                            </Badge>
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
                            <LeadActionsMenu lead={prospect.leadData} onEditLead={handleEditLead} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalesFunnel;
