
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLeadFilters } from '@/hooks/useLeadFilters';
import { useLeadActions } from '@/hooks/useLeadActions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Filter } from 'lucide-react';
import LeadStatsCards from '@/components/leads/LeadStatsCards';
import LeadFilters from '@/components/leads/LeadFilters';
import LeadsTable from '@/components/leads/LeadsTable';
import AddLeadModal from '@/components/leads/AddLeadModal';
import EditLeadModal from '@/components/leads/EditLeadModal';
import LeadNotesModal from '@/components/leads/LeadNotesModal';
import LeadCallModal from '@/components/leads/LeadCallModal';
import LeadViewModal from '@/components/leads/LeadViewModal';
import BulkLeadActions from '@/components/leads/BulkLeadActions';
import { leadsData } from '@/data/leadsData';

// Define the Lead interface to match what's expected
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
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [leads, setLeads] = useState<Lead[]>(leadsData);
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Custom hooks for lead filtering
  const {
    searchTerm: filterSearchTerm,
    setSearchTerm: setFilterSearchTerm,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    sourceFilter,
    setSourceFilter,
    filteredLeads,
    clearAllFilters
  } = useLeadFilters(leads);

  // Update search term in filters when it changes in the component
  useEffect(() => {
    setFilterSearchTerm(searchTerm);
  }, [searchTerm, setFilterSearchTerm]);

  // Custom hook for lead actions
  const {
    handleAddLead,
    handleUpdateLead,
    handleCallClick,
    handleViewLead,
    handleEditLead,
    handleNotesClick
  } = useLeadActions(
    leads, 
    setLeads, 
    setSelectedLead, 
    setIsCallModalOpen, 
    setIsViewModalOpen, 
    setIsEditModalOpen, 
    setIsNotesModalOpen
  );

  const stats = {
    total: filteredLeads.length,
    new: filteredLeads.filter(lead => lead.status.toLowerCase() === 'new').length,
    contacted: filteredLeads.filter(lead => lead.status.toLowerCase() === 'contacted').length,
    qualified: filteredLeads.filter(lead => lead.status.toLowerCase() === 'qualified').length,
    converted: filteredLeads.filter(lead => lead.status.toLowerCase() === 'converted').length
  };

  const handleSelectLead = (leadId: string) => {
    setSelectedLeads(prev => 
      prev.includes(leadId) 
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  const handleSelectAll = () => {
    if (selectedLeads.length === filteredLeads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(filteredLeads.map(lead => lead.id));
    }
  };

  const handleBulkAction = (action: string) => {
    console.log('Performing bulk action:', action, 'on leads:', selectedLeads);
    // Implement bulk actions logic here
    setSelectedLeads([]);
  };

  const filters = {
    status: statusFilter,
    source: sourceFilter,
    priority: priorityFilter,
    assignedTo: 'all',
    dateRange: 'all'
  };

  const handleFiltersChange = (newFilters: any) => {
    setStatusFilter(newFilters.status);
    setSourceFilter(newFilters.source);
    setPriorityFilter(newFilters.priority);
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
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} className="mr-2" />
            Filters
          </Button>
          <Button size="sm" onClick={() => setIsAddModalOpen(true)} className="bg-teal-600 hover:bg-teal-700">
            <Plus size={16} className="mr-2" />
            Add Lead
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <LeadStatsCards stats={stats} />

      {/* Search and Filters */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                placeholder="Search leads by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        {showFilters && (
          <CardContent className="pt-0">
            <LeadFilters
              searchTerm={filterSearchTerm}
              onSearchChange={setFilterSearchTerm}
              filters={filters}
              onFiltersChange={handleFiltersChange}
            />
          </CardContent>
        )}
      </Card>

      {/* Bulk Actions */}
      {selectedLeads.length > 0 && (
        <BulkLeadActions
          selectedLeads={selectedLeads}
          onClearSelection={() => setSelectedLeads([])}
          onBulkAction={handleBulkAction}
        />
      )}

      {/* Leads Table */}
      <Card>
        <CardContent className="p-0">
          <LeadsTable
            leads={filteredLeads}
            onSelectLead={handleSelectLead}
            onSelectAll={handleSelectAll}
            onCallClick={handleCallClick}
            onViewClick={handleViewLead}
            onEditClick={handleEditLead}
            onNotesClick={handleNotesClick}
            selectedLeads={selectedLeads}
          />
        </CardContent>
      </Card>

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
            onEditLead={handleUpdateLead}
          />

          <LeadNotesModal
            isOpen={isNotesModalOpen}
            onOpenChange={setIsNotesModalOpen}
            leadId={selectedLead.id}
            leadName={selectedLead.name}
          />

          <LeadCallModal
            isOpen={isCallModalOpen}
            onOpenChange={setIsCallModalOpen}
            leadName={selectedLead.name}
            phoneNumber={selectedLead.phone}
          />

          <LeadViewModal
            isOpen={isViewModalOpen}
            onOpenChange={setIsViewModalOpen}
            lead={selectedLead}
            onEditRequest={() => {
              setIsViewModalOpen(false);
              setIsEditModalOpen(true);
            }}
            onCallRequest={() => {
              setIsViewModalOpen(false);
              setIsCallModalOpen(true);
            }}
          />
        </>
      )}
    </div>
  );
};

export default LeadManagement;
