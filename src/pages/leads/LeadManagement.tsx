import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  TrendingUp, 
  IndianRupee, 
  Filter,
  Search,
  Plus,
  Eye,
  Edit,
  Download,
  ChevronsUpDown,
  Grid,
  List
} from 'lucide-react';
import LeadActionsMenu from '@/components/leads/LeadActionsMenu';
import AddLeadModal from '@/components/leads/AddLeadModal';
import LeadCard from '@/components/leads/LeadCard';
import PermissionGate from '@/components/rbac/PermissionGate';
import { useAuth } from '@/contexts/AuthContext';
import { allLeads } from '@/data/leadsData';
import { useToast } from '@/hooks/use-toast';

const LeadManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [leadsData, setLeadsData] = useState(allLeads);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode<'grid' | 'table'>('grid');
  const [filters, setFilters] = useState({
    status: 'all',
    assignee: 'all',
    priority: 'all'
  });

  // Filter leads based on user role
  const userLeads = user?.role === 'supervisor' ? leadsData : leadsData.filter(lead => lead.assignedToId === user?.id);

  const filteredLeads = userLeads.filter(lead => {
    // Search filter
    const matchesSearch = searchTerm === '' || 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm);

    // Status filter
    if (filters.status !== 'all' && lead.status !== filters.status) {
      return false;
    }
    // Assignee filter
    if (filters.assignee !== 'all' && lead.assignedToId !== filters.assignee) {
      return false;
    }
    // Priority filter
    if (filters.priority !== 'all' && lead.priority !== filters.priority) {
      return false;
    }
    
    return matchesSearch;
  });

  const handleEditLead = (leadId: string, updatedData: Partial<typeof allLeads[0]>) => {
    setLeadsData(prevLeads => 
      prevLeads.map(lead => 
        lead.id === leadId 
          ? { ...lead, ...updatedData, lastContact: 'Just updated' }
          : lead
      )
    );
  };

  const handleAddLead = (leadData: {
    companyName: string;
    contactName: string;
    phone: string;
    email: string;
    source: string;
    value: string;
    priority: string;
  }) => {
    const newLead = {
      id: (leadsData.length + 1).toString(),
      name: leadData.companyName,
      contact: leadData.contactName,
      phone: leadData.phone,
      email: leadData.email,
      status: 'new',
      source: leadData.source,
      value: leadData.value,
      assignedTo: user?.name || 'Unassigned',
      assignedToId: user?.id || '1',
      lastContact: 'Just added',
      priority: leadData.priority.toLowerCase()
    };

    setLeadsData(prevLeads => [newLead, ...prevLeads]);
    console.log('New lead added:', newLead);
  };

  const handleExport = () => {
    try {
      // Convert filtered leads to CSV format
      const csvHeaders = ['Name', 'Contact', 'Phone', 'Email', 'Status', 'Priority', 'Value', 'Assigned To', 'Last Contact'];
      const csvData = filteredLeads.map(lead => [
        lead.name,
        lead.contact,
        lead.phone,
        lead.email,
        lead.status,
        lead.priority,
        lead.value,
        lead.assignedTo,
        lead.lastContact
      ]);

      const csvContent = [csvHeaders, ...csvData]
        .map(row => row.map(field => `"${field}"`).join(','))
        .join('\n');

      // Create and download the file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Export Successful",
        description: `Exported ${filteredLeads.length} leads to CSV file.`,
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export Failed",
        description: "There was an error exporting the leads data.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-gray-100 text-gray-800';
      case 'qualified': return 'bg-blue-100 text-blue-800';
      case 'proposal': return 'bg-yellow-100 text-yellow-800';
      case 'negotiation': return 'bg-orange-100 text-orange-800';
      case 'converted': return 'bg-green-100 text-green-800';
      case 'lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
          <p className="text-gray-600">Manage and track your leads effectively</p>
        </div>
        <div className="flex gap-2">
          <PermissionGate permission="lead_create">
            <AddLeadModal onAddLead={handleAddLead} />
          </PermissionGate>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Filters</CardTitle>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid size={16} className="mr-1" />
                Grid
              </Button>
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('table')}
              >
                <List size={16} className="mr-1" />
                Table
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search leads..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="qualified">Qualified</SelectItem>
              <SelectItem value="proposal">Proposal</SelectItem>
              <SelectItem value="negotiation">Negotiation</SelectItem>
              <SelectItem value="converted">Converted</SelectItem>
              <SelectItem value="lost">Lost</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.priority} onValueChange={(value) => setFilters(prev => ({ ...prev, priority: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </CardContent>
      </Card>

      {/* Leads Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredLeads.map(lead => (
            <LeadCard 
              key={lead.id} 
              lead={lead}
              onClick={() => console.log('Lead clicked:', lead.id)}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Lead</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Priority</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Value</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Assignee</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Last Contact</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map(lead => (
                    <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{lead.contact}</div>
                          <div className="text-sm text-gray-500">{lead.name}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusColor(lead.status)}>
                          {lead.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={getPriorityColor(lead.priority)}>
                          {lead.priority}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-900">{lead.value}</td>
                      <td className="py-3 px-4 text-gray-600">{lead.assignedTo}</td>
                      <td className="py-3 px-4 text-gray-600">{lead.lastContact}</td>
                      <td className="py-3 px-4">
                        <LeadActionsMenu lead={lead} onEditLead={handleEditLead} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LeadManagement;
