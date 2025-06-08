
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { allLeads } from '@/data/leadsData';
import LeadStatsCards from '@/components/leads/LeadStatsCards';
import LeadsTable from '@/components/leads/LeadsTable';
import LeadFilters from '@/components/leads/LeadFilters';
import AddLeadModal from '@/components/leads/AddLeadModal';
import EditLeadModal from '@/components/leads/EditLeadModal';
import LeadViewModal from '@/components/leads/LeadViewModal';
import LeadActionsMenu from '@/components/leads/LeadActionsMenu';
import BulkLeadActions from '@/components/leads/BulkLeadActions';
import LeadsPagination from '@/components/leads/LeadsPagination';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Lead {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
  status: string;
  source: string;
  value: string;
  assignedTo: string;
  assignedToId: string;
  lastContact: string;
  priority: string;
  documentReceived?: boolean;
  underProcess?: boolean;
  sanctioned?: boolean;
  disbursed?: boolean;
}

const LeadManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [leadsPerPage] = useState(10);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  
  const [filters, setFilters] = useState({
    status: 'all',
    source: 'all',
    priority: 'all',
    assignedTo: 'all',
    dateRange: '30'
  });

  useEffect(() => {
    // Filter leads based on user role and add new status fields
    let initialLeads = user?.role === 'supervisor' ? allLeads : allLeads.filter(lead => lead.assignedToId === user?.id);
    
    // Add random status for new fields to existing leads
    initialLeads = initialLeads.map(lead => ({
      ...lead,
      documentReceived: Math.random() > 0.6,
      underProcess: Math.random() > 0.7,
      sanctioned: Math.random() > 0.8,
      disbursed: Math.random() > 0.9
    }));
    
    setLeads(initialLeads);
    setFilteredLeads(initialLeads);
  }, [user]);

  useEffect(() => {
    // Apply search term and filters
    let results = leads.filter(lead =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filters.status !== 'all') {
      results = results.filter(lead => lead.status === filters.status);
    }
    if (filters.source !== 'all') {
      results = results.filter(lead => lead.source === filters.source);
    }
    if (filters.priority !== 'all') {
      results = results.filter(lead => lead.priority === filters.priority);
    }
    if (filters.assignedTo !== 'all') {
      results = results.filter(lead => lead.assignedToId === filters.assignedTo);
    }

    // Date range filter (simplified for example)
    if (filters.dateRange !== 'all') {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - parseInt(filters.dateRange));
      results = results.filter(lead => {
        const lastContactDate = new Date(); // Replace with actual date parsing from lead.lastContact
        return lastContactDate >= cutoffDate;
      });
    }

    setFilteredLeads(results);
    setCurrentPage(1); // Reset to first page on filter change
  }, [leads, searchTerm, filters]);

  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);
  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);

  const handleEditLead = (leadId: string, updatedData: Partial<Lead>) => {
    const updatedLeads = leads.map(lead => 
      lead.id === leadId ? { ...lead, ...updatedData } : lead
    );
    setLeads(updatedLeads);
    setIsEditModalOpen(false);
    toast({
      title: "Lead Updated",
      description: "Lead information has been successfully updated.",
    });
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
    const newLead: Lead = {
      id: `LEAD${(leads.length + 1).toString().padStart(3, '0')}`,
      name: leadData.companyName,
      contact: leadData.contactName,
      phone: leadData.phone,
      email: leadData.email,
      status: 'new',
      source: leadData.source,
      value: leadData.value,
      assignedTo: user?.name || 'Unassigned',
      assignedToId: user?.id || '',
      lastContact: 'Just added',
      priority: leadData.priority,
      documentReceived: false,
      underProcess: false,
      sanctioned: false,
      disbursed: false
    };

    setLeads([...leads, newLead]);
    setIsAddModalOpen(false);
    toast({
      title: "Lead Added",
      description: "New lead has been successfully added to your pipeline.",
    });
  };

  const handleStatusUpdate = (leadId: string, field: string, value: boolean) => {
    const updatedLeads = leads.map(lead => 
      lead.id === leadId ? { ...lead, [field]: value } : lead
    );
    setLeads(updatedLeads);
    
    const lead = leads.find(l => l.id === leadId);
    toast({
      title: "Status Updated",
      description: `${lead?.name} ${field} has been ${value ? 'marked as complete' : 'marked as incomplete'}.`,
    });
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
          <p className="text-gray-600">Manage and track your sales prospects</p>
        </div>
        <Button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-teal-600 hover:bg-teal-700"
        >
          <Plus size={16} className="mr-2" />
          Add Lead
        </Button>
      </div>

      {/* Stats Cards */}
      <LeadStatsCards leads={filteredLeads} userRole={user?.role || 'agent'} />

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <LeadFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filters={filters}
            onFiltersChange={setFilters}
          />
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedLeads.length > 0 && (
        <BulkLeadActions
          selectedLeads={selectedLeads}
          onClearSelection={() => setSelectedLeads([])}
          onBulkAction={(action) => {
            console.log('Bulk action:', action, selectedLeads);
            toast({
              title: "Bulk Action",
              description: `Applied ${action} to ${selectedLeads.length} leads`,
            });
            setSelectedLeads([]);
          }}
        />
      )}

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>Leads ({filteredLeads.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Lead</th>
                  <th className="text-left p-3">Contact</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Priority</th>
                  <th className="text-left p-3">Value</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentLeads.map((lead) => (
                  <tr key={lead.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div>
                        <p className="font-medium">{lead.name}</p>
                        <p className="text-sm text-gray-500">{lead.source}</p>
                      </div>
                    </td>
                    <td className="p-3">
                      <div>
                        <p className="font-medium">{lead.contact}</p>
                        <p className="text-sm text-gray-500">{lead.phone}</p>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="space-y-1">
                        <Badge variant="outline" className="capitalize">
                          {lead.status}
                        </Badge>
                        <div className="text-xs space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">Doc:</span>
                            <Badge variant={lead.documentReceived ? "default" : "secondary"} className="text-xs">
                              {lead.documentReceived ? 'Received' : 'Pending'}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">Process:</span>
                            <Badge variant={lead.underProcess ? "default" : "secondary"} className="text-xs">
                              {lead.underProcess ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">Approved:</span>
                            <Badge variant={lead.sanctioned ? "default" : "secondary"} className="text-xs">
                              {lead.sanctioned ? 'Yes' : 'No'}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">Disbursed:</span>
                            <Badge variant={lead.disbursed ? "default" : "secondary"} className="text-xs">
                              {lead.disbursed ? 'Yes' : 'No'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge 
                        variant="outline" 
                        className={
                          lead.priority === 'High' ? 'bg-red-100 text-red-800' :
                          lead.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }
                      >
                        {lead.priority}
                      </Badge>
                    </td>
                    <td className="p-3 font-medium">{lead.value}</td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedLead(lead);
                            setIsViewModalOpen(true);
                          }}
                        >
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedLead(lead);
                            setIsEditModalOpen(true);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant={lead.disbursed ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleStatusUpdate(lead.id, 'disbursed', !lead.disbursed)}
                          className={lead.disbursed ? 'bg-green-600 hover:bg-green-700 text-white' : ''}
                        >
                          {lead.disbursed ? 'Disbursed' : 'Disburse'}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <LeadsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalLeads={filteredLeads.length}
        leadsPerPage={leadsPerPage}
        startIndex={indexOfFirstLead}
      />

      {/* Modals */}
      <AddLeadModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onAddLead={handleAddLead}
      />

      {selectedLead && (
        <>
          <EditLeadModal
            isOpen={isEditModalOpen}
            onOpenChange={setIsEditModalOpen}
            lead={selectedLead}
            onEditLead={handleEditLead}
          />

          <LeadViewModal
            isOpen={isViewModalOpen}
            lead={selectedLead}
            onOpenChange={setIsViewModalOpen}
          />
        </>
      )}
    </div>
  );
};

export default LeadManagement;
