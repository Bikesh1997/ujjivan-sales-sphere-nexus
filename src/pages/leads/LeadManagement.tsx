
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
    // Filter leads based on user role
    let initialLeads = user?.role === 'supervisor' ? allLeads : allLeads.filter(lead => lead.assignedToId === user?.id);
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
      priority: leadData.priority
    };

    setLeads([...leads, newLead]);
    setIsAddModalOpen(false);
    toast({
      title: "Lead Added",
      description: "New lead has been successfully added to your pipeline.",
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
          <LeadsTable
            leads={currentLeads}
            userRole={user?.role || 'agent'}
            onEditLead={handleEditLead}
          />
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
        isOpen={isAddModalOpen}
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
