
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, Filter, Search, Download, Upload, UserPlus, BarChart3 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { allLeads, Lead } from '@/data/leadsData';
import { useToast } from '@/hooks/use-toast';

// Import components that exist in the project
import LeadsTable from '@/components/leads/LeadsTable';
import LeadFilters from '@/components/leads/LeadFilters';
import AddLeadModal from '@/components/leads/AddLeadModal';
import EditLeadModal from '@/components/leads/EditLeadModal';
import LeadViewModal from '@/components/leads/LeadViewModal';
import BulkLeadActions from '@/components/leads/BulkLeadActions';
import LeadStatsCards from '@/components/leads/LeadStatsCards';

const LeadManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [leads, setLeads] = useState<Lead[]>(allLeads);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>(allLeads);
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    source: '',
    assignedTo: '',
    dateRange: ''
  });

  // Filter leads based on user role
  const getUserLeads = () => {
    if (user?.role === 'supervisor') {
      return leads; // Supervisor sees all leads
    }
    return leads.filter(lead => lead.assignedToId === user?.id);
  };

  const userLeads = getUserLeads();
  
  const handleAddLead = (leadData: Partial<Lead>) => {
    const newLead: Lead = {
      id: (leads.length + 1).toString(),
      name: leadData.name || '',
      contact: leadData.contact || '',
      phone: leadData.phone || '',
      email: leadData.email || '',
      value: leadData.value || '₹0L',
      status: leadData.status || 'new',
      priority: leadData.priority || 'medium',
      source: leadData.source || 'Website',
      assignedTo: leadData.assignedTo || user?.name || '',
      assignedToId: leadData.assignedToId || user?.id || '',
      lastContact: 'Just created',
      nextFollowUp: leadData.nextFollowUp || new Date().toISOString().split('T')[0],
      notes: leadData.notes || ''
    };
    
    setLeads(prevLeads => [...prevLeads, newLead]);
    setFilteredLeads(prevLeads => [...prevLeads, newLead]);
    
    toast({
      title: "Lead Added",
      description: `${newLead.name} has been added successfully.`,
    });
  };

  const handleEditLead = (leadData: Partial<Lead>) => {
    if (!selectedLead) return;
    
    setLeads(prevLeads => prevLeads.map(lead => 
      lead.id === selectedLead.id 
        ? { ...lead, ...leadData }
        : lead
    ));
    
    setFilteredLeads(prevLeads => prevLeads.map(lead => 
      lead.id === selectedLead.id 
        ? { ...lead, ...leadData }
        : lead
    ));

    toast({
      title: "Lead Updated",
      description: `${selectedLead.name} has been updated successfully.`,
    });
  };

  const handleDeleteLead = (leadId: string) => {
    setLeads(prevLeads => prevLeads.filter(lead => lead.id !== leadId));
    setFilteredLeads(prevLeads => prevLeads.filter(lead => lead.id !== leadId));
    
    toast({
      title: "Lead Deleted",
      description: "Lead has been deleted successfully.",
    });
  };

  const handleBulkAction = (action: string, leadIds: string[]) => {
    switch (action) {
      case 'delete':
        setLeads(prevLeads => prevLeads.filter(lead => !leadIds.includes(lead.id)));
        setFilteredLeads(prevLeads => prevLeads.filter(lead => !leadIds.includes(lead.id)));
        break;
      case 'assign':
        // Handle bulk assignment
        break;
      case 'status':
        // Handle bulk status update
        break;
    }
    
    setSelectedLeads([]);
    
    toast({
      title: "Bulk Action Completed",
      description: `Action applied to ${leadIds.length} leads.`,
    });
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your lead data is being exported...",
    });
  };

  const handleImport = () => {
    toast({
      title: "Import Feature",
      description: "Import functionality will be available soon.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
          <p className="text-gray-600">
            {user?.role === 'supervisor' 
              ? 'Manage all leads and team assignments' 
              : 'Manage your assigned leads and opportunities'
            }
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm" onClick={handleImport}>
            <Upload size={16} className="mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download size={16} className="mr-2" />
            Export
          </Button>
          <Button size="sm" className="bg-teal-600 hover:bg-teal-700" onClick={() => setShowAddModal(true)}>
            <Plus size={16} className="mr-2" />
            Add Lead
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <LeadStatsCards leads={userLeads} />

      {/* Main Content */}
      <Tabs defaultValue="list" className="space-y-6">
        <TabsList>
          <TabsTrigger value="list">Lead List</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline View</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-6">
          {/* Filters and Search */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Filters & Search</span>
                <Badge variant="secondary">{filteredLeads.length} leads</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <LeadFilters
                leads={userLeads}
                filteredLeads={filteredLeads}
                onFilterChange={setFilteredLeads}
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
              selectedCount={selectedLeads.length}
              onBulkAction={handleBulkAction}
              selectedLeads={selectedLeads}
            />
          )}

          {/* Leads Table */}
          <Card>
            <CardContent className="p-0">
              <LeadsTable
                leads={filteredLeads}
                selectedLeads={selectedLeads}
                onSelectionChange={setSelectedLeads}
                onEditLead={(lead) => {
                  setSelectedLead(lead);
                  setShowEditModal(true);
                }}
                onViewLead={(lead) => {
                  setSelectedLead(lead);
                  setShowViewModal(true);
                }}
                onDeleteLead={handleDeleteLead}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                userRole={user?.role}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pipeline">
          <Card>
            <CardContent className="p-6 text-center">
              <BarChart3 size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Pipeline View</h3>
              <p className="text-gray-600">Visual pipeline representation coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardContent className="p-6 text-center">
              <BarChart3 size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Lead Analytics</h3>
              <p className="text-gray-600">Detailed analytics and insights coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <AddLeadModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddLead={handleAddLead}
      />

      {selectedLead && (
        <>
          <EditLeadModal
            isOpen={showEditModal}
            onClose={() => {
              setShowEditModal(false);
              setSelectedLead(null);
            }}
            lead={selectedLead}
            onEditLead={handleEditLead}
          />

          <LeadViewModal
            isOpen={showViewModal}
            onClose={() => {
              setShowViewModal(false);
              setSelectedLead(null);
            }}
            lead={selectedLead}
          />
        </>
      )}
    </div>
  );
};

export default LeadManagement;
