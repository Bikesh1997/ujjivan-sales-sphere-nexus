import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Plus } from 'lucide-react';
import LeadStatsCards from '@/components/leads/LeadStatsCards';
import LeadFilters from '@/components/leads/LeadFilters';
import LeadsTable from '@/components/leads/LeadsTable';
import LeadsPagination from '@/components/leads/LeadsPagination';
import AddLeadModal from '@/components/leads/AddLeadModal';
import EditLeadModal from '@/components/leads/EditLeadModal';
import LeadNotesModal from '@/components/leads/LeadNotesModal';
import CallLeadModal from '@/components/leads/CallLeadModal';
import { useToast } from '@/hooks/use-toast';

const LeadManagement = () => {
  const { toast } = useToast();

  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    priority: 'all',
    dateRange: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [isEditLeadModalOpen, setIsEditLeadModalOpen] = useState(false);
  const [isLeadNotesModalOpen, setIsLeadNotesModalOpen] = useState(false);
  const [isCallLeadModalOpen, setIsCallLeadModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    // Fetch leads from API or data source
    // For now, using static data
    const fetchLeads = async () => {
      const data = [
        {
          id: '1',
          name: 'John Doe',
          contact: 'john.doe@example.com',
          status: 'New',
          priority: 'High',
          value: '50L',
          assignedTo: 'Rahul Sharma',
          createdDate: '2024-01-15',
        },
        {
          id: '2',
          name: 'Jane Smith',
          contact: 'jane.smith@example.com',
          status: 'Contacted',
          priority: 'Medium',
          value: '25L',
          assignedTo: 'Anjali Patel',
          createdDate: '2024-01-20',
        },
        {
          id: '3',
          name: 'Michael Johnson',
          contact: 'michael.johnson@example.com',
          status: 'Qualified',
          priority: 'Low',
          value: '100L',
          assignedTo: 'Vikash Kumar',
          createdDate: '2024-01-25',
        },
      ];
      setLeads(data);
      setFilteredLeads(data);
    };
    fetchLeads();
  }, []);

  useEffect(() => {
    // Apply filters to leads
    let filtered = [...leads];
    if (filters.search) {
      filtered = filtered.filter(lead =>
        lead.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        lead.contact.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    if (filters.status !== 'all') {
      filtered = filtered.filter(lead => lead.status === filters.status);
    }
    if (filters.priority !== 'all') {
      filtered = filtered.filter(lead => lead.priority === filters.priority);
    }
    if (filters.dateRange && filters.dateRange.length === 2) {
      const [start, end] = filters.dateRange;
      filtered = filtered.filter(lead => {
        const leadDate = new Date(lead.createdDate);
        return leadDate >= start && leadDate <= end;
      });
    }
    setFilteredLeads(filtered);
    setCurrentPage(1);
  }, [filters, leads]);

  const totalPages = Math.ceil(filteredLeads.length / pageSize);
  const currentLeads = filteredLeads.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleBulkActions = () => {
    toast({
      title: "Bulk Actions",
      description: "Bulk actions feature is under development.",
    });
  };

  const handleAddLead = (newLead) => {
    setLeads(prev => [...prev, newLead]);
    toast({
      title: "Lead Added",
      description: `Lead ${newLead.name} has been added successfully.`,
    });
  };

  const handleEditLead = (lead) => {
    setSelectedLead(lead);
    setIsEditLeadModalOpen(true);
  };

  const handleUpdateLead = (updatedLead) => {
    setLeads(prev => prev.map(lead => lead.id === updatedLead.id ? updatedLead : lead));
    toast({
      title: "Lead Updated",
      description: `Lead ${updatedLead.name} has been updated successfully.`,
    });
    setIsEditLeadModalOpen(false);
    setSelectedLead(null);
  };

  const handleDeleteLead = (leadId) => {
    setLeads(prev => prev.filter(lead => lead.id !== leadId));
    toast({
      title: "Lead Deleted",
      description: "Lead has been deleted successfully.",
      variant: "destructive"
    });
  };

  const handleLeadClick = (lead) => {
    setSelectedLead(lead);
  };

  const handleNotesClick = (lead) => {
    setSelectedLead(lead);
    setIsLeadNotesModalOpen(true);
  };

  const handleCallClick = (lead) => {
    setSelectedLead(lead);
    setIsCallLeadModalOpen(true);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      priority: 'all',
      dateRange: null,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
          <p className="text-gray-600">Manage and track your sales leads</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline"
            onClick={handleBulkActions}
          >
            <Download size={16} className="mr-2" />
            Bulk Actions
          </Button>
          <Button 
            className="bg-teal-600 hover:bg-teal-700"
            onClick={() => setIsAddLeadModalOpen(true)}
          >
            <Plus size={16} className="mr-2" />
            Add Lead
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <LeadStatsCards leads={filteredLeads} />

      {/* Filters */}
      <LeadFilters 
        filters={filters}
        onFiltersChange={setFilters}
        onClearFilters={handleClearFilters}
      />

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Leads ({filteredLeads.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <LeadsTable 
            leads={currentLeads}
            onLeadClick={handleLeadClick}
            onEditLead={handleEditLead}
            onDeleteLead={handleDeleteLead}
            onNotesClick={handleNotesClick}
            onCallClick={handleCallClick}
          />
          <LeadsPagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>

      {/* Modals */}
      <AddLeadModal 
        open={isAddLeadModalOpen}
        onOpenChange={setIsAddLeadModalOpen}
        onAddLead={handleAddLead}
      />
      
      <EditLeadModal 
        open={isEditLeadModalOpen}
        onOpenChange={setIsEditLeadModalOpen}
        lead={selectedLead}
        onUpdateLead={handleUpdateLead}
      />

      <LeadNotesModal 
        open={isLeadNotesModalOpen}
        onOpenChange={setIsLeadNotesModalOpen}
        lead={selectedLead}
      />

      <CallLeadModal 
        open={isCallLeadModalOpen}
        onOpenChange={setIsCallLeadModalOpen}
        lead={selectedLead}
      />
    </div>
  );
};

export default LeadManagement;
