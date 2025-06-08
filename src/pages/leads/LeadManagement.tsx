
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LeadStatsCards from '@/components/leads/LeadStatsCards';
import LeadFilters from '@/components/leads/LeadFilters';
import LeadsTable from '@/components/leads/LeadsTable';
import AddLeadModal from '@/components/leads/AddLeadModal';
import { useLeadFilters } from '@/hooks/useLeadFilters';
import { useLeadActions } from '@/hooks/useLeadActions';
import KRAPerformanceSection from '@/components/leads/KRAPerformanceSection';

const LeadManagement = () => {
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const { filters, updateFilters, resetFilters } = useLeadFilters();
  const { handleCallLead, handleEditLead, handleViewNotes } = useLeadActions();

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
          <LeadStatsCards />
          
          <LeadFilters 
            filters={filters}
            onFiltersChange={updateFilters}
            onResetFilters={resetFilters}
            onAddLead={() => setIsAddLeadModalOpen(true)}
          />
          
          <LeadsTable 
            filters={filters}
            onCallLead={handleCallLead}
            onEditLead={handleEditLead}
            onViewNotes={handleViewNotes}
          />
          
          <AddLeadModal 
            isOpen={isAddLeadModalOpen}
            onClose={() => setIsAddLeadModalOpen(false)}
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
