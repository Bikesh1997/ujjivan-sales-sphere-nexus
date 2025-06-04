
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  User, 
  CreditCard, 
  TrendingUp, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  IndianRupee,
  Heart,
  Home,
  Car,
  Users,
  FileText,
  Bell,
  Target
} from 'lucide-react';

const Customer360 = () => {
  const [selectedCustomer, setSelectedCustomer] = useState('priya-sharma');

  const customerData = {
    'priya-sharma': {
      name: 'Priya Sharma',
      id: 'CUST001234',
      segment: 'Premium',
      relationshipValue: 'High',
      totalRelationship: '₹15.2L',
      phone: '+91 98765 43210',
      email: 'priya.sharma@email.com',
      address: 'Bandra West, Mumbai 400050',
      joinDate: '15 Mar 2019',
      lastInteraction: '2 days ago',
      riskScore: 'Low',
      products: [
        { type: 'Savings Account', balance: '₹2.5L', status: 'Active' },
        { type: 'Fixed Deposit', amount: '₹8L', maturity: '15 Dec 2024' },
        { type: 'Home Loan', outstanding: '₹45L', emi: '₹42,000' },
        { type: 'Credit Card', limit: '₹3L', utilization: '35%' },
      ],
      interactions: [
        { date: '25 May 2024', type: 'Call', purpose: 'FD Renewal Discussion', outcome: 'Interested' },
        { date: '20 May 2024', type: 'Branch Visit', purpose: 'Loan Documentation', outcome: 'Completed' },
        { date: '15 May 2024', type: 'Email', purpose: 'Insurance Product Offer', outcome: 'No Response' },
        { date: '10 May 2024', type: 'SMS', purpose: 'Payment Reminder', outcome: 'Paid' },
      ],
      family: [
        { name: 'Rajesh Sharma', relation: 'Spouse', products: ['Savings Account', 'SIP'] },
        { name: 'Arjun Sharma', relation: 'Son', products: ['Student Account'] },
      ],
      opportunities: [
        { product: 'Personal Loan', priority: 'High', reason: 'Good credit history & salary increment', potential: '₹8L' },
        { product: 'Life Insurance', priority: 'Medium', reason: 'Family protection needs', potential: '₹50L cover' },
        { product: 'Mutual Funds', priority: 'Low', reason: 'Investment diversification', potential: '₹2L SIP' },
      ]
    }
  };

  const customer = customerData[selectedCustomer];

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer 360° View</h1>
          <p className="text-gray-600">Comprehensive customer relationship overview</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Bell size={16} className="mr-2" />
            Set Alert
          </Button>
          <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
            <Phone size={16} className="mr-2" />
            Call Customer
          </Button>
        </div>
      </div>

      {/* Customer Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
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

        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
                    <p className="text-xs text-gray-500 mt-1">FD Renewal Call</p>
                  </div>
                  <Calendar size={24} className="text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Detailed Information Tabs */}
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="products" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="interactions">Interactions</TabsTrigger>
              <TabsTrigger value="family">Family Tree</TabsTrigger>
              <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
              <TabsTrigger value="offers">Offers</TabsTrigger>
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

            <TabsContent value="interactions" className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Interaction History</h3>
              <div className="space-y-3">
                {customer.interactions.map((interaction, index) => (
                  <Card key={index} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                            {interaction.type === 'Call' && <Phone size={14} className="text-teal-600" />}
                            {interaction.type === 'Email' && <Mail size={14} className="text-teal-600" />}
                            {interaction.type === 'Branch Visit' && <MapPin size={14} className="text-teal-600" />}
                            {interaction.type === 'SMS' && <FileText size={14} className="text-teal-600" />}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{interaction.purpose}</p>
                            <p className="text-sm text-gray-500">{interaction.date} • {interaction.type}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(interaction.outcome)}>
                          {interaction.outcome}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="family" className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Family Relationships</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {customer.family.map((member, index) => (
                  <Card key={index} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-blue-100 text-blue-700">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium text-gray-900">{member.name}</h4>
                          <p className="text-sm text-gray-500">{member.relation}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {member.products.map((product, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {product}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
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
                          <Button size="sm" className="mt-2 ml-2 bg-teal-600 hover:bg-teal-700">
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
                <Button className="mt-4 bg-teal-600 hover:bg-teal-700">
                  Create New Offer
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Customer360;
