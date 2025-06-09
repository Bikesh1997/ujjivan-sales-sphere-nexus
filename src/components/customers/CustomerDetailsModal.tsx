
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  User, 
  CreditCard, 
  TrendingUp, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  Heart,
  Target,
  FileText,
  Bell
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import FamilyGroupTab from './FamilyGroupTab';
import ClientInteractionDetails from './ClientInteractionDetails';
import CrossSellSuggestions from './CrossSellSuggestions';
import GoalBasedNudges from './GoalBasedNudges';
import SetAlertModal from '../alerts/SetAlertModal';
import LeadCallModal from '../leads/LeadCallModal';
import CreateOfferModal from './CreateOfferModal';

interface Customer {
  key: string;
  name: string;
  id: string;
  segment: string;
  relationshipValue: string;
  totalRelationship: string;
  phone: string;
  email: string;
  address: string;
  joinDate: string;
  lastInteraction: string;
  riskScore: string;
  products: any[];
  interactions: any[];
  family: any[];
  opportunities: any[];
}

interface CustomerDetailsModalProps {
  customer: Customer | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const CustomerDetailsModal = ({ customer, isOpen, onOpenChange }: CustomerDetailsModalProps) => {
  const { user } = useAuth();
  const [setAlertModalOpen, setSetAlertModalOpen] = useState(false);
  const [callCustomerModalOpen, setCallCustomerModalOpen] = useState(false);
  const [createOfferModalOpen, setCreateOfferModalOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<string>('');

  // Check if current user is Neha Gupta (Relationship Manager)
  const isNehaAccount = user?.id === '5' && user?.name === 'Neha Gupta';

  if (!customer) return null;

  // Convert customer to lead format for the call modal
  const customerAsLead = {
    id: customer.id,
    name: customer.name,
    contact: customer.name,
    phone: customer.phone,
    email: customer.email,
    status: 'qualified',
    source: 'Existing Customer',
    value: customer.totalRelationship,
    assignedTo: user?.name || 'Current User',
    assignedToId: user?.id || 'current',
    lastContact: customer.lastInteraction,
    priority: customer.relationshipValue === 'High' ? 'High' : 'Medium'
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateOffer = (productSuggestion?: string) => {
    setSelectedOpportunity(productSuggestion || '');
    setCreateOfferModalOpen(true);
  };

  const handleAddFamilyMember = () => {
    console.log('Add family member functionality');
  };

  const handleContactFamilyMember = (member: any) => {
    console.log('Contact family member:', member);
  };

  const handleCreateGoalPlan = (goalId: string) => {
    console.log('Create goal plan for:', goalId);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle className="text-2xl font-bold">Customer Details</DialogTitle>
              <div className="flex space-x-2">
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
                  onClick={() => setCallCustomerModalOpen(true)}
                >
                  <Phone size={16} className="mr-2" />
                  Call Customer
                </Button>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            {/* Customer Summary and Key Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Customer Summary */}
              <Card className="lg:col-span-1">
                <CardContent className="p-6">
                  <div className="text-center">
                    <Avatar className="h-20 w-20 mx-auto mb-4">
                      <AvatarFallback className="text-xl bg-teal-100 text-teal-700">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg text-gray-900">{customer.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">{customer.id}</p>
                    <Badge className="bg-purple-100 text-purple-800 mb-4">{customer.segment}</Badge>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Phone size={14} className="mr-2" />
                        {customer.phone}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Mail size={14} className="mr-2" />
                        {customer.email}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin size={14} className="mr-2" />
                        {customer.address}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar size={14} className="mr-2" />
                        Customer since {customer.joinDate}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Key Metrics */}
              <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Relationship Value</p>
                        <p className="text-xl font-bold text-gray-900">{customer.totalRelationship}</p>
                        <Badge className="bg-green-100 text-green-800 mt-1">{customer.relationshipValue}</Badge>
                      </div>
                      <TrendingUp size={24} className="text-teal-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Risk Score</p>
                        <p className="text-xl font-bold text-gray-900">{customer.riskScore}</p>
                        <p className="text-xs text-gray-500 mt-1">Last updated: 3 days ago</p>
                      </div>
                      <Heart size={24} className="text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Last Interaction</p>
                        <p className="text-xl font-bold text-gray-900">{customer.lastInteraction}</p>
                        <p className="text-xs text-gray-500 mt-1">Recent activity</p>
                      </div>
                      <Calendar size={24} className="text-orange-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Detailed Information Tabs */}
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="products" className="w-full">
                  <TabsList className={`grid w-full ${isNehaAccount ? 'grid-cols-7' : 'grid-cols-5'}`}>
                    <TabsTrigger value="products">Products</TabsTrigger>
                    <TabsTrigger value="family">Family Group</TabsTrigger>
                    <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
                    <TabsTrigger value="offers">Offers</TabsTrigger>
                    <TabsTrigger value="client-details">Client Details</TabsTrigger>
                    {isNehaAccount && <TabsTrigger value="cross-sell">AI Cross-Sell</TabsTrigger>}
                    {isNehaAccount && <TabsTrigger value="goals">Goal Planning</TabsTrigger>}
                  </TabsList>

                  <TabsContent value="products" className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Holdings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {customer.products.map((product, index) => (
                        <Card key={index} className="border border-gray-200">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <CreditCard size={16} className="mr-2 text-teal-600" />
                                <h4 className="font-medium text-gray-900">{product.type}</h4>
                              </div>
                              <Badge className={getStatusColor(product.status || 'Active')}>
                                {product.status || 'Active'}
                              </Badge>
                            </div>
                            <div className="space-y-1 text-sm text-gray-600">
                              {product.balance && <p>Balance: <span className="font-medium">{product.balance}</span></p>}
                              {product.amount && <p>Amount: <span className="font-medium">{product.amount}</span></p>}
                              {product.outstanding && <p>Outstanding: <span className="font-medium">{product.outstanding}</span></p>}
                              {product.limit && <p>Limit: <span className="font-medium">{product.limit}</span></p>}
                              {product.maturity && <p>Maturity: <span className="font-medium">{product.maturity}</span></p>}
                              {product.emi && <p>EMI: <span className="font-medium">{product.emi}</span></p>}
                              {product.utilization && <p>Utilization: <span className="font-medium">{product.utilization}</span></p>}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="family" className="space-y-4">
                    <FamilyGroupTab
                      family={customer.family}
                      onAddFamilyMember={handleAddFamilyMember}
                      onContactMember={handleContactFamilyMember}
                    />
                  </TabsContent>

                  <TabsContent value="opportunities" className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Cross-sell & Up-sell Opportunities</h3>
                    <div className="space-y-3">
                      {customer.opportunities.map((opportunity, index) => (
                        <Card key={index} className="border border-gray-200">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <Target size={20} className="text-teal-600" />
                                <div>
                                  <h4 className="font-medium text-gray-900">{opportunity.product}</h4>
                                  <p className="text-sm text-gray-600">{opportunity.reason}</p>
                                  <p className="text-sm font-medium text-teal-600 mt-1">Potential: {opportunity.potential}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <Badge className={getPriorityColor(opportunity.priority)}>
                                  {opportunity.priority}
                                </Badge>
                                <Button 
                                  size="sm" 
                                  className="mt-2 ml-2 bg-teal-600 hover:bg-teal-700"
                                  onClick={() => handleCreateOffer(opportunity.product)}
                                >
                                  Create Offer
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="offers" className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Offers & Campaigns</h3>
                    <div className="text-center py-8">
                      <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-500">No active offers for this customer</p>
                      <Button 
                        className="mt-4 bg-teal-600 hover:bg-teal-700"
                        onClick={() => handleCreateOffer()}
                      >
                        Create New Offer
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="client-details" className="space-y-4">
                    <ClientInteractionDetails customerName={customer.name} />
                  </TabsContent>

                  {/* Enhanced tabs only for Neha's account */}
                  {isNehaAccount && (
                    <>
                      <TabsContent value="cross-sell" className="space-y-4">
                        <CrossSellSuggestions
                          customerName={customer.name}
                          segment={customer.segment}
                          relationshipValue={customer.relationshipValue}
                          onCreateOffer={handleCreateOffer}
                        />
                      </TabsContent>

                      <TabsContent value="goals" className="space-y-4">
                        <GoalBasedNudges
                          customerName={customer.name}
                          onCreatePlan={handleCreateGoalPlan}
                        />
                      </TabsContent>
                    </>
                  )}
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sub-modals */}
      <SetAlertModal
        customerName={customer?.name || ''}
        isOpen={setAlertModalOpen}
        onOpenChange={setSetAlertModalOpen}
      />
      
      <LeadCallModal
        lead={customerAsLead}
        isOpen={callCustomerModalOpen}
        onOpenChange={setCallCustomerModalOpen}
      />
      
      <CreateOfferModal
        customerName={customer?.name || ''}
        productSuggestion={selectedOpportunity}
        isOpen={createOfferModalOpen}
        onOpenChange={setCreateOfferModalOpen}
      />
    </>
  );
};

export default CustomerDetailsModal;
