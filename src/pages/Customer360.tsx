
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Phone, Bell } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import CustomerTable from '@/components/customers/CustomerTable';
import SetAlertModal from '@/components/alerts/SetAlertModal';
import LeadCallModal from '@/components/leads/LeadCallModal';
import LeadsPagination from '@/components/leads/LeadsPagination';
import CustomerSummaryCard from '@/components/customers/CustomerSummaryCard';
import CustomerMetricsCards from '@/components/customers/CustomerMetricsCards';
import CustomerDetailsSection from '@/components/customers/CustomerDetailsSection';
import { useCustomerData } from '@/hooks/useCustomerData';

const Customer360 = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const urlCustomer = searchParams.get('customer');
  
  const [selectedCustomer, setSelectedCustomer] = useState(urlCustomer || 'priya-sharma');
  const [setAlertModalOpen, setSetAlertModalOpen] = useState(false);
  const [leadCallModalOpen, setLeadCallModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { customers, customerData, enhancedLeads } = useCustomerData();
  
  const leadsPerPage = 10;
  const totalPages = Math.ceil(enhancedLeads.length / leadsPerPage);
  const startIndex = (currentPage - 1) * leadsPerPage;

  const customer = customerData[selectedCustomer];

  // Check if current user is Neha Gupta (Relationship Manager)
  const isNehaAccount = user?.id === '5' && user?.name === 'Neha Gupta';

  // Update selected customer when URL parameter changes
  useEffect(() => {
    if (urlCustomer && customerData[urlCustomer]) {
      setSelectedCustomer(urlCustomer);
    }
  }, [urlCustomer, customerData]);

  const handleAddFamilyMember = () => {
    console.log('Add family member functionality');
  };

  const handleContactFamilyMember = (member: any) => {
    console.log('Contact family member:', member);
  };

  const handleCreateGoalPlan = (goalId: string) => {
    console.log('Create goal plan for:', goalId);
  };

  const handleCallCustomer = () => {
    setLeadCallModalOpen(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCreateOffer = (productSuggestion?: string) => {
    console.log('Create offer for:', productSuggestion);
  };

  // Convert customer to lead format for the call modal
  const customerAsLead = customer ? {
    id: customer.id,
    name: customer.name,
    contact: customer.name,
    phone: customer.phone,
    email: customer.email,
    status: 'existing',
    source: 'Customer Database',
    value: customer.totalRelationship,
    assignedTo: user?.name || 'Current User',
    assignedToId: user?.id || 'current',
    lastContact: customer.lastInteraction,
    priority: customer.relationshipValue === 'High' ? 'High' : 'Medium'
  } : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isNehaAccount ? 'Advanced Customer 360° View' : 'Customer 360° View'}
          </h1>
          <p className="text-gray-600">
            {isNehaAccount ? 
              'Comprehensive relationship management with AI-powered insights' : 
              'Comprehensive customer relationship overview'
            }
          </p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setSetAlertModalOpen(true)}
          >
            <Bell size={16} className="mr-2" />
            Set Alert
          </Button>
          <Button 
            size="sm" 
            className="bg-teal-600 hover:bg-teal-700"
            onClick={handleCallCustomer}
          >
            <Phone size={16} className="mr-2" />
            Call Customer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Table */}
        <div className="lg:col-span-1">
          <CustomerTable 
            customers={customers}
            selectedCustomer={selectedCustomer}
            onCustomerSelect={setSelectedCustomer}
          />
          
          {/* Pagination */}
          <div className="mt-4">
            <LeadsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              startIndex={startIndex}
              leadsPerPage={leadsPerPage}
              totalLeads={enhancedLeads.length}
              onPageChange={handlePageChange}
            />
          </div>
        </div>

        {/* Customer Details */}
        <div className="lg:col-span-1">
          {customer && (
            <div className="space-y-6">
              <CustomerSummaryCard customer={customer} />
              <CustomerMetricsCards customer={customer} />
            </div>
          )}
        </div>
      </div>

      {/* Detailed Information Tabs */}
      {customer && (
        <CustomerDetailsSection
          customer={customer}
          isNehaAccount={isNehaAccount}
          onCreateOffer={handleCreateOffer}
          onAddFamilyMember={handleAddFamilyMember}
          onContactFamilyMember={handleContactFamilyMember}
          onCreateGoalPlan={handleCreateGoalPlan}
        />
      )}

      {/* Modals */}
      <SetAlertModal
        customerName={customer?.name || ''}
        isOpen={setAlertModalOpen}
        onOpenChange={setSetAlertModalOpen}
      />
      
      {customerAsLead && (
        <LeadCallModal
          lead={customerAsLead}
          isOpen={leadCallModalOpen}
          onOpenChange={setLeadCallModalOpen}
        />
      )}
    </div>
  );
};

export default Customer360;
