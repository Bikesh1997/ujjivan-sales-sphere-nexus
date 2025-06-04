
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Phone, Mail, MapPin, Calendar, Plus, Edit, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Customer360 = () => {
  const { toast } = useToast();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const customers = [
    {
      id: '1',
      name: 'Rajesh Enterprises',
      contact: 'Rajesh Kumar',
      email: 'rajesh@enterprises.com',
      phone: '+91 98765 43210',
      location: 'Mumbai, Maharashtra',
      status: 'Active',
      value: '₹12.5L',
      lastContact: '2024-06-03',
      products: ['Business Loan', 'Current Account'],
      interactions: 15
    },
    {
      id: '2',
      name: 'Tech Solutions Ltd',
      contact: 'Priya Patel',
      email: 'priya@techsolutions.com',
      phone: '+91 87654 32109',
      location: 'Pune, Maharashtra',
      status: 'Prospect',
      value: '₹8.2L',
      lastContact: '2024-06-02',
      products: ['Equipment Finance'],
      interactions: 8
    }
  ];

  const handleCustomerAction = (action: string, customerId?: string) => {
    switch (action) {
      case 'add-customer':
        toast({
          title: "Add Customer",
          description: "Customer creation form will be implemented",
        });
        break;
      case 'edit-customer':
        toast({
          title: "Edit Customer",
          description: `Editing customer ${customerId}`,
        });
        break;
      case 'call-customer':
        toast({
          title: "Initiating Call",
          description: `Calling customer ${customerId}`,
        });
        break;
      case 'email-customer':
        toast({
          title: "Opening Email",
          description: `Composing email to customer ${customerId}`,
        });
        break;
      case 'schedule-meeting':
        toast({
          title: "Schedule Meeting",
          description: `Scheduling meeting with customer ${customerId}`,
        });
        break;
      case 'add-product':
        toast({
          title: "Add Product",
          description: `Adding new product for customer ${customerId}`,
        });
        break;
      default:
        toast({
          title: "Action Triggered",
          description: `${action} functionality will be implemented`,
        });
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer 360</h1>
          <p className="text-gray-600">Comprehensive view of customer relationships and interactions</p>
        </div>
        <Button onClick={() => handleCustomerAction('add-customer')} className="bg-blue-600 hover:bg-blue-700">
          <Plus size={16} className="mr-2" />
          Add Customer
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Customers</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                placeholder="Search customers..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedCustomer?.id === customer.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedCustomer(customer)}
                >
                  <div className="flex items-start space-x-3">
                    <Avatar>
                      <AvatarImage src={`https://avatar.vercel.sh/${customer.contact}.png`} alt={customer.contact} />
                      <AvatarFallback>{customer.contact.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{customer.name}</h4>
                      <p className="text-xs text-gray-600 truncate">{customer.contact}</p>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant={customer.status === 'Active' ? 'default' : 'secondary'}>
                          {customer.status}
                        </Badge>
                        <span className="text-xs font-medium text-green-600">{customer.value}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Customer Details */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            {selectedCustomer ? (
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="products">Products</TabsTrigger>
                  <TabsTrigger value="interactions">Interactions</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={`https://avatar.vercel.sh/${selectedCustomer.contact}.png`} alt={selectedCustomer.contact} />
                        <AvatarFallback className="text-lg">{selectedCustomer.contact.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="text-xl font-bold">{selectedCustomer.name}</h2>
                        <p className="text-gray-600">{selectedCustomer.contact}</p>
                        <Badge variant={selectedCustomer.status === 'Active' ? 'default' : 'secondary'}>
                          {selectedCustomer.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleCustomerAction('edit-customer', selectedCustomer.id)}>
                        <Edit size={14} className="mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" onClick={() => handleCustomerAction('call-customer', selectedCustomer.id)}>
                        <Phone size={14} className="mr-1" />
                        Call
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Contact Information</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Mail size={16} className="text-gray-500" />
                          <span className="text-sm">{selectedCustomer.email}</span>
                          <Button size="sm" variant="ghost" onClick={() => handleCustomerAction('email-customer', selectedCustomer.id)}>
                            Email
                          </Button>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone size={16} className="text-gray-500" />
                          <span className="text-sm">{selectedCustomer.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin size={16} className="text-gray-500" />
                          <span className="text-sm">{selectedCustomer.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium">Key Metrics</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Total Value</span>
                          <span className="text-sm font-medium">{selectedCustomer.value}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Interactions</span>
                          <span className="text-sm font-medium">{selectedCustomer.interactions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Last Contact</span>
                          <span className="text-sm font-medium">{selectedCustomer.lastContact}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-4">
                    <Button variant="outline" onClick={() => handleCustomerAction('schedule-meeting', selectedCustomer.id)}>
                      <Calendar size={16} className="mr-2" />
                      Schedule Meeting
                    </Button>
                    <Button variant="outline" onClick={() => handleCustomerAction('add-product', selectedCustomer.id)}>
                      <Plus size={16} className="mr-2" />
                      Add Product
                    </Button>
                    <Button variant="outline" onClick={() => handleCustomerAction('view-analytics', selectedCustomer.id)}>
                      <TrendingUp size={16} className="mr-2" />
                      View Analytics
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="products">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Products & Services</h3>
                      <Button size="sm" onClick={() => handleCustomerAction('add-product', selectedCustomer.id)}>
                        <Plus size={16} className="mr-2" />
                        Add Product
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {selectedCustomer.products.map((product, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <span className="font-medium">{product}</span>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" onClick={() => handleCustomerAction('view-product-details', selectedCustomer.id)}>
                              View Details
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleCustomerAction('manage-product', selectedCustomer.id)}>
                              Manage
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="interactions">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Recent Interactions</h3>
                      <Button size="sm" onClick={() => handleCustomerAction('add-interaction', selectedCustomer.id)}>
                        <Plus size={16} className="mr-2" />
                        Add Interaction
                      </Button>
                    </div>
                    <div className="text-center py-8 text-gray-500">
                      <p>Interaction history will be displayed here</p>
                      <Button className="mt-4" variant="outline" onClick={() => handleCustomerAction('view-full-history', selectedCustomer.id)}>
                        View Full History
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="analytics">
                  <div className="space-y-4">
                    <h3 className="font-medium">Customer Analytics</h3>
                    <div className="text-center py-8 text-gray-500">
                      <p>Analytics and insights will be displayed here</p>
                      <Button className="mt-4" variant="outline" onClick={() => handleCustomerAction('generate-report', selectedCustomer.id)}>
                        Generate Report
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Users size={48} className="mx-auto mb-4 text-gray-300" />
                <p>Select a customer to view details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Customer360;
