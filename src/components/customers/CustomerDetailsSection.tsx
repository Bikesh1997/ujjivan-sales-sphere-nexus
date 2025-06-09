
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Target, FileText } from 'lucide-react';
import FamilyGroupTab from '@/components/customers/FamilyGroupTab';
import CrossSellSuggestions from '@/components/customers/CrossSellSuggestions';
import GoalBasedNudges from '@/components/customers/GoalBasedNudges';
import CreateOfferModal from '@/components/customers/CreateOfferModal';

interface CustomerDetailsSectionProps {
  customer: any;
  isNehaAccount: boolean;
  onCreateOffer: (productSuggestion?: string) => void;
  onAddFamilyMember: () => void;
  onContactFamilyMember: (member: any) => void;
  onCreateGoalPlan: (goalId: string) => void;
}

const CustomerDetailsSection = ({ 
  customer, 
  isNehaAccount, 
  onCreateOffer,
  onAddFamilyMember,
  onContactFamilyMember,
  onCreateGoalPlan
}: CustomerDetailsSectionProps) => {
  const [createOfferModalOpen, setCreateOfferModalOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<string>('');

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

  return (
    <>
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="products" className="w-full">
            <TabsList className={`grid w-full ${isNehaAccount ? 'grid-cols-6' : 'grid-cols-4'}`}>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="family">Family Group</TabsTrigger>
              <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
              <TabsTrigger value="offers">Offers</TabsTrigger>
              {isNehaAccount && <TabsTrigger value="cross-sell">AI Cross-Sell</TabsTrigger>}
              {isNehaAccount && <TabsTrigger value="goals">Goal Planning</TabsTrigger>}
            </TabsList>

            <TabsContent value="products" className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Holdings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {customer.products.map((product: any, index: number) => (
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
                onAddFamilyMember={onAddFamilyMember}
                onContactMember={onContactFamilyMember}
              />
            </TabsContent>

            <TabsContent value="opportunities" className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cross-sell & Up-sell Opportunities</h3>
              <div className="space-y-3">
                {customer.opportunities.map((opportunity: any, index: number) => (
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
                    onCreatePlan={onCreateGoalPlan}
                  />
                </TabsContent>
              </>
            )}
          </Tabs>
        </CardContent>
      </Card>

      <CreateOfferModal
        customerName={customer?.name || ''}
        productSuggestion={selectedOpportunity}
        isOpen={createOfferModalOpen}
        onOpenChange={setCreateOfferModalOpen}
      />
    </>
  );
};

export default CustomerDetailsSection;
