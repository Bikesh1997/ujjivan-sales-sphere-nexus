
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AddLeadModal from '@/components/leads/AddLeadModal';
import LeadStatsCards from '@/components/leads/LeadStatsCards';
import LeadFilters from '@/components/leads/LeadFilters';
import LeadsTable from '@/components/leads/LeadsTable';
import LeadsPagination from '@/components/leads/LeadsPagination';
import { useLeadFilters } from '@/hooks/useLeadFilters';
import { useAuth } from '@/contexts/AuthContext';
import { allLeads } from '@/data/leadsData';
import PermissionGate from '@/components/rbac/PermissionGate';

const LEADS_PER_PAGE = 10;

const LeadManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useAuth();

  // Filter leads based on user role - sales executives only see their assigned leads
  const leads = user?.role === 'supervisor' 
    ? allLeads 
    : allLeads.filter(lead => lead.assignedToId === user?.id);

  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    sourceFilter,
    setSourceFilter,
    showAdvancedFilters,
    setShowAdvancedFilters,
    filteredLeads,
    hasActiveFilters,
    clearAllFilters,
    uniqueSources,
  } = useLeadFilters(leads);

  // Pagination logic
  const totalPages = Math.ceil(filteredLeads.length / LEADS_PER_PAGE);
  const startIndex = (currentPage - 1) * LEADS_PER_PAGE;
  const paginatedLeads = filteredLeads.slice(startIndex, startIndex + LEADS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleClearFilters = () => {
    clearAllFilters();
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {user?.role === 'supervisor' ? 'All Leads' : 'My Leads'}
          </h1>
          <p className="text-gray-600">
            {user?.role === 'supervisor' 
              ? `Manage and track all sales leads (${filteredLeads.length} of ${allLeads.length} total)` 
              : `Manage and track your assigned leads (${filteredLeads.length} of ${leads.length} assigned)`
            }
          </p>
        </div>
        <PermissionGate permission="lead_create">
          <AddLeadModal />
        </PermissionGate>
      </div>

      {/* Stats Cards */}
      <LeadStatsCards leads={leads} userRole={user?.role || ''} />

      {/* Filters and Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>
              {user?.role === 'supervisor' ? 'All Leads' : 'My Assigned Leads'}
            </CardTitle>
          </div>
          
          <LeadFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            sourceFilter={sourceFilter}
            setSourceFilter={setSourceFilter}
            showAdvancedFilters={showAdvancedFilters}
            setShowAdvancedFilters={setShowAdvancedFilters}
            hasActiveFilters={hasActiveFilters}
            clearAllFilters={handleClearFilters}
            uniqueSources={uniqueSources}
            setCurrentPage={setCurrentPage}
          />
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <LeadsTable leads={paginatedLeads} userRole={user?.role || ''} />

            <LeadsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              startIndex={startIndex}
              leadsPerPage={LEADS_PER_PAGE}
              totalLeads={filteredLeads.length}
              onPageChange={handlePageChange}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadManagement;
