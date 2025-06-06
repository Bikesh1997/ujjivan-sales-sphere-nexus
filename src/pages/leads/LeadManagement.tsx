import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Download } from 'lucide-react';
import LeadStatsCards from '@/components/leads/LeadStatsCards';
import LeadFilters from '@/components/leads/LeadFilters';
import LeadsTable from '@/components/leads/LeadsTable';
import LeadsPagination from '@/components/leads/LeadsPagination';
import AddLeadModal from '@/components/leads/AddLeadModal';
import EditLeadModal from '@/components/leads/EditLeadModal';
import LeadNotesModal from '@/components/leads/LeadNotesModal';
import { allLeads } from '@/data/leadsData';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';

const LeadManagement = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [leads, setLeads] = useState(allLeads);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [isEditLeadModalOpen, setIsEditLeadModalOpen] = useState(false);
  const [isLeadNotesModalOpen, setIsLeadNotesModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 5;
  const [searchTerm, setSearchTerm] = useState('');

  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    source: '',
    assignedTo: '',
    dateRange: '',
  });

  const handleAddLead = (newLead: any) => {
    setLeads([...leads, { ...newLead, id: String(Date.now()) }]);
    toast({
      title: "Lead Added",
      description: `${newLead.name} has been added to your leads.`,
    });
  };

  const handleEditLead = (lead: any) => {
    setSelectedLead(lead);
    setIsEditLeadModalOpen(true);
  };

  const handleUpdateLead = (updatedLead: any) => {
    setLeads(
      leads.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead))
    );
    setSelectedLead(null);
    toast({
      title: "Lead Updated",
      description: `${updatedLead.name} has been updated successfully.`,
    });
  };

  const handleDeleteLead = (id: string) => {
    setLeads(leads.filter((lead) => lead.id !== id));
    toast({
      title: "Lead Deleted",
      description: "Lead has been deleted.",
    });
  };

  const handleLeadClick = (lead: any) => {
    setSelectedLead(lead);
  };

  const handleNotesClick = (lead: any) => {
    setSelectedLead(lead);
    setIsLeadNotesModalOpen(true);
  };

  const handleCallClick = (lead: any) => {
    setSelectedLead(lead);
    toast({
      title: "Calling Lead",
      description: `Calling ${lead.name}...`,
    });
  };

  const handleBulkActions = () => {
    toast({
      title: "Bulk Actions",
      description: "Initiating bulk actions...",
    });
  };

  const handleClearFilters = () => {
    setFilters({
      status: '',
      priority: '',
      source: '',
      assignedTo: '',
      dateRange: '',
    });
    setSearchTerm('');
  };

  const filteredLeads = leads.filter(lead => {
    if (filters.status && lead.status !== filters.status) {
      return false;
    }
    if (filters.priority && lead.priority !== filters.priority) {
      return false;
    }
    if (filters.source && lead.source !== filters.source) {
      return false;
    }
    return true;
  });

  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);

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

      {/* Lead Stats Cards */}
      <LeadStatsCards leads={filteredLeads} userRole={user?.role} />

      {/* Lead Filters */}
      <LeadFilters 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={filters}
        onFiltersChange={setFilters}
        onClearFilters={handleClearFilters}
      />

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <LeadsTable
            leads={currentLeads}
            userRole={user?.role || ''}
            onLeadClick={handleLeadClick}
            onNotesClick={handleNotesClick}
            onCallClick={handleCallClick}
            onDeleteLead={handleDeleteLead}
          />
          
          <LeadsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            startIndex={indexOfFirstLead}
            leadsPerPage={leadsPerPage}
            totalLeads={filteredLeads.length}
          />
        </CardContent>
      </Card>

      {/* Modals */}
      <AddLeadModal 
        isOpen={isAddLeadModalOpen} 
        onOpenChange={setIsAddLeadModalOpen}
        onAddLead={handleAddLead} 
      />
      
      {selectedLead && (
        <>
          <EditLeadModal 
            lead={selectedLead}
            isOpen={isEditLeadModalOpen}
            onOpenChange={setIsEditLeadModalOpen}
            onUpdateLead={handleUpdateLead}
          />
          
          <LeadNotesModal 
            isOpen={isLeadNotesModalOpen}
            onOpenChange={setIsLeadNotesModalOpen}
          />
        </>
      )}
    </div>
  );
};

export default LeadManagement;
