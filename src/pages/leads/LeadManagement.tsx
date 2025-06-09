
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LeadStatsCards from '@/components/leads/LeadStatsCards';
import LeadFilters from '@/components/leads/LeadFilters';
import LeadsTable from '@/components/leads/LeadsTable';
import AddLeadModal from '@/components/leads/AddLeadModal';
import { useLeadFilters } from '@/hooks/useLeadFilters';
import KRAPerformanceSection from '@/components/leads/KRAPerformanceSection';
import { useAuth } from '@/contexts/AuthContext';

// Sample leads data
const sampleLeads = [
  {
    id: 'L001',
    name: 'TechCorp Solutions',
    contact: 'John Smith',
    phone: '+91 98765 43210',
    email: 'john@techcorp.com',
    status: 'qualified',
    source: 'Website Forms',
    value: '₹15L',
    assignedTo: 'Ravi Kumar',
    assignedToId: 'user1',
    lastContact: '2 days ago',
    priority: 'High'
  },
  {
    id: 'L002',
    name: 'Global Enterprises',
    contact: 'Sarah Johnson',
    phone: '+91 98765 43211',
    email: 'sarah@global.com',
    status: 'new',
    source: 'WhatsApp Business',
    value: '₹8L',
    assignedTo: 'Priya Sharma',
    assignedToId: 'user2',
    lastContact: '1 day ago',
    priority: 'Medium'
  },
  {
    id: 'L003',
    name: 'Innovation Inc',
    contact: 'Mike Wilson',
    phone: '+91 98765 43212',
    email: 'mike@innovation.com',
    status: 'converted',
    source: 'Call Center',
    value: '₹25L',
    assignedTo: 'Anita Patel',
    assignedToId: 'user3',
    lastContact: '5 days ago',
    priority: 'High'
  }
];

const LeadManagement = () => {
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [leads, setLeads] = useState(sampleLeads);
  const { user } = useAuth();
  
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    filteredLeads,
    clearAllFilters
  } = useLeadFilters(leads);

  // Check for random leads from dashboard navigation
  useEffect(() => {
    const randomLeads = localStorage.getItem('newRandomLeads');
    if (randomLeads) {
      const parsedLeads = JSON.parse(randomLeads);
      setLeads(prevLeads => [...prevLeads, ...parsedLeads]);
      localStorage.removeItem('newRandomLeads');
    }
  }, []);

  const handleAddLead = (leadData: any) => {
    const newLead = {
      id: `L${String(leads.length + 1).padStart(3, '0')}`,
      name: leadData.companyName,
      contact: leadData.contactName,
      phone: leadData.phone,
      email: leadData.email,
      status: 'new',
      source: leadData.source,
      value: leadData.value,
      assignedTo: user?.name || 'Current User',
      assignedToId: user?.id || 'current',
      lastContact: 'Just now',
      priority: leadData.priority
    };
    setLeads([...leads, newLead]);
  };

  const handleEditLead = (leadId: string, updatedData: any) => {
    setLeads(leads.map(lead => 
      lead.id === leadId ? { ...lead, ...updatedData } : lead
    ));
  };

  const filters = {
    status: statusFilter,
    source: 'all',
    priority: 'all',
    assignedTo: 'all',
    dateRange: 'all'
  };

  const handleFiltersChange = (newFilters: any) => {
    if (newFilters.status !== statusFilter) {
      setStatusFilter(newFilters.status);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
          <p className="text-gray-600">Manage and track your leads efficiently</p>
        </div>
      </div>

      <Tabs defaultValue="leads" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="leads">My Leads</TabsTrigger>
          <TabsTrigger value="performance">KRA & Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="leads" className="space-y-6">
          <LeadStatsCards leads={filteredLeads} userRole={user?.role || 'agent'} />
          
          <LeadFilters 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />
          
          <LeadsTable 
            leads={filteredLeads}
            userRole={user?.role || 'agent'}
            onEditLead={handleEditLead}
          />
          
          <AddLeadModal 
            open={isAddLeadModalOpen}
            onOpenChange={setIsAddLeadModalOpen}
            onAddLead={handleAddLead}
          />
        </TabsContent>

        <TabsContent value="performance">
          <KRAPerformanceSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeadManagement;
