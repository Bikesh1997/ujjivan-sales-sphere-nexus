
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
import KanbanBoard from '@/components/tasks/KanbanBoard';
import PermissionGate from '@/components/rbac/PermissionGate';
import { useAuth } from '@/contexts/AuthContext';
import { allLeads } from '@/data/leadsData';

const SalesFunnel = () => {
  const { user } = useAuth();
  const [selectedStage, setSelectedStage] = useState('all');

  // Filter leads based on user role
  const userLeads = user?.role === 'supervisor' ? allLeads : allLeads.filter(lead => lead.assignedToId === user?.id);

  const funnelData = [
    { stage: 'Leads', count: userLeads.filter(l => l.status === 'new').length, value: '₹48L', conversion: 100 },
    { stage: 'Qualified', count: userLeads.filter(l => l.status === 'qualified').length, value: '₹38L', conversion: 71 },
    { stage: 'Proposal', count: userLeads.filter(l => l.status === 'proposal').length, value: '₹28L', conversion: 38 },
    { stage: 'Negotiation', count: userLeads.filter(l => l.status === 'negotiation').length, value: '₹22L', conversion: 27 },
    { stage: 'Closed Won', count: userLeads.filter(l => l.status === 'converted').length, value: '₹18L', conversion: 21 },
  ];

  const prospects = userLeads.filter(lead => ['qualified', 'proposal', 'negotiation'].includes(lead.status)).map(lead => ({
    id: lead.id,
    name: lead.contact,
    company: lead.name,
    stage: lead.status.charAt(0).toUpperCase() + lead.status.slice(1),
    value: lead.value,
    probability: lead.status === 'qualified' ? 65 : lead.status === 'proposal' ? 75 : 85,
    lastContact: lead.lastContact,
    nextAction: lead.status === 'qualified' ? 'Proposal presentation' : 
                lead.status === 'proposal' ? 'Follow-up call' : 'Contract review'
  }));

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
        <PermissionGate permission="lead_create">
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Plus size={16} className="mr-2" />
            Add Prospect
          </Button>
        </PermissionGate>
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
            Prospects
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
          <KanbanBoard />
        </TabsContent>

        <TabsContent value="prospects" className="space-y-6">
          {/* Prospects Table */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Active Prospects</CardTitle>
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
                      <SelectItem value="qualified">Qualified</SelectItem>
                      <SelectItem value="proposal">Proposal</SelectItem>
                      <SelectItem value="negotiation">Negotiation</SelectItem>
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
                    {prospects.map((prospect) => (
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
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost">
                              <Eye size={14} />
                            </Button>
                            <PermissionGate permission="lead_update">
                              <Button size="sm" variant="ghost">
                                <Edit size={14} />
                              </Button>
                            </PermissionGate>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalesFunnel;
